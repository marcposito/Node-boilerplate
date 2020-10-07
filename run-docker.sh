#!/usr/bin/env bash

if [ -n $(docker ps -aq -f name=nodejs-boilerplate-ms) ] ; then
    echo "Removing old container";
    docker rm -f $(docker ps -aq -f name=nodejs-boilerplate-ms);
fi
if [ -n $(docker images -q -f reference=nodejs-boilerplate-ms) ] ; then
    echo "Removing old image";
    docker rmi -f $(docker images -q -f reference=nodejs-boilerplate-ms);
fi
DOCKER_BUILDKIT=1 docker build --target=dev --rm -t nodejs-boilerplate-ms .
docker run -ti -d --env-file envar.dev --network=development -p 5000:5000 --mount type=bind,src=`pwd`/src,dst=/app/src --name nodejs-boilerplate-ms nodejs-boilerplate-ms
