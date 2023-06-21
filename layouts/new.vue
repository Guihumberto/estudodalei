<template>
  <v-app>
    <layoutSite-landingPage-header />
    <v-main class="mainclass">
      <nuxt />
    </v-main>
    <layoutSite-landingPage-footer />
  </v-app>
</template>

<script>
  export default {
    data(){
      return{

      }
    }
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  outline: none;
  scroll-behavior: smooth;
  font-family: 'Poppins', sans-serif;
}
:root{
  --bg-color:#081b29;
  --second-bg-color: #112e42;
  --text-color: #ededed;
  --main-color: #6606a4;
  --second-main-color: #57b6bd;
}
html{
  /* font-size: 62.5%; */
  overflow-x: hidden;
  scroll-behavior: smooth;
}
body{
  background: var(--bg-color);
  color: var(--text-color);
}
.app {
  background: rgb(24, 21, 21);
}
.mainclass {
  margin: 0;
  padding: 0;
  background: black;
}
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}
@keyframes slideLeft {
  0%{
    opacity: 0;
    transform: translateX(100px);
  }
  100%{
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
