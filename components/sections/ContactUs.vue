<template>
  <v-theme-provider dark>
    <base-section id="contact-us" class="primary" space="20">
      <v-container>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <base-title
              :space="$vuetify.breakpoint.mdAndUp ? 0 : 4"
              title="HAVE QUESTIONS? LET US KNOW!"
            />

            <!-- <base-body space="0">
              <span class="white--text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
                itaque modi ab accusantium architecto voluptates ipsa molestiae.
              </span>
            </base-body> -->
          </v-col>

          <v-col cols="12" md="2">
            <base-btn
              :block="$vuetify.breakpoint.smAndDown"
              color="white"
              to="/contact"
              large
              outlined
            >
              Contact Us
            </base-btn>
          </v-col>
        </v-row>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>
