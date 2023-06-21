<template>
    <v-container style="max-width: 1080px">
        <h1 class="mb-5 text-h5">Planejamento</h1>
        <v-btn small text class="px-0 mb-5" text @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card outlined>
            <v-card-title class="grey white--text mb-5">Prioridades</v-card-title>
            <v-card-text>
                    <v-list>
                        <h1 class="mb-2 text-h5">Conhecimentos Gerais</h1>
                        <template v-for="item, index in filterPlan.geral">
                           <span class="ml-2 text-h6" :key="index">{{index}}</span> 
                            <v-list-item v-for="item, index in item" :key="index"> 
                                <p class="my-0">{{item}}</p>
                            </v-list-item>
                        </template>
                    </v-list>
                    <v-list>
                        <h1 class="text-h5 mb-2">Conhecimentos Específicos</h1>
                        <template v-for="item, index in filterPlan.especifica">
                           <span class="ml-2 text-h6" :key="index">{{index}}</span> 
                            <v-list-item v-for="item, index in item" :key="index">
                                <v-list-item-content>
                                    <p class="my-0">{{item}}</p>
                                </v-list-item-content>
                                
                            </v-list-item>
                        </template>
                    </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                caseSensitive: true,
                open: [1, 2],
                search: null,
            }
        },
        computed:{
            idConcurso(){
                let ids = this.$route.params.id.split('concursocargo')
                return ids
            },
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
                let list = this.$store.getters.readPlan
                let listExport ={geral: [], especifica: []}

                list.forEach(type => {
                    Object.keys(type).forEach( el =>{
                        if(el == 'geral'){
                            listExport.geral = type.geral
                        } else if(el == 'especifica'){
                            listExport.especifica = type.especifica
                        }
                    })
                })
                
                return {
                        geral: listExport.geral, 
                        especifica: listExport.especifica
                       }
            },
            filterPlan(){
                let list1 = []
                let list2 = []

                this.ementa.geral.forEach( em => {
                    this.plan.geral.forEach( plan =>{
                        if(plan.idDisciplina == em.id){
                            list1.push({disciplina: em.name, id: em.id, assunto: plan.name})
                        }
                    })
                })

                this.ementa.especifica.forEach( em => {
                    this.plan.especifica.forEach( plan =>{
                        if(plan.idDisciplina == em.id){
                            list2.push({disciplina: em.name, id: em.id, assunto: plan.name})
                        }
                    })
                })

                const nova = list1.reduce((disciplina, assunto) => {
                    disciplina[assunto.disciplina] = disciplina[assunto.disciplina] || []
                    disciplina[assunto.disciplina].push(assunto.assunto)
                    return disciplina
                }, {})

                const nova2 = list2.reduce((disciplina, assunto) => {
                    disciplina[assunto.disciplina] = disciplina[assunto.disciplina] || []
                    disciplina[assunto.disciplina].push(assunto.assunto)
                    return disciplina
                }, {})


                return {geral: nova, especifica: nova2}
            }
        },
        methods:{
            ...mapActions(['cargaEmenta', 'cargaPrioritys']),
            ementaCarregar(){
                this.cargaEmenta([this.idConcurso[0], this.idConcurso[1]])
            },
            cargaPlan(){
                if(this.user.uid){
                    let data = {uid: this.user.uid, concurso: this.idConcurso[0], cargo: this.idConcurso[1]}
                    this.cargaPrioritys(data)
                }
            }
        },
        created(){
            this.ementaCarregar()
            this.cargaPlan()
        }
    }
</script>

<style scoped>

</style>