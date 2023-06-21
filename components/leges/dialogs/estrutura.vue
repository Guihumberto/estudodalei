<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
            class="mx-2"
            title="estrutura da lei"
            small outlined
            v-bind="attrs"
            v-on="on">
            <v-icon small class="mr-1">mdi-format-list-bulleted-square</v-icon> 
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Estrutura
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-5">
            <div v-if="estruturaList[0]">
                <v-treeview 
                  hoverable
                  open-on-click
                  dense
                  :items="estruturaList"
                  transition
                  >
                    <template v-slot:append="{ item }">
                      <v-btn icon @click="indiceSubmit(item.name)"
                      >
                        <v-icon
                        >mdi-link-variant</v-icon>
                      </v-btn>
                    </template>
                </v-treeview>
            </div>

            <v-alert v-else
            color="warning"
            border="left"
            colored-border
            icon="mdi-alert-circle">
                Esta norma não possui estrutura definida.
            </v-alert>
         
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Fechar
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
      }
    },
    props:{
        estrutura: false
    },
    computed:{
        estruturaList(){
          let newEstrutura = []
          let nameEstrutura = ''
          let indexParte = 99
          let indexLivro = 99
          let indexTitulo = 99
          let indexCapitulo = ''
          let indexSecao = ''

          this.estrutura.forEach(el => {
            let items = {}

            if(el.textLaw.toUpperCase().startsWith('PARTE')){
              items.name = el.textLaw
              items.art = el.art
              items.children = []
              nameEstrutura = 'PARTE'
              newEstrutura.push(items)
              indexParte = newEstrutura.at(-1).name
              indexParte = newEstrutura.findIndex( i => i.name == indexParte )
              console.log(indexParte)
            }

            else if(el.textLaw.toUpperCase().startsWith('LIVRO')){
              if(indexParte == 99){
                items.name = el.textLaw
                items.art = el.art
                nameEstrutura = 'LIVRO'
                newEstrutura.push(items)
                indexLivro = newEstrutura.at(-1).name
                indexLivro = newEstrutura.findIndex( i => i.name == indexLivro )
              } else {
                  newEstrutura[indexParte].children.push({name: el.textLaw, art: el.art})
                  nameEstrutura = 'LIVRO'

                    indexLivro = newEstrutura[indexParte].children.at(-1).name
                    indexLivro = newEstrutura[indexParte].children.findIndex(i => i.name == indexLivro)
              }
            }

            else if(el.textLaw.toUpperCase().startsWith('TÍTULO')){
              if(indexParte == 99){
                if(indexLivro == 99){
                  items.name = el.textLaw
                  items.art = el.art
                  nameEstrutura = 'TÍTULO'
                  newEstrutura.push(items)
                  indexTitulo = newEstrutura.at(-1).name
                  indexTitulo = newEstrutura.findIndex( i => i.name == indexTitulo )
                } else {
                  if (nameEstrutura == 'TÍTULO') {
                    newEstrutura[indexLivro].children.push({name: el.textLaw, art: el.art})
                  } else if(nameEstrutura == 'LIVRO') {
                    newEstrutura[indexLivro].children = [{name: el.textLaw, art: el.art}]
                  } else {
                    newEstrutura[indexLivro].children.push({name: el.textLaw, art: el.art})
                  }
  
                  nameEstrutura = 'TÍTULO'
          
                    indexTitulo = newEstrutura[indexLivro].children.at(-1).name
                    indexTitulo = newEstrutura[indexLivro].children.findIndex(i => i.name == indexTitulo)   
                }
              }else{
                if (nameEstrutura == 'TÍTULO') {
                    newEstrutura[indexParte].children[indexLivro].children.push({name: el.textLaw, art: el.art})
                  } else if(nameEstrutura == 'LIVRO') {
                    newEstrutura[indexParte].children[indexLivro].children = [{name: el.textLaw, art: el.art}]
                  } else {
                    newEstrutura[indexParte].children[indexLivro].children.push({name: el.textLaw, art: el.art})
                  }
  
                  nameEstrutura = 'TÍTULO'
                    indexTitulo = newEstrutura[indexParte].children[indexLivro].children.at(-1).name
                    indexTitulo = newEstrutura[indexParte].children[indexLivro].children.findIndex(i => i.name == indexTitulo)
                 
              }
            }
          
            else if(el.textLaw.toUpperCase().startsWith('CAPÍTULO')){
              if(indexParte == 99){
                if(indexLivro == 99){
                    if(indexTitulo == 99) {
                      items.name = el.textLaw
                      items.art = el.art
                      nameEstrutura = 'CAPÍTULO'
                      newEstrutura.push(items)
                      indexCapitulo = newEstrutura.at(-1).name
                      indexCapitulo = newEstrutura.findIndex( i => i.name == indexCapitulo )
                    }else {
                      if (nameEstrutura == 'CAPÍTULO'){
                        newEstrutura[indexTitulo].children.push({name: el.textLaw})
                      } else if (nameEstrutura == 'TÍTULO') {
                        newEstrutura[indexTitulo].children = [{name: el.textLaw}]
                      } else {
                        newEstrutura[indexTitulo].children.push({name: el.textLaw})
                      }
                      nameEstrutura = 'CAPÍTULO'
                      indexCapitulo = newEstrutura[indexTitulo].children.at(-1).name
                      indexCapitulo = newEstrutura[indexTitulo].children.findIndex(i => i.name == indexCapitulo)
                    }
                } else {
                  if (nameEstrutura == 'CAPÍTULO'){
                    newEstrutura[indexLivro].children[indexTitulo].children.push({name: el.textLaw})
                  } else if (nameEstrutura == 'TÍTULO') {
                    newEstrutura[indexLivro].children[indexTitulo].children = [{name: el.textLaw}]
                  } else {
                    newEstrutura[indexLivro].children[indexTitulo].children.push({name: el.textLaw})
                  }
                  nameEstrutura = 'CAPÍTULO'
                  indexCapitulo = newEstrutura[indexLivro].children[indexTitulo].children.at(-1).name
                  indexCapitulo = newEstrutura[indexLivro].children[indexTitulo].children.findIndex(i => i.name == indexCapitulo)
                }
              } else{
                if (nameEstrutura == 'CAPÍTULO'){
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children.push({name: el.textLaw})
                  } else if (nameEstrutura == 'TÍTULO') {
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children = [{name: el.textLaw}]
                  } else {
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children.push({name: el.textLaw})
                  }
                  nameEstrutura = 'CAPÍTULO'
                  indexCapitulo = newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children.at(-1).name
                  indexCapitulo = newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children.findIndex(i => i.name == indexCapitulo)
              }
            }

            else if(el.textLaw.toUpperCase().startsWith('SEÇÃO')){
              if(indexParte == 99){
                if(indexLivro == 99){
                    if(indexTitulo == 99) {
                      if (nameEstrutura == 'SEÇÃO'){
                        newEstrutura[indexCapitulo].children.push({name: el.textLaw})
                      } else if (nameEstrutura == 'CAPÍTULO') {
                        newEstrutura[indexCapitulo].children = [{name: el.textLaw}]
                      } else {
                        newEstrutura[indexCapitulo].children.push({name: el.textLaw})
                      }
                      nameEstrutura = 'SEÇÃO'
                      indexSecao = newEstrutura[indexCapitulo].children.at(-1).name
                      indexSecao = newEstrutura[indexCapitulo].children.findIndex(i => i.name == indexSecao)
                    }else {
                      if (nameEstrutura == 'SEÇÃO'){
                        newEstrutura[indexTitulo].children[indexCapitulo].children.push({name: el.textLaw})
                      } else if (nameEstrutura == 'CAPÍTULO') {
                        newEstrutura[indexTitulo].children[indexCapitulo].children = [{name: el.textLaw}]
                      } else {
                        newEstrutura[indexTitulo].children[indexCapitulo].children.push({name: el.textLaw})
                      }
                      nameEstrutura = 'SEÇÃO'
                      indexSecao = newEstrutura[indexTitulo].children[indexCapitulo].children.at(-1).name
                      indexSecao = newEstrutura[indexTitulo].children[indexCapitulo].children.findIndex(i => i.name == indexSecao)
                    }
                } else {
                  if (nameEstrutura == 'SEÇÃO'){
                     newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children.push({name: el.textLaw})
                  } else if (nameEstrutura == 'CAPÍTULO') {
                    newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children = [{name: el.textLaw}]
                  } else {
                    newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children.push({name: el.textLaw})
                  }
                  nameEstrutura = 'SEÇÃO'
                   indexSecao = newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children.at(-1).name
                   indexSecao = newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children.findIndex(i => i.name == indexCapitulo)
                }
              } else {
                  if (nameEstrutura == 'SEÇÃO'){
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children.push({name: el.textLaw})
                  } else if (nameEstrutura == 'CAPÍTULO') {
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children = [{name: el.textLaw}]
                  } else {
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children.push({name: el.textLaw})
                  }
                  nameEstrutura = 'SEÇÃO'
                   indexSecao = newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children.at(-1).name
                   indexSecao = newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children.findIndex(i => i.name == indexSecao)
              }
            }

            else if(el.textLaw.toUpperCase().startsWith('SUBSEÇÃO')){
              if(indexParte == 99){
                if(indexLivro == 99){
                  if(indexTitulo == 99) {
                      if (nameEstrutura == 'SUBSEÇÃO'){
                        newEstrutura[indexCapitulo].children[indexSecao].children.push({name: el.textLaw})
                      } else {
                        newEstrutura[indexCapitulo].children[indexSecao].children = [{name: el.textLaw}]
                      }
                      nameEstrutura = 'SUBSEÇÃO'
                    }else {
                      if (nameEstrutura == 'SUBSEÇÃO'){
                        newEstrutura[indexTitulo].children[indexCapitulo].children[indexSecao].children.push({name: el.textLaw})
                      } else {
                        newEstrutura[indexTitulo].children[indexCapitulo].children[indexSecao].children = [{name: el.textLaw}]
                      }
                      nameEstrutura = 'SUBSEÇÃO'
                    }
                } else {
                  if (nameEstrutura == 'SUBSEÇÃO'){
                     newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children[indexSecao].children.push({name: el.textLaw})
                  } else {
                    newEstrutura[indexLivro].children[indexTitulo].children[indexCapitulo].children[indexSecao].children = [{name: el.textLaw}]
                  }
                  nameEstrutura = 'SUBSEÇÃO'
                }
              } else {
                  if (nameEstrutura == 'SUBSEÇÃO'){
                     newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children[indexSecao].children.push({name: el.textLaw})
                  } else {
                    newEstrutura[indexParte].children[indexLivro].children[indexTitulo].children[indexCapitulo].children[indexSecao].children = [{name: el.textLaw}]
                  }
                  nameEstrutura = 'SUBSEÇÃO'
                }
            }

            else {
               items.name = el.textLaw
               newEstrutura.push(items)
            }
          });
          return newEstrutura || this.estrutura
        }
    },
    methods:{
      indiceSubmit(art){
        if(art){
          this.$emit('indice', art)
          this.dialog = false
        }
      }
    }
  }
</script>