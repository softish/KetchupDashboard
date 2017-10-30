FROM nginx:latest

EXPOSE 80

COPY site.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx
#COPY default /etc/nginx/sites-available
COPY . /usr/share/nginx/html
