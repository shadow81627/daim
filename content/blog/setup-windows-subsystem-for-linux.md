---
title: Setup Windows Subsystem for Linux (WSL)
date: 2021-04-26T04:30:28Z
modified: 2022-04-22T05:25:55.075Z
description: Need an easy way to develop php applications on Windows? Learn how to setup WSL for PHP development.
image: /img/blog/windows.jpg
color: '#080808'
# image credit: Photo by <a href="https://unsplash.com/@stadsa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tadas Sar</a> on <a href="https://unsplash.com/s/photos/windows?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

## Setup

1. Make sure you are using Windows Pro since Docker needs hyper-v which is in the pro version
2. [Install Ubuntu from the Microsoft store](https://www.microsoft.com/p/ubuntu-2004-lts/9n6svws3rx71)
3. Open the Ubuntu CLI app
4. I recommend installing [Visual Studio Code](https://code.visualstudio.com/) with [WSL extensions](https://code.visualstudio.com/docs/remote/wsl) from Microsoft
5. Then you can use the code command to open VS Code from Ubuntu WSL eg. `code .`
6. For the best file system performance and proper inotify events clone the git repo code in side of Ubuntu
7. Install git in Ubuntu WSL
   `sudo apt-get install git`
8. [Install docker](https://docs.docker.com/engine/install/ubuntu/)
9. [Install docker compose](https://docs.docker.com/compose/install/)

10. [Install PHP](https://www.tecmint.com/install-different-php-versions-in-ubuntu/)

    ```bash
    sudo apt install php
    sudo apt install python-software-properties
    sudo add-apt-repository ppa:ondrej/php
    sudo apt install php8.0
    ```

11. [Switch PHP version](https://stackoverflow.com/questions/42619312/switch-php-versions-on-commandline-ubuntu-16-04/48336881#48336881)
    `sudo update-alternatives --config php`
12. [Install composer](https://getcomposer.org/download/)

    ```bash
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
    php composer-setup.php
    php -r "unlink('composer-setup.php');"
    ```

13. [Install PHP extension for PHP version](https://magento.stackexchange.com/questions/123246/magento-2-php-extensions-missing/134259#134259)
    `sudo apt-get install php8.0-gd php8.0-mcrypt php8.0-curl php8.0-intl php8.0-xsl php8.0-mbstring openssl php8.0-zip php8.0-soap`
14. Optionally [Install Composer Satis](https://alanstorm.com/magento_2_composer_marketplace_and_local_satis_mirrors/) for faster composer installs and easier auth with private packages

    ```bash
    git clone https://github.com/composer/satis
    php bin/satis
    php bin/satis build satis.json public -vvv
    ```

## References

- [Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/)
- [Visual Studio Code](https://code.visualstudio.com/docs/remote/wsl)
- [Switch php versions on commandline ubuntu 16.04](https://stackoverflow.com/a/48336881)
