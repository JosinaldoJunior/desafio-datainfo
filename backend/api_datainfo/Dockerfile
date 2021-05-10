FROM debian:stretch-slim

RUN apt-get clean packages
RUN apt-get update; apt-get install apache2 -y

ENV PHP_VERSION=7.4
RUN apt-get install -y apt-transport-https lsb-release ca-certificates wget php-pear git zip unzip
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg &&\
    echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list &&\
    apt-get update
RUN apt-get install -y php$PHP_VERSION php$PHP_VERSION-xml php$PHP_VERSION-fpm php$PHP_VERSION-dev php$PHP_VERSION-mbstring php$PHP_VERSION-curl php$PHP_VERSION-soap php$PHP_VERSION-gd php$PHP_VERSION-imagick php$PHP_VERSION-mysql php$PHP_VERSION-cli php$PHP_VERSION-cgi php$PHP_VERSION-common php$PHP_VERSION-json php$PHP_VERSION-imagick php$PHP_VERSION-mysql php$PHP_VERSION-cli php$PHP_VERSION-cgi php$PHP_VERSION-common php$PHP_VERSION-xmlrpc php$PHP_VERSION-zip php$PHP_VERSION-opcache php$PHP_VERSION-readline php$PHP_VERSION-bcmath php$PHP_VERSION-bz2 php$PHP_VERSION-intl
RUN update-alternatives --set php /usr/bin/php$PHP_VERSION
RUN apt-get install -y libapache2-mod-php$PHP_VERSION
RUN a2enmod proxy_fcgi setenvif &&\
    a2enconf php$PHP_VERSION-fpm &&\
    a2enmod rewrite

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" &&\
    php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" &&\
    php composer-setup.php --install-dir=/usr/bin --filename=composer &&\
    php -r "unlink('composer-setup.php');"

WORKDIR /var/www/html
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

CMD /bin/bash -c "composer install"
CMD /bin/bash -c "php artisan migrate:fresh --seed"

CMD /bin/bash -c "/usr/sbin/apache2ctl -D FOREGROUND"

