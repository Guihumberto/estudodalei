<template>
  <div class="home">
    <layoutSite-landingPage-header />
    <div class="mainhome">
      <layoutSite-landingPage-acessar :login="login" @login="login = !login"  />
      <LayoutSiteLandingPageWelcome class="login" v-if="login" @login="login = !login" />
    </div>
    <layoutSite-landingPage-footer />
  </div>
</template>

<script>
  export default {
    layout: 'new',
    head: {
            title: 'Estudo da Lei - Lei Seca',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                hid: 'description',
                name: 'description',
                content: 'Leges Estudo - Estudo da lei - Constituição Federal, Lei, lei seca, Legislação, Norma, súmulas, STJ, STF, jurisprudência, questões e lei com questões e lei com jurisprudência'
                },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
            ]
        },
    data(){
      return{
        login: false
      }
    },
    methods: {

    }
  }
</script>

<style>
.home {
  background: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.mainhome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.acessar {
  transition: .5s;
  display: none;
}
.login {
  opacity: 0;
  animation: slideLeft .5s ease forwards;
  transition: .5s;
  overflow: hidden;
}
</style>


