<template>
  <v-container>
    <v-row>
      <v-col>
        <section>
          <v-card id="about" flat>
            <v-card-title>
              <h1 class="text-break">
                Damien
                <span class="text--primary">Robinson</span>
              </h1>
            </v-card-title>
            <v-card-subtitle class="text-subtitle-1 text-break">
              <v-btn href="mailto:damien.robinson@daim.dev" text class="pl-0">
                <font-awesome-icon
                  :icon="faEnvelope"
                  title="email"
                  fixed-width
                  pull="left"
                />
                <span>damien.robinson@daim.dev</span>
              </v-btn>

              <v-btn
                href="https://www.google.com.au/maps/search/?api=1&query=New Farm, Australia"
                target="_blank"
                rel="noreferrer"
                text
              >
                <font-awesome-icon
                  :icon="faMapMarker"
                  title="location"
                  fixed-width
                  pull="left"
                />
                <span>New Farm, Australia</span>
              </v-btn>
            </v-card-subtitle>
            <v-card-text class="body-1 text--primary">
              I am a full-stack web developer with 3 years experience, seeking
              full time employment and a chance to further my skills in front
              end web development for marketing websites. I have well-rounded
              full-stack development experience, with a proficiency in Vue.js
              static marketing websites.
            </v-card-text>
            <v-card-actions class="social-icons">
              <v-btn href="https://github.com/shadow81627" icon x-large>
                <font-awesome-icon
                  :icon="['fab', 'github']"
                  title="github"
                  size="2x"
                />
              </v-btn>
              <v-btn
                href="https://www.linkedin.com/in/damien-robinson-788925101"
                icon
                x-large
              >
                <font-awesome-icon
                  :icon="['fab', 'linkedin-in']"
                  title="linkedin"
                  size="2x"
                />
              </v-btn>
              <v-btn href="https://twitter.com/Shadow81627" icon x-large>
                <font-awesome-icon
                  :icon="['fab', 'twitter']"
                  title="twitter"
                  size="2x"
                />
              </v-btn>
              <v-btn
                href="https://www.youtube.com/user/shadow81627"
                icon
                x-large
              >
                <font-awesome-icon
                  :icon="['fab', 'youtube']"
                  title="youtube"
                  size="2x"
                />
              </v-btn>
              <v-btn
                href="https://www.facebook.com/damien.robinson.5036"
                icon
                x-large
              >
                <font-awesome-icon
                  :icon="['fab', 'facebook-f']"
                  title="facebook"
                  size="2x"
                />
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
            <v-card-title class="mb-5">
              <h2>Skills</h2>
            </v-card-title>

            <v-card-subtitle class="text--primary">
              <h3>
                Programming Languages &amp; Tools
              </h3>
            </v-card-subtitle>

            <v-container class="pt-0">
              <v-row class="list-inline dev-icons">
                <v-col>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'html5']"
                      title="html5"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'css3-alt']"
                      title="css3"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'js-square']"
                      title="javastipt"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'vuejs']"
                      title="vue"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'angular']"
                      title="vue"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'node-js']"
                      title="node"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'sass']"
                      title="sass"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'npm']"
                      title="npm"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'python']"
                      title="python"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'laravel']"
                      title="laravel"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fas', 'database']"
                      title="mySQL"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'docker']"
                      title="docker"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fas', 'search']"
                      title="SEO"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'git-alt']"
                      title="Git"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'jira']"
                      title="Jira"
                      size="3x"
                    />
                  </span>
                  <span class="list-inline-item">
                    <font-awesome-icon
                      :icon="['fab', 'aws']"
                      title="aws"
                      size="3x"
                    />
                  </span>
                </v-col>
              </v-row>
            </v-container>

            <v-card-subtitle class="body-1 text--primary">
              <h3>
                Workflow
              </h3>
            </v-card-subtitle>
            <v-card-text class="body-1 text--primary">
              <ul class="fa-ul mb-0">
                <li>
                  <i class="fa-li fa fa-check"></i>
                  Mobile-First, Responsive Design
                </li>
                <li>
                  <i class="fa-li fa fa-check"></i>
                  Cross Browser Testing &amp; Debugging
                </li>
                <li>
                  <i class="fa-li fa fa-check"></i>
                  Cross Functional Teams
                </li>
                <li>
                  <i class="fa-li fa fa-check"></i>
                  Agile Development &amp; Scrum
                </li>
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
            <v-card-title class="mb-5">
              <h2>Experience</h2>
            </v-card-title>

            <v-card-subtitle class="text--primary">
              <div
                class="resume-item d-flex flex-column flex-md-row justify-space-between mb-5"
              >
                <div class="resume-content">
                  <h3 class="mb-0">
                    Lead Frontend Developer
                  </h3>
                  <div class="subheading mb-3">OtherLevels</div>
                  <p>
                    Maintaining an Angular marketing automation dashboard.
                  </p>
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">June 2020 - Present</span>
                </div>
              </div>

              <div
                class="resume-item d-flex flex-column flex-md-row justify-space-between mb-5"
              >
                <div class="resume-content">
                  <h3 class="mb-0">
                    Frontend Web Developer
                  </h3>
                  <div class="subheading mb-3">OtherLevels</div>
                  <p>
                    Working in a team to enhance and maintain an Angular
                    marketing automation dashboard.
                  </p>
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">January 2020 - June 2020</span>
                </div>
              </div>

              <div
                class="resume-item d-flex flex-column flex-md-row justify-space-between mb-5"
              >
                <div class="resume-content">
                  <h3 class="mb-0">Junior Web Developer</h3>
                  <div class="subheading mb-3">XCOM Media</div>
                  <p>
                    Full stack web developer creating and maintaining email
                    subscription forms.
                  </p>
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">March 2018 - January 2020</span>
                </div>
              </div>

              <div
                class="resume-item d-flex flex-column flex-md-row justify-space-between"
              >
                <div class="resume-content">
                  <h3 class="mb-0">Web Designer</h3>
                  <div class="subheading mb-3">Griffith University</div>
                  <p>
                    Web development and software support for Squiz Matrix CMS.
                  </p>
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">July 2017 - December 2017</span>
                </div>
              </div>
            </v-card-subtitle>
          </v-card>
        </section>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <section>
          <v-card id="education" flat>
            <v-card-title class="mb-5">
              <h2>Education</h2>
            </v-card-title>

            <v-card-subtitle class="text--primary">
              <div
                class="resume-item d-flex flex-column flex-md-row justify-space-between mb-5"
              >
                <div class="resume-content">
                  <h3 class="mb-0">Griffith University</h3>
                  <div class="subheading mb-3">
                    Bachelor of Applied Infomation Technology
                  </div>
                  <!-- <div>Computer Science - Web Development Track</div> -->
                  <p>GPA: 5.19</p>
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">2015 - 2017</span>
                </div>
              </div>
            </v-card-subtitle>
          </v-card>
        </section>
      </v-col>
    </v-row>

    <!-- <hr class="m-0" />

      <section
        id="interests"
        class="resume-section p-3 p-lg-5 d-flex align-items-center"
      >
        <div class="w-100">
          <h2 class="mb-5">Interests</h2>
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
      </section> -->

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
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
export default {
  data: () => ({ faEnvelope, faMapMarker }),
};
</script>

<style scoped lang="scss">
// @import '~/assets/css/resume.css';
// @import '~/assets/scss/fluid-type.scss';
</style>
