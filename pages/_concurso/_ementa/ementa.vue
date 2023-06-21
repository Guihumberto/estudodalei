<template>
    <v-container style="max-width: 1080px">
        <h1 class="text-h5  mb-5">Conteúdo</h1>
        <v-btn small text class="px-0 mb-5" @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card outlined class="mb-5 ">
            <v-card-title class="white--text primary lighten-2 mb-5 py-2">Importar Conteúdo</v-card-title>
            <v-card-text>
                O que é?
                <p class="mt-5 formatText">
                    é uma ferramenta que ajuda a organizar os seus estudos com base na ementa do edital pretentido.
                    Contando com 3(três) passos, vc prioriza, define as revisões e sinaliza o conteúdo estudado.
                    Sabemos que o estudo da lei e resolução de questões são os principais meios para atingir a
                    tão sonhada aprovação, mas a organização tem um papel fundamental para chegar até lá. Experimente!!
                </p>
                Passos:
                <v-stepper
                    value="2"
                    class="mt-5"
                    outlined
                >
                    <v-stepper-header>
                        <v-stepper-step
                            step="1"
                            complete
                        >
                            Priorize os assuntos
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            step="2"
                        >
                            Marque o conteúdo já estudado
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step 
                            step="3">
                            Defina as revisõess
                        </v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
            </v-card-text>
        </v-card>
        <v-card v-if="importC">
            <v-card-title class="grey lighten-2 mb-5 py-2">
                {{$route.query.id}}
                <v-spacer></v-spacer>
                <v-btn
                    v-if="plan.length"
                    to="/plan"
                    color="success lighten-1"
                ><v-icon class="mr-1">mdi-spa-outline</v-icon> Plan</v-btn>
                <v-btn 
                    v-else
                    @click="user.uid ? importC = !importC : errorMsg()"
                    color="primary lighten-2" class="px-1">
                    <v-icon class="mr-1">mdi-file-import-outline</v-icon> importar
                </v-btn>              
            </v-card-title>
            <v-card-text>
                <v-card outlined class="my-3">
                    <v-card-text>
                        <h5 class="text-h5 mb-5">Conhecimentos Gerais</h5>
                        <v-treeview 
                            hoverable
                            :items="ementa.geral">
                        </v-treeview>
                    </v-card-text>
                    <v-card-text>
                        <h5  class="text-h5 mb-5">Conhecimentos Específicos</h5>
                        <v-treeview 
                            hoverable
                            :items="ementa.especifica">
                        </v-treeview>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
        <v-expand-transition>
            <v-card class="mt-5" v-if="!importC">
                <v-card-title>
                    {{$route.query.id}}
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="importC = !importC">cancelar</v-btn>
                </v-card-title>
                <v-stepper v-model="e1" flat>
                    <v-stepper-header>
                        <v-stepper-step
                            :complete="e1 > 1"
                            step="1"
                        >
                            Priorização
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete="e1 > 2"
                            step="2"
                        >
                            Estudados
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">
                            Revisão
                        </v-stepper-step>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <p>Escolha os tópicos/assuntos a serem priorizados.</p>
                            <v-card outlined class="my-3">
                                <v-card-text>
                                    <h5 class="text-h5 mb-5">Conhecimentos Gerais</h5>
                                    <v-treeview 
                                        hoverable
                                        v-model="priority.geral"
                                        selection-type="leaf"
                                        selectable return-object
                                        :items="ementa.geral">
                                    </v-treeview>
                                </v-card-text>
                                <v-card-text>
                                    <h5  class="text-h5 mb-5">Conhecimentos Específicos</h5>
                                    <v-treeview 
                                        hoverable
                                        v-model="priority.especifica"
                                        selection-type="leaf"
                                        selectable return-object
                                        :items="ementa.especifica">
                                    </v-treeview>
                                </v-card-text>
                            </v-card>
                        </v-stepper-content>
                        
                        <v-stepper-content step="2">
                            <p>Escolha os tópicos/assuntos que já foram estudados.</p>
                            <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                            > Em construção</v-card>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <p>Escolha os tópicos/assuntos a serem revisados.</p>
                            <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                            >Em construção</v-card>
                        </v-stepper-content>

                    </v-stepper-items>
                </v-stepper>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        @click="e1 = 1, clearPriority()"
                        text>
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        @click="e1 == 3 ? salvar() : e1++"
                    >
                    Continue
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data(){
            return{
                idConcurso: this.$route.params.concurso,
                idCargo: this.$route.params.ementa,
                priority: {geral: [], especifica: []},
                importC: true,
                e1: 1,
                allParentNodes : false,
            }
        },
        computed:{
            ementa(){
                let ementa = this.$store.getters.readEmenta
                ementa.geral = ementa.filter(i => i.type == 1)
                ementa.especifica = ementa.filter(i => i.type == 2)
                return ementa
            },
            user(){
                return this.$store.getters.readUser
            },
            plan(){
                return this.$store.getters.readPlan
            },
        },
        methods:{
            ...mapActions(['cargaEmenta', 'setPrioritys', 'cargaPrioritys']),
            ementaCarregar(){
                this.cargaEmenta([this.idConcurso, this.idCargo])
            },
            salvar(){
                if(this.user.uid){
                    let data = {uid: this.user.uid, concurso: this.idConcurso, cargo: this.idCargo, priority: this.priority}
                    this.setPrioritys(data)
                } else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Você precisa estar logado para esta ação!', color:'error lighten-1'})
                }
            },
            clearPriority(){
                this.priority = {geral: [], especifica: []}
            },
            errorMsg(){
               this.$store.dispatch("snackbars/setSnackbars", {text:'Você precisa estar logado para esta ação!', color:'error lighten-1'})
            },
            cargaPlan(){
                if(this.user.uid){
                    let data = {uid: this.user.uid, concurso: this.idConcurso, cargo: this.idCargo}
                    this.cargaPrioritys(data)
                }
            }
        },
        fetch(){
            this.ementaCarregar()
            this.cargaPlan()
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    font-size: 16px;
    hyphens: auto;
    font-family: 'Roboto', sans-serif;
}
</style>