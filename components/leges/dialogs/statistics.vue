<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="1080"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
              small outlined
              class="ml-2 mr-0"
              v-bind="attrs"
              v-on="on">
              <v-icon >mdi-finance</v-icon>
          </v-btn>
        </template>
  
        <v-card color="#f9f5f5">
          <v-card-title class="mb-5 text-h5 grey lighten-2">
            <v-icon class="mr-1" color="primary">
                mdi-finance
            </v-icon>
            Estatísticas
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="d-flex justify-center">
            <h1 class="text-h6">
             {{ law[3] }} <br>
             {{ law[4] }}
            </h1>
            <v-divider
            class="mx-5"
              vertical
            ></v-divider>
            <div>
              <strong>Total de Questões: {{totaldeQuestoes}}</strong> <br>
              <strong>Artigos com Questões: {{totaldeArtigos}}</strong> 
            </div>
          </v-card-text>

          <v-card height="500" class="overflow-auto">
            <v-card-text class="mt-5" v-if="isEmpty" >
              <v-list max-width="400" class="mx-auto">
                <v-list-item-group
                  v-model="model"
                  multiple
                >
                <v-select
                  dense
                  prepend-inner-icon="mdi-greater-than-or-equal"
                  label="Filtro por Qtd"
                  :items="selectQtd"
                  v-model="selectedQtd"
                  class="ml-n1 mt-1"
                  clearable
                  v-if="isEmpty"
                ></v-select>
                <span class="caption">Qtd. de artigos: {{qtdFiltrada.filter(i => i.valor >= selectedQtd).length}} </span> 
                  <v-list-item class="primary white--text">
                      <v-list-item-content>
                          <v-list-item-title>Artigo</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                          Nº de Questões 
                      </v-list-item-action>
                  </v-list-item>
                  <template v-for="item, index in qtdFiltrada">
                      <v-divider v-if="item.valor >= selectedQtd"></v-divider>
                      <v-list-item 
                        v-slot:default="{ active }"
                        :key="index" @click="gotoArt(item.art)"
                        active-class="deep-purple--text text--accent-4"
                        v-if="item.valor >= selectedQtd"
                      >
                        <v-list-item-action>
                            <v-checkbox
                              :input-value="active"
                              color="deep-purple accent-4"
                            ></v-checkbox>
                        </v-list-item-action>
                          <v-list-item-content>
                              <v-list-item-title>{{item.art}}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                             {{item.valor}}
                          </v-list-item-action>
                      </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card-text>
            <v-card-text v-else>
              <v-alert type="error" outlined>
                  Não há questões cadastradas nesta lei!
              </v-alert>
            </v-card-text>
          </v-card>
       
          <v-divider></v-divider>
        
        </v-card>
        <v-card flat color="#f9f5f5">
          <v-card-text class="my-0 py-0">
            <v-expand-transition>
              <div v-if="artigos[0]">
                  Seleção de artigos:
                  <v-chip-group>
                      <v-chip 
                          color="success"
                          v-for="item, i in artigos" :key="i"           
                          >
                          {{item}}</v-chip>
                  </v-chip-group>
              </div>
            </v-expand-transition>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="dialog = false"
              >
                Fechar
              </v-btn>
              <v-btn
                v-if="artigos[0]"
                color="primary"
                @click="filterActivePush"
              >
                Filtrar
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  
    export default {
      data () {
        return {
          dialog: false,
          artigos: [],
          model:[],
          selectedQtd: 0
        }
      },
      props:{
          textLaw: false,
          law: false,
      },
      computed:{
        listArts(){
          const list = this.textLaw.filter( i => i.idQuestions)

          const somar = (itens) => {
            const total = itens.reduce((acc, {art, idQuestions}) => {
              acc[art] = (acc[art] || 0) + idQuestions.length
              return acc
            }, {})

            return Object.keys(total).map((art) => ({art, valor: parseInt(total[art]) }))
          }

          const result = somar(list)
          return result
        },
        isEmpty(){
            return !!this.listArts[0];
        },
        totaldeQuestoes(){
            let law = this.textLaw.filter( i => i.idQuestions)
            let total = 0

            law.forEach(element => {
               total += element.idQuestions.length
            });
            return total
        },
        totaldeArtigos(){
          let arr = this.textLaw.filter( i => i.idQuestions)
          arr = arr.map(i => i.art)
          const arrUnique = [...new Set(arr)];
          return arrUnique.length
        },
        qtdFiltrada(){
          const list = this.textLaw.filter( i => i.idQuestions)

          const somar = (itens) => {
            const total = itens.reduce((acc, {art, idQuestions}) => {
              acc[art] = (acc[art] || 0) + idQuestions.length
              return acc
            }, {})

            return Object.keys(total).map((art) => ({art, valor: parseInt(total[art]) }))
          }

          const result = somar(list)
          return result
        },
        selectQtd(){
          const list = this.qtdFiltrada.map(i => i.valor)
          const arrUnique = [...new Set(list)];
          return arrUnique.sort(this.order)
        }
      },
      methods:{
         somaQuestions(item){
            let total = 0
            item.forEach(element => {
               total += element.idQuestions.length
            });
            return total
         },
         gotoArt(index){
            let item = parseInt(index)
            if(this.artigos.find(i => i == item)){
                this.artigos = this.artigos.filter(i => i != item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Artigo retirado.', color:'error'})
            } else {
                this.artigos.push(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Artigo inserido.', color:'success'})
            }
         
         },
         filterActivePush(){  
            if(this.artigos[0]){
                this.$emit('filterArtsPush', this.artigos)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Filtro na tela.', color:'success'})
                this.dialog = false
            }
         },
         order(a, b){
            return a - b
         }
      }
    }
  </script>
  
  <style scoped>
      .formatText{
      text-align: justify;
      hyphens: auto;
  }
  </style>