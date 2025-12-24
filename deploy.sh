#!/bin/bash

set -e

APP_NAME="wishful-tinkering"
DOMAIN="wishful-tinkering.duperbots.com"
SERVER_USER="root"
SERVER_HOST=""  # Add your server IP here
DEPLOY_PATH="/var/www/$APP_NAME"
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
LOCAL_BUILD_DIR="dist"

echo "========================================"
echo "  Deploying $APP_NAME to $DOMAIN"
echo "========================================"

if [ -z "$SERVER_HOST" ]; then
  echo "ERROR: Please set SERVER_HOST variable in this script"
  echo "Add your server IP or hostname to SERVER_HOST variable"
  exit 1
fi

echo ""
echo "Step 1: Installing dependencies..."
pnpm install --silent

echo ""
echo "Step 2: Building the app..."
pnpm build

echo ""
echo "Step 3: Setting up server and deploying..."

ssh "$SERVER_USER@$SERVER_HOST" bash -s << EOF
set -e

echo "  Installing required packages..."
apt-get update -qq
apt-get install -y nginx certbot python3-certbot-nginx -qq

echo "  Creating deploy directory..."
mkdir -p $DEPLOY_PATH

echo "  Setting up nginx configuration..."
cat > $NGINX_CONF << 'NGINX_CONF'
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        return 301 https://\$host\$request_uri;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    root $DEPLOY_PATH;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX_CONF

ln -sf $NGINX_CONF /etc/nginx/sites-enabled/$APP_NAME
rm -f /etc/nginx/sites-enabled/default

echo "  Testing nginx configuration..."
nginx -t

echo "  Setting up SSL certificate..."
mkdir -p /var/www/html
certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN --redirect || echo "  SSL already configured or will be configured manually"

echo "  Restarting nginx..."
systemctl restart nginx
systemctl enable nginx

echo "  Server setup complete!"
EOF

echo ""
echo "Step 4: Uploading build files..."
rsync -avz --delete "$LOCAL_BUILD_DIR/" "$SERVER_USER@$SERVER_HOST:$DEPLOY_PATH/"

echo ""
echo "Step 5: Setting permissions..."
ssh "$SERVER_USER@$SERVER_HOST" "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

echo ""
echo "========================================"
echo "  Deployment complete!"
echo "========================================"
echo "  Your app is now live at: https://$DOMAIN"
echo ""
echo "  To check status:"
echo "    ssh $SERVER_USER@$SERVER_HOST 'systemctl status nginx'"
echo ""
echo "  To view logs:"
echo "    ssh $SERVER_USER@$SERVER_HOST 'tail -f /var/log/nginx/access.log'"
echo "========================================"
