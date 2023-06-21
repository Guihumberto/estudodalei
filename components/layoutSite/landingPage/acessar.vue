<template>
  <div class="aboutme" :class="login ? 'aboutmeMobile' : ''">
      <div class="mainText">
        <h1>Estudo da Lei</h1>
        <div class="d-flex justify-space-between white--text align-center mt-3" v-if="!login">
          <a @click="$emit('login')">Entrar</a>
          <span>|</span>
          <a @click="$emit('login')">Cadastrar</a>
        </div>
        <div v-else class="mt-3">
          <a @click="$emit('login')">Cancelar</a>
        </div>
      </div>
      <div class="information">
          <a v-for="item, i in sections" :key="i" @click.prevent="toLink(item.to)">
            {{ item.name }}
          </a>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        sections:[
          {name: "Leis", icon:"mdi-bookshelf", to:"/laws"},
          {name: "Súmulas", icon:"mdi-scale-balance", to:"/sumulas"},
          {name: "Julgados", icon:"mdi-gavel", to:"/juris"},
          {name: "Planejamento", icon:"mdi-format-list-checks", to:"/plan"},
        ]
      }
    },
    props: {
      login: true
    },
    methods:{
      toLink(link){
        this.$router.push(link)
      }
    }
  }
</script>

<style scoped>
.aboutme {
  height: 100%;
  width: 100%;
  background: url("https://s3-us-west-2.amazonaws.com/files.bradengelhardt.com/brad-bg-main.jpg") no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: .5s;
}
.mainText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 400px;
  background: rgba(255, 255, 255, .1);
  box-shadow: 0 25px 45px rgba(0, 0, 0, .2);
  border-radius: 50px;
  border: 2px solid rgba(255, 255, 255, .5);
  border-right: 2px solid rgba(255, 255, 255, .2);
  border-bottom: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(10px);
  transition: .5s;
  opacity: 0;
  animation: slideRight 1s ease forwards;
}
.aboutme .mainText h1{
  color: #fff;
  border: 2px solid #fff;
  padding: 0 1rem;
  transition: .5s;
}
.aboutme .mainText h1:hover {
  transform: scaleX(1.1);
}

.mainText a {
  position: relative;
  display: inline-block;
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;
  padding: 5px;
  transition: .5s ease;
}

.mainText a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 5px;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform .5s;
}
.mainText a:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.information {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  opacity: 0;
  animation: aparecer 2s ease forwards;
  animation-delay: 1.5s;
}

.information a {
  color: #fff;
  margin-right: 1rem;
  padding: 5px;
  transition: .5s;
}

.information a:hover {
  box-shadow: 2px 2px transparent, -.5em 0 0 white;
}

@media (max-width: 900px) {
  .aboutme.aboutmeMobile {
    display: none;
  }
  .mainText {
    width: 90%;
    height: 55%;
  }
}

@media (max-width: 380px) {
  .information {
    flex-direction: column;
  }
}

@keyframes slideRight {
  0%{
    opacity: 0;
    transform: translateX(-100px);
  }
  100%{
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}

</style>
