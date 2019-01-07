FROM nginx:latest

ADD ./build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN /bin/bash -c 'front end start'