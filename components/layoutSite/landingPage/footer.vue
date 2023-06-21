<template>
  <footer style="background-color: #000;">
    <v-card flat color="transparent">
        <v-card-text class="text-center" style="line-height: .5;">
            <p class="footer grey--text">
              Desenvolvido e idealizado por
            </p>
            <p
              class="white--text font-weight-bold nameDev"
            >
              João Humberto Silva Ribeiro Júnior
            </p>
            <a href="https://www.instagram.com/estudodalei.com.br/" target="_blank">
              <v-icon
                size="small"
                color="grey">mdi-instagram
              </v-icon>
                estudodalei.com.br
            </a>
        </v-card-text>
    </v-card>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style scoped>
footer {
  width: 100%;
  min-height: 8vh;
  transition: .5s;
}
a {
  color: grey;
  transition: .5s;
}
a:hover {
  color: #fff;
}
.nameDev {
  font-size: 20px;
  transition: .5s;
}
p {
  animation: aparecer 1s ease forwards;
  animation-delay: 1.5s;
  opacity: 0;
  transition: .5s;
}
a {
  animation: aparecer 1s ease forwards;
  animation-delay: 1.8s;
  opacity: 0;
  transition: .5s;
}
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}
@media (max-width: 420px) {
  .nameDev {
    font-size: 18px;
  }
}
</style>
