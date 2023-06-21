<template>
  <v-container class="mt-5 formatText" style="max-width: 1080px">
        <div class="mb-5 text-h4 Heading 1">O que vamos estudar hoje?</div>
        <v-subheader class="ml-n2">Digite o nome ou número da legislação na barra de busca.</v-subheader>
        <!-- barra de busca -->
        <v-text-field
          dense
          class="mx-2"
          outlined
          append-icon="mdi-magnify"
          label="Busca"
          placeholder="Digite o nome ou número da lei..."
          v-model="search"
          clearable
          required
        ></v-text-field>
        <!-- busca nao encontrada -->
        <v-card v-if="lawList == 99" min-height="50vh" flat color="#fafafa">
          <v-card-text>
            <v-alert
              prominent
              outlined
              type="error"
            >
              <v-row align="center">
                <v-col class="grow">
                  Não houve resultados para seus filtros.
                </v-col>
                <v-col class="shrink">
                  <v-btn outlined color="error" @click="clearFiltersAll()">LIMPAR FILTROS</v-btn>
                </v-col>
              </v-row>
            </v-alert>
          </v-card-text>
        </v-card>
        <!-- leis renderizadas -->
        <v-card class="ml-2" v-else-if="lawList.length" flat min-height="50vh" color="#fafafa">
          <!-- total de lei e view -->
          <v-card-title>
                <span class="caption">Total de Leis : {{lawList.length}}</span>
                <v-btn
                  @click="lawFavFilter = !lawFavFilter"
                  class="ml-2" v-if="isLogin.login" small
                  :outlined="lawFavFilter"
                  :color="lawFavFilter ? 'warning' : 'secondary'"
                  text>
                  MEUS FAVORITOS
                  <v-icon class="ml-1" small v-text="lawFavFilter ?'mdi-star': 'mdi-star-outline'"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="secondary" @click="dashboard = !dashboard"
                  class="mt-n6 d-none d-sm-flex" icon>
                  <v-icon>{{viewDashboard.icon}}</v-icon>
                </v-btn>
          </v-card-title>
          <!-- tags disciplinas -->
          <v-card-text v-if="!search">
            <v-row justify="space-around">
              <v-col
                cols="12"
                class="px-0"
              >
                <v-sheet>
                  <v-chip-group>
                    <v-chip
                      @click="listTags = []">Todas</v-chip>
                    <v-chip
                      v-for="(item, index) in tags"
                      :key="index"
                      @click="filterTag(item.sigla)"
                      :close="closeTag(item.sigla)"
                      @click:close="filterTag(item.sigla)"
                      :color="closeTag(item.sigla) ? 'primary' : 'secondary lighten-2'"
                      class="white--text"
                    >
                      {{ item.name }}
                    </v-chip>
                  </v-chip-group>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- leis listadas -->
          <v-card-text>
            <v-row >
              <v-col
                class="my-n2"
                cols="12"
                :sm="viewDashboard.sm" :md="viewDashboard.md"
                v-for="(item, index) in lawList.slice(0, sizeScreen.qtd)" :key="index">
                <v-card
                  hover outlined min-height="100"
                >
                  <v-list three-line class="pt-0">
                    <v-list-item
                      :to="{
                        name: 'law-leges',
                        params:{law: item.id},
                        // query:{id:item.id}
                      }"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{item.nickname}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.nro}}</v-list-item-subtitle>
                        <v-list-item-subtitle class="caption">{{item.description}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-subheader class="my-n3">
                      <v-spacer></v-spacer>
                      <v-btn title="Favoritar"
                        @click="favLaw(item)"
                        :color=" listFavExist(item.id) ? '#FFD700': 'grey'"
                        x-small icon>
                        <v-icon>mdi-star</v-icon>
                      </v-btn>
                    </v-subheader>
                  </v-list>
                  <!-- <v-card-text>
                    <span class="font-weight-medium">{{item.nickname | truncate(viewDashboard.trun)}}</span> <br>
                    {{item.nro}} <br>
                    {{item.description | truncate(40)}}
                  </v-card-text> -->
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <!-- btn ver mais -->
              <div class="text-center mt-5" v-if="sizeScreen.value & showMoreLaws < lawList.length">
                <v-btn
                  :block="sizeScreen.value"
                  outlined
                  @click="showMoreLaws += 10"
                  color="indigo">
                  <v-icon class=" ml-n2 mr-1">mdi-plus</v-icon>
                  Ver mais
                </v-btn>
              </div>
          </v-card-text>
        </v-card>
         <!-- tela de loading -->
        <v-card v-else class="mx-3">
          <v-skeleton-loader
              class="mx-auto"
              type="card"
          ></v-skeleton-loader>
        </v-card>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    head: {
      title: 'Estudo da Lei',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Leges Estudo - Estudo da lei - Estudo da Constituição, Lei, Legislação, Norma, súmulas, STJ, STF, jurisprudência, questões e mais'
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
      ]
    },
    data(){
      return{
        dashboard: true,
        search: '',
        showMoreLaws: 5,
        tags: [
          {name: 'D. Constitucional', sigla: 'DC'},
          {name: 'D. Tributário', sigla: 'DT'},
          {name: 'D. Administrativo', sigla: 'DA'},
          {name: 'D. Previdenciário', sigla: 'PREV'},
          {name: 'D. Financeiro', sigla: 'DF'},
          {name: 'D. Empresarial', sigla: 'DE'},
          {name: 'D. Civil', sigla: 'CC'},
          {name: 'D. Penal', sigla: 'DP'},
        ],
        listTags:[],
        lawFavFilter: false
      }
    },
    computed:{
      lawList(){
            let listLaws = this.$store.getters.readLawsList
            if(this.isLogin.login){
              if(this.listFavLawsUser.length > 0){
                listLaws.forEach(i => {
                  this.listFavLawsUser.forEach(id => {
                    if(i.id == id){
                      i.fav = true
                    }
                  })
                })
              }
              if(this.lawFavFilter){
                listLaws = listLaws.filter(i => i.fav)
              }
            }
            if(this.search){
              //retirar acentuação
              let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
              //retirar caracteres especiais
              let exp = new RegExp(search.trim().replace(/[\[\]!'.@><|//\\&*()_+=]/g, ""), "i")
              //fazer o filtro
              let filtro = listLaws.filter(project => exp.test(project.nickname.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "") ) || exp.test( project.nro.replace('.', '') ))

              return filtro.length
              ? filtro
              : 99
            }

            else if(this.listTags.length){
              let novoFiltro = []
              listLaws.filter( item => {
                this.listTags.forEach( tag => {
                  if(tag == item.subject){
                    novoFiltro.push(item)
                  }
                })
              })
              return novoFiltro.length
              ? novoFiltro
              : 99

            } else {

              return listLaws.length
              ? listLaws
              : 99

            }
      },
      viewDashboard(){
        return this.dashboard
        ? {icon: "mdi-view-dashboard", sm: 4, md: 3, trun: 20, trun2: 50}
        : {icon: "mdi-format-list-bulleted-square", sm: 12, md: 12, trun: 100, trun2: 200}
      },
      sizeScreen(){
        let largura = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        let altura = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

        if (largura < 640 || altura < 480) {
            return  {value: true, qtd: this.showMoreLaws}
        } else if (largura < 1024 || altura < 768) {
            return  {value: false, qtd: 50}
        } else {
            return  {valeu: false, qtd: 50}
        }
      },
      isLogin(){
        const user = this.$store.getters.readUser
        return {uid: user.uid, login: !!user.uid}
      },
      listFavLawsUser(){
        return this.$store.getters.readFavLaw
      },
    },
    methods:{
      ...mapActions(['addFavLaw', 'removeFavLaw']),
      filterTag(item){
        let findTag = this.listTags.find(i => i == item)
        findTag ? this.listTags.splice(item, 1) : this.listTags.push(item)
      },
      closeTag(tag){
        let findTag = this.listTags.find(i => i == tag)
         return findTag ? true : false
      },
      transformStr(rota){
        let search = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        //retirar caracteres especiais
        let exp = search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, "").replace('.', "").replace(' ', "")
      },
      listFavExist(item){
        if(this.isLogin.login){
          let result = this.listFavLawsUser.find(i => i == item) || false
          return !!result
        }
      },
      favLaw(item){
        if(this.isLogin.login){
          if(this.listFavExist(item.id)){
               this.$store.dispatch("snackbars/setSnackbars", {text:'Lei removida dos seus favoritos!', color:'error lighten-1'})
               let dataUser = [this.isLogin.uid, item.id]
               this.removeFavLaw(dataUser)
          } else {
              this.$store.dispatch("snackbars/setSnackbars", {text:'Lei adicionada aos seus favoritos!', color:'primary lighten-1'})
              let dataUser = [this.isLogin.uid, item.id]
              this.addFavLaw(dataUser)
          }
        }else{
          this.$store.dispatch("snackbars/setSnackbars", {text:'Você precisa estar logado para favoritar as leis!', color:'error lighten-1'})
        }
      },
      clearFiltersAll(){
        this.search = ''
        this.listTags = []
        this.lawFavFilter = false
      }
    },
  }
</script>

<style scoped>
.formatText{
    font-family: 'Inter', sans-serif;
}
</style>
