#! /usr/bin/env bash

set -e

docker-compose down
docker volume rm nodeos-data-volume
docker volume rm keosd-data-volume
