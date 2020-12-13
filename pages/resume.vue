<template>
  <div>
    <hero src="./resume-hero.png" gradient="">
      <div
        class="row fill-height text-right pa-md-5 pa-3 mx-0 align-end justify-end"
      >
        <h1>
          <div class="text-uppercase display-1">
            {{ firstname }} {{ lastname }}
          </div>
          <div class="text-uppercase display-2">{{ label }}</div>
        </h1>
      </div>
    </hero>

    <v-container>
      <v-row>
        <v-col>
          <section>
            <v-card id="about" flat>
              <v-card-subtitle class="text-subtitle-1 text-break pb-0">
                <mailgo
                  v-if="email"
                  :href="`mailto:${email}`"
                  :icon="faEnvelope"
                  class="pl-0"
                >
                  <span>{{ email }}</span>
                </mailgo>
                <mailgo
                  v-if="phone"
                  :href="`tel:${phone}`"
                  :icon="faPhone"
                  class="pl-0"
                >
                  <span>{{ phone }}</span>
                </mailgo>
                <v-btn
                  target="_blank"
                  large
                  text
                  :href="`https://www.google.com.au/maps/search/?api=1&query=${encodeURIComponent(
                    `${city || ''} ${region || ''} ${postcode || ''} ${
                      country || ''
                    }`,
                  )}`"
                  class="pl-0"
                  rel="noreferrer"
                >
                  <font-awesome-icon
                    :icon="faMapMarker"
                    title="location"
                    fixed-width
                    pull="left"
                  />
                  <span>{{ city || region }}</span>
                  <span>{{ country ? ',' : '' }}&nbsp;</span>
                  <span>{{ country }}</span>
                </v-btn>
              </v-card-subtitle>

              <v-card-text class="body-1 text--primary">
                {{ summary }}
              </v-card-text>

              <v-card-actions class="social-icons">
                <v-tooltip
                  v-for="{ icon, network, url } in profiles"
                  :key="network"
                  bottom
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      target="_blank"
                      v-bind="attrs"
                      x-large
                      icon
                      class="pl-0"
                      :href="url"
                      rel="noopener"
                      v-on="on"
                    >
                      <font-awesome-icon
                        :icon="icons[icon]"
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
                  x-large
                  icon
                >
                  <font-awesome-icon
                    :icon="faMapMarker"
                    size="2x"
                    fixed-width
                  />
                  &nbsp;
                </v-btn>
              </v-card-actions>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-divider />

      <v-row>
        <v-col>
          <section>
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
                    <div v-for="{ icon, text } in column" :key="text">
                      <font-awesome-icon :icon="icons[icon]" fixed-width />
                      <span>{{ text }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card flat>
        <v-card-title class="text-break pb-0">
          <h2>Personal Attributes</h2>
        </v-card-title>
        <div v-for="{ title, description, icon } in attributes" :key="title">
          <v-card-title class="pb-0">
            <h3>
              <font-awesome-icon
                :icon="icons[icon]"
                fixed-width
              ></font-awesome-icon>
              {{ title }}
            </h3>
          </v-card-title>
          <v-card-text class="body-1">
            {{ description }}
          </v-card-text>
        </div>
      </v-card>

      <v-divider></v-divider>

      <v-row>
        <v-col>
          <section>
            <v-card id="education" flat>
              <v-card-title class="py-0 text-break">
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
              >
                <v-card-title>
                  <h3 class="mb-0 text-break">{{ institution }}</h3>
                </v-card-title>
                <v-card-subtitle
                  class="d-flex flex-column flex-md-row justify-space-between font-weight-medium body-1"
                >
                  <span>{{ studyType }} of {{ area }}</span>
                  <span class="resume-date text-md-right">
                    <time
                      class="text-primary"
                      :datetime="formatDate(startDate)"
                      >{{ formatDate(startDate) }}</time
                    >
                    -
                    <time
                      class="text-primary"
                      :datetime="formatDate(endDate)"
                      >{{ formatDate(endDate) }}</time
                    >
                  </span>
                </v-card-subtitle>
                <v-card-text class="body-1 text--primary">
                  Grade Point Average: <strong>{{ gpa }}</strong>
                </v-card-text>
                <v-card-title class="py-0">Key Courses</v-card-title>
                <v-card-text class="body-1 text--primary">
                  <ul>
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
          <section>
            <v-card id="experience" flat>
              <v-card-title class="py-0 text-break">
                <h2>Experience</h2>
              </v-card-title>

              <div
                v-for="{
                  position,
                  company,
                  startDate,
                  endDate,
                  summary,
                  tools,
                } in work"
                :key="(position, company, startDate, endDate)"
                class="resume-item d-flex flex-column flex-md-row justify-space-between"
              >
                <div class="resume-content">
                  <v-card-title>
                    <h3 class="mb-0 text-break">{{ position }}</h3>
                  </v-card-title>
                  <v-card-subtitle
                    class="d-flex flex-column flex-md-row justify-space-between font-weight-medium body-1"
                  >
                    {{ company }}
                    <span class="resume-date text-md-right">
                      <time
                        class="text-primary"
                        :datetime="formatDate(startDate)"
                        >{{ formatDate(startDate) }}</time
                      >
                      <span>-</span>
                      <time v-if="endDate" :datetime="formatDate(endDate)">{{
                        formatDate(endDate)
                      }}</time>
                      <span v-else>Present</span>
                    </span>
                  </v-card-subtitle>
                  <v-card-text class="body-1">
                    <p>{{ summary }}</p>
                    Tools used: {{ tools }}
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </section>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-card flat>
        <v-card-title class="text-break">
          <h2>Personal Projects</h2>
        </v-card-title>
        <v-card-text class="body-1 text--primary">
          I enjoy making my own web applications in my free time to further my
          skills. I have built several websites, including my
          <nuxt-link to="/portfolio">personal portfolio</nuxt-link>, using a
          wide variety of tools to achieve this. These tools include: Nuxt.js,
          Vue.js, Travis CI, Bootstrap CSS, Vuetify CSS, Semantic Release
          automation, Sentry error tracking, Firebase, Lighthouse CI, Renovate
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
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faMapMarker,
  faDatabase,
  faSearch,
  faMobileAlt,
  faBug,
  faUsers,
  faSync,
  faClock,
  faPuzzlePiece,
  faTasks,
  faPaperPlane,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
  faFacebook,
  faLaravel,
  faHtml5,
  faBootstrap,
  faJsSquare,
  faVuejs,
  faAngular,
  faDocker,
  faJira,
  faNodeJs,
  faNpm,
  faPython,
  faGitAlt,
  faSass,
  faJenkins,
} from '@fortawesome/free-brands-svg-icons';
import Mailgo from '@/components/mailgo.vue';
import * as dayjs from 'dayjs';
import countries from 'i18n-iso-countries';
import englishCountries from 'i18n-iso-countries/langs/en.json';
import Hero from '~/components/hero';

countries.registerLocale(englishCountries);

export default {
  components: {
    Mailgo,
    Hero,
  },
  async asyncData({ $content }) {
    const {
      basics: {
        profiles,
        firstname,
        lastname,
        label,
        email,
        phone,
        location: { city, region, countryCode, postalcode: postcode },
        summary,
      },
      work,
      education,
      skills,
      attributes,
    } = await $content('resume').fetch();

    const locale = 'en';
    const country = countries.getName(countryCode, locale);
    return {
      profiles,
      firstname,
      lastname,
      email,
      phone,
      label,
      country,
      region,
      city,
      postcode,
      summary,
      work,
      education,
      skills,
      attributes,
    };
  },
  data: () => ({
    icons: {
      faGithub,
      faLinkedin,
      faTwitter,
      faYoutube,
      faFacebook,
      faLaravel,
      faHtml5,
      faBootstrap,
      faJsSquare,
      faVuejs,
      faAngular,
      faDocker,
      faJira,
      faNodeJs,
      faNpm,
      faPython,
      faGitAlt,
      faSass,
      faJenkins,
      faDatabase,
      faSearch,
      faMobileAlt,
      faBug,
      faUsers,
      faSync,
      faClock,
      faPuzzlePiece,
      faTasks,
      faPaperPlane,
    },
    faEnvelope,
    faPhone,
    faMapMarker,
  }),
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
