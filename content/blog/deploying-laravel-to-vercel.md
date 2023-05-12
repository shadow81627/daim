---
draft: true
name: Deploying Laravel to Vercel
date: 2023-05-13T08:35:00.000Z
description: How to set up and deploy our Laravel application on a serverless environment called Vercel, including automated deployments and previews with out any cost.
image: https://calebporzio.com/post_images/213149115.png
attributions:
  - type: inspiration
    by: 
      text: Caleb Porzio
      url: https://calebporzio.com/easy-free-serverless-laravel-with-vercel
---

## Configuration for Vercel

### api/index.php

```php [api/index.php]
<?php
require __DIR__ . '/../public/index.php';
```

Vercel only allows an app’s entry-point to live inside the API directory, so we have to set up a simple script to forward to Laravel’s normal `public/index.php` entry-point.

### .vercelignore

```txt [.vercelignore]
/vendor
```

This will make sure we don’t upload the entirety of our vendor directory to Vercel when we deploy (We’ll set up Vercel to automatically install composer dependencies).

### vercel.json

```json [vercel.json]
{
    "version": 2,
    "framework": null,
    "functions": {
        "api/index.php": { "runtime": "vercel-php@0.6.0" }
    },
    "routes": [{
        "src": "/(.*)",
        "dest": "/api/index.php"
    }],
    "env": {
        "APP_ENV": "production",

        "APP_CONFIG_CACHE": "/tmp/config.php",
        "APP_EVENTS_CACHE": "/tmp/events.php",
        "APP_PACKAGES_CACHE": "/tmp/packages.php",
        "APP_ROUTES_CACHE": "/tmp/routes.php",
        "APP_SERVICES_CACHE": "/tmp/services.php",
        "VIEW_COMPILED_PATH": "/tmp",

        "CACHE_DRIVER": "array",
        "LOG_CHANNEL": "stderr",
        "SESSION_DRIVER": "cookie"
    }
}
```


## Sources

- [Caleb Porzio | Easy, Free, Serverless Laravel With Vercel](https://calebporzio.com/easy-free-serverless-laravel-with-vercel)
- [Kenean | Free Serverless Laravel Deployment](https://dev.to/kenean50/free-serverless-laravel-deployment-1e9n)
