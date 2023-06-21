<template>
    <v-container class="mt-5 leges" style="max-width: 1080px">
        <v-btn small text class="px-0 mb-5"
        :to="{
            name: 'law-leges',
            params:{law: title},
        }">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card flat>
            <v-card-text class="text-h6">
                <h3>PONTOS RELEVANTES</h3>
                <span>
                   {{nameLaw[3]}} <br> Normativo: {{nameLaw[4]}}
                </span>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card flat class="mt-5">
                <v-card-text>
                    <v-text-field
                        label="Busca"
                        outlined dense
                        placeholder="digite o termo ou artigos"
                        v-model="search"
                        clearable
                        append-icon="mdi-magnify"
                    ></v-text-field>
                </v-card-text>
            </v-card>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <div>
                    <div v-for="item, i in textList" :key="i">
                        <div>
                            <p class="font-weight-black">{{bringCaputArt(item)}}</p>
                        </div>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <p 
                                    class="formatText"
                                    v-bind="attrs"
                                    v-on="on">
                                {{item.textLaw}}
                                </p>
                            </template>
                            <span>Art. {{item.art}}</span>
                        </v-tooltip>
                        <summary-juris :sumulasId="item.sumulas" :jurisId="item.idJuris" v-if="item.sumulas || item.idJuris" />
                        <summary-questoes class="my-2" :questoesId="item.idQuestions" v-if="item.idQuestions" />
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data(){
            return{
                title: this.$route.params.law,
                search: '',
                arrayCaputExist: []
            }
        },
        computed:{
            textCompleteLaw(){
                return this.$store.getters.readTextLaw
            },
            textList(){
                let list = this.textCompleteLaw.filter(i => i.idQuestions || i.sumulas)

                if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                    list =  this.$store.getters.readTextLaw.filter(item => exp.test(item.textLaw.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.art ))           
                }

                return list
            },
            nameLaw(){
                return this.$store.getters.readNameLaw
            },
        },
        methods:{
            ...mapActions(['cargaTextLaw', 'cargaNameLaw', 'saveFavDispositve', 'cargaFavDispositive', 'removeFavDispositive']),
            cargaLazy(){
                this.cargaFavDispositive(this.title)
                setTimeout(() => {
                    this.listFavDispositive = this.$store.getters.readFavDispositive
                    this.listFavDispositive = [...new Set(this.listFavDispositive)];
                }, 2000)
            },
            bringCaputArt(item){
                let caput = this.textCompleteLaw.find(i => i.order == 10 && i.art == item.art)

                if(caput) {
                    let caputExist = this.textList.find(i => i.id == caput.id)
            
                    if(!caputExist){
                        return caput.textLaw
                    } 
                }
            }
        },
        created(){
            this.cargaTextLaw(this.title)
            this.cargaNameLaw(this.title)
            this.cargaFavDispositive(this.title)
            this.cargaLazy()
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
}

</style>