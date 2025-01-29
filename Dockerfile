# Render で動作する PHP 環境を構築
FROM php:8.2-apache

# コンテナのポート設定（Renderのデフォルトは 10000）
EXPOSE 10000

# Apache の設定
RUN a2enmod rewrite

# PHP の起動コマンド
CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html"]
