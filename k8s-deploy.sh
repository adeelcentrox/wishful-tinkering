#!/bin/bash

set -e

DOMAIN="wishful-tinkering.duperbots.com"
APP_NAME="wishful-tinkering"
NAMESPACE="default"
REGISTRY="ghcr.io"  # Change to your registry
IMAGE_NAME="$REGISTRY/$APP_NAME:latest"

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
docker build -t $IMAGE_NAME .

echo ""
echo "Step 3: Pushing Docker image..."
docker push $IMAGE_NAME

echo ""
echo "Step 4: Applying Kubernetes manifests..."

kubectl apply -f - << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $APP_NAME
  namespace: $NAMESPACE
  labels:
    app: $APP_NAME
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
        image: $IMAGE_NAME
        imagePullPolicy: Always
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
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
    protocol: TCP
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: $APP_NAME-ingress
  namespace: $NAMESPACE
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: "true"
    traefik.ingress.kubernetes.io/router.tls.certresolver: letsencrypt
    cert-manager.io/cluster-issuer: letsencrypt-prod
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
echo "Step 5: Waiting for deployment rollout..."
kubectl rollout status deployment/$APP_NAME -n $NAMESPACE --timeout=120s

echo ""
echo "========================================"
echo "  Deployment complete!"
echo "========================================"
echo "  Your app is now live at: https://$DOMAIN"
echo ""
echo "  To check status:"
echo "    kubectl get pods -l app=$APP_NAME"
echo "    kubectl get ingress $APP_NAME-ingress"
echo ""
echo "  To view logs:"
echo "    kubectl logs -f -l app=$APP_NAME"
echo "========================================"
