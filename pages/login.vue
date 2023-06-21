<template>
    <v-container class="mt-5" style="max-width: 1080px">
        <div class="text-center">
            <v-avatar color="primary" class="text--white mb-5"><span class="text-h5">EL</span></v-avatar>
            <p class="text-h5 font-weight-light">Estudo da Lei</p>
        </div>
        <v-card outlined max-width="400" class="mt-5 mx-auto py-5 mb-5" v-if="userLogin">
            <v-card-text>
                <p>Aguardo só um instante...</p>
                <v-btn block loading outlined color="error"></v-btn>
            </v-card-text>
        </v-card>
        <div v-else>
            <div v-if="!userUid">
                <v-card outlined max-width="400" class="mx-auto pt-5">
                    <v-card-text>
                        <p class="text--bold">Nesta versão beta está disponível criação de contas apenas com o google. Aproveite!</p>
                    </v-card-text>
                    <v-card-text>
                        <v-form>
                            <v-expand-transition>
                                <v-text-field
                                    label="Nome" 
                                    dense outlined
                                    v-model="userLogin.name"
                                    disabled
                                    append-icon="mdi-account"
                                    type="text"
                                    v-if="isLogin"
                                ></v-text-field>
                            </v-expand-transition>
                            <v-text-field
                                label="E-mail" 
                                append-icon="mdi-email"
                                v-model="userLogin.email"
                                disabled
                                dense outlined
                                type="email"
                            ></v-text-field>
                            <v-text-field
                                label="Senha" 
                                dense outlined
                                disabled
                                v-model="userLogin.password"
                                disabled
                                append-icon="mdi-lock"
                                type="password"
                            ></v-text-field>
                            <v-card-actions class="d-flex">
                                <v-btn disabled block :color="loginCreate.color" >{{loginCreate.text}}</v-btn>
                            </v-card-actions>
                            <v-card-text class="text-center pb-0" v-if="isLogin">
                                ou Esqueci a senha
                            </v-card-text>
                        </v-form>
                    </v-card-text>
                </v-card>
                <!-- entrar com o google -->
                <v-alert 
                    class="mt-5 mx-auto text-center"
                    max-width="430"
                    >
                    <v-btn 
                        :loading="loading"
                        block color="error lighten-2" @click="google()">
                        <v-icon small class="mr-5">mdi-google</v-icon>
                        Continuar com o Google
                    </v-btn>
                </v-alert>
                <!-- nao possui conta/login -->
                <v-alert 
                    class="mx-auto text-center"
                    max-width="400"
                    >
                    <span v-if="isLogin">
                        Já possui uma conta? <a class="text-primary text--bold" @click="isLogin = !isLogin">fazer login.</a> 
                    </span>
                    <span v-else>
                        Não possui uma conta? <a class="red--text text--bold" @click="isLogin = !isLogin">Criar Conta.</a>
                    </span>
                </v-alert>
            </div>
            <v-alert v-else type="success" outlined>
                <v-row align="center">
                    <v-col class="grow">
                        <p>Você está conectado!!</p>
                    </v-col>
                    <v-col class="shrink">
                        <v-btn color="primary" to="/laws">Acessar</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import { firebase, auth, db} from '@/plugins/firebase.js'

    export default {
        data(){
            return{
                isLogin: false,
                loading: false,
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
        middleware: "loginTrue",
        computed:{
            loginCreate(){
                return this.isLogin
                ? {text: 'Criar Usuário', color:'primary lighten-1'}
                : {text: 'entrar', color:'success lighten-1'}
            },
            userUid(){
                const user =  this.$store.getters.readUser
                return user.uid
            }
        },
        methods:{
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

                    // this.setUser(usuario)

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

<style lang="scss" scoped>

</style>