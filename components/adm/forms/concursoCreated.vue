<template>
    <div>
        <v-card-text>
              <h5 class="text-h5 mb-5">Informações Gerais</h5>
                <v-text-field
                    label="Concurso"
                    dense outlined
                    required
                    v-model="concurso.name"
                ></v-text-field>
                <v-text-field
                    label="Banca"
                    dense outlined
                    required
                    v-model="concurso.banca"
                ></v-text-field>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Inscrição Início"
                            dense outlined
                            required
                            type="date"
                            v-model="concurso.dateStartIns"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Inscrição Fim"
                            dense outlined
                            required
                            type="date"
                            v-model="concurso.dateLastIns"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                    label="Dia da Prova"
                    dense outlined
                    type="date"
                    required
                    v-model="concurso.dateProva"
                ></v-text-field>
                <v-row>
                    <v-col cols="6" sm="8">
                        <v-text-field
                            label="Cargo"
                            dense outlined
                            type="text"
                            required
                            v-model="cargo.name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4" sm="2">
                        <v-text-field
                            label="Vagas"
                            dense outlined
                            type="number"
                            required
                            v-model="cargo.vagas"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1" sm="2">
                        <v-btn @click="addCargo()" icon color="success">
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col class="mt-n6 pt-0 mb-3" cols="12">
                        <v-chip-group>
                            <v-chip 
                                outlined color="primary"
                                close
                                @click:close="concurso.cargos.splice(index, 1)"
                                v-for="item, index in concurso.cargos" :key="index">
                                {{item.name}} - {{item.vagas}}
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-select
                    label="Status"
                    v-model="concurso.status"
                    :items="status"
                    item-value="id"
                    item-text="name"
                    dense outlined
                    required
                ></v-select>
                <v-checkbox
                    label="Mostrar"
                    v-model="concurso.show"
                ></v-checkbox>
        </v-card-text>
        <v-card-text>
            <h5 class="text-h5">Disciplinas</h5>
                <v-expansion-panels class="mt-5 mb-6">
                    <v-expansion-panel
                        v-for="(item, i) in discplinaList"
                        :key="i"
                    >
                        <v-expansion-panel-header expand-icon="mdi-menu-down">
                        {{item.name}}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-list>
                                <template v-for="list, index in lawList.filter(i => i.subject == item.sigla)">
                                    <v-list-item :key="index">
                                       <v-checkbox
                                        v-model="concurso.disciplinas"
                                        :value="list.id"
                                        ></v-checkbox>
                                        <v-list-item-content>
                                            {{list.nickname}} - {{list.nro}}
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outlined color="primary" @click="clearAll()">limpar</v-btn>
                    <v-btn color="primary" @click="saveConcurso">salvar</v-btn>
                </v-card-actions>
            </v-card-text>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    const shortid = require('shortid');
    export default {
        data(){
            return{
                id: this.$route.query.id,
                nameTitle: this.$route.params.concurso,
                concurso:{
                    name: '',
                    banca: '',
                    dateStartIns: '',
                    dateLastIns: '',
                    dateProva: '',
                    cargos: [],
                    status: 0,
                    disciplinas: [],
                    show: true
                },
                cargo: {id: shortid.generate(), name: '', vagas: 0},
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
            discplinaList(){
                let disciplinas = this.$store.getters.readDisciplinas 
                return disciplinas 
            },
            lawList(){
                return this.$store.getters.readLawsList
            }
        },
        methods:{
            ...mapActions(['setConcurso']),
            clearAll(){
                this.concurso = {
                    name: '',
                    banca: '',
                    dateStartIns: '',
                    dateLastIns: '',
                    dateProva: '',
                    cargos: [],
                    status: 0,
                    disciplinas: []
                }
            },
            addCargo(){
                if(this.cargo.name){
                    this.concurso.cargos.push(this.cargo)
                    this.cargo = {name: '', vagas: 0}
                }
            },
            saveConcurso(){
                this.concurso.id = shortid.generate()
                this.setConcurso(this.concurso)
                this.clearAll()
                this.$store.dispatch("snackbars/setSnackbars", {text:'Concurso criado com sucesso', color:'success'})
                this.cargo = {id: shortid.generate(), name: '', vagas: 0}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>