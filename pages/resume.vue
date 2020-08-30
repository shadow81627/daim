<template>
  <v-container>
    <v-row>
      <v-col>
        <section>
          <v-card id="about" flat>
            <v-card-title>
              <h1 class="text-break">
                {{ firstname }}
                <span class="text--primary">{{ lastname }}</span>
              </h1>
            </v-card-title>

            <v-card-subtitle class="text-subtitle-1 text-break pb-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    target="_blank"
                    v-bind="attrs"
                    large
                    text
                    href="mailto:damien.robinson@daim.dev"
                    rel="noopener"
                    class="pl-0"
                    v-on="on"
                  >
                    <font-awesome-icon
                      :icon="faEnvelope"
                      title="email"
                      fixed-width
                      pull="left"
                    />
                    <span>damien.robinson@daim.dev</span>
                  </v-btn>
                </template>
                <span>Reach out and email me now</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    target="_blank"
                    v-bind="attrs"
                    large
                    text
                    href="https://www.google.com.au/maps/search/?api=1&query=New Farm, Australia"
                    class="pl-0"
                    rel="noreferrer"
                    v-on="on"
                  >
                    <font-awesome-icon
                      :icon="faMapMarker"
                      title="location"
                      fixed-width
                      pull="left"
                    />
                    <span>New Farm, Australia</span>
                  </v-btn>
                </template>
                <span>Check out the map</span>
              </v-tooltip>
            </v-card-subtitle>

            <v-card-text class="body-1 text--primary">
              I am a full-stack web developer with 3 years experience, seeking
              full time employment and a chance to further my skills in front
              end web development for marketing websites. I have well-rounded
              full-stack development experience, with a proficiency in Vue.js
              static marketing websites.
            </v-card-text>

            <v-card-actions class="social-icons">
              <v-tooltip
                v-for="{ icon, text, url } in socials"
                :key="text"
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
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
                      :icon="icon"
                      :title="text"
                      size="2x"
                      fixed-width
                    />
                    <span class="d-sr-only-focusable">{{ text }}</span>
                  </v-btn>
                </template>
                <span>{{ text }}</span>
              </v-tooltip>
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
                >
                  <div v-for="{ icon, text } in column" :key="text">
                    <font-awesome-icon :icon="icon" fixed-width />
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
            <font-awesome-icon :icon="icon" fixed-width></font-awesome-icon>
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
            <v-card-title>
              <h3 class="mb-0 text-break">Griffith University</h3>
            </v-card-title>
            <v-card-subtitle
              class="d-flex flex-column flex-md-row justify-space-between font-weight-medium body-1"
            >
              Bachelor of Applied Information Technology
              <span class="resume-date text-md-right">
                <span class="text-primary">March, 2015 - November, 2017</span>
              </span>
            </v-card-subtitle>
            <v-card-text class="body-1 text--primary">
              Grade Point Average: <strong>5.1</strong> (Scale: 1-7, with 7 the
              highest)
            </v-card-text>
            <v-card-title class="py-0"> Key Courses </v-card-title>
            <v-card-text class="body-1 text--primary">
              <ul>
                <li>Dynamic Multimedia Systems</li>
                <li>Database Systems Administration</li>
                <li>Programming Mobile Applications</li>
                <li>Network Security</li>
              </ul>
            </v-card-text>
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
                title,
                company,
                startDate,
                endDate,
                description,
                tools,
              } in roles"
              :key="(title, company, startDate, endDate)"
              class="resume-item d-flex flex-column flex-md-row justify-space-between"
            >
              <div class="resume-content">
                <v-card-title>
                  <h3 class="mb-0 text-break">{{ title }}</h3>
                </v-card-title>
                <v-card-subtitle
                  class="d-flex flex-column flex-md-row justify-space-between font-weight-medium body-1"
                >
                  {{ company }}
                  <span class="resume-date text-md-right">
                    <span class="text-primary"
                      >{{ startDate }} - {{ endDate }}</span
                    >
                  </span>
                </v-card-subtitle>
                <v-card-text class="body-1">
                  <p>{{ description }}</p>
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
        skills. I have built several websites, including my personal portfolio
        daim.dev, using a wide variety of tools to achieve this. These tools
        include: Nuxt.js, Vue.js, Storyblok CMS, Travis CI, Bootstrap CSS,
        Vuetify CSS, Semantic Release automation, Sentry error tracking,
        Firebase, Lighthouse CI, Renovate automated dependency management. I am
        happy to provide more information on these projects on request.
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

export default {
  data: () => ({
    faEnvelope,
    faMapMarker,
    firstname: 'Damien',
    lastname: 'Robinson',
    socials: [
      {
        icon: faGithub,
        url: 'https://github.com/shadow81627',
        text: 'Github',
      },
      {
        icon: faLinkedin,
        url: 'https://www.linkedin.com/in/damien-robinson-788925101',
        text: 'LinkedIn',
      },
      {
        icon: faTwitter,
        url: 'https://twitter.com/Shadow81627',
        text: 'Twitter',
      },
      {
        icon: faYoutube,
        url: 'https://www.youtube.com/user/shadow81627',
        text: 'Youtube',
      },
      {
        icon: faFacebook,
        url: 'https://www.facebook.com/damien.robinson.5036',
        text: 'Facebook',
      },
    ],
    skills: [
      {
        icon: faLaravel,
        text: 'PHP APIs (Laravel)',
      },
      {
        icon: faHtml5,
        text: 'Semantic HTML',
      },
      {
        icon: faBootstrap,
        text: 'Bootstrap CSS',
      },
      {
        icon: faJsSquare,
        text: 'JavaScript',
      },
      {
        icon: faVuejs,
        text: 'Vue',
      },
      {
        icon: faAngular,
        text: 'Angular',
      },
      {
        icon: faDatabase,
        text: 'Structured Query Language (MySQL)',
      },
      {
        icon: faDocker,
        text: 'Docker',
      },
      {
        icon: faSearch,
        text: 'Search Engine Optimisation (SEO)',
      },
      {
        icon: faJira,
        text: 'JIRA',
      },
      {
        icon: faNodeJs,
        text: 'Node',
      },
      {
        icon: faNpm,
        text: 'Node Package Manager',
      },
      {
        icon: faPython,
        text: 'Python (Flask)',
      },
      {
        icon: faGitAlt,
        text: 'Git (Bitbucket & Github)',
      },
      {
        icon: faSass,
        text: 'Sass',
      },
      {
        icon: faJenkins,
        text: 'Continuous Integration (Jenkins & Travis)',
      },
      {
        icon: faMobileAlt,
        text: 'Mobile-First, Responsive Design',
      },
      {
        icon: faBug,
        text: 'Cross Browser Testing & Debugging',
      },
      {
        icon: faUsers,
        text: 'Cross Functional Teams',
      },
      {
        icon: faSync,
        text: 'Agile Development & Scrum',
      },
    ],
    roles: [
      {
        title: 'Frontend Developer',
        company: 'Otherlevels',
        location: 'Brisbane, Queensland, Australia',
        startDate: 'January 2020',
        endDate: 'Present',
        tools: 'HTML, CSS, Angular',
        description:
          'In my secondment with XCOM Media’s parent company Otherlevels I have gained experience in migrating and modernising Angular.js web apps. I have also worked on productising the services XCOM Media provide as integrations to the Otherlevels marketing automation platform. This role has allowed me to diversify my skills in working on large scale enterprise applications. Since June 2020 I have also been the acting Lead Front End Developer at Otherlevels, furthering my skills in project management and product development.',
      },
      {
        title: 'Web Developer',
        company: 'XCOM Media',
        location: 'New Farm, Queensland, Australia',
        startDate: 'March, 2018',
        endDate: 'Present',
        tools: 'HTML, CSS, Vue.js, PHP, SQL',
        description:
          'My work at XCOM Media allows me to develop skills with building secure, performant, reliable, highly available contact management solutions for global markets. During my time in this role I have worked on projects such as Tourism and Events Queensland’s scUber campaign, developing an award winning micro site for collecting competition entries. I have also maintained and modernised legacy PHP email subscription forms. In this role I have furthered my skills in implementing marketing strategies, client and professional liaising, and working in a fast-paced team environment.',
      },
      {
        title: 'Web Designer',
        company: 'Griffith University',
        location: 'Nathan, Queensland, Australia',
        startDate: 'July, 2017',
        endDate: 'December, 2017',
        tools: 'HTML, CSS, jQuery, Photoshop, Squiz Matrix, SVN, PHP, SQL',
        description:
          'My work in the Marketing Technology team at Griffith University included upgrading the Web Services Database to reduce data anomalies. During the project I completed day to day tasks such as changing banners on the homepage and updating body copy on web pages using Squiz Matrix Content Management System. During the upgrade of the Web Services Database I liaised with clients to design the system to meet the requirements of automating tasks carried out by the Marketing Technology team.',
      },
    ],
    attributes: [
      {
        icon: faClock,
        title: 'Time Management',
        description:
          'I stay on top of tasks given to me and I never go past client deadlines. I use project management tools such as JIRA to triage issues and forecast effort estimates for projects using story points.',
      },
      {
        icon: faPuzzlePiece,
        title: 'Problem Solving',
        description:
          'I work through complex problems on my own, but I’m not afraid to ask for help in areas I’m not familiar with. I enjoy using creative thinking to present effective solutions through the use of rapid prototyping at hackathons/startup weekends.',
      },
      {
        icon: faUsers,
        title: 'Team Player',
        description:
          'I work well in a team and can fill both leader and supporting positions with confidence. I enjoy working in a collaborative team structure but I have worked independently on projects as well.',
      },
      {
        icon: faTasks,
        title: 'Quality Management',
        description:
          'I practice test driven development by creating automated unit tests using Jest, to ensure that all functions of a system operate as expected.',
      },
      {
        icon: faPaperPlane,
        title: 'Written Communication',
        description:
          'I take pride in producing clear and concise reports, programs and documentation for all code as demonstrated by liaising with clients and project teams.',
      },
    ],
  }),
  methods: {
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
