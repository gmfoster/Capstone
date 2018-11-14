#!/bin/sh

docker kill novasight
docker rmi -f novasight:latest

docker build -t novasight:latest .
docker run --name novasight -d -p 8000:5000 --rm novasight:latest