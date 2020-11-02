---
title: How to build a static site blog?
date: 2020-09-22T08:09:37.548Z
description: Have you ever tried to set up a personal blog?

---

## Introduction

Have you ever tried to set up a personal blog? If so, you'll know that it's difficult because there are hundreds of blogging platforms and tools to choose from. What do you do? People have found success by using Wordpress. Here is what you need to know before you buy and setup a your personal blog to ensure good SEO and an easy content management experience. This post will tell you what you need to know to make sure you build the best personal blog that will let you share your great ideas with the internet.

## Features

If you're looking to build a static site blog, the best method to ensure you end up with something that lets you express yourself is by looking for these features:

Make sure your blogging platform has the flexibility to style content your way. If it doesn't, you'll have trouble making content look the way you like. [Nuxt Content Module](https://content.nuxtjs.org/) allows the use of Vue components inside of markdown files. This is a super powerful feature for injecting rich content like maps and other fancy visuals.

Ensure your blog has an image manager so you can upload hero images to use as the og:image. I use [Cloudinary](https://cloudinary.com/) to dynamically resize and optimize images so they load super fast. Serving optimized images in formats like webp makes web pages load a lot faster. A good hero image is critical for making blog posts look interesting when shared on social media.

Any good content manager should let you use markdown. This is important because you need to be able to insert links and other rich content styling like bold and italic text without having to use a wysiwyg editor. I use [Netlify CMS](https://www.netlifycms.org/) to edit my blog posts since it's free, open source, and self hosted.

While not necessary, some great bonus features of a great static site blog are free hosting, open source, and performance. I host my personal site on [Vercel](https://vercel.com/) since the free tier is super generous compared to [Netlify](https://www.netlify.com/). I am able to run all the builds I need for rapid prototyping, unlimited bandwidth, the builds are fast with caching, and the CDN is super fast serving content in under 50ms.

## Getting Started

---

If you haven't used Nuxt before you can go read my [Nuxt](/blog/nuxt#getting-started) Post about how to get started.

Install npm packages:

```bash
npm i @nuxt/content prism-themes dayjs @mdi/js
npm i @nuxtjs/vuetify @aceforth/nuxt-optimized-images --save-dev
```

Add `@nuxt/content` to the `modules` and `@nuxtjs/vuetify` to `buildModules` list in `nuxt.config.js`:

```js\[nuxt.config.js]
  modules: [
    "@nuxt/content",
  ],

  buildModules: [
    "@nuxtjs/vuetify",
  ],

  content: {
    markdown: {
      // `prism-themes` for language syntax highlighting
      prism: {
        theme: 'prism-themes/themes/prism-vsc-dark-plus.css',
      },
    },
  },
```

## Project Structure

---

Create a folder with name `content` inside the project folder if not created by `@nuxt/content`. Then create a sub-folder with name `blog` inside the folder `content`. `content/blog` is the folder where we write all our blog posts in markdown files.

Similarly, create a sub-folder `blog` inside `pages` folder for a new page route `/blog`. Create `_slug.vue` and `index.vue` inside `pages/blog` folder.

Now the project folder structure will look something like this:

```txt
├── content
│   └── blog
│       ├── blog-1.md
│       └── blog-2.md
├── pages
│   └── blog
│       ├── _slug.vue
│       └── index.vue
```

## Blog Post List Page

Here, we will list down all the blog posts we create under `content/blog` folder. Displaying Title, Description and hero image for each blog post with Vuetify card components.

- Blog Post Image
- Blog Post Title
- Blog Post Description
- Blog Post created time formatted with [dayjs](https://day.js.org/)
- Time for reading blog post

```vue\[pages/blog/index.vue]
<template>
  <div>
    <BlogHero :title="heading"></BlogHero>
    <v-container fluid style="max-width: 1785px">
      <v-row>
        <v-col
          v-for="{ slug, title, description, date, body, image } of items"
          :key="slug"
          class="d-flex flex-column"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            :to="`/blog/${encodeURIComponent(slug)}`"
            class="flex d-flex flex-column justify-between"
          >
            <v-img :src="image" :aspect-ratio="16 / 9"
            ></v-img>
            <v-card-title class="text-break text-wrap">
              <h2>{{ title }}</h2>
            </v-card-title>
            <v-card-subtitle class="body-1">
              <time :datetime="date">{{ formatDate(date) }}</time
              ><span> • </span
              ><time :datetime="`${readTime(JSON.stringify(body))}m`"
                >{{ readTime(JSON.stringify(body)) }} min read</time
              >
            </v-card-subtitle>
            <v-card-text class="body-1 align-self-end">
              {{ description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
export default {
  async asyncData({ $content }) {
    const items = await $content('blog').sortBy('date', 'desc').fetch();
    return {
      items,
    };
  },
  data() {
    return { heading: "Damien Robinson's Blog", total: 0, items: [] };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
    readTime(content = '', wordsPerMinute = 50) {
      const words = content.split(' ').length;
      return Math.ceil(words / wordsPerMinute);
    },
  },
  head() {
    return {
      title: this.heading,
    };
  },
};
</script>
```

The average reader can read 200 words per minute, for technical material the average reading rate is approx 50 to 75 words a minute. Since this is a tech blog we will go with 50 words per minute, using this number we can create compute the number of minutes it takes to read an article.[^1][] You can find the `BlogHero` component on [Github](https://github.com/shadow81627/daim/blob/master/components/sections/BlogHero.vue), it uses `@aceforth/nuxt-optimized-images` package to create source set and low quality placeholders.

## Blog Post Page

The following code dynamically renders each blog post markdown file. We will fetch the content and format the front-matter of the blog post using the blog post slug from the route.

```vue\[pages/blog/\_slug.vue]
<template>
  <div>
    <BlogHero
      :title="item.title"
      :summary="item.description"
      :src="item.image"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <div class="body-1">
            <nuxt-content :document="item" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-column justify-center">
          <span class="font-italic"
            >Published
            <time :datetime="item.date">{{ formatDate(item.date) }}</time></span
          >
        </v-col>
        <v-col sm="auto" cols="12">
          <v-btn
            icon
            color="#757575"
            target="_blank"
            rel="noopener"
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              item.title,
            )}%0A%0A${encodeURIComponent(
              item.description,
            )}&url=https://daim.dev${$route.path}`"
          >
            <v-icon>{{ mdiTwitter }}</v-icon>
          </v-btn>
          <v-btn
            icon
            color="#757575"
            target="_blank"
            rel="noopener"
            :href="`https://www.linkedin.com/shareArticle/?mini=true&url=https://daim.dev${$route.path}`"
          >
            <v-icon>{{ mdiLinkedin }}</v-icon>
          </v-btn>
          <v-btn
            icon
            color="#757575"
            target="_blank"
            rel="noopener"
            :href="`https://www.facebook.com/sharer/sharer.php?u=https://daim.dev${$route.path}&display=page`"
          >
            <v-icon>{{ mdiFacebook }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
import { mdiFacebook, mdiTwitter, mdiLinkedin } from '@mdi/js';
import BlogHero from '~/components/sections/BlogHero';
export default {
  components: { BlogHero },
  async asyncData({ $content, route, error }) {
    try {
      const item = await $content('blog', route.params.slug).fetch();
      return { item, ...item };
    } catch {
      error({ statusCode: 404 });
    }
  },
  data: () => ({
    item: {},
    mdiFacebook,
    mdiTwitter,
    mdiLinkedin,
  }),
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
  head() {
    return {
      title: this.item.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.item.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.item.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.item.description,
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
      ],
    };
  },
};
</script>
```

## Writing Blog Posts

Write the blog details in front-matter and everything else in markdown. You can even mix html along with markdown. Follow the [rules](https://content.nuxtjs.org/writing#html) and you wont have any trouble. If are want to have the option of using a rich text editor then adding [Netlify CMS](https://www.netlifycms.org/) is a good place to start.

## Conclusion

Now that you know how to build a static site blog with Nuxt, you're ready to share your awesome content with the internet without worrying about hosting and maintaining a Wordpress server. I built this website with Nuxt JS, the blog pages use nuxt content and Vuetify components for styling. You can find the full source code on [Github](https://github.com/shadow81627/daim).

Thanks to [Pramod Devireddy](https://domarpdev.github.io/blog/create-medium-style-blog-theme/) for inspiring this blog post.

[^1]: https://secure.execuread.com/facts

<!-- ## Sources

[The Foolproof Formula for Writing a Solid Blog Post Template](https://blog.hubspot.com/blog/tabid/6307/bid/33295/the-foolproof-formula-for-writing-a-solid-blog-post-template.aspx) -->
