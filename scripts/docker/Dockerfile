FROM node

USER root

RUN apt-get update
RUN apt-get install -y nginx vim

COPY nginx.conf /etc/nginx/nginx.conf