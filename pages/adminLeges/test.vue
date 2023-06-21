<template>
    <div v-if="$store.state.adm">
        <h1>testes</h1>
        <v-btn @click="save()">Salvar</v-btn>
        <v-btn @click="gravar()">Gravar</v-btn>
        <v-btn @click="removeAll()">Exclulir tudo</v-btn>
        {{list.length}}
        <div>
            <p v-for="item, index, in listNew" :key="index">
                {{item.disciplina}}
            </p>
            
    </div>
    <v-card outlined>
       {{list.length}}
    </v-card>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                listNew: [],
                items: [
                    {
                    id: 5,
                    name: 'Documents :',
                    children: [
                        {
                            id: 6,
                            name: 'vuetify :',
                            children: [
                                {
                                id: 7,
                                name: 'src :',
                                children: [
                                    { id: 8, name: 'index : ts' },
                                    { id: 9, name: 'bootstrap : ts' },
                                ],
                                },
                            ],
                        },
                        {
                            id: 10,
                            name: 'material2 :',
                            children: [
                                {
                                id: 11,
                                name: 'src :',
                                children: [
                                    { id: 12, name: 'v-btn : ts' },
                                    { id: 13, name: 'v-card : ts' },
                                    { id: 14, name: 'v-window : ts' },
                                ],
                                },
                            ],
                        },
                    ],
                    },
                ]
            }
        },
        computed:{
            list(){
                
                let textLaw = this.$store.getters.readTextLaw

                return textLaw.slice(1798, 4207)
            }
        },
        methods:{
            ...mapActions(['editJuris', 'deleteJurisFB', 'cargaTextLaw']),
            save(){
                let art = 0
                this.list.forEach(i => {
                  
                    if(i.textLaw.startsWith('Art. ')){
                        art = i.textLaw.substr(5, 5).replace('.', '')
                        i.art = art
                    } else {
                        if(art){
                            i.art = art
                        }

                    }
                })
                console.log(this.list) 
            },
            gravar(){
                this.listNew.forEach(i => {
                    this.editJuris(i)
                })
            },
            removeAll(){
                this.listNew.forEach(i => {
                    this.deleteJurisFB(i.id)
                })
            }
        },
        created(){
            this.cargaTextLaw('8Ls0mb3b-')
        }
    }
</script>

<style lang="scss" scoped>

</style>