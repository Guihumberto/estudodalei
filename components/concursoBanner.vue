<template>
    <v-card class="ml-3 my-2" outlined color="grey lighten-3">
        <v-card-title class="pb-0"><v-icon>mdi-group</v-icon>Leis por concurso</v-card-title>
        <v-card-text class="pa-5">
            <p>Leis agrupadas por concurso e organizadas por disciplina (beta).</p>
                <v-item-group multiple>
                    <v-container>
                        <v-row>
                            <v-col
                            v-for="item, index in concursosList.slice(0, 4)"
                            :key="index"
                            cols="12"
                            md="3"
                            >
                            <v-item v-slot="{ active }">
                                <v-card
                                :color=" active ? 'white': 'colorBannerConcurso'"
                                class="d-flex align-center"
                                dark
                                height="200"
                                :to="{
                                    name: 'concurso-concurso',
                                    params:{concurso: item.id},
                                    // query:{id:item.id}  
                                }"
                                >
                                <v-scroll-y-transition>
                                    <div
                                        v-if="!active" 
                                        class="flex-grow-1 text-center">
                                        <br><br>
                                        <p class="text-h5">{{item.name}}</p>
                                        <p> <span class="text--bold">{{item.banca}}</span> <br>{{nameStatus(item.status)}}</p>
                                    </div>
                                </v-scroll-y-transition>
                                </v-card>
                            </v-item>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-item-group>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                status:[
                    {name: 'em breve', id: 0},
                    {name: 'Autorizado', id: 1},
                    {name: 'Edital Publicado', id: 2},
                    {name: 'Inscrições Abertas', id: 3},
                    {name: 'Inscrições Encerradas', id: 4},
                ]
            }
        },
        computed:{
            concursosList(){
                const list = this.$store.getters.readConcursosList
                return list
            }
        },
        methods:{
            nameStatus(item){
                let name = ''
                name = this.status.find(i => i.id == item)
                return name.name
            }
        }
    }
</script>

<style lang="scss" scoped>
.colorBannerConcurso{
    background: rgb(88,50,126);
    background: -moz-linear-gradient(115deg, rgba(88,50,126,1) 0%, rgba(8,58,144,1) 90%, rgba(15,67,156,1) 100%);
    background: -webkit-linear-gradient(115deg, rgba(88,50,126,1) 0%, rgba(8,58,144,1) 90%, rgba(15,67,156,1) 100%);
    background: linear-gradient(115deg, rgba(88,50,126,1) 0%, rgba(8,58,144,1) 90%, rgba(15,67,156,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#58327e",endColorstr="#0f439c",GradientType=1);
}

</style>