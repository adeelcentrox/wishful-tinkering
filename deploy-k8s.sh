#!/bin/bash

set -e

DOMAIN="wishful-tinkering.duperbots.com"
APP_NAME="wishful-tinkering"
NAMESPACE="default"
IMAGE="$APP_NAME:latest"
SSH_HOST="161.97.146.11"
SSH_USER="root"
SSH_PASS="Adeelandnoni512440808000"

echo "========================================"
echo "  Deploying $APP_NAME to Kubernetes"
echo "  Domain: $DOMAIN"
echo "========================================"

echo ""
echo "Step 1: Building the app..."
pnpm install --silent
pnpm build

echo ""
echo "Step 2: Building Docker image..."
cat > Dockerfile.deploy << 'DOCKERFILE'
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN echo 'server { listen 80; root /usr/share/nginx/html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
DOCKERFILE

docker build -f Dockerfile.deploy -t $IMAGE .

echo ""
echo "Step 3: Loading image to cluster node..."
echo "  Saving image locally..."
docker save $IMAGE > /tmp/$APP_NAME.tar

echo "  Transferring to server..."
sshpass -p "$SSH_PASS" scp -o StrictHostKeyChecking=no /tmp/$APP_NAME.tar $SSH_USER@$SSH_HOST:/tmp/

echo "  Loading image on server..."
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "docker load < /tmp/$APP_NAME.tar && rm /tmp/$APP_NAME.tar"

rm -f /tmp/$APP_NAME.tar

echo ""
echo "Step 4: Deploying to Kubernetes..."
kubectl apply -f - << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $APP_NAME
  namespace: $NAMESPACE
spec:
  replicas: 2
  selector:
    matchLabels:
      app: $APP_NAME
  template:
    metadata:
      labels:
        app: $APP_NAME
    spec:
      containers:
      - name: $APP_NAME
        image: $IMAGE
        imagePullPolicy: Never
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: $APP_NAME
  namespace: $NAMESPACE
spec:
  selector:
    app: $APP_NAME
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: $APP_NAME-ingress
  namespace: $NAMESPACE
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls.certresolver: letsencrypt
spec:
  ingressClassName: traefik
  tls:
  - hosts:
    - $DOMAIN
    secretName: $APP_NAME-tls
  rules:
  - host: $DOMAIN
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: $APP_NAME
            port:
              number: 80
EOF

echo ""
echo "Step 5: Waiting for rollout..."
kubectl rollout status deployment/$APP_NAME -n $NAMESPACE --timeout=180s

echo ""
echo "========================================"
echo "  Deployment complete!"
echo "========================================"
echo "  https://$DOMAIN"
echo ""
echo "  Check: kubectl get pods -l app=$APP_NAME"
echo "  Logs:  kubectl logs -f -l app=$APP_NAME"
echo "========================================"

rm -f Dockerfile.deploy
