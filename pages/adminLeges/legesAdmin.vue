<template>
    <v-container class="mt-5" style="max-width: 1080px">
        <v-btn outlined class="mb-5" text @click="$router.go(-1)">voltar</v-btn>
        <v-card class="mb-2">
            <v-card-title>
                {{law[3]}} - {{law[4]}}
            </v-card-title>
        </v-card>
        <v-card v-if="textLaw[0]" outlined>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="item, index in textLaw.slice(0, showMore)" :key="index">
                        <v-list-item-content>
                            <v-list-item-subtitle>
                                <v-chip-group>
                                    <v-chip x-small outlined color="error" v-if="item.sumulas" label>{{item.sumulas.length}}</v-chip>
                                    <v-chip x-small outlined color="primary" v-if="item.sumulas" label>0</v-chip>
                                    <v-chip x-small outlined color="purple" v-if="item.sumulas" label>0</v-chip>
                                </v-chip-group>
                            </v-list-item-subtitle>
                            <p>{{item.textLaw}}</p>
                        </v-list-item-content>
                        <v-list-item-action>
                            <div class="d-flex">
                                <adm-forms-linkSumula :dispositivo="{item: item, law: law, index: index}" />
                            </div>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-btn 
                    v-if="textLaw.length > showMore"
                    block color="primary" 
                    outlined @click="showMore += 100">mostrar mais
                </v-btn>
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
    export default {
        data(){
            return{
                id: this.$route.params.adminLeges,
                showMore: 100,
            }
        },
        computed:{
            textLaw(){
                const law = this.$store.getters.readTextLaw
                return law
               
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