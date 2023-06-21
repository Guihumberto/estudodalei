<template>
    <v-card outlined class="pa-5 ma-5">
        <v-card-text>
            <h4 class="text-h5">Inserir Prova</h4>
            {{lastId}}
            <v-form @submit.prevent="saveProve()" ref="refs">
                <v-row>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="ID"
                            placeholder="Digite o número do ID"
                            dense outlined
                            v-model.trim="prova.id"
                            :rules="[rules.required]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Cargo"
                            placeholder="Digite o nome do cargo"
                            dense outlined
                            v-model.trim="prova.cargo"
                            :rules="[rules.required]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Ano"
                            type="number"
                            placeholder="Selecione o ano"
                            dense outlined
                            v-model.trim="prova.year"
                            :rules="[rules.required]"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="mt-n6">
                    <v-col cols="12" sm="4">
                        <v-text-field
                            label="Orgão"
                            placeholder="Digite o nome do orgão ou entidade"
                            dense outlined
                            v-model.trim="prova.orgao"
                            :rules="[rules.required]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select
                            label="Banca"
                            placeholder="Selecione a banca"
                            dense outlined
                            :items="bancas"
                            item-value="id"
                            item-text="name"
                            v-model="prova.banca"
                            :rules="[rules.required]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-select
                            label="Área"
                            placeholder="escolha a área"
                            dense outlined
                            :items="area"
                            item-value="id"
                            item-text="name"
                            v-model="prova.area"
                            :rules="[rules.required]"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-subheader>
                    <v-spacer></v-spacer>
                    <v-switch
                        label="ativo"
                        v-model="prova.active"
                    ></v-switch>
                </v-subheader>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="clearFields()" outlined color="primary">Limpar</v-btn>
                    <v-btn type="submit" color="primary">Salvar</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data(){
            return{
                prova:{
                    id: this.lastId,
                    cargo: '',
                    orgao: '',
                    year: 2022,
                    banca: '',
                    area: '',
                    active: false
                },
                bancas:[
                    {id: 1, name: 'FGV'},
                    {id: 2, name: 'CESPE'},
                    {id: 3, name: 'FCC'},
                ],
                area:[
                    {id: 1, name: 'Controle'},
                    {id: 2, name: 'Fiscal'},
                    {id: 3, name: 'Jurídica'},
                    {id: 4, name: 'Magistratura'},
                    {id: 5, name: 'OAB'},
                    {id: 6, name: 'Outras'},
                ],
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
                    minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
                },
            }
        },
        computed:{
            listProves(){
                let list = this.$store.getters.readProvas.filter( i => i)
                return list
            },
            lastId(){
                let last = this.listProves.at(-1)
                last = parseInt(last.id)
                return last+1
            }
        },
        methods:{
            ...mapActions(['setProve']),
            saveProve(){
                if(this.$refs.refs.validate()){
                    this.setProve(this.prova)
                    this.clearFields()
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Prova salva com sucesso.', color:'success'})
                }
            },
            clearFields(){
                this.prova = {
                    id: 0,
                    cargo: '',
                    orgao: '',
                    year: 2022,
                    banca: '',
                    area: '',
                    active: false
                }
            }
        }
    }
</script>

<style scoped>

</style>