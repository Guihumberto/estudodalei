<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <h2 class="intro-title">Bem-vindo ao site Estudo da Lei</h2>
        <p class="intro-description">Estude a legislação integrada a questões e jurisprudência de forma única.</p>
        <v-btn large color="success" rounded to="/laws" dark class="mr-5">Acessar</v-btn>
        <v-btn
          large color="indigo" rounded target="_blank" href="https://www.youtube.com/@aplicadomapas5758" dark
        >
          <v-icon class="mr-1">mdi-play-circle</v-icon>
          Apresentação</v-btn>
      </v-col>
      <v-col lg="6">
        <v-img alt="pessoa estudando no pc" src="/landingPage/hero-illustration.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .intro-title{
    font-size: 60px;
    color: #444;
    font-weight: bold;
    line-height: normal;
  }
  .intro-description{
    font-size: 20px;
    margin: 32px 0px;
    color: #444;
  }

</style>
