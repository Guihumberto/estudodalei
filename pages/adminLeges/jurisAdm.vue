<template>
    <v-container class="mt-5" style="max-width: 1080px">
        <v-btn 
            :to="{name: 'admin', 
                  params:{tab:2}
                 }" 
            text><v-icon>mdi-chevron-left</v-icon> voltar</v-btn>
        <h1 class="text-h4 mb-5">Julgados</h1>
        <!-- barra de busca e filtros -->
        <v-card class="my-2">
            <v-card-text>
                <p>Faça busca por termo ou número.</p>
                <v-text-field
                    label="Busca"
                    append-icon="mdi-magnify"
                    outlined
                    dense
                    required
                    v-model.trim="search"
                ></v-text-field>
                <v-row  class="my-n6">
                    <v-col cols="12" md="3">
                        <v-autocomplete
                            dense outlined
                            required
                            label="Informativo"
                            v-model="nroInformativo"
                            :items="listInformativosAutocomplete"
                            clearable
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="9" class="mt-n3">
                        <v-radio-group v-model="filtroOrgao" row>
                            <v-radio
                                v-for="item in orgao"
                                :key="item"
                                :label="item"
                                :value="item"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                
                <v-btn class="ml-n1 px-1" 
                    @click="disciplinaVue = !disciplinaVue" 
                    x-small text>
                    busca por disciplina 
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
                <v-expand-transition>
                    <div v-if="disciplinaVue" class="mt-5">
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
                    </div> 
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
                                active-class="primary"
                            
                            >
                                <v-chip
                                    v-for="item, index in subjectDisciplinaList.sort().slice(0, showSubjects)"
                                    :key="index"
                                    :value="item"
                                    filter
                                    outlined
                                    color="secondary"
                                    :title="item"
                                >
                                    {{item.toUpperCase()}}
                                </v-chip>
                            </v-chip-group>
                            <v-subheader>
                                <v-spacer></v-spacer>
                                <v-btn v-if="showSubjects < subjectDisciplinaList.length" text color="success lighten-2" @click="showSubjects += subjectDisciplinaList.length">mostrar todos</v-btn>
                                <v-btn v-else @click="showSubjects = 5" text color="error lighten-2">Mostrar menos</v-btn>
                            </v-subheader>
                        </div>
                    </v-expand-transition>
                </v-card-text>
            </v-card-text>
        </v-card>
        <!-- lista das juris filtradas -->
        <v-card outlined class="my-2" v-show="jurisFilterList.length">
            <v-card-text>
                <v-subheader>
                    Filtro Rápido
                    <v-spacer></v-spacer>
                    <v-btn class="mr-6 px-2" text x-small @click="jurisFilterList = [], jurisFilterShow = true">Limpar</v-btn>
                    <v-btn class="mr-1" @click="jurisFilterShow = !jurisFilterShow" x-small icon> 
                    {{jurisFilterShow ? 'Ocultar' : 'Mostrar'}}
                    <v-icon class="ml-1">{{jurisFilterShow ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon>
                    </v-btn>
                </v-subheader>
                <v-expand-transition>
                    <div v-if="jurisFilterShow">
                        <v-alert outlined v-for="item, index in jurisFilterList" :key="index">
                            <v-row>
                                <v-col class="grow">
                                    <adm-forms-linkJuris :questao="item" />
                                    <v-chip-group class="ml-0" column>
                                        <v-chip label x-small outlined>{{item.orgao}} - {{item.info}}</v-chip>
                                        <v-chip label x-small outlined>{{item.disciplina}}</v-chip>
                                        <v-chip label x-small outlined>{{item.subject}}</v-chip>
                                    </v-chip-group>
                                </v-col>
                                <v-col class="shrink"> 
                                    <v-btn 
                                        @click="addFilterFast(item)"
                                        icon
                                        title="Fechar"
                                    >
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row align="center">
                                <v-col class="formatText">{{item.texto}}</v-col>
                            </v-row>
                            
                        </v-alert>
                    </div>
                </v-expand-transition>
            </v-card-text>
        </v-card>
        <!-- lista das jurisprudencias -->
        <v-card outlined>
            <v-card-text>
                <v-card-title>
                    <v-chip 
                        label 
                        :color="filtroOrgao == 'STJ' ? 'error' : 'primary'" 
                        close
                        @click:close="nroInformativo = ''"
                        v-if="nroInformativo">INFORMATIVO {{nroInformativo}} - <span v-show="filtroOrgao != 'Todos'">{{filtroOrgao}}</span>
                    </v-chip>  
                </v-card-title>

                <v-row>
                    <v-col class="grow">
                        <v-chip-group column>
                            <v-chip 
                                label outlined
                                v-for="item, index in subjectDisciplina" :key="index"
                                close
                                @click:close="subjectDisciplina.splice(index, 1)"
                                >
                                {{item}}
                            </v-chip>
                            <v-chip
                                v-if="1 < subjectDisciplina.length"
                               close
                               outlined
                               color="error"
                               @click:close="subjectDisciplina = []"
                               @click="subjectDisciplina = []"
                            >limpar tudo</v-chip>
                        </v-chip-group>
                    </v-col>
                    <v-col cols="12" sm="2"  class="shrink">
                        Total<span v-if="jurisList.length < jurisCompleteList.length">&nbspdo filtro</span>: {{listSubject ? listSubject.length : jurisList.length}}
                    </v-col>
                </v-row>
                      
                <v-list>
                    <template v-for=" item, index in listSubject ? listSubject.slice(0, showMore) : jurisList.slice(0, showMore)">
                        <v-divider ></v-divider>
                        <v-list-item :key="index" class="mt-3">
                            <v-list-item-content>
                                <div>
                                    <v-chip-group column class="mb-2">
                                        <v-chip small label dark 
                                            :color="item.orgao == 'STF' ? 'primary' : 'error'">
                                            {{item.orgao}}
                                        </v-chip>
                                        <v-chip small label outlined color="primary">{{nomeDisciplina(item.disciplina)}}</v-chip>
                                        <v-chip small label outlined color="primary">{{item.subject}}</v-chip>
                                    </v-chip-group>
                                </div>
                                <div>
                                    <p class="formatText">{{item.texto}}</p>
                                    <p class="mt-1 font-italic font-weight-light">{{item.julgado}}</p>
                                </div>
                                <v-subheader class="ml-n4">
                                    <v-spacer></v-spacer>
                                    <v-btn 
                                        class="mr-2" 
                                        outlined x-small 
                                        :title="`Click para filtrar informativo ${item.info} do ${item.orgao}`"
                                        color="error"
                                        @click="filterInformativo(item)">
                                        Informativo {{item.info}}
                                    </v-btn>
                                    <v-btn 
                                        @click="addFilterFast(item)"
                                        title="add filtro rápido" class="mr-n4" x-small outlined 
                                        :color="isJurisExist(item) ? 'success': 'error'"> 
                                        {{isJurisExist(item) ? '+' : '-' }}                                        
                                    </v-btn>
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
                            </v-list-item-content> 
                        </v-list-item>
                    </template>
                </v-list>
            </v-card-text>
            <v-card-actions 
                v-if="listSubject ? showMore < listSubject.length && !justBookFilter : showMore < jurisList.length && !justBookFilter">
                <v-btn 
                    @click="showMore += 5"
                    block outlined color="primary"> 
                    <v-icon class="mr-1">mdi-plus</v-icon> ver mais
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card v-if="search && !jurisList.length">
            <v-card-text>
                <v-alert
                outlined dense
                type="error"
                >Resultado da pesquisa <b style="text-decoration: underline red;">não encontrado</b>. Refaça a busca!</v-alert>
            </v-card-text>
        </v-card>
        <!-- tela de load -->
        <v-card outlined v-show="!search && !jurisList.length">
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
    import { mapActions } from 'vuex'
    export default {
        data(){
            return{
                search: '',
                orgao:['Todos', 'STF', 'STJ'],
                filtroOrgao: 'Todos',
                disciplinaVue: false,
                filterDisciplinas:[],
                jurisFilterShow: true,
                jurisFilterList: [],
                attrs: {
                    class: 'mb-6',
                    boilerplate: true,
                    elevation: 2,
                },
                showMore: 5,
                subjectDisciplina: [],
                disciplinas:[
                    {name: 'Direito Tributário', sigla: 'DT'},
                    {name: 'Direito Previdenciário', sigla: 'PREV'},
                    {name: 'Direito Empresarial', sigla: 'DE'},
                    {name: 'Direito Constitucional', sigla: 'DC'},
                    {name: 'Direito Administrativo', sigla: 'DA'},
                    // {name: 'Direito do Trabalho', sigla: 'TRAB'},
                    {name: 'Direito Ambiental', sigla: 'AMB'},
                    // {name: 'Direito do Consumidor', sigla: 'CONS'},
                    // {name: 'Direito Militar', sigla: 'DM'},
                    // {name: 'Direito Civil', sigla: 'CC'},
                    // {name: 'Direito Penal', sigla: 'DP'},
                    // {name: 'Processo Civil', sigla: 'PC'},
                    // {name: 'Processo Penal', sigla: 'PP'},
                    {name: 'Direito Eleitoral', sigla: 'ELT'},
                    {name: 'Criança e Adolescente', sigla: 'ECA'},
                    {name: 'Direito Notarial E Registral', sigla: 'DNR'},
                    // {name: 'Execução Penal', sigla: 'EP'},
                    // {name: 'Trânsito', sigla: 'CTB'},
                ],
                nroInformativo: '',
                reverse: false,
                justBookFilter: false,
                subjectVue: true,
                showSubjects: 5
            }
        },
        computed:{
            jurisList(){
                let listComplete = this.$store.getters.readJuris

                if(this.justBookFilter){
                    let listFav = []
                    this.jurisCompleteList.forEach(i => {
                        this.listFavJuris.forEach(x => {
                            if(x == i.id){
                                listFav.push(i)
                            }
                        })
                    })
                    listComplete = listFav
                }
                
                if(this.filtroOrgao != 'Todos'){
                    listComplete = listComplete.filter(list => list.orgao == this.filtroOrgao)
                } 

                if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                    
                    listComplete = listComplete.filter(item => exp.test(item.texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.info ))     
                }

                if(this.filterDisciplinas.length){
                    let listNew = []
                    listComplete.forEach(i => {
                        this.filterDisciplinas.forEach(tag => {
                           if(tag == i.disciplina){
                                listNew.push(i)
                           }
                        })
                    })
                    listComplete = listNew
                }

                if(this.nroInformativo){
                   listComplete = listComplete.filter(i => i.info == this.nroInformativo)
                }

                return listComplete
            },
            jurisCompleteList(){
                return this.$store.getters.readJuris
            },
            subjectDisciplinaList(){
                let subjects = []
                 if(this.filterDisciplinas.length){
                    if(Array.isArray(this.jurisList)){
                        this.filterDisciplinas.forEach( i => {
                            this.jurisList.forEach(juris => {
                                if(juris.disciplina == i){
                                    subjects.push(juris.subject)
                                }
                            })
                        })
                    }
                 }

                subjects = [...new Set(subjects)]

                return subjects
            },
            listInformativosAutocomplete(){

               let list = this.jurisCompleteList

               if(this.filtroOrgao != 'Todos'){
                    list = list.filter(i => i.orgao == this.filtroOrgao)
                }

               list = list.map(i => i.info)

                list = [...new Set(list)]
                return list.sort(this.order)
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
            listFavJuris(){
                return this.$store.getters.readFavJuris || []
            },
            listSubject(){
                let subjectItem = []
                if(this.subjectDisciplina.length && this.filterDisciplinas.length){
                    this.subjectDisciplina.forEach( subject => {
                        this.jurisList.forEach(sml => {
                                if(sml.subject == subject){
                                subjectItem.push(sml)
                                }
                        })
                    })
                    return subjectItem.length
                    ? subjectItem
                    : this.jurisList.sort(this.order)

                    }
            },
        },
        methods:{
            ...mapActions(['addBookJuris', 'removeBookJuris', 'cargaUsersFavLists']),
            isJurisExist(item){
                let result = this.jurisFilterList.findIndex(juris => juris.id == item.id)
                return result       
            },
            addFilterFast(item){
                if(this.isJurisExist(item) == -1){
                    this.jurisFilterList.push(item)
                } else {
                    let index = this.isJurisExist(item)
                    this.jurisFilterList.splice(index, 1)
                }
            },
            remove (item) {
                const index = this.filterDisciplinas.indexOf(item.sigla)
                if (index >= 0) this.filterDisciplinas.splice(index, 1)
            },
            nomeDisciplina(item){
                let disciplina = this.disciplinas.find(i => i.sigla == item)

                return disciplina.name.toUpperCase()
            },
            filterInformativo(item){
                this.filtroOrgao = item.orgao
                this.nroInformativo = item.info
                window.scrollTo( 0, 0 );
            },
            itemBookExist(item){
                 let result = this.listFavJuris.find(i => i == item.id)
                 return !!result
            },
            addBook(item){
                if(this.isLogin){
                    if(!this.itemBookExist(item)){      
                        this.addBookJuris([this.loginUid, item.id])
                        this.$store.dispatch("snackbars/setSnackbars", {text:'O item foi incluído no seu livro de favoritos.', color:'success'})
                        
                    }else{
                        this.removeBookJuris([this.loginUid, item.id])
                        this.$store.dispatch("snackbars/setSnackbars", {text:'O item foi excluído do livro de favoritos.', color:'error'})
                        
                    }
                }else {
                    this.$store.dispatch("snackbars/setSnackbars", {text:'O login é necessário para guardar as súmulas.', color:'error'})
                }
            },
            order(a, b){
                return this.reverse
                ? a -  b
                : b -  a
            },
            carregar(){
                if(this.isLogin){
                    setTimeout(() => {
                        this.cargaUsersFavLists(this.loginUid)
                    }, 2000)
                }
            },
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
    line-height: 32px;
    font-size: 18px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
}
</style>