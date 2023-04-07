<template>
  <div itemscope itemtype="https://schema.org/Person">
    <!-- eslint-disable vuetify/no-deprecated-props -->
    <hero src="/img/resume-hero.png" gradient="">
      <Breadcrumb absolute dark></Breadcrumb>
      <div
        class="row fill-height text-right pa-md-5 pa-3 mx-0 align-end justify-end"
      >
        <h1>
          <div class="text-uppercase text-h4" itemprop="name">
            <span itemprop="givenName">{{ firstname }}</span>
            <span itemprop="familyName">{{ lastname }}</span>
          </div>
          <div class="text-uppercase text-h3" itemprop="jobTitle">
            {{ label }}
          </div>
        </h1>
      </div>
    </hero>

    <v-container style="max-width: 800px">
      <v-row>
        <v-col cols="auto">
          <v-img
            :lazy-src="$img(image, { quality: 1, width: 300, height: 300 })"
            :src="$img(image, { quality: 70, width: 300, height: 300 })"
            :srcset="_srcset(image, { width: 300, height: 300 }).srcset"
            :sizes="_srcset.size"
            :width="300"
            :height="300"
            itemprop="image"
          ></v-img>
        </v-col>
        <v-col>
          <section>
            <v-card id="about" flat>
              <v-card-subtitle
                class="text-subtitle-1 text-break pb-0 d-flex flex-wrap"
              >
                <mailgo v-if="email" :href="`mailto:${email}`"></mailgo>
                <mailgo v-if="phone" :href="`tel:${phone}`"></mailgo>
                <LocationButton
                  v-if="city || region || postcode || country"
                  v-bind="{ city, region, postcode, country, streetAddress }"
                ></LocationButton>
                <!-- <span style="display: none" itemprop="nationality"
                  >Australian</span
                > -->
                <!-- <span
                  style="display: none"
                  itemprop="gender"
                  itemtype="https://schema.org/Male"
                  >Male</span
                > -->
              </v-card-subtitle>

              <v-card-text class="text-body-1 text--primary">
                {{ summary }}
              </v-card-text>

              <v-card-actions class="social-icons flex-wrap">
                <v-tooltip
                  v-for="{ icon, network, url } in profiles"
                  :key="network"
                  location="bottom"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      target="_blank"
                      v-bind="attrs"
                      size="x-large"
                      icon
                      :href="url"
                      rel="noopener"
                      itemprop="sameAs"
                      v-on="on"
                    >
                      <BaseIcon
                        :icon="icon"
                        :title="network"
                        size="2x"
                        fixed-width
                      />
                      <span class="d-sr-only-focusable">{{ network }}</span>
                    </v-btn>
                  </template>
                  <span>{{ network }}</span>
                </v-tooltip>

                <!-- add hidden content to set height to prevent page jank -->
                <v-btn
                  style="visibility: hidden"
                  aria-hidden="true"
                  size="x-large"
                  icon
                >
                  <BaseIcon
                    icon="fa-solid:map-marker-alt"
                    style="width: 14px; height: 14px; margin-right: 0.3em"
                    color="black"
                  ></BaseIcon>
                  &nbsp;
                </v-btn>
              </v-card-actions>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <section v-if="skills && skills.length">
            <v-card id="skills" flat>
              <v-card-title class="pb-0 text-break">
                <h2>Professional Skills</h2>
              </v-card-title>

              <v-container>
                <v-row class="list-inline dev-icons" no-gutters>
                  <v-col
                    v-for="(column, index) in columns(skills)"
                    :key="index"
                    class="px-0"
                    cols="12"
                    sm="6"
                  >
                    <div v-for="{ icon, title } in column" :key="title">
                      <BaseIcon
                        :icon="icon"
                        style="width: 14px; height: 14px; margin-right: 0.3em"
                        color="black"
                      ></BaseIcon>
                      <span itemprop="knowsAbout">{{ title }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col>
          <section v-if="education && education.length">
            <v-card id="education" flat>
              <v-card-title class="pb-0 text-break">
                <h2>Education</h2>
              </v-card-title>
              <div
                v-for="{
                  institution,
                  area,
                  studyType,
                  startDate,
                  endDate,
                  gpa,
                  courses,
                } in education"
                :key="(institution, area, studyType)"
                itemtype="https://schema.org/CollegeOrUniversity"
                itemscope
                itemprop="alumniOf"
              >
                <v-card-title>
                  <h3 class="mb-0 text-break" itemprop="name">
                    {{ institution }}
                  </h3>
                </v-card-title>
                <v-card-subtitle
                  class="d-flex flex-column flex-md-row justify-space-between font-weight-medium text-body-1"
                  itemprop="hasCredential"
                  itemtype="https://schema.org/EducationalOccupationalCredential"
                >
                  <span itemprop="name">
                    <span itemprop="credentialCategory">{{ studyType }}</span>
                    of {{ area }}</span
                  >
                  <span class="resume-date text-md-right">
                    <time
                      class="text-primary"
                      itemprop="startDate"
                      :datetime="formatDate(startDate)"
                      >{{ formatDate(startDate) }}</time
                    >
                    -
                    <time
                      class="text-primary"
                      itemprop="endDate"
                      :datetime="formatDate(endDate)"
                      >{{ formatDate(endDate) }}</time
                    >
                  </span>
                </v-card-subtitle>
                <v-card-text class="text-body-1 text--primary">
                  Grade Point Average: <strong>{{ gpa }}</strong>
                </v-card-text>
                <v-card-title class="py-0">Key Courses</v-card-title>
                <v-card-text class="text-body-1 text--primary">
                  <ul itemprop="abstract">
                    <li v-for="course in courses" :key="course">
                      {{ course }}
                    </li>
                  </ul>
                </v-card-text>
              </div>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col>
          <section v-if="work && work.length">
            <v-card id="experience" flat>
              <v-card-title class="pb-0 text-break">
                <h2>Experience</h2>
              </v-card-title>

              <div
                v-for="{
                  position,
                  company,
                  startDate,
                  endDate,
                  summary: workSummary,
                  tools,
                } in work"
                :key="(position, company, startDate, endDate)"
                class="resume-item d-flex flex-column flex-md-row justify-space-between"
                itemprop="hasOccupation"
                itemtype="https://schema.org/EmployeeRole"
                itemscope
              >
                <div class="resume-content" style="width: 100%">
                  <v-card-title>
                    <h3 class="mb-0 text-break" itemprop="roleName">
                      {{ position }}
                    </h3>
                  </v-card-title>
                  <v-card-subtitle
                    class="d-flex flex-column flex-md-row justify-space-between font-weight-medium text-body-1"
                  >
                    <span itemtype="https://schema.org/Organization" itemscope
                      ><span itemprop="name">{{ company }}</span></span
                    >
                    <span class="resume-date text-md-right">
                      <time
                        class="text-primary"
                        itemprop="startDate"
                        :datetime="formatDate(startDate)"
                        >{{ formatDate(startDate) }}</time
                      >
                      <span> - </span>
                      <time
                        v-if="endDate"
                        :datetime="formatDate(endDate)"
                        itemprop="endDate"
                        >{{ formatDate(endDate) }}</time
                      >
                      <span v-else>Present</span>
                    </span>
                  </v-card-subtitle>
                  <v-card-text class="text-body-1">
                    <p itemprop="description">{{ workSummary }}</p>
                    Tools used: <span>{{ tools }}</span>
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card v-if="$route.params.slug === 'damien-robinson'" flat>
        <v-card-title class="text-break pb-0">
          <h2>Projects</h2>
        </v-card-title>
        <v-card-text class="text-body-1 text--primary">
          I enjoy making my own web applications in my free time to further my
          skills. I have built several websites, including my
          <nuxt-link to="/portfolio">personal portfolio</nuxt-link>, using a
          wide variety of tools to achieve this. These tools include: Nuxt.js,
          Vue.js, Github, Bootstrap CSS, Vuetify CSS, Semantic Release
          automation, Sentry error tracking, Vercel, Lighthouse CI, Renovate
          automated dependency management.
        </v-card-text>
      </v-card>

      <!-- <v-card
      id="interests"
      class="resume-section p-3 p-lg-5 d-flex align-items-center"
      flat
    >
      <div class="w-100">
        <v-card-title>
          <h2 class="mb-5">Interests</h2>
        </v-card-title>

        <p>
          Apart from being a web developer, I enjoy most of my time being
          outdoors. In the winter, I am an avid skier and novice ice climber.
          During the warmer months here in Colorado, I enjoy mountain biking,
          free climbing, and kayaking.
        </p>
        <p class="mb-0">
          When forced indoors, I follow a number of sci-fi and fantasy genre
          movies and television shows, I am an aspiring chef, and I spend a
          large amount of my free time exploring the latest technology
          advancements in the front-end web development world.
        </p>
      </div>
    </v-card> -->

      <!-- <hr class="m-0" />

      <section
        id="awards"
        class="resume-section p-3 p-lg-5 d-flex align-items-center"
      >
        <div class="w-100">
          <h2 class="mb-5">Awards &amp; Certifications</h2>
          <ul class="fa-ul mb-0">
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              Google Analytics Certified Developer
            </li>
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              Mobile Web Specialist - Google Certification
            </li>
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              1<sup>st</sup> Place - University of Colorado Boulder - Emerging
              Tech Competition 2009
            </li>
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              1<sup>st</sup> Place - University of Colorado Boulder - Adobe
              Creative Jam 2008 (UI Design Category)
            </li>
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              2<sup>nd</sup> Place - University of Colorado Boulder - Emerging
              Tech Competition 2008
            </li>
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              1<sup>st</sup> Place - James Buchanan High School - Hackathon 2006
            </li>
            <li>
              <i class="fa-li fa fa-trophy text-warning"></i>
              3<sup>rd</sup> Place - James Buchanan High School - Hackathon 2005
            </li>
          </ul>
        </div>
      </section> -->
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { registerLocale, getName } from 'i18n-iso-countries';
import englishCountries from 'i18n-iso-countries/langs/en.json';
import Mailgo from '@/components/mailgo.vue';
import ImageSources from '@/mixins/srcset';
import Hero from '~/components/hero';

registerLocale(englishCountries);

export default {
  components: {
    Mailgo,
    Hero,
  },
  mixins: [ImageSources],
  async setup() {
    const route = useRoute();
    const slug = route.params.slug;
    const {
      basics: {
        profiles,
        firstname,
        lastname,
        label,
        email,
        phone,
        location: {
          city,
          region,
          countryCode,
          postalcode: postcode,
          streetAddress,
        },
        summary,
      },
      work,
      education,
      skills,
      attributes,
    } = await queryContent('team', slug).findOne();

    const locale = 'en';
    const country = getName(countryCode, locale);
    return {
      image: `/img/team/${slug}.png`,
      profiles,
      firstname,
      lastname,
      email,
      phone,
      label,
      country,
      region,
      city,
      streetAddress,
      postcode,
      summary,
      work,
      education,
      skills,
      attributes,
    };
  },
  head() {
    return {
      title: 'Resume',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.summary,
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM YYYY');
    },
    columns(items, cols = 2) {
      const columns = [];
      if (items && Array.isArray(items) && items.length) {
        const mid = Math.ceil(items.length / cols);
        for (let col = 0; col < cols; col++) {
          columns.push(items.slice(col * mid, col * mid + mid));
        }
      }
      return columns;
    },
  },
};
</script>
