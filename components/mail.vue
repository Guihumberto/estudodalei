<template>
    <v-card class="ml-3 my-16" outlined>
        <v-card-text>
            <h3 class="description mb-5"> 
                <v-icon class="tag mr-1 indigo mb-4"></v-icon>
                <span class="black--text text-h4 mb-5">Mais Informações</span>
             </h3> 
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <v-card min-height="405" outlined flat>
                        <v-card-title class="primary lighten-4 py-2">Estudo da Lei - Leges</v-card-title>
                        <v-card-text>
                            <v-list>
                                <template v-for="item, index in contact">
                                    <v-divider inset v-if="index != 0"></v-divider>
                                    <v-list-item :key="index">   
                                        <v-list-item-icon>
                                            <v-icon>{{item.icon}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{item.text}}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                    <v-list-item >   
                                        <v-list-item-icon>
                                            <v-icon>mdi-instagram</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <a class="linkInsta" target="blank" href="https://www.instagram.com/estudodalei.com.br/">
                                                    @estudodalei.com.br
                                                </a>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-subheader>www.estudodalei.com.br</v-subheader>
                                <v-icon>mdi-ghost</v-icon>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6" >
                    <v-alert outlined color="purple">
                        <p>Elogios, sugestões, críticas ...</p>
                        <v-form @submit.prevent="sendMsg()" ref="refs">
                            <v-text-field
                                label="Nome"
                                outlined dense
                                v-model="mail.name"
                                type="text"
                                :rules="[rules.required, rules.minname]"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="E-mail"
                                type="e-mail"
                                outlined dense
                                v-model="mail.email"
                                class="mt-n1"
                                :rules="[rules.required, rules.email]"
                                required
                            ></v-text-field>
                            <v-textarea
                                label="Mensagem"
                                outlined dense
                                v-model="mail.msg"
                                class="mt-n1"
                                :rules="[rules.required]"
                                required
                            ></v-textarea>
                            <v-btn 
                                :color="send ? 'success' : 'primary'" block type="submit"
                                :loading="loading"
                                :disabled="loading"
                            >{{btnSend.textBtn}}</v-btn>
                        </v-form>
                    </v-alert>
                </v-col>              
            </v-row>
            
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    const shortId = require('shortid')
    export default {
        data(){
            return{
                mail:{
                    id: '',
                    name: '',
                    email: '',
                    msg: ''
                },
                send: false,
                loading: false,
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
                    minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
                },
                contact:[
                    {icon: 'mdi-email-outline', text: 'leges.estudo@gmail.com'},
                    {icon: 'mdi-whatsapp', text: '(98) 98465-0786'},
                ]
            }
        },
        computed:{
            btnSend(){
                return this.send
                ? {color: 'success', textBtn: 'Enviada com sucesso'}
                : {color: 'primary', textBtn: 'enviar'}
            }
        },
        methods:{
            ...mapActions(['sendMsgFB']),
            sendMsg(){
                if(this.$refs.refs.validate()){
                    this.mail.id = shortId.generate(),
                    this.sendMsgFB(this.mail);
                    this.loading = true
                    setTimeout( () => {
                        (this.loading = false)
                         this.clearForms()
                    }, 2000 )
                    this.send = true
                   
                }
            },
            clearForms(){
                this.mail = {
                    id: '',
                    name: '',
                    email: '',
                    msg: ''
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.tag{
    height: 30px;
    width: 20px;
}
.linkInsta{
    position: relative;
    font-size: 1rem;
    text-decoration: none;
    color: grey;
    transition: all .6s ;
}
.linkInsta:hover {
        text-decoration: underline;
        transition-timing-function: ease-in-out;
}
</style>