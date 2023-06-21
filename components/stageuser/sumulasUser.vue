<template>
    <v-card flat>
        <v-card-text>
            <v-chip-group
                v-model="fitlerDisciplina"
                column
                multiple
            >
                <v-chip
                v-for="item, index, in disciplinaFav" :key="index"
                :value="item.sigla"
                filter
                outlined> {{item.name}}
                </v-chip>
            </v-chip-group>

            
            <v-list>
                <template v-for="item, index in listFavoritesSumulas.slice(0, showMore)">
                    <v-divider v-if="index != 0"></v-divider>
                    <v-list-item :key="index" class="mt-5">
                        <v-list-item-content>
                            <div>
                                Súmula <span v-if="item.vinculante">Vinculante</span>
                                {{item.nro}}
                                <v-chip-group>
                                    <v-chip 
                                        small 
                                        :color="!!nomeSigla(item) ? 'success': 'secondary'"
                                        :label="!!nomeSigla(item)"
                                        outlined
                                        v-for="item, index in item.tag" :key="index">
                                        {{nomeSigla(item) || item}}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                            <div>
                                <p class="formatText">{{item.text}}</p>
                            </div>
                        </v-list-item-content>     
                    </v-list-item>
                </template>
            </v-list>
            <div class="text-center" v-if="showMore <= listFavoritesSumulas.length">
                <v-btn 
                    color="success"
                    outlined
                    :block="false"
                    @click="showMore +=5"
                    >
                    VER MAIS
                </v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data(){
            return{
                sumulasList: [],
                showMore: 5,
                fitlerDisciplina: []
            }
        },
        props:{
            user: Object
        },
        computed:{
            favSumulas(){
                return this.$store.getters.readFavSumulas || false
            },
            listFavoritesSumulas(){
                let list = []
                if(this.favSumulas){
                    this.favSumulas.forEach(id => {
                        this.sumulasList.forEach(sml => {
                            if(sml.id == id) {
                                list.push(sml)
                            }
                        })
                    })
                }

                if(this.fitlerDisciplina.length){
                    let newList = []
                    this.fitlerDisciplina.forEach(tag => {
                        list.forEach(i => {
                            i.tag.forEach(tg => {
                                if(tg == tag){
                                    newList.push(i)
                                }
                            })
                        })
                    })
                    list = newList
                }

                return list
            },
            disciplinas(){
                return this.$store.getters.readDisciplinas
            },
            disciplinaFav(){
                let listSigla = []
                this.listFavoritesSumulas.forEach(i => {
                    i.tag.forEach(tag => {
                            this.disciplinas.forEach(dis => {
                                if(dis.sigla == tag){
                                    listSigla.push(dis)
                                }
                            })
                    })
                })
                listSigla = [...new Set(listSigla)]
                return listSigla
            }
        },
        methods:{
            ...mapActions(['cargaSumulasFavLists']),
            nomeSigla(sigla){
                let nome = this.disciplinas.find(i => i.sigla == sigla)
                if(nome){
                    return nome.name.toUpperCase();
                }
            },
        },
        fetch() {
            this.sumulasList = this.$store.getters.readSumulas
            this.cargaSumulasFavLists(this.user.uid)
        },
    }
</script>

<style scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    line-height: 2;
}
</style>