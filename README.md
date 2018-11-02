# Capstone
2018/19 Capstone. Team: Human Error Is a Myth. Company: Novacoast

novasight_front
# novasight_front
Residence of NovaSight front end
Using React with Docker

Must be within navosight_front directory

1. How to build and run Docker (project)

Build docker: 
$ docker build -t novasight_front .

Run docker:
$ docker run -it \
-v ${PWD}:/usr/src/app \
-v /usr/src/app/node_modules \
-p 3000:3000 \
--rm \
sample-app


Navigate to  http://localhost:3000/  to see project



2. Run and build docker independently (allow the use of terminal when running the project) (recomended)

Build and run docker:
$ docker-compose up -d --build

Navigate to  http://localhost:3000/  to see project

Stop docker: 
$ docker-compose stop






