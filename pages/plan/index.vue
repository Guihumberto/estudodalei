<template>
    <v-container style="max-width:1080px">
        <h1 class="text-h5 mb-5">Planejamento</h1>
        <v-btn small text class="px-0 mb-5" text @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card outlined>
            <v-card-text>
                <v-list>
                    <template v-for="item, index in listPlanImports">
                        <v-list-item :key="index" 
                            :to="`plan/cargo/${item.concursoId}concursocargo${item.id}`"
                        >
                            <v-list-item-icon>
                                <v-icon>mdi-menu-right</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item.concursoName}} / {{item.name}}
                                </v-list-item-title>
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

            }
        },
        computed:{
            user(){
                return this.$store.getters.readUser
            },
            plan(){
                return this.$store.getters.readPlanComplete
            },
            concursos(){
                return this.$store.getters.readConcursosList
            },
            listPlanImports(){
                let list = []

                this.concursos.forEach(conc => {
                    conc.cargos.forEach(carg => {
                        this.plan.forEach( index => {
                           Object.keys(index).forEach(ob => {
                                if(ob == carg.id) {
                                    carg.concursoId = conc.id
                                    carg.concursoName = conc.name
                                    list.push(carg)
                                }
                           })   
                        })
                    })
                })

                return list
            }
        },
        methods:{
            ...mapActions(['cargaPlan']),
        },
        fetch() {
           this.cargaPlan(this.user.uid)
        }
    }
</script>

<style scoped>

</style>