<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <layoutSite-sideBar />
    </v-navigation-drawer>

    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{titleWebSite}}</v-toolbar-title>
    </v-app-bar>
    <v-main>
       <nuxt />
    </v-main>
    <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="grey lighten-1 white--text text-center"
      width="100%" center
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
       
        <v-icon>mdi-ghost</v-icon><br>
        www.estudodalei.com.br<br>
        <strong>Estudo Da Lei - Leges Estudo</strong> - {{ new Date().getFullYear() }}<br>
        Desenvolvido e idealizado por João Humberto Silva Ribeiro Júnior <br>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>

  import { mapActions} from 'vuex'

  export default {
    data(){
      return {
        drawer: false,
        titleWebSite: "Estudo da Lei (beta)",
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }
    },
    methods:{
       ...mapActions(['cargaLawList', 'cargaSumula']),
    },
    created(){
      this.cargaLawList()
      this.cargaSumula()
    }
  }
</script>