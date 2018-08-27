#!/bin/bash

set -eu

docker pull mysql:5.7
docker kill webdb
docker rm webdb
docker run -p 3306:3306 --name webdb -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=webprod -d mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci