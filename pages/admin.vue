<template>
   <v-container class="mt-5" style="max-width: 1080px" v-if="$store.state.adm">
        <v-btn class="mb-5" text @click="$router.go(-1)"> <v-icon>mdi-chevron-left</v-icon> voltar</v-btn>
        <v-card flat outlined min-height="80vh">
            <v-tabs  v-model="tab">
                <v-tab>Leis</v-tab>
                <v-tab>Súmulas</v-tab>
                <v-tab>Julgados</v-tab>
                <v-tab>Concursos</v-tab>
                <v-tab>Questões</v-tab>
                <v-tab>Provas</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card-title class="grey lighten-2 pb-0">
                        <span class="mt-n6">Administração</span> 
                        <v-spacer></v-spacer>
                        <v-text-field
                            outlined
                            dense
                            label="Buscar"
                            append-icon="mdi-magnify"
                            v-model="search"
                        ></v-text-field>
                        <adm-forms-titleLeges class="ml-2 mt-n6" @saveLaw="lawListInsert($event)" />
                    </v-card-title>
                    <v-card-text class="px-0">
                        <v-list two-line>
                            <v-list-item-group
                                v-model="selected"
                                active-class="pink--text"
                            >
                                <template v-for="(item, index) in lawList">
                                    <v-list-item :key="index">
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.nickname"></v-list-item-title>
                                            <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="item.nro"
                                            ></v-list-item-subtitle>
                                            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <v-list-item-action-text v-text="'ações'"></v-list-item-action-text>
                                            <div d-flex>
                                                <v-btn 
                                                    :to="{
                                                        name: 'adminLeges-legesAdmin',
                                                        params:{adminLeges: item.id},
                                                        // query:{id:item.id}  
                                                    }" 
                                                    small icon>
                                                    <v-icon>mdi-script-text</v-icon>
                                                </v-btn>
                                                <v-btn 
                                                    :to="{
                                                    name: 'include',
                                                    params:{include: item.nro},
                                                    query:{id:item.id}  
                                                    }" 
                                                    small icon>
                                                    <v-icon>mdi-folder-upload-outline</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-list-item-action>
                                    </v-list-item>
                                <v-divider></v-divider>
                                </template>
                            </v-list-item-group>
                            </v-list>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item>
                    <v-card-title  class="grey lighten-2 mb-2">
                        Súmulas
                        <v-spacer></v-spacer>
                        <v-btn color="primary" to="../adminLeges/sumulasAdmin" text>listar súmulas</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="viewSumula()" ref="form">
                            <v-radio-group v-model="sumula.orgao" row :rules="[rules.required]">
                                <v-radio
                                    v-for="n in orgao"
                                    :key="n.value"
                                    :label="n.name"
                                    :value="n.name"
                                ></v-radio>
                                </v-radio-group>
                            <v-checkbox
                                v-if="sumula.orgao == 'STF'"
                                v-model="sumula.vinculante"
                                label="Vinculante"
                            ></v-checkbox>
                            <v-textarea
                                label="Súmula"
                                v-model.trim="sumula.text"
                                placeholder="Nro da sumula, Texto, Tags"
                                outlined
                                dense
                                :rules="[rules.required]"
                                :height="sumula.text ? '70vh' : '20vh'"
                            >
                            </v-textarea>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn outlined @click="clearFields()" color="primary">limpar</v-btn>
                                <v-btn type="submit" color="primary">Enviar</v-btn>
                            </v-card-actions>
                        </v-form>

                    </v-card-text>
                    <v-card-text v-if="listSumulas.length">
                    <v-divider></v-divider>
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn color="success" text @click="listSumulas = []">Limpar</v-btn>
                            <v-btn color="success" @click="saveSumula()">Salvar</v-btn>
                        </v-card-title>
                        <div v-for="(item, index) in listSumulas" :key="index">
                            <div>
                                <v-avatar
                                    color="indigo"
                                    size="30"
                                >
                                    <span class="white--text text-h5">{{index+1}}</span>
                                </v-avatar><br>
                                Orgao: {{item.orgao}} <br>
                                Nro: {{item.nro}} <br>
                                Texto: {{item.text}} <br>
                                Tag: {{item.tag}} <br>
                            </div>
                            <v-divider class="my-4"></v-divider>
                        </div>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item>
                    <v-card-title  class="grey lighten-2">
                        Julgados
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" to="/adminLeges/jurisAdm">lista julgados</v-btn>
                    </v-card-title>
                    <adm-forms-jurisForms />
                </v-tab-item>
                <v-tab-item>
                    <v-card-title  class="grey lighten-2">
                        Concurso
                        <v-spacer></v-spacer>
                        <v-btn to="adminLeges/ementa" color="primary" text>Ementa</v-btn>
                    </v-card-title>
                    <adm-forms-concursoCreated />
                </v-tab-item>
                <v-tab-item>
                    <v-card-title  class="grey lighten-2">
                        Questões
                    </v-card-title>
                    <v-card-text>
                        <v-chip-group active-class="primary--text" v-model="amenities">
                            <v-chip 
                                v-for="item, i in bancas" :key="i"
                                @click="selectForm = item.id"
                                >
                                {{item.name}}
                            </v-chip>
                        </v-chip-group>
                    </v-card-text>
                    <concurso-questoes-cadQuestoes v-if="selectForm == 1" />
                    <concurso-questoes-cadCespeVF v-if="selectForm == 2" />
                    <concurso-questoes-cadQuestoesJulgue v-if="selectForm == 3" />
                </v-tab-item>
                <v-tab-item>
                    <v-card-title  class="grey lighten-2">
                        Provas
                    </v-card-title>
                    <concurso-provas-cadProvas />
                    <concurso-provas-listProvas />
                </v-tab-item>
            </v-tabs-items>
       </v-card>
   </v-container>
</template>

<script>

  import {mapActions} from 'vuex';
  const shortid = require('shortid');

  export default {
    data: () => ({
      amenities: '',
      selected: [2],
      search: '',
      tab: 3,
      listSumulas: [],
      selectForm: 1,
      bancas:[
        {id: 1, name: "FGV/OAB"},
        {id: 2, name: "CESPE/VF"},
        {id: 3, name: "Julgue"},
      ],
      sumula:{
         text: '',
         orgao: '',
         vinculante: false
      },
      orgao:[
        {name: 'STF', value: 1},
        {name: 'STJ', value: 2}
      ],
      rules:{
            required: (value) => !!value || "Campo obrigatório",
        }
    }),
    computed:{
        lawList(){
            let listLaws = this.$store.getters.readLawsList
            if(this.search){
              //retirar acentuação
              let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
              //retirar caracteres especiais
              let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
              //fazer o filtro
              let filtro = listLaws.filter(project => exp.test(project.nickname.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( project.nro ))
              return filtro
            } else {
              return listLaws
            }
        }
    },
    methods:{
        ...mapActions(['setLaw', 'setSumula', 'cargaProvas']),
        lawListInsert(event){
            event.id = shortid.generate()
            this.setLaw(event)
        },
        viewSumula(){
            if(this.$refs.form.validate()){
                let listSumulaTemp = this.sumula.text.split('\n\n')
                let listSumula = []

                listSumulaTemp.forEach(i => {
                    let text = i.split('\n')
                    let listSumulaItem = {}
        

                    listSumulaItem.id = shortid.generate()
                    listSumulaItem.orgao = this.sumula.orgao
                    listSumulaItem.vinculante = this.sumula.vinculante
                    listSumulaItem.nro = text[0]
                    let ultimo = text.length - 2
                    listSumulaItem.text = text.splice(1, ultimo).join(' ')
                    listSumulaItem.tag = []

                    text.at(-1).split(',').forEach(i => {
                        listSumulaItem.tag.push(i.toUpperCase())
                    })


                    listSumula.push(listSumulaItem)
                })
                this.listSumulas = listSumula
                this.clearFields()
            }  
        },
        saveSumula(){

                this.listSumulas.forEach( item => this.setSumula(item))
                console.log( this.listSumulas);
                this.clearFields()
                this.listSumulas = []
        },
        clearFields(){
            this.sumula = {
                text: '',
                orgao: '',
                vinculante: false
            }
        },
        tabSelect(){
            if(this.$route.params.tab){
                this.tab = this.$route.params.tab
            } else {
                this.tab = 0
            }
        }
    },
    created(){
        this.cargaProvas()
        this.tabSelect()
    }
  }
</script>

<style scoped>

</style>