<template>
    <div>
        <v-system-bar dark color="primary">
            <v-spacer></v-spacer>
            <v-btn @click="close" icon ><v-icon>mdi-close</v-icon></v-btn>
        </v-system-bar>
        <v-card-title class="pa-0">
            <v-tabs
            v-model="tab"
            >
                <v-tab>Comentários</v-tab>
                <v-tab v-show="questoesId">Questões</v-tab>
                <v-tab v-show="sumulasId">Súmulas</v-tab>
                <v-tab v-show="jurisId">Julgados</v-tab>
                <v-tab v-show="questoesDoutrina">Doutrina</v-tab>
                <v-tab v-show="refQt">Referência</v-tab>
            </v-tabs>
        </v-card-title>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card-text v-if="user">
                    
                    <v-alert type="error" outlined v-if="!comments">
                        <p>Não há comentários salvos neste dispositivo.</p>
                    </v-alert>
                    <div v-else>
                        <p class="text-h6">Meus Comentários</p>
                        <v-alert 
                            outlined color="grey"
                            class="pb-0"
                            v-for="item, i in comments" :key="i"
                            >
                            <p 
                              class="mb-5"
                              style="color:black; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: medium;"
                            >{{item.comment}}
                            </p>
                            <v-divider></v-divider>
                            <v-subheader>
                                <v-spacer></v-spacer>
                                <v-chip-group>
                                    <v-chip 
                                        title="editar"
                                        outlined x-small
                                        @click="editComment = !editComment"
                                        v-show="false"
                                        >
                                        <v-icon small>mdi-file-document-edit</v-icon>
                                    </v-chip>
                                    <v-chip 
                                        color="error"
                                        title="apagar"
                                        outlined small @click="deleteComment(item.id)">
                                        <v-icon small>mdi-delete</v-icon>
                                    </v-chip>
                                </v-chip-group>
                            </v-subheader>
                        </v-alert>
                    </div>
                    <v-form @submit.prevent="saveComment()" ref="form">
                        <v-textarea
                            dense outlined
                            label="Comentário"
                            placeholder="Inserir comentário"
                            v-model.trim="comment"
                            :rules="[rules.required]"
                        ></v-textarea>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                @click="comment = ''"
                                text color="success">Limpar</v-btn>
                            <v-btn 
                                type="submit"
                                tile
                                color="success">Salvar
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
                <v-card-text v-else>
                    <v-alert class="text-center">
                        <p>Necessário estar conectado</p>
                        <v-btn to="/login"> <v-icon class="mr-1">mdi-account</v-icon> Login</v-btn>
                    </v-alert>
                </v-card-text>
            </v-tab-item> 
            <v-tab-item v-show="questoesId">
                <v-card-text>
                    <template v-for="item, index in questoes">
                        <div :key="index">
                            <p style="text-transform: uppercase; font-size: 18px;" class="font-weight-bold">
                               {{prova(item.prove).cargo}}/{{prova(item.prove).orgao}}/{{prova(item.prove).year}}
                            </p>
                            
                            <p class="formatText">{{item.answer}}</p>
                            <p class="formatText">{{item.alternative}}</p>
                            <div class="my-8">
                                <v-btn 
                                    :disabled="item.msg"
                                    @click="item.resp = 1" small outlined :color="item.resp == 1? 'primary':'grey'">Certo</v-btn>
                                <v-btn 
                                    :disabled="item.msg"
                                    @click="item.resp = 0" small outlined :color="item.resp == 0? 'error':'grey'">Errado</v-btn>
                            </div>
                            <v-btn 
                                v-if="!item.msg"
                                @click="resolver(item)" 
                                :disabled="item.resp == null" 
                                tile color="success">Resolver
                            </v-btn>
                            <v-alert 
                                v-else
                                :type="item.resp == item.value ? 'success' : 'error'"
                                outlined
                            >
                                <p>{{item.msg}}</p>
                            </v-alert>
                        </div>
                        <div class="text-center my-5">
                            <v-pagination
                                v-model="pagination.page"
                                :length="totalPages"
                                circle
                            ></v-pagination>
                        </div>
                    </template>
                </v-card-text>
            </v-tab-item>
            <v-tab-item v-show="sumulasId">
                <v-card-text>
                    <v-list>
                        <template v-for="(item, index) in sumulas" >
                            <v-divider v-if="index != 0"></v-divider>
                            <v-list-item :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-chip label dark :color="item.orgao == 'STF' ? 'indigo' : 'error'" x-small>{{item.orgao}}</v-chip> Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}} </v-list-item-title>
                                    <v-list-item-subtitle></v-list-item-subtitle>
                                    <div class="pl-1 mt-1"> 
                                        <p class="formatText">{{item.text}}</p>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        
                    </v-list>
                </v-card-text>
            </v-tab-item>  
            <v-tab-item v-show="jurisId">
                <v-card-text>
                    <v-list>
                        <template v-for="(item, index) in juris" >
                            <v-divider v-if="index != 0"></v-divider>
                            <v-list-item :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-chip label dark :color="item.orgao == 'STF' ? 'indigo' : 'error'" small>{{item.orgao}}</v-chip>
                                        <span class="ml-2">{{item.subject.toUpperCase()}}</span>
                                    </v-list-item-title>
                                    <v-list-item-subtitle></v-list-item-subtitle>
                                    <div class="pl-1 mt-1"> 
                                        <p class="formatText">{{item.tese}}</p>
                                        <p class="formatText">{{item.texto}}</p>
                                        <p class="font-italic">{{item.julgado}}</p>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        
                    </v-list>
                </v-card-text>
            </v-tab-item>    
            <v-tab-item v-show="questoesDoutrina">
                <v-card-text>
                    <v-list>
                        <template v-for="(item, index) in questoes" >
                            <v-divider v-if="index != 0"></v-divider>
                            <v-list-item :key="index">
                                <v-list-item-content>
                                    <div class="pl-1 mt-1"> 
                                        <p class="formatText">{{item.doutrina}}</p>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card-text>
            </v-tab-item>
            <v-tab-item v-show="refQt">
                <v-card-text>
                    <v-list>
                        <v-list-item v-for="item, i in refQt" :key="i">
                            <v-list-item-content>
                                <div>
                                    <p 
                                        class="formatText" v-for="disp, index in [...new Set(item)]" :key="index"
                                        v-if="disp.id != idDispositive"
                                    >
                                    <span v-if="disp.order !=10">Art.{{disp.art}}, </span>
                                    {{disp.textLaw}}</p>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-tab-item>
        </v-tabs-items>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="close" text small>Ocultar</v-btn>
        </v-card-actions>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    const shortid = require('shortid');

    export default {
        data(){
            return{
                tab: null,
                tabs: ['Questões', 'Súmulas'],
                idLaw: this.$route.params.law,
                comment: '',
                editComment: false, 
                pagination:{
                    page: 1,
                    perPage: 1,
                },
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                },
            }
        },
        props:{
            sumulasId: Array,
            questoesId: Array, 
            jurisId: Array,
            idTabIntegration: Number,
            idDispositive: true,
            refQuestions: Array
        },
        watch:{
            'idTabIntegration': 'tabSelect'
        },
        computed:{
            sumulas(){
                const sumulas = this.$store.getters.readSumulas
                let newSumulas = []

                if (Array.isArray(this.sumulasId)){

                       this.sumulasId.forEach (i => 
                        sumulas.forEach(sumula => {
                            if(sumula.id == i)
                            newSumulas.push(sumula)
                        })
                    )

                    return newSumulas

                } else {
                    return newSumulas
                }
                
            },
            juris(){
                const sumulas = this.$store.getters.readJuris
                let newSumulas = []

                if (Array.isArray(this.jurisId)){

                       this.jurisId.forEach (i => 
                        sumulas.forEach(sumula => {
                            if(sumula.id == i)
                            newSumulas.push(sumula)
                        })
                    )

                    return newSumulas

                } else {
                    return newSumulas
                }
                
            },
            questoes(){
                const questoes = this.$store.getters.readQuestions
                let newQuestoes = []

                if (this.questoesId){
                       this.questoesId.forEach (i => 
                        questoes.forEach(questao => {
                            if(questao.id == i)
                            newQuestoes.push(questao)
                        })
                    )
                } 

                let page = this.pagination.page - 1
                let start = page * this.pagination.perPage
                let end = start + this.pagination.perPage
                
                return newQuestoes.slice(start, end)
         
            },
            questoesDoutrina(){
                const list = this.questoes.filter(i => i.doutrina).length
                return list
            },
            questoesComplete(){
                const questoes = this.$store.getters.readQuestions
                let newQuestoes = []

                if (this.questoesId){
                       this.questoesId.forEach (i => 
                        questoes.forEach(questao => {
                            if(questao.id == i)
                            newQuestoes.push(questao)
                        })
                    )
                } 

                return newQuestoes.length
            },
            totalPages (){
                let totalPages = Math.ceil(this.questoesComplete/this.pagination.perPage)
                return totalPages
            },
            prova(){
                const proves = this.$store.getters.readProvas.filter(i => i)
                return (item) => proves.find( p => p.id == item)
            },
            comments(){
                let comments = this.$store.getters.readComments
                return comments
            },  
            user(){
                const user = this.$store.getters.readUser
                return user.uid
            },
            refQt(){
                const ref = this.refQuestions
                
                let result = []

                this.questoesId?.forEach( i => {
                    ref.forEach(item => {
                        item.idQuestions.forEach(quest => {
                            if(quest == i) {
                                result.push(item)
                            }
                        })
                    })
                })



                const final = result.reduce((dispositivo, disp) => {
                    dispositivo[disp.art] = dispositivo[disp.art] || []
                    dispositivo[disp.art].push(disp)

                    return dispositivo
                }, {})

                let finalEmpty = !!Object.keys(final).length


                return finalEmpty
                ? final
                : false
            }
        },
        methods:{
            ...mapActions(['saveCommentFB', 'cargaComments', 'removeComment']),
            close(){
                this.$emit('fechar')
            },
            resolver(item){
                if(item.resp != null){
                    item.resp == item.value ? item.msg = 'você acertou' : item.msg = 'você errou'
                }
                return
            },
            saveComment(){
                if(this.comment){
                    let saveData = {}
                    if(this.$refs.form.validate()){
                        saveData = {
                            id: shortid.generate(),
                            idLaw: this.idLaw,
                            dispositive: this.idDispositive,
                            comment: this.comment
                        }
                    }
                    this.saveCommentFB(saveData)
                    this.comment = ''
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Comentário salvo com sucesso', color:'success'})
                } else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Digite um comentário para salvar', color:'error'})
                }
            },
            deleteComment(item){
                let dataRemove = {}
                dataRemove = {
                    idLaw: this.idLaw,
                    dispositive: this.idDispositive,
                    idComment: item
                }
                this.removeComment(dataRemove)
            },
            cargaCommentsBD(){
                let dataLaw = {}
                dataLaw = {
                    idLaw: this.idLaw,
                    dispositive: this.idDispositive
                }
                this.cargaComments(dataLaw)
            },
            tabSelect(){
                this.tab = this.idTabIntegration
            }
        },
        created(){
            this.cargaCommentsBD()
            this.tabSelect()
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 32px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
    font-size: 16px;
}
</style>
