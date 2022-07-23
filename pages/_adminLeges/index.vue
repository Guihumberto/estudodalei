<template>
    <v-container class="mt-5" style="max-width: 1080px">
        <!-- <v-card class="mb-2" outlined>
            <v-card-text>
                <v-text-field
                    label="busca"
                    append-icon="mdi-magnify"
                    v-model="search"
                    outlined dense
                ></v-text-field>
            </v-card-text>
        </v-card> -->
        <v-card class="mb-2">
            <v-card-title>
                {{law[3]}} - {{law[4]}}
            </v-card-title>
        </v-card>
        <v-card v-if="textLaw[0]">
            <v-card-text>
                <v-list>
                    <v-list-item v-for="item, index in textLaw" :key="index">
                        <v-list-item-content>
                            <!-- <v-list-item-subtitle>{{index}}</v-list-item-subtitle> -->
                            <p>{{item.textLaw}}</p>
                        </v-list-item-content>
                        <v-list-item-action>
                            <div d-flex>
                                <link-sumula :dispositivo="item" :law="law" :index="index" />
                            </div>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <!-- loading -->
        <v-card v-else>
            <v-skeleton-loader
            class="mx-auto"
            type="article, actions"
            ></v-skeleton-loader>
            <v-skeleton-loader
                class="mx-auto"
                type="article, actions"
            ></v-skeleton-loader>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import linkSumula from '../../components/adm/forms/linkSumula.vue'
    export default {
  components: { linkSumula },
        data(){
            return{
                id: this.$route.query.id,
                title: this.$route.params.law,
                search: ''
            }
        },
        computed:{
            textLaw(){
                const law = this.$store.getters.readTextLaw
                if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    let filtro =  law.filter(item => exp.test(item.textLaw.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.art ))
                    return filtro
                } else {
                    return law
                }
            },
            law(){
                return this.$store.getters.readNameLaw
            }
        },
        methods:{
            ...mapActions(['cargaTextLaw', 'cargaNameLaw'])
        },
        created(){
            this.cargaTextLaw(this.id)
            this.cargaNameLaw(this.id)
        }
        
    }
</script>

<style lang="scss" scoped>

</style>