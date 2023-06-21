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
                    label="apenas vinculante"
                    dense
                    v-model="filtroVinculante"
                  ></v-switch>
                </v-expand-x-transition>
              </div>
              <v-checkbox
                class="mt-n2"
                v-model="cancelInclui"
                color="red"
                label="Incluir as canceladas"
              ></v-checkbox>
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
              <v-btn
                  v-if="isLogin"
                  x-small
                  text
                  :outlined="justBookFilter"
                  :color="justBookFilter ? 'warning':'secondary'"
                  @click="justBookFilter = !justBookFilter"
                  >
                  Meus Favoritos
                  <v-icon 
                      v-text="justBookFilter ? 'mdi-book-heart':'mdi-book-outline'"
                      small>mdi-book-heart</v-icon>
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
                          small
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                          @click="data.select"
                          @click:close="remove(data.item), subjectDisciplina = []"
                        >
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                  </v-autocomplete>
              </v-card-text>
            </v-expand-transition>
            <!-- seleção de assunto v-if="filterDisciplinas.length -->
            <v-card-text v-if="filterDisciplinas.length">
                <v-subheader>
                  <v-spacer></v-spacer>
                  <v-btn x-small text @click="subjectVue = !subjectVue">
                    {{subjectVue ? 'Ocultar os assuntos' : 'Mostrar os assuntos'}}
                  </v-btn>
                </v-subheader>
                <v-expand-transition>
                  <div v-if="subjectVue">
                    <h2 class="text-h6 mb-2">
                      Escolha o Assunto
                    </h2>
                    <v-chip-group
                      v-model="subjectDisciplina"
                      column
                      multiple
                    >
                      <v-chip
                        v-for="item, index in subjectDisciplinaList.sort()"
                        :key="index"
                        :value="item"
                        filter
                        :outlined="!disciplinas.find(i => i.sigla == item)"
                        :color="!disciplinas.find(i => i.sigla == item) ? 'secondary':'success'"
                        :title="nomeSigla(item)"
                      >
                        {{nomeSigla(item) ? nomeSigla(item) : item}}
                      </v-chip>
                    </v-chip-group>
                  </div>
                </v-expand-transition>
            </v-card-text>
        </v-card>

        <v-card class="mb-5" outlined v-if="sumulasFilterActive">
          <!-- sumulas filtradas -->
            <v-card-text>
              <v-subheader>
                Filtro Rápido
                <v-spacer></v-spacer>
                <v-btn class="mr-6 px-2" text x-small @click="sumulasFilterList = [], sumulasFilterView = true">Limpar</v-btn>
                <v-btn class="mr-1" @click="sumulasFilterView = !sumulasFilterView" x-small icon> 
                {{sumulasFilterView ? 'Ocultar' : 'Mostrar'}}
                  <v-icon class="ml-1">{{sumulasFilterView ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon>
                </v-btn>
              </v-subheader>
              <v-expand-transition>
                <div v-if="sumulasFilterView">
                  <v-alert 
                    v-for="item, index in sumulasFilterList" :key="index"
                    outlined dense text 
                    >
                    <v-row align="center">
                      <v-col class="grow">
                        <div class="font-weight-bold">{{item.orgao}} - Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}</div>
                        <v-chip-group>
                          <v-chip
                            v-for="item, index in item.tag"
                            :key="index"
                            color="success"
                            x-small
                          >{{item}}</v-chip>
                        </v-chip-group>
                        <p class="formatText">{{item.text}}</p>
                      </v-col>
                      <v-col class="shrink">
                        <v-btn icon @click="deleteFilterList(item)"><v-icon>mdi-close-circle</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
                </div>
              </v-expand-transition>
            </v-card-text>
        </v-card>
        
        <!-- nao encontrado -->
        <v-card outlined min-height="10vw" v-if="search && listSumulas == 99">
          <v-card-text>
              <v-alert
                outlined dense
                type="error"
              >Resultado da pesquisa <b style="text-decoration: underline red;">não encontrado</b>. Refaça a busca!</v-alert>
          </v-card-text>
        </v-card>

        <!-- sumulas list -->
        <v-card outlined min-height="10vh" v-else-if="listSumulas.length">         
            <v-card-text>
              <v-list>
                  <v-subheader>
                    <v-spacer></v-spacer>
                    Total: {{listSubject ? listSubject.length : listSumulas.length}}
                    <v-btn icon @click="reverse = !reverse">
                      <v-icon>{{reverse ? 'mdi-order-alphabetical-ascending' : 'mdi-order-alphabetical-descending'}}</v-icon>
                    </v-btn>
                  </v-subheader>
                  <template v-for="(item, index) in listSubject || listSumulas.slice(0, showMoreSUmulas)">
                    <v-divider class="my-1"></v-divider>
                    <v-list-item :key="index">
                      <v-list-item-content>
                          <v-subheader class="ml-n4">
                            <v-chip-group>
                              <v-chip label small dark :color=" item.orgao == 'STF' ? 'indigo' : 'error'">{{item.orgao}}</v-chip>
                              <v-chip label small outlined color="primary" v-for="(tag, index) in item.tag" :key="index">{{nomeSigla(tag) || tag.toLowerCase()}}</v-chip>
                            </v-chip-group>
                          </v-subheader>                           
                          <div> 
                            <p class="caption formatText"> <span>SÚMULA</span>  <span v-if="item.vinculante">VINCULANTE</span> {{item.nro}}: {{item.text}}</p>
                          </div>
                      </v-list-item-content>
                      <v-list-item-action v-if="item.cancel">
                        <v-icon color="red" title="Súmula cancelada/superada">mdi-cancel</v-icon>
                      </v-list-item-action>
                    <!-- {{item.id}} -->
                    </v-list-item>
                    <v-subheader class="mt-n6 mb-n3">
                      <v-spacer></v-spacer>
                      <v-btn 
                          class="ml-5 mr-n4" 
                          title="Guardar" small icon
                          @click="addBook(item)"
                          :color="itemBookExist(item) ? 'warning lighten-2': 'secondary'"
                          >
                          <v-icon
                          >{{itemBookExist(item) ? 'mdi-book-heart': 'mdi-book-outline'}}</v-icon>
                      </v-btn>
                    </v-subheader>
                  </template>
              </v-list>
              <!-- btn ver mais -->
              <div class="text-center" v-if="showMoreSUmulas < listSumulas.length" v-show="!listSubject">
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
        <v-card outlined v-show="!search && !listSumulas.length">
          <v-card-text>
            <v-skeleton-loader
              v-bind="attrs"
              type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
            ></v-skeleton-loader>
          </v-card-text>
        </v-card>
        <v-card outlined class="mt-5">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2" @click="alter()">modificar</v-btn>
            <v-btn color="success" @click="saveAlter()">salvar</v-btn>
          </v-card-title>
          <v-card-text>
            <v-alert v-for="item, index in listModify || listSubject" :key="index">
                {{item}}
            </v-alert>
      
          </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        dialog: false,
        cancelInclui: false,
        disciplinaVue: false,
        disciplinas:[
          {name: 'Direito Tributário', sigla: 'DT'},
          {name: 'Direito Constitucional', sigla: 'DC'},
          {name: 'Direito Administrativo', sigla: 'DA'},
          {name: 'Direito Previdenciário', sigla: 'PREV'},
          {name: 'Direito do Trabalho', sigla: 'TRAB'},
          {name: 'Direito Ambiental', sigla: 'AMB'},
          {name: 'Direito do Consumidor', sigla: 'CONS'},
          {name: 'Direito Militar', sigla: 'DM'},
          {name: 'Direito Civil', sigla: 'CC'},
          {name: 'Direito Penal', sigla: 'DP'},
          {name: 'Processo Civil', sigla: 'PC'},
          {name: 'Processo Penal', sigla: 'PP'},
          {name: 'Direito Eleitoral', sigla: 'ELT'},
          {name: 'Direito Empresarial', sigla: 'EMP'},
          {name: 'Criança e Adolescente', sigla: 'ECA'},
          {name: 'Execução Penal', sigla: 'EP'},
          {name: 'Trânsito', sigla: 'CTB'},
        ],
        filterDisciplinas:[],
        subjectDisciplina: [],
        subjectVue: true,
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
        showMoreSUmulas: 5,
        justBookFilter: false,
        listModify: []
      }
    },
    head() {
      return {
        title: 'Estudo da Lei - Súmulas STF e STJ',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'busca avançada por súmulas do STF e STJ, por número ou texmo, com filtro avançado e de fácil utilização'
          }
        ]
      }
    },
    computed:{
      listSumulas(){
        let tagsFilter = []
        let sumulas = this.$store.getters.readSumulas.filter(i=> i.cancel != true)
        if(this.cancelInclui){
          sumulas = this.$store.getters.readSumulas
        }
        if(this.justBookFilter){
            let listFav = []
            this.listIntegraSumula.forEach(i => {
                this.favSumulasList.forEach(x => {
                    if(x == i.id){
                        listFav.push(i)
                    }
                })
            })
            sumulas = listFav
  
        }   
        if(this.filtroOrgao != 'Todos'){
          sumulas = sumulas.filter (i => i.orgao == this.filtroOrgao)
        }
        if(this.filtroOrgao == 'STF' && this.filtroVinculante){
            sumulas = sumulas.filter (i => i.vinculante)
        }

        if(this.search){
            let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
            let filtro = sumulas.filter(item => exp.test(item.text.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.nro ) || exp.test( item.text ))
            sumulas = filtro
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
             
        return sumulas.length
        ? sumulas.sort(this.order)   
        : 99

      },
      listIntegraSumula(){
        return this.$store.getters.readSumulas
      },
      sumulasFilterActive(){
        return this.sumulasFilterList.length
        ? true
        : false
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
        if (this.largura < 640 || this.altura < 480) {
            return  true
        } else {
            return  false
        }
      },
      subjectDisciplinaList(){
        let subjects = []
        if(this.filterDisciplinas.length){
          this.listSumulas.forEach(i =>{
            if(i.tag){
              i.tag.forEach(tag => {
                subjects.push(tag)
              })
            }
          })
        }

        subjects = [...new Set(subjects)]

        return subjects
      },
      listSubject(){
        let subjectItem = []
        if(this.subjectDisciplina.length && this.filterDisciplinas.length){
          this.subjectDisciplina.forEach( subject => {
            this.listSumulas.forEach(sml => {
              sml.tag.forEach(tag => {
                if(tag == subject){
                  subjectItem.push(sml)
                }
              })
            })
          })
          return subjectItem.length
          ? subjectItem
          : this.listSumulas.sort(this.order)

        }
      },
      isLogin(){
          let login = this.$store.getters.readUser
          return !!login.uid
      },
      loginUid(){
          if(this.isLogin){
              const userUid = this.$store.getters.readUser
              return userUid.uid
          }
      },
      favSumulasList(){
        return this.$store.getters.readFavSumulas || []
      },
    },
    methods:{
        ...mapActions(['addBookSumulas','removeBookSumulas','cargaSumulasFavLists', 'editSumulaFB']),
        sumulasFilterExist(nro){
          let sumula = ""
          if (this.filtroVinculante && this.filtroOrgao == 'STF'){
            sumula = this.listIntegraSumula.find(i => i.nro == nro && i.orgao == 'STF' && this.filtroVinculante)
          } 
          else if(this.filtroOrgao == 'Todos'){
             sumula = this.listIntegraSumula.find(i => i.nro == nro)
          }else{
             sumula = this.listIntegraSumula.find(i => i.nro == nro && i.orgao == this.filtroOrgao && !this.filtroVinculante)
          }

          return sumula
          ? sumula
          : false
        },
        sumulasInArray(sumula){
          return this.sumulasFilterList.find(i => i.id == sumula.id)
          ? true
          : false
        },
        filterJustSumula(sumula){
          let sumulaItem = this.sumulasFilterExist(sumula)
          if(sumulaItem && !this.sumulasInArray(sumulaItem)){
            this.sumulasFilterList.push(sumulaItem)
            this.search = ''
            this.sumulasFilterView = true
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
            this.search = ''
          }  
          this.clearMsg()       
        },
        deleteFilterList(sumula){
          if(this.sumulasInArray(sumula)){
            this.sumulasFilterList = this.sumulasFilterList.filter(i => i.id != sumula.id)
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
        nomeSigla(sigla){
          let nome = this.disciplinas.find(i => i.sigla == sigla)
          if(nome){
            return nome.name.toUpperCase();
          }
        },
        itemBookExist(item){
              let result = this.favSumulasList.find(i => i == item.id)
              return !!result
        },
        addBook(item){
            if(this.isLogin){
                if(!this.itemBookExist(item)){      
                    this.addBookSumulas([this.loginUid, item.id])
                    this.$store.dispatch("snackbars/setSnackbars", {text:'O item foi incluído no seu livro de favoritos.', color:'success'})
                    
                }else{
                    this.removeBookSumulas([this.loginUid, item.id])
                    this.$store.dispatch("snackbars/setSnackbars", {text:'O item foi excluído do livro de favoritos.', color:'error'})
                    
                }
            }else {
                this.$store.dispatch("snackbars/setSnackbars", {text:'O login é necessário para guardar as súmulas.', color:'error'})
            }
        },
        carregar(){
          if(this.isLogin){
              setTimeout(() => {
                this.cargaSumulasFavLists(this.loginUid)
            }, 2000)
          }
        },
        alter(){
          this.listSubject.forEach(i => {
            let tagN = []
            i.tag.forEach(tag =>{
              tag = tag.trim()
              tagN.push(tag.toUpperCase())
            })
            i.tag = tagN
            this.listModify.push(i)
          })
          console.log(this.listModify)
        },
        saveAlter(){
          this.listModify.forEach(i =>{
            this.editSumulaFB(i)
            console.log("deu certo")
          })
          this.listModify = []
        }
    },
    created(){
        this.carregar()
    }
  }
</script>

<style scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
}
</style>