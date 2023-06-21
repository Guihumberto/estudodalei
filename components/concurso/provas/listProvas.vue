<template>
    <v-card outlined class="ma-5 pa-5">
        <v-card-text>
            <v-text-field
                label="Busca"
                dense outlined
                placeholder="pesquisar"
                v-model="search"
                clearable
            ></v-text-field>
            <v-checkbox
                class="mt-n5"
                label="Somente Ativos"
                v-model="isActive"
            ></v-checkbox>
        </v-card-text>
        <v-card-text>
            <v-row align="center">
                <v-col
                    cols="12"
                    sm="6"
                >
                    <v-select
                        v-model="yearSelect"
                        :items="listYear"
                        attach
                        chips
                        label="Ano"
                        multiple
                        clearable
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn color="success" @click="activeYear"><v-icon>mdi-power-standby</v-icon></v-btn>
                <v-btn color="error" @click="DesactiveYear"><v-icon>mdi-power-standby</v-icon></v-btn>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-text>
            <v-list>
                <template v-for="item, index in listProves">
                    <v-divider v-if="index != 0"></v-divider>
                    <v-list-item :key="index">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{item.id}} - {{item.cargo}} - {{item.year}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{item.orgao}} - {{item.id}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action class="d-flex">
                            <!-- <v-btn icon @click="editProve(item)"><v-icon>mdi-file-edit</v-icon></v-btn>
                            <v-btn icon @click="removeProve(item)"><v-icon>mdi-delete</v-icon></v-btn> -->
                            <v-switch 
                                label="Ativar" v-model="item.active" @click="changeActive(item)">
                            </v-switch>
                        </v-list-item-action>
                    </v-list-item>
                </template>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                search: '',
                yearSelect: [],
                isActive: false
            }
        },
        computed:{
            listProves(){
                let list = this.$store.getters.readProvas.filter( i => i)

                if(this.isActive){
                    list = list.filter(i => i.active)
                }

                if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*_+=]/g, ""), "i")
                    //fazer o filtro
                    let filtro =  list.filter(item => exp.test(item.cargo.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.orgao ) || exp.test( item.year ))
                    list = filtro
                }
                
                return list
            },
            lastId(){
                let last = this.listProves.at(-1)
                return last.id++
            },
            listYear(){
                let list = this.$store.getters.readProvas.filter( i => i)
                list = list.map(i => i.year)
                return list.sort(this.order)
            },
            listCompleteProves(){
                let list = this.$store.getters.readProvas.filter( i => i)
                return list
            }
        },
        methods:{
            ...mapActions(['ediSetProve']),
            changeActive(item){
                this.ediSetProve(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Status alterado!', color:'success'})
            },
            removeProve(item){
                console.log('ok')
            },
            editProve(item){
                console.log('ok')
            },
            activeYear(){
                if(this.yearSelect.length){
                    this.yearSelect.forEach(i => {
                       this.listCompleteProves.forEach(list => {
                            if(list.year == i && list.active == false){
                                list.active = true
                                this.ediSetProve(list)
                            }
                       })
                    })
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Ano alterado!', color:'success'})
                } else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Selecione o ano!', color:'error'})
                }
            },
            DesactiveYear(){
                if(this.yearSelect.length){
                    this.yearSelect.forEach(i => {
                       this.listCompleteProves.forEach(list => {
                            if(list.year == i && list.active == true){
                                list.active = false
                                this.ediSetProve(list)
                            }
                       })
                    })
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Ano alterado!', color:'success'})
                } else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Selecione o ano!', color:'error'})
                }
            },
            order(a, b){
                return a - b
            }
        },
    }
</script>

<style scoped>

</style>