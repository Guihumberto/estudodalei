<template>
    <div>
        <v-card-title>
            <v-tabs
            v-model="tab"
            >
            <v-tab
                v-for="n in tabs"
                :key="n"
            >
                {{ n }}
            </v-tab>
            </v-tabs>
        </v-card-title>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card-text>
                    <v-list>
                        <template v-for="(item, index) in sumulas" >
                            <v-divider v-if="index != 0"></v-divider>
                            <v-list-item :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-chip dark :color="item.orgao == 'STF' ? 'indigo' : 'error'" x-small>{{item.orgao}}</v-chip> Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}} </v-list-item-title>
                                    <v-list-item-subtitle></v-list-item-subtitle>
                                    <div class="pl-1 mt-1"> <p class="caption">{{item.text}}</p></div>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        
                    </v-list>
                </v-card-text>
            </v-tab-item>
            <v-tab-item>
                <v-card-text>
                    <p>Não há comentários cadastrados</p>
                    <v-btn text>Faça Login</v-btn>
                </v-card-text>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tab: null,
                tabs: ['Súmulas', 'Meus Comentários']
            }
        },
        props:{
            sumulasId: false
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
                
            }
        },
        methods:{

        },
    }
</script>

<style lang="scss" scoped>

</style>
