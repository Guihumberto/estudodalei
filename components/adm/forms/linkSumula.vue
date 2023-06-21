<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1080"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          x-small
          outlined
        >
        <v-icon small>mdi-scale-balance</v-icon>
       
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Criar vínculo
          <v-spacer></v-spacer>
          <v-btn @click="dialog = !dialog" icon> <v-icon>mdi-close</v-icon> </v-btn>
        </v-card-title>

        <v-card-text class="mt-5">
          <v-alert outlined text type="success">
            Art. 
            {{dispositivo.item.art}}º <br>
            {{dispositivo.item.textLaw}}
          </v-alert>
          <v-card-text>
            <p>Sumulas Vinculadas <v-btn @click="sumulasVinculadas = !sumulasVinculadas" x-small icon> <v-icon>{{sumulasVinculadas ? 'mdi-eye' : 'mdi-eye-off'}}</v-icon> </v-btn></p>
            <p>{{dispositivo.index}}</p> 
            <v-expand-transition>
              <div v-if="sumulasVinculadas">
                <v-alert v-for="item, index in sumulasVincsDispositivos" :key="index"
                        dense outlined text
                >
                    {{item.orgao}} - Sumula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}
                    {{item.text}}
                </v-alert>
              </div>
            </v-expand-transition>
          </v-card-text>
          <!-- barra de busca -->
          <v-text-field
            label="Súmulas"
            v-model="search"
            placeholder="Busca...."
            outlined dense
            clearable
          ></v-text-field>
          <v-radio-group v-model="orgao" row>
            <v-radio class="mt-n6"
              v-for="n in orgaos"
              :key="n"
              :label="n"
              :value="n"
            ></v-radio>
          </v-radio-group>
          <v-switch
            label="vinculante"
            v-model="vinculante"
            v-if="orgao == 'STF'"
          ></v-switch>
        </v-card-text>
        <v-card-text>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn @click="sumulasView = !sumulasView" small text>{{sumulasView ? 'ocultar' : 'mostrar'}}</v-btn>
          </v-card-title>
          <v-expand-transition>
              <v-list v-show="sumulasView">
                <template v-for="item, index in sumulas.slice(0, 5)">
                  <v-divider v-if="index != 0"></v-divider>
                  <v-list-item :key="index">
                    <v-list-item-avatar>
                      <v-avatar>{{item.orgao}}</v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Súmulas <span v-if="item.vinculante">Vinculante</span> {{item.nro}}</v-list-item-title>
                      {{item.text}}
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="item.add ? 'error' :'primary'" @click="sendSumula(item)">
                        <v-icon>{{ item.add ? 'mdi-delete' : 'mdi-link'}}</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    
                  </v-list-item>
                </template>
              </v-list>
          </v-expand-transition>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text v-if="this.listSumulasVincular.length">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn small @click="vincular()" color="success">Vincular</v-btn>
          </v-card-title>
          <v-list>
            <template v-for="item, index in listSumulasVincular">
              <v-list-item :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{item.orgao}} - Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small color="error" @click="sendSumula(item)" icon> <v-icon>mdi-delete</v-icon></v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
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
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        orgao: 'Tudo',
        orgaos: ['Tudo','STF', 'STJ'],
        sumulasView: true,
        sumulasVinculadas: true,
        listSumulasVincular: [],
        vinculante: false
      }
    },
    props:{
        dispositivo: Object,
    },
    computed:{
      sumulas(){
        let sumulas = this.$store.getters.readSumulas

        if(this.search){
             let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
             let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
             let filtro = sumulas.filter(item => exp.test(item.text.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.nro ))
             sumulas = filtro
        } 

        if(this.orgao != 'Tudo'){
            sumulas = sumulas.filter (i => i.orgao == this.orgao)
        }

        if(this.orgao == 'STF' && this.vinculante) {
          sumulas = sumulas.filter (i => i.vinculante)
        }
            
        return sumulas
         
      },
      sumulasVincsDispositivos(){
        let sumulas = this.$store.getters.readSumulas
        let sumulasDispo = []
        if(Array.isArray(this.dispositivo.sumulas)){
          this.dispositivo.sumulas.forEach( disp => {
            sumulas.forEach(sumul => {
              if(sumul.id == disp){
                sumulasDispo.push(sumul)
              }
            })
          })
        }
        return sumulasDispo
      }
    },
    methods:{
      ...mapActions(['saveSumulaDispositivo']),
      sendSumula(sumula){
        let index = this.listSumulasVincular.findIndex( i => i.id == sumula.id)

        if(index == -1){
          sumula.add = true
          this.listSumulasVincular.push(sumula)          
        } else {
          sumula.add = false
          this.listSumulasVincular.splice(index, 1)       
        }

        console.log(this.listSumulasVincular);
        
      },
      vincular(){
        let data = []
        data.push(this.dispositivo.law[2])
        data.push(this.dispositivo.index)

        !Array.isArray(this.dispositivo.item.sumulas) ? this.dispositivo.item.sumulas = [] : ''

        this.listSumulasVincular.forEach( i => this.dispositivo.item.sumulas.push(i.id))

        data.push(this.dispositivo.item)
        

        //salvar
        this.saveSumulaDispositivo(data)
        this.listSumulasVincular = []
        this.search = ''
        this.dialog = false
      },
      order(a, b){ 
          return this.reverse
          ? a.nro -  b.nro
          : b.nro -  a.nro
      }
    }
  }
</script>