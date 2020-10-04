---
title: What is Nuxt?
date: 2020-09-28T01:40:37.548Z
description: The open source framework making web development simple and powerful. Build your next Vue.js application with confidence using NuxtJS.
image: './blog/nuxt.png'
---

## Features

[Nuxt](https://nuxtjs.org/)  is an open source meta front end framework for Vue js. It makes web development simple and powerful.

- Pre-rendered pages
- Great project structure
- Configless page routing
- Lots of useful modules
- Good documentation
- Growing Community

### Static Site Generation

Static Site Generation is a very hot topic right now (aka [JAMStack](https://jamstack.org/)). Instead of switching to another framework and spending time to get used to it, why not kill two birds with one stone?

Nuxt.js supports generating a static website based on your Vue application. It is the "best of both worlds" as you don't need a server but still have SEO benefits because Nuxt will pre-render all pages and include the necessary HTML. Also, you can deploy the resulting page easily to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).

### Perfomance

Applications are optimized out of the box. We do our best to build performant applications by utilizing Vue.js and Node.js best practices. Squeezing every unnecessary bit out of your app Nuxt includes a bundle analyzer and lots of opportunities to fine-tune your app.

### Modular

You can choose from more than [50 awesome modules](https://github.com/nuxt-community/awesome-nuxt) to make your development faster and easier. You don't have to reinvent the wheel to get [PWA](https://pwa.nuxtjs.org/) benefits, add [Google Analytics](https://github.com/nuxt-community/analytics-module) to your page or generate a [sitemap](https://www.npmjs.com/package/@nuxtjs/sitemap).

### Developer Experience

We love Nuxt.js and continuously improve the framework so you love it too! Appealing solutions, descriptive error messages, powerful defaults and detailed [documentation](https://nuxtjs.org/guide). If questions or problems come up, our helpful community will help you out.

## Getting Started

---

Following the Nuxt [installation guide](https://nuxtjs.org/guide/installation):

To get started quickly, the Nuxt.js team has created scaffolding tool create-nuxt-app. Make sure you have npx installed (npx is shipped by default since NPM 5.2.0)

```bash
npx create-nuxt-app <project-name>
```

It will ask you some questions (name, Nuxt options, UI framework (Vuetify), TypeScript, linter (Eslint, Prettier), testing framework, modules(nuxt content), etc.), when answered, it will install all the dependencies so the next step is to navigate to the project folder and launch it with:

```bash
cd <project-name>
npm run dev
```

The application is now running on <http://localhost:3000>.

## Summary

Now you know what makes Nuxt so awesome and how to get started. You can check out my other post [Build a Static Site Blog with Nuxt](/blog/build-a-static-site-blog).
