FROM wyveo/nginx-php-fpm:php74
WORKDIR /usr/share/nginx/
RUN rm -rf /usr/share/nginx/html
COPY . /usr/share/nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 775 /usr/share/nginx/storage/*
RUN ln -s public html
