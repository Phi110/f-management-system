# PHP + Apache 環境を構築
FROM php:8.2-apache

# Apache の設定
RUN a2enmod rewrite

# index.php を Apache のドキュメントルートにコピー
COPY . /var/www/html/

# Apache のドキュメントルートを設定
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# コンテナのポート設定（Render のデフォルトは 10000）
EXPOSE 10000

# Apache を起動
CMD ["apache2-foreground"]
