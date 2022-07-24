<template>
  <v-container class="mt-5" style="max-width: 1080px">
        <div class="mb-2 text-h4 Heading 1">O que vamos estudar hoje?</div>
        <!-- barra de busca -->
        <v-text-field
          dense
          class="mx-2"
          outlined
          append-icon="mdi-magnify"
          label="Busca"
          placeholder="Digite o nome ou número da lei..."
          v-model="search"
          required
        ></v-text-field>
        <!-- busca nao encontrada -->
        <v-card v-if="lawList == 99" min-height="50vh" flat color="#fafafa">
          <v-card-text>
            <v-alert outlined dense type="error">
                Termo não encontrado... refaça a busca!
            </v-alert>
          </v-card-text>
        </v-card>
        <!-- leis renderizadas -->
        <v-card class="ml-2" v-else-if="lawList.length" flat min-height="50vh" color="#fafafa">
          <v-card-title>
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="dashboard = !dashboard" class="mt-n6" icon><v-icon>{{viewDashboard.icon}}</v-icon></v-btn>
          </v-card-title>
          <v-card-text v-if="!search">
            <v-row justify="space-around">
              <v-col
                cols="12"
              >
                <v-sheet
                  class="px-1"
                >
                  <v-chip-group
                  >
                    <v-chip @click="listTags = []">Todas</v-chip>
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
          <v-card-text>
            <v-row >
              <v-col 
                class="my-n2" 
                cols="12" 
                :sm="viewDashboard.sm" :md="viewDashboard.md" 
                v-for="(item, index) in lawList.slice(0, sizeScreen.qtd)" :key="index">
                <v-card  
                  height="120"
                  hover outlined min-height="100" 
                  :to="{
                        name: 'law-leges',
                        params:{law: item.id},
                        // query:{id:item.id}  
                      }"
                >
                  <v-card-text>
                    <span class="font-weight-medium">{{item.nickname | truncate(viewDashboard.trun)}}</span> <br>
                    {{item.nro}} <br>
                    {{item.description | truncate(40)}}     
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>  
          </v-card-text>
          <v-card-text>
            <!-- btn ver mais -->
              <div class="text-center mt-5" v-if="sizeScreen.value">
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

        <sumulaBanner />
        <funcionalidades />
        <mail />
  </v-container>
</template>

<script>
  export default {
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
          {name: 'D. Empresarial', sigla: 'DE'},
          {name: 'D. Civil', sigla: 'CC'},
          {name: 'D. Penal', sigla: 'DP'},
        ],
        listTags:[]
      }
    },
    computed:{
      lawList(){
            let listLaws = this.$store.getters.readLawsList
            if(this.search){
              //retirar acentuação
              let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
              //retirar caracteres especiais
              let exp = new RegExp(search.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, ""), "i")
              //fazer o filtro
              let filtro = listLaws.filter(project => exp.test(project.nickname.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( project.nro ))
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
              return novoFiltro

            } else {

              return listLaws

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
      }
    },
    methods:{
      filterTag(item){
        let findTag = this.listTags.find(i => i == item)
        findTag ? this.listTags.splice(item, 1) : this.listTags.push(item)
        console.log(this.listTags)
      },
      closeTag(tag){
        let findTag = this.listTags.find(i => i == tag)
         return findTag ? true : false
      },
      transformStr(rota){
        let search = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        //retirar caracteres especiais
        let exp = search.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, "").replace('.', "").replace(' ', "")
      }
    },
    created(){
      this.$store.commit("setTextLaw", '')
      this.$store.commit("setNameLaw", '')
    }
  }
</script>

<style scoped>

</style>