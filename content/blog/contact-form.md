---
title: How to build an email contact form?
date: 2020-10-18T04:18:29.026Z
description: Need a simple way to allow your website visitors to get in contact with you?
image: ./blog/paperplane.jpg
# image credit: <span>Photo by <a href="https://unsplash.com/@ninjason?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jason Leung</a> on <a href="https://unsplash.com/s/photos/message?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---
## Introduction

I needed to set up a simple form to allow users to send messages to me via email. One of the most important reasons to have a contact form on your website is to reduce spam and keep your site secure. When you display your email address on your site, you will get unwanted emails.

## Choosing a email sender

I am trying to keep the cost and complexity low while providing a flexible and high quality experience. I considered 4 email sending solutions when creating my email contact form.

### Custom

The first option I considers was a roll your own custom serverless function running on [Cloudflare Workers](https://workers.cloudflare.com/) that sends emails through [Sendgrid](https://sendgrid.com/) or [Mailgun](https://www.mailgun.com/). This solutions has a lot of moving parts that all require setup and maintenance. I don't want to be updating dependencies or fiddling with APIs to get emails sent to me.

### EmailJS

[EmailJS](https://www.emailjs.com/) helps send emails using client side technology. No server required – connect EmailJS to one of the supported email services, create an email template, and use our JavaScript library to trigger an email. Setting up a from that submits to a third party API is great for reducing complexity and makes it a lot quicker and easier to setup. EmailJS would mean I don't have to set up a form capture server but I still need to setup a Transactional Mailer like Sendgrid or Mailgun. EmailJS is great for sending emails from the browser but if I ever want to send form data to another source like [Hubspot CRM](https://www.hubspot.com/) I wouldn't be able to and would have to find another service.

### Mail to link

Web browsers support a special link called a mailto which when clicked opens the users mail client eg. outlook or mac mail. This is a super simple way to provide an email contact form by submitting the form action as a mailto.

```html
<form action="mailto:example@example.com" method="get" enctype="text/plain">
  <label for="email">Your Email</label>
  <input name="Email" id="email" type="email">
  <button type="submit">Submit</button>
</form>
```

That’s cool and all, but Adam Silver and Amy Hupe [enumerated the problems](https://adamsilver.io/articles/the-trouble-with-mailto-email-links-and-what-to-do-instead/?ref=sidebar) with how these links behave:

> Mailto links make it hard to copy the address, for example if you want to share the email address with someone else. Some people use more than one email app, and the link uses whichever has been setup as the default, without giving them the option to use the other. Users that don’t have an email client set up get taken to a dead end or down a rabbit hole.

The hard part of the UX of all this is offering users choice on what they want these special link types to do. That’s what [mailgo](https://mailgo.dev/) is attempting to solve. It’s a little JavaScript library that offers UI when you click them. But at the moment it supports links and not forms so it wont do everything we want right now.

### Formspree

[Formspree](https://formspree.io/) is a form data capture service that is super simple to use in 5 lines of code you can have a simple newsletter sign up form setup.

```html
<form action="https://formspree.io/f/{form_id}" method="post">
  <label for="email">Your Email</label>
  <input name="Email" id="email" type="email">
  <button type="submit">Submit</button>
</form>
```

These awesome features that make this service worth using over rolling your own.

- **Spam blocked, data validated** using Akismet to filter spam, and verify your data server-side.
- **Email notifications and auto-responses sent** using fully customizable email templates.
- **Submissions save to the Formspree Inbox** were you can view submissions, see daily analytics reports, and export to csv or json.
- **3rd party integrations trigger** to get your data where it needs to be.

I chose Formspree for handing my email forms since it's a simple form submission API that doesn't require any complicated front end or backend code to setup. Formspree is free for 50 submissions per form per month. Getting more than 50 submissions each month? No problem, there is an upgrade path. For $10 USD per month you can get 1,000 form submissions.

With a couple clicks I was able to setup a new form and plug the id into my HTML form.

## Setting up the Form

Once the email sending was setup I decided to make my form a little better with some validation and a custom form submission handler.

I used [VeeValidate](https://logaretm.github.io/vee-validate/) to handle the input validation combined with some beautiful material design components from [Vuetify](https://vuetifyjs.com/en/components/forms/#vee-validate). I followed the [Formspree guide on using axios](https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX-) to submit the form.

I followed the [VeeValidate Codepen](https://codesandbox.io/s/pij6w?file=/src/components/inputs/VTextFieldWithValidation.vue:437-500) for refactoring Vuetify inputs. Here is the input component I created:

```vue\[components/base/TextField.vue]
<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-text-field
      outlined
      dense
      single-line
      v-bind="{ ...$attrs, rules: undefined }"
      :error-messages="errors"
      :success="valid"
      v-on="$listeners"
    >
      <slot slot="append-outer" name="append-outer" />
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
export default {
  name: 'BaseTextField',
  components: { ValidationProvider },
  props: {
    rules: {
      type: [Object, String],
      default: '',
    },
  },
};
</script>
```

Here is the final code for my email contact form:

```vue\[components/base/ContactForm.vue]
<template>
  <div>
    <validation-observer ref="obs" v-slot="{ handleSubmit }">
      <form
        method="POST"
        :action="action"
        novalidate
        @submit.prevent="handleSubmit(submit)"
      >
        <div class="hpot d-none" style="display: none">
          <label>Leave this field empty: <input name="_gotcha" /></label>
        </div>

        <base-text-field
          v-model="form.name"
          label="Name"
          name="name"
          rules="required|max:255"
        />

        <base-text-field
          v-model="form._replyto"
          label="Email"
          name="_replyto"
          rules="required|email"
        />

        <base-text-field
          v-model="form._subject"
          label="Subject"
          name="_subject"
          rules="required|max:255"
        />

        <base-textarea
          v-model="form.message"
          class="mb-6"
          label="Message"
          rules="required|max:255"
        />

        <v-btn
          color="primary"
          outlined
          type="submit"
        >
          Send message
        </v-btn>
      </form>
    </validation-observer>
    <v-snackbar v-model="error" top right fixed :timeout="-1" color="red">
      There was an issue submitting your message
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="error = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="success" bottom right fixed color="green">
      Thanks for getting in contact. We will contact you soon!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="success = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { ValidationObserver, extend } from 'vee-validate';
import { messages } from 'vee-validate/dist/locale/en.json';
import { required, email, max } from 'vee-validate/dist/rules';
const rules = { required, email, max };
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: messages[rule],
  });
}
export default {
  components: {
    ValidationObserver,
  },
  data: () => ({
    action: 'https://formspree.io/f/{form_id}',
    form: {
      name: null,
      _replyto: null,
      _subject: null,
      message: '',
    },
    submitting: null,
    error: null,
    success: null,
  }),
  methods: {
    async submit() {
      this.submitting = true;
      try {
        await this.$axios.$post(this.action, this.form);
        this.error = false;
        this.success = true;
        this.form = {};
        requestAnimationFrame(() => {
          this.$refs.obs.reset();
        });
      } catch (error) {
        this.error = true;
        this.$sentry.captureException(error);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
```

## Conclusion

Now you know how to setup a simple email contact form using Formspree, VeeValidate, Vuetify and Vue. You can check out the [full code](https://github.com/shadow81627/daim) for this site. If you have any questions you can contact me using my new email [contact form](https://daim.dev/contact).
