<template>
  <v-container class="loginNew">

    <div class="logo">
      <LayoutSiteLandingPageAnimationSmoke />
      <v-icon class="mb-10" size="50">mdi-coffee-outline</v-icon>
    </div>
    <div class="login">
      <h1 class="mb-5">Bem-vindo</h1>
      <p class="caption" style="max-width: 380px;">Nesta versão beta está disponível criação de contas apenas com o google.</p>
      <v-form v-if="!createAccount" class="formLogin">
        <v-text-field
          label="E-mail"
          placeholder="Endereço de e-mail"
          outlined
          disabled
        ></v-text-field>
        <v-btn disabled block color="primary">Continue</v-btn>
      </v-form>
      <div class="mt-5 textLogin">
        <p v-if="!createAccount">Você não possui conta? <a @click="createAccount = !createAccount">Criar</a></p>
        <p v-else>Você já possui conta? <a @click="createAccount = !createAccount">Login</a></p>
      </div>
      <div>
        <a

          class="google"
          @click="google()"
        >
          <v-icon v-if="!loading" color="error" class="mr-2">mdi-google</v-icon>
          <v-progress-circular
            v-else
            indeterminate
            color="red"
            value="10"
            class="mr-2"
          ></v-progress-circular>
          {{ loading ? 'Aguarde...' : 'Continue com Google'}}
        </a>
      </div>

    </div>
  </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import { firebase, db} from '@/plugins/firebase.js'
  export default {
    data(){
      return {
        createAccount: false,
        loading: false,
        isLogin: false,
        userLogin:{
            name: "",
            email: "",
            uid: "",
            password: '',
            photo: ""
        },
        userLogin: false
      }
    },
    methods: {
      ...mapActions(['cargaUserPreferences']),
      async google(){
                this.loading = true
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().languageCode = 'pt-br';

                try {
                    //login user
                    const result = await firebase.auth().signInWithPopup(provider);
                    const user = result.user;

                    //register user
                    const usuario = {
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photo: user.photoURL
                    }

                                  //Guardar en Firestore
                    await db.collection('usuarios').doc(usuario.uid).set(
                    usuario
                    )
                    // carregar preferencias do usuario
                    this.cargaUserPreferences(usuario.uid)

                    this.$router.push('/laws' )
                    // this.$route.query.redirect ||
                    this.loading = false
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Seja bem-vindo!', color:'primary lighten-1'})

                } catch (error) {
                    console.log(error);
                    this.loading = false
                }
      },
      userLoginIn(){
          if(this.userUid){
              this.$router.push( '/laws' )
          }
      }
    },
    created(){
        this.userLoginIn()
    }
  }
</script>

<style scoped>
.loginNew {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100%;
  color: #000;
  text-align: center;
  transition: .5s;
}
.logo {
  position: relative;
}
.login {
  min-width: 380px;
}
.formLogin {
  opacity: 0;
  animation: slideLeft .5s ease forwards;
  transition: .5s;
}
.textLogin p {
  opacity: 0;
  animation: slideLeft .5s ease forwards;
  transition: .5s;
}
.google {
  min-width: 380px;
  border: 2px solid grey;
  padding: .7rem 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .5s;
  color: #000;
  text-decoration: none;
}
.google:hover {
  background: rgb(240, 238, 238);
}
</style>
