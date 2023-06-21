<template>
   <v-container class="mt-5" style="max-width: 1080px" v-if="$store.state.adm">
        <h1 class="text-h4">Súmulas</h1>
        <v-card class="mb-2">
            <!-- barra de buscas -->
            <v-card-text class="mt-3">
              <p>Faça busca por termo ou número.</p>
              <v-text-field
                label="Busca"
                append-icon="mdi-magnify"
                outlined
                dense
                required
                v-model.trim="search"
                @keydown.enter="filterJustSumula(search.replace(/[^0-9]/g,''))"
              ></v-text-field>
              <div class="d-flex mt-n6">
                <v-radio-group v-model="filtroOrgao" row>
                  <v-radio
                    v-for="item in orgao"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></v-radio>
                </v-radio-group>
                
                <v-expand-x-transition>
                  <v-switch
                    v-if="filtroOrgao == 'STF'"
                    label="Vinculante"
                    dense
                    v-model="filtroVinculante"
                  ></v-switch>
                </v-expand-x-transition>

              </div>
              <div v-if="search.replace(/[^0-9]/g,'')">
                <v-chip-group>
                  <v-chip @click="filterJustSumula(search.replace(/[^0-9]/g,''))">
                      nro: {{search.replace(/[^0-9]/g,'')}} <small class="red--text" v-if="msgError"> &nbsp {{msgError}}</small>
                  </v-chip>
                </v-chip-group>
              </div>
              <v-btn @click="disciplinaVue = !disciplinaVue" x-small text>busca por disciplina 
                <v-icon small> {{disciplinaVue ? 'mdi-menu-down' : 'mdi-menu-right'}} </v-icon>
              </v-btn>
            </v-card-text>
            <v-expand-transition>
              <v-card-text v-if="disciplinaVue">
                  <v-autocomplete
                    label="Disciplina"
                    dense
                    multiple
                    v-model="filterDisciplinas"
                    :items="disciplinas"
                    item-text="name"
                    item-value="sigla"
                    chips
                  >
                      <template v-slot:selection="data">
                        <v-chip
                          class="mb-1"
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                          @click="data.select"
                          @click:close="remove(data.item)"
                        >
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                  </v-autocomplete>
              </v-card-text>
            </v-expand-transition>
        </v-card>
        <!-- nao encontrado -->
        <v-card outlined min-height="10vw" v-if="listSumulas == 99">
          <v-card-text>
              <v-alert
                outlined dense
                type="error"
              >Resultado da pesquisa <b style="text-decoration: underline red;">não encontrado</b>. Refaça a busca!</v-alert>
          </v-card-text>
        </v-card>
        <!-- sumulas filtradas e list -->
        <v-card outlined min-height="80vh" v-else-if="listSumulas.length">          
            <!-- sumulas filtradas -->
            <v-card-text v-if="sumulasFilterActive">
              Filtros <v-btn @click="sumulasFilterView = !sumulasFilterView" x-small icon>
              <v-icon>{{sumulasFilterView ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon>
              </v-btn>
              <v-expand-transition>
                <div v-if="sumulasFilterView">
                  <v-alert 
                    v-for="item, index in listFilterSumulas" :key="index"
                    outlined dense text 
                    >
                    <v-row align="center">
                      <v-col class="grow">
                        <div class="font-weight-bold">{{item.orgao}} - Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}</div>
                        <p>{{item.text}}</p>
                      </v-col>
                      <v-col class="shrink">
                        <v-btn icon @click="deleteFilterList(item.nro, index)"><v-icon>mdi-close-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
                </div>
              </v-expand-transition>
            </v-card-text>
            <!-- sumulas listadas -->
            <v-card-text>
              <v-list>
                  <v-subheader>
                    <v-spacer></v-spacer>
                    Total: {{listSumulas.length}}
                    <v-btn icon @click="reverse = !reverse">
                      <v-icon>{{reverse ? 'mdi-order-alphabetical-ascending' : 'mdi-order-alphabetical-descending'}}</v-icon>
                    </v-btn>
                  </v-subheader>
                  <template v-for="(item, index) in listSumulas.slice(0, showMoreSUmulas)">
                    <v-divider v-if="index != 0" inset></v-divider>
                  <v-list-item :key="index">
                  <v-list-item-avatar class="px-auto">
                    <v-avatar
                        :color=" item.orgao == 'STF' ? 'indigo' : 'error'"  
                        size="48"
                        class="px-auto"
                      >
                        <span class="white--text text-h6">{{item.orgao}}</span>
                      </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-title>
                      Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}
                      <v-chip class="mr-1" x-small v-for="(tag, index) in item.tag" :key="index">{{tag}}</v-chip>
                      </v-list-item-title>
                      <div class="mt-2"> <p class="caption">{{item.text}}</p></div>
                  </v-list-item-content>
                  {{item.id}}
                  <adm-forms-editSumulas :sumula="item" />
                  <v-btn 
                    :loading="loadDeleteSumula"
                    @click="deleteSumula(item)" icon>
                    <v-icon color="red lighten-2">mdi-delete-circle</v-icon>
                  </v-btn>
                  </v-list-item>
                  </template>
              </v-list>
              <!-- btn ver mais -->
              <div class="text-center" v-if="showMoreSUmulas < listSumulas.length">
                <v-btn
                  class="ma-2"
                  :block="sizeScreen"
                  outlined
                  @click="showMoreSUmulas += 10"
                  color="indigo">
                  <v-icon class=" ml-n2 mr-1">mdi-plus</v-icon>
                  Ver mais
                </v-btn>
              </div>
            </v-card-text>
        </v-card>
        <!-- barra de loading -->
        <v-card outlined v-else>
          <v-card-text>
            <v-skeleton-loader
              v-bind="attrs"
              type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
            ></v-skeleton-loader>
          </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data () {
      return {
        dialog: false,
        disciplinaVue: false,
        disciplinas:[
          {name: 'Direito Tributário', sigla: 'DT'},
          {name: 'Direito Constitucional', sigla: 'DC'},
          {name: 'Direito Administrativo', sigla: 'DA'},
          {name: 'Direito Previdenciário', sigla: 'PREV'},
          {name: 'Direito do Consumidor', sigla: 'CONS'},
          {name: 'Direito Civil', sigla: 'CC'},
          {name: 'Direito Penal', sigla: 'DP'},
          {name: 'Processo Civil', sigla: 'PC'},
          {name: 'Processo Penal', sigla: 'PP'},
          {name: 'Direito Eleitoral', sigla: 'ELT'},
          {name: 'Direito Empresarial', sigla: 'EMP'},
          {name: 'Criança e Adolescente', sigla: 'ECA'},
          {name: 'Execução Penal', sigla: 'EP'},
        ],
        filterDisciplinas:[],
        reverse: false,
        attrs: {
          class: 'mb-6',
          boilerplate: true,
          elevation: 2,
        },
        orgao: ['Todos', 'STF', 'STJ'],
        filtroOrgao: 'Todos',
        filtroVinculante: false,
        search: '',
        sumulasFilterView: true,
        sumulasFilterList: [],
        msgError: '',
        showMoreSUmulas: 50,
        loadDeleteSumula: false
      }
    },
    computed:{
      listSumulas(){
        let sumulas = this.$store.getters.readSumulas
        let tagsFilter = []
        
        if(this.search){
              let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
              //retirar caracteres especiais
              let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")

              if(this.filtroOrgao != 'Todos') {
                sumulas = sumulas.filter (i => i.orgao == this.filtroOrgao)
              }
              if(this.filtroVinculante){
                sumulas = sumulas.filter (i => i.vinculante)
              }
              //fazer o filtro
              let filtro = sumulas.filter(item => exp.test(item.text.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.nro ) || exp.test( item.text ))
              
              if(this.filterDisciplinas.length){
              this.filterDisciplinas.forEach(tag => {
                filtro.forEach(i => {
                    if(i.tag == tag){
                      tagsFilter.push(i)
                    }
                })
              })
              filtro = tagsFilter
            }

              return filtro.length
                    ? filtro.sort(this.order)
                    : 99
        } else {
            if(this.filtroVinculante){
              sumulas = sumulas.filter (i => !i.vinculante)
              // ALTGERAR AQUI TIRAR O ! PARA PEGAR AS VINCULANTES
            }
            if(this.filtroOrgao != 'Todos') {
              if(this.filtroOrgao == 'STJ'){
                sumulas = this.$store.getters.readSumulas
              }
                  sumulas = sumulas.filter (i => i.orgao == this.filtroOrgao)
            }
            if(this.filtroOrgao == 'Todos') {
                  sumulas = this.$store.getters.readSumulas
            }
            if(this.filterDisciplinas.length){
              this.filterDisciplinas.forEach(tag => {
                sumulas.forEach(i => {
                    if(Array.isArray(i.tag)) {
                      i.tag.forEach(sigla => {
                        if(sigla == tag) {
                          tagsFilter.push(i)
                        }
                      })
                    }
                })
              })
              sumulas = tagsFilter
            }
            
          return sumulas
          ? sumulas.sort(this.order)
          : 99
        }
      },
      listIntegraSumula(){
        return this.$store.getters.readSumulas
      },
      sumulasFilterActive(){
        return this.sumulasFilterList.length
        ? true
        : false
      },
      listFilterSumulas(){
        let list = []
        let sumulas = this.listIntegraSumula

        if(this.filtroOrgao != 'Todos'){
          sumulas = sumulas.filter (i => i.orgao == this.filtroOrgao)
        }

        this.sumulasFilterList.forEach( nro =>
          sumulas.forEach(item => {
            if(item.nro == nro){
              list.push(item)
            }
          })
        )
        return list
      },
      largura(){
        return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth
      },
      altura(){
        return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
      },
      sizeScreen(){
        console.log(this.altura, this.largura);
        if (this.largura < 640 || this.altura < 480) {
            return  true
        } else {
            return  false
        }
      }
    },
    methods:{
        ...mapActions(['deleteSumulaFB']),
        sumulasFilterExist(nro){
          return this.listIntegraSumula.find(i => i.nro == nro)
          ? true
          : false
        },
        sumulasInArray(nro){
          return this.sumulasFilterList.find(i => i == nro)
          ? true
          : false
        },
        filterJustSumula(sumula){
          if(this.sumulasFilterExist(sumula) && !this.sumulasInArray(sumula)){
            this.sumulasFilterList.push(sumula)
            console.log(this.sumulasFilterList)
            this.search = ''
          } else {
            if(this.sumulasFilterExist(sumula)){
              this.msgError = "súmula já inserida"
            }
            else if(!this.sumulasInArray(sumula)){
              this.msgError = "pesquisa incorreta"
            }
            else {
              this.msgError = " Não existe"
            }
          }  
          this.clearMsg()       
        },
        deleteFilterList(nro, index){
          if(this.sumulasInArray(nro)){
            this.sumulasFilterList.splice(index, 1)
          }
        },
        clearMsg(){
          setTimeout(() => {
                    this.msgError = ''
                }, "1500")
        },
        order(a, b){
          
          return this.reverse
          ? a.nro -  b.nro
          : b.nro -  a.nro
        },
        remove (item) {
          const index = this.filterDisciplinas.indexOf(item.sigla)
          if (index >= 0) this.filterDisciplinas.splice(index, 1)
        },
        deleteSumula(item){
          if (window.confirm("Você realmente quer APAGAR?")) {
              this.loadDeleteSumula = true
              this.deleteSumulaFB(item.id)
              setTimeout(()=> {
                this.loadDeleteSumula = false
              }, 2000)
              // window.open("sair.html", "Obrigado pela visita!");
          }
        }
    }
  }
</script>