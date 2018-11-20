# sg

## Compile and watch dev
```
yarn dev
```

### Host the express server
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### an example config for Digital Ocean on your sites-available config file
### this also assumes you have setup https with letsencrypt

server {
    root /var/www/nightcyclemedia.com/dist;
    index index.html index.htm index.php index.nginx-debian.html;
    server_name nightcyclemedia.com www.nightcyclemedia.com;
	
    location / {
        proxy_pass http://nightcyclemedia.com:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/nightcyclemedia.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/nightcyclemedia.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.nightcyclemedia.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = nightcyclemedia.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;
    server_name nightcyclemedia.com www.nightcyclemedia.com;
    return 404; # managed by Certbot
}
