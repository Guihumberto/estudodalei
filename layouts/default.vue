<template>
  <v-app id="inspire" class="formatText">
    <v-navigation-drawer
      v-show="loading"
      v-model="drawer"
      temporary
      fixed
      app
      color="#f2f5f9"
    >
      <layoutSite-sideBar />
    </v-navigation-drawer>

    <v-app-bar app flat color="grey lighten-2" v-show="loading" class="formatText">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div>
        <h4 class="text-h6">Estudo da Lei</h4>
        <p class="caption mb-0 mt-n2">Leges (Beta)</p>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items class="mr-1 d-none d-sm-flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/laws">Leis</v-btn>
        <v-btn to="/sumulas" text>Súmulas</v-btn>
        <v-btn to="/juris" text>Julgados</v-btn>
      </v-toolbar-items>
        <layoutSite-menuPopOver v-if="user.name" :user="user" @logout="closeLogin()" />
        <v-btn v-else to="/login" small color="primary" outlined> <v-icon small class="mr-1">mdi-account</v-icon> Login</v-btn>
        <v-btn
          icon
          class="ml-1"
          @click.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <!-- <v-menu
          left
          origin="center center"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              small icon
              v-bind="attrs"
              v-on="on"
              class="ml-1 d-flex d-sm-none"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

        <v-list>
          <template v-for="(item, i) in items">
            <v-divider v-if="i != 0"></v-divider>
            <v-list-item
              :key="i"
              :to="item.url"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu> -->

    </v-app-bar>

    <v-main>
       <layoutSite-loadingInit v-if="!loading" />
       <nuxt v-else />
       <v-snackbar
          v-for="(snack, i) in snacks.filter((s)=> s.showing)" :key="i + Math.random()"
          v-model="snack.showing"
          :timeout="snack.timeout"
          :color="snack.color"
          :style="`bottom: ${i * 60 + 8}px`"
        >
          <v-btn slot="action" icon small @click="snack.showing = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        {{snack.text}}
      </v-snackbar>
      <start-pixHelp v-if="pixshow" />

    </v-main>
    <v-navigation-drawer
      v-show="loading"
      v-model="rightDrawer"
      :right="right"
      fixed
      app
      color="#f2f5f9"
      width="450"
    >
      <layoutSite-sideBarRight />
    </v-navigation-drawer>

    <v-footer
      v-show="loading"
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
            v-for="icon, i in icons"
            :key="i"
            :href="icon.to"
            target="_blank"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
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

  import { mapGetters, mapActions} from 'vuex'

  export default {
     head: {
      titleTemplate: '%s - Legislação',
      title: 'Estudo da Lei',
      bodyAttrs:{
        class: 'estudodaLei'
      },
      htmlAttrs:{
        class: 'legislação',
        id: 'leges'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Estudo da lei - Estudo da Constituição, Lei, Legislação, Norma, súmulas, STJ, STF, jurisprudência, questões e mais'
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
      ]
    },
    data(){
      return {
        drawer: false,
        rightDrawer: false,
        pixshow: false,
        right: true,
        titleWebSite: "Estudo da Lei (beta)",
        snack: false,
        items: [
          {icon:'mdi-home', title: 'Home', url:'/'},
          {icon:'mdi-home', title: 'Leis', url:'/laws'},
          {icon:'',  title: 'Súmulas', url:'/sumulas'},
          {icon:'',  title: 'Julgados', url:'/juris'},
          {icon:'',  title: 'Novidades', url:'/news'},
        ],
        icons: [
          {icon:'mdi-youtube', to: "https://www.youtube.com/@aplicadomapas5758"},
          {icon:'mdi-linkedin', to: "https://www.linkedin.com/in/joao-humberto-6a4713232/"},
          {icon:'mdi-instagram', to: "https://www.instagram.com/estudodalei.com.br/"},
        ],
      }
    },
    computed:{
      ...mapGetters({snacks:"snackbars/readSnackbars"}),
      user(){
        const user = this.$store.getters.readUser
        return user
        ? user
        : false
      },
      loading(){
        const load = this.$store.getters.readJuris
        return !!load.length
      }
    },
    methods:{
       ...mapActions(['cargaLawList', 'cargaSumula', 'cargajuris', 'setUser', 'logout', 'cargaUserPreferences', 'cargaQuestions', 'cargaProvas']),
       closeLogin(){
        this.logout()
        this.$store.dispatch("snackbars/setSnackbars", {text:'Sessão encerrada', color:'error'})
        this.drawer = false
      },
      dialogPix(){
        setTimeout(() => {
          this.pixshow = true
          },
        2000)
      }
    },
    created(){
      this.dialogPix()
      this.setUser()
      this.cargaLawList()
      this.cargaSumula()
      this.cargajuris()
      this.cargaQuestions()
      this.cargaProvas()
      setTimeout( () => {
        this.cargaUserPreferences(this.user.uid)
      }, 2000),
      setTimeout( () => {
        this.rightDrawer = false
      }, 100)
    }
  }
</script>

<style>
html {
    scroll-behavior: smooth;
}
.formatText{
    font-family: 'Inter', sans-serif;
}
</style>
