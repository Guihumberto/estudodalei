<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
            small outlined
            v-bind="attrs"
            v-on="on">
           <v-icon small>mdi-book-plus-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-3 grey--text">
          Conjugar normas {{cargaOtherTextLawComputede}}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-5" v-if="!law">
                <v-autocomplete
                  label="Norma"
                  :items="listLaws"
                  item-text="nickname"
                  item-value="id"
                  dense
                  outlined
                  v-model="law"
                ></v-autocomplete>
        </v-card-text>
        <v-card-text v-else>
          <!-- barra do título -->
          <v-card-title><v-icon color="success" class="mr-1">mdi-plus-circle</v-icon> {{nameLawOne.nickname}} - {{nameLawOne.nro}}
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="back()">voltar</v-btn>
          </v-card-title>
          <v-card-text>
            <!-- barra de pesquisa do artigo -->
            <v-text-field
              dense outlined
              label="Artigo"
              placeholder="Digite o número do artigo"
              type="number"
              v-model.number="art"
              @keydown.enter="includeArt(art)"
            ></v-text-field>
            <!-- <span v-if="!textLaw.length">Aguarde... {{textLaw}}</span> -->
          </v-card-text>
          <v-card-text>
            <!-- abas ARTIGOS E SELEÇÃO -->
            <v-tabs
              v-model="model"
              centered
              v-if="cargaArt[0]"
            >
              <v-tab
              >
                Artigo 
              </v-tab>
              <v-tab
              v-if="listDispositives[0]"
              >
                Seleção 
              </v-tab>
            </v-tabs>
            <!-- conteudo das abas -->
            <v-tabs-items v-model="model">
            <!-- aba artigo -->
              <v-tab-item>
                <v-list>
                  <v-list-item v-if="cargaArt.length > 1" append class="success lighten-4">
                    <v-list-item-icon>
                      <v-icon>mdi-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Incluir todo o dispositivo
                      </v-list-item-title>
                    </v-list-item-content>
                    
                    <v-list-item-action>
                      <v-btn color="primary" icon @click="includeAllArt()"><v-icon>mdi-plus-box-multiple</v-icon></v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item v-for="(item, index) in cargaArt" :key="index">
                    <v-list-item-content>
                      <p>{{item.textLaw}}</p>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="item.add ? 'error' :'success'" 
                        @click="item.add ? removeSelectionItem(item) :selectArtView(item)"
                      ><v-icon>{{item.add ? 'mdi-delete': 'mdi-book-plus-outline'}}</v-icon></v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-tab-item>
              <v-tab-item>
               <v-card-title>
                <v-spacer></v-spacer>
                <v-btn small color="success" @click="sendSelection()">Enviar</v-btn>
               </v-card-title>

                <v-list>
                  <v-list-item v-for="(item, index) in listDispositives" :key="index">
                    <v-list-item-content>
                      <p>{{item.textLaw}}</p>
                    </v-list-item-content>
                    <v-list-item-action>
                    <v-btn icon color="error" 
                      @click="removeSelection(index)"
                    ><v-icon v-text="'mdi-delete'"></v-icon></v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
            small
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
   import { mapActions } from 'vuex';

  export default {
    data () {
      return {
        dialog: false,
        model: 'tab-2',
        law:'',
        art:'',
        findArt: '',
        textLaw: [],
        listDispositives: [],
        nameLaw: ''
      }
    },
    computed:{
      listLaws(){
        return this.$store.getters.readLawsList
      },    
      cargaArt(){
        return this.textLaw.filter( item => item.art == this.findArt && !item.estrutura) || []
      },
      nameLawOne(){
        if(this.law){
          return this.$store.getters.readLawsList.find(i => i.id == this.law)
        }
      },
      cargaOtherTextLawComputede(){
        if(this.law){
           this.cargaOtherTextLaw(this.law)
           return "!"
        }
      }
    },
    methods:{
      ...mapActions(['cargaOtherTextLaw', 'cargaNameOtherLaw']),
      includeArt(art){
        this.art = ''
        this.findArt = art
        this.cargaLaw()

      },
      cargaLaw(){
        this.textLaw = this.$store.getters.readOtherTextLaw
      },
      selectArtView(item){
        let itemAdd = this.listDispositives.find( i => i.textLaw == item.textLaw)
        if(!itemAdd){
          this.listDispositives.push(item)
          item.add = true
        }
      },
      removeSelectionItem(item){
        let index = this.listDispositives.findIndex( i => i.id == item.id)
 
        this.listDispositives[index].add = false
        this.listDispositives.splice(index, 1)
      },
      removeSelection(item){

        this.listDispositives[item].add = false
        this.listDispositives.splice(item, 1)
      },
      sendSelection(){
        let dataLaw = [this.nameLawOne, this.listDispositives]
        this.$emit('listOtherLaws', dataLaw)
        this.dialog = false
      },
      back(){
        this.law = '' 
        this.textLaw = []
        this.listDispositives = []
        this.art ='',
        this.findArt = ''
      },
      includeAllArt(){
        this.cargaArt.forEach(dispositivo => this.selectArtView(dispositivo));
      }
    }
  }
</script>