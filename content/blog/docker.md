---
color: "#081828"
date: 2023-03-13T02:25:00Z
description: Securely build, share and run any application, anywhere
image: /img/tools/docker.png
name: Docker, Debug your app, not your environment
---

## What are Docker Containers
Docker is a simple standard to define the environment your code requires to run.

Unlike a virtual machine (VM), containers do not have high overhead and hence enable more efficient usage of the underlying system and resources. Containers use low-level mechanics of the host operating system, containers provide most of the isolation of a VM at a fraction of the computing power.

Containers offer a way to abstract applications from the environment they actually run in. Decoupling allows container-based applications to deployed consistently, regardless of whether the target environment is a private data center, the public cloud, or even a developer’s personal laptop. This gives developers the ability to create predictable, isolated environments that can run anywhere.

## Install

See guides to install Docker on [Mac](https://docs.docker.com/desktop/install/mac-install/), [Windows](https://docs.docker.com/desktop/install/windows-install/), and [Linux](https://docs.docker.com/engine/install/ubuntu/).

## Setting up a repo to use Docker

Anatomy of a `Dockerfile`

- `FROM` defines the base images to extend e.g. `FROM php:7.2-apache-stretch` an image with php and apache already install.
- `RUN` is for running bash commands to install or configure your docker environment e.g `RUN a2enmod rewrite` will enable the apache rewrite module.

Below is an example of the simple `Dockerfile` I use to run simple PHP projects.

```dockerfile
FROM php:7.2-apache-stretch
RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

RUN apt-get update
RUN apt-get upgrade -y
RUN update-ca-certificates
```

To use the `Dockerfile` run `docker build daim/php:beta .` and `docker run daim/php:beta`.

Anatomy of `docker-compose.yml`

- `services` define containers to run you can see in the below file PHP and MySQL containers defined.
- `volumes` mount your local files to sync into the container so when you update a file it's synced into the container. Volumes can also save data from a container to your computer e.g. save your mysql database so it doesn't get deleted with the container.
- `ports` exposes the container to your host system on that port.

```dockerfile
version: '3.1'
services:
  php:
    build:
      context: .
    image: php:7.2-apache-stretch
    ports:
      - 80:80
    volumes:
      - ./:/var/www/html/
  mysql:
    image: 'mysql:8'
    volumes:
      - 'mysql:/var/lib/mysql'
```

Running `docker-compose up` creates the containers defined in `docker-compose.yml`. It's simpler to run `docker-compose` rather than passing all the arguments via cli to `docker run`.

View the running containers with [VSCode docker extension](https://code.visualstudio.com/docs/containers/overview) (recommended) or using the `docker ps` command.
![VSCode Docker Extension](https://code.visualstudio.com/assets/docs/containers/overview/compose-group.png)

## Benefits
The environment you deploy code to in production is the same you test and run it on your machine. Every developer can share the same environment definition.

### Run more than one version of PHP at the same time
Let’s say you have three different PHP applications that you plan to host on a single server (which could either be a physical or a virtual machine). Each of these applications makes use of a different version of PHP, as well as the associated libraries and dependencies, differ from one application to another. Since we cannot have different versions of PHP installed on the same machine, this prevents us from hosting all three applications on the same computer.

Using Docker we can have 3 versions of PHP running at the same time on one computer.
![Docker Container Diagram](https://cdn-media-1.freecodecamp.org/images/1*MbxLUFB2HRPmLAn60tQKZA.png)

## Issues

### Mounted volume speed

MacOS can have issues with file system speed, most visible when running NPM or Composer install.

Some solutions offered in this article [Docker on MacOS is slow and how to fix it](https://www.cncf.io/blog/2023/02/02/docker-on-macos-is-slow-and-how-to-fix-it/).

Solutions
- [Mutagen](https://mutagen.io/) Moves code in real-time with fast two-way file synchronization. I've used it for Magento 2 Development. I've had issues getting Mutagen to run and with slow builds taking 30 minutes to copy files. But once copied the container file system did run faster.
- [VSCode Dev Container](https://code.visualstudio.com/docs/devcontainers/containers) are a promising standard for running dev environments that might be worth exploring.
- [New Docker for Mac VirtioFS file sync is 4x faster](https://www.jeffgeerling.com/blog/2022/new-docker-mac-virtiofs-file-sync-4x-faster)

### Root user
Docker runs as a root user which gives it privileged accessed to your computer which can be exploited by malicious docker containers.

Solutions
1. 🤷 Does it matter? This hasn't been an issue for me. It means sometimes I need to [change ownership of files from root to user](https://askubuntu.com/questions/623864/change-ownership-of-all-files-from-root-to-user).
1. [Run docker in rootless mode](https://docs.docker.com/engine/security/rootless/)
1. [Dev container define non root user](https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user)
1. [Define a non root user in Dockerfile](https://stackoverflow.com/a/67262075)
1. Use [Podman](https://podman.io/) rather than Docker.

## Alternatives

- [XAMPP](https://www.apachefriends.org/) is an easy to install Apache distribution containing MariaDB, PHP, and Perl.
- [Laravel Valet](https://laravel.com/docs/10.x/valet) is a development environment for macOS minimalists.
- [Laravel Homestead](https://laravel.com/docs/10.x/homestead) is an official, pre-packaged [Vagrant box](https://www.vagrantup.com/) that provides you a wonderful development environment without requiring you to install PHP, a web server, and any other server software on your local machine.

| Feature                           | Docker | Homestead  | Valet  | XAMPP   |
|-----------------------------------|--------|------------|--------|---------|
| Windows                           |   ✔️   |     ✔️    |   ❌   |   ✔️   |
| Linux                             |   ✔️   |     ✔️    |   ❌   |   ✔️   |
| MacOS                             |   ✔️   |     ✔️    |   ✔️   |   ✔️   |
| Dependency Isolation              |   ✔️   |     ✔️    |   ❌   |   ❌   |
| Share Dependency Definition       |   ✔️   |     🤷    |   ❌   |   ❌   |
| Runs Anywhere (Production)        |   ✔️   |     ❌    |   ❌   |   ❌   |


## Sources

- [A Docker Tutorial for Beginners](https://docker-curriculum.com/)
- [Docker on MacOS is slow and how to fix it](https://www.cncf.io/blog/2023/02/02/docker-on-macos-is-slow-and-how-to-fix-it/)
- [Docker Simplified: A Hands-On Guide for Absolute Beginners](https://www.freecodecamp.org/news/docker-simplified-96639a35ff36/)
- [Laravel Sail](https://laravel.com/docs/10.x/sail)
