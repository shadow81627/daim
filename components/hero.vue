<template>
  <!-- Header -->
  <header class="masthead">
    <div class="container">
      <div class="intro-text">
        <h1 class="xintro-lead-in text-light text-capitalize text-shadow ">
          {{ blok.headline }}
        </h1>
        <h2 class="xintro-heading text-light text-capitalize text-shadow">
          {{ blok.desciption }}
        </h2>
        <!-- <a
          class="btn btn-primary btn-xl text-uppercase js-scroll-trigger"
          href="#services"
          >Tell Me More</a
        > -->
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
};
</script>

<style scoped>
header.masthead {
  text-align: center;
  color: white;
  background-image: url('~assets/img/header-bg.jpg');
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
}

header.masthead .intro-text {
  padding-top: 150px;
  padding-bottom: 100px;
}

header.masthead .intro-text .intro-lead-in {
  font-size: 22px;
  font-style: italic;
  line-height: 22px;
  margin-bottom: 25px;
  font-family: 'Droid Serif', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

header.masthead .intro-text .intro-heading {
  font-size: 50px;
  font-weight: 700;
  line-height: 50px;
  margin-bottom: 25px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

@media (min-width: 768px) {
  header.masthead .intro-text {
    padding-top: 300px;
    padding-bottom: 200px;
  }
  header.masthead .intro-text .intro-lead-in {
    font-size: 40px;
    font-style: italic;
    line-height: 40px;
    margin-bottom: 25px;
    font-family: 'Droid Serif', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
  header.masthead .intro-text .intro-heading {
    font-size: 75px;
    font-weight: 700;
    line-height: 75px;
    margin-bottom: 50px;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
}
</style>
