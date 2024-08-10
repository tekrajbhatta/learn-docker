### Some Docker Related Notes

## 1. Uninstall Docker Engine

Uninstall the Docker Engine, CLI, containerd, and Docker Compose packages:

sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras

Images, containers, volumes, or custom configuration files on your host aren't automatically removed. To delete all images, containers, and volumes:

```bash

 sudo rm -rf /var/lib/docker
 sudo rm -rf /var/lib/containerd

 sudo groupdel docker

 sudo rm -rf /var/run/docker.sock

 sudo rm -rf /etc/docker
 
 sudo apt purge docker-compose

 sudo rm /etc/apt/sources.list.d/docker.list

 sudo apt-get clean 

```

## 2. Install latest version of docker

# a. Download and Install

Download the latest debian package from the link:-

https://docs.docker.com/desktop/install/ubuntu/

And run the command to install:-

```bash

sudo apt-get update
sudo apt-get install ./docker-desktop-<arch>.deb

```

# b. Launch the Docker Desktop

Just open the Docker Desktop app 
OR, 
Run the command below:-

```bash

systemctl --user start docker-desktop

```

To stop the docker-desktop:-

```bash

systemctl --user stop docker-desktop

```


## 3. Some Docker Commands:-

# A. If it needs to remove all the data related docker(containers, images, volumes, networks)

1) Stop and Remove all containers

a) Stop all running containers

docker stop $(docker ps -aq)

Start/Stop Individual container:-

docker start container_name

docker stop container_name

b) Remove all containers

docker rm $(docker ps -aq)

2) Remove all images

docker rmi $(docker images -q)

3) Remove all volumes

docker volume rm $(docker volume ls -q)

4) Remove Docker networks

docker network prune

B) Check all the Docker data

1) Display all running containers

docker container ls
OR,
docker ps

Display all containers(including stopped ones)

Use the -a or --all flag 

docker ps -a

2) Display all running images

docker images
OR,
docker images ls

3) Display all volumes

docker volume ls

4) Disk space used by Docker

docker system df

The docker system df command is used to display the amount of disk space used by Docker objects such as images, containers, volumes, and build cache. It provides an overview of how much disk space is being consumed and where it's being used within Docker.


## 4. Some random commands

1) Run a docker image

docker run -it <image_name>

Example:- Run ubuntu in my docker

docker run -it ubuntu

Note:- Here `-it` means interactive terminal and `ubuntu` means ubuntu image

This commamd will pull the docker image named `ubuntu` and created a container for that image and it redirects to that container in the terminal.

2) Execute docker container

docker exec <container_name> <command>

Example:- List the files inside a docker container from outside(from my pc terminal)

docker exec container_name ls

3) Port Mapping

docker run -it -p 1025:1025 mailhog/mailhog

docker run -it -p 9000:9000 piyushgargdev/mynodeapp

docker run -it -p 6000:9000 piyushgargdev/mynodeapp

4) Environment Variables

docker run -it -p 1025:1025 -e key1=value1 -e key2=value2 mailhog/mailhog

5) Dockerization of NodeJs Application

Here is the sample code for Dockerfile:-

FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY main.js main.js

RUN npm install

ENTRYPOINT ["node", "main.js"]

Explantion:-

After creating the Dockerfile, we can run the build command as:-

docker build -t <my-image-name> .

docker build -t learn-docker-nodejs .

This code will create an ubuntu image with the custom iamge name that we have provided.

And the node modules build and npm install as well file copy will be done when we run this image to create a container.

Now, to run the docker image we can use the command:-

docker run -it <image-name>

docker run -it learn-docker-nodejs

Run docker image with port mapping:-

docker run -it -p 8000:8000 learn-docker-nodejs

Run docker image with environment variable PORT:-

docker run -it -e PORT=4000 -p 4000:4000 learn-docker-nodejs

# 5. Push the code to docker hub

# 6. Create Multiple Containers(docker-compsoe.yml file)

To run multiple containers with multiple ports we can create a file named "docker-compose.yml" to structure and run the multiple containers for a project.

For example I want to create two containers for my project and which are progress and redis container. In this case the code below will create two containers inside a container.

version: "3.8"

services:
  postgres:
    image: postgres # hub.docker.com
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_DB: review
      POSTGRES_PASSWORD: password

  redis:
    image: redis
    ports:
      - "6379:6379"


To run this file we should run:-

docker compose up

And to stop the container:-

docker composer down
