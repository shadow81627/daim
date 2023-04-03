<template>
  <div class="flex items-center justify-center h-screen">
    <!-- <VitePwaManifest /> -->
    <NuxtLoadingIndicator />
    <v-card id="message" max-width="360" class="text-left">
      <v-card-subtitle class="text--primary pb-0">
        <h2
          class="font-weight-bold text-subtitle-1"
          style="letter-spacing: 3px"
        >
          {{ error.statusCode }}
        </h2>
      </v-card-subtitle>
      <v-card-title class="pt-0">
        <h1 class="text-h5 font-weight-light" style="letter-spacing: 3px">
          {{ title }}
        </h1>
      </v-card-title>

      <v-card-text
        v-if="error.statusMessage !== error.message || error.statusCode === 404"
        class="text--primary font-weight-light"
        style="line-height: 140%; letter-spacing: 1px"
      >
        {{ description }}
      </v-card-text>
      <v-card-text>
        <v-row v-if="error.statusCode !== 404" no-gutters>
          <v-col>
            <v-btn color="primary" block size="x-large" @click="clearError()"
              >Try again</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              block
              size="x-large"
              @click="clearError({ redirect: '/' })"
            >
              Home
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
});

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});
const { t } = useI18n({
  useScope: 'local',
});
const title =
  props.error.statusCode === 404
    ? t('error.404.heading')
    : props.error.statusMessage;
const description =
  props.error.statusCode === 404
    ? t('error.404.description')
    : props.error.statusMessage !== props.error.message
    ? props.error.message
    : undefined;
useHead({
  title,
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link ?? [])],
  meta: [
    ...(i18nHead.value.meta ?? []),
    {
      hid: 'description',
      name: 'description',
      content: description,
    },
  ],
});
</script>
