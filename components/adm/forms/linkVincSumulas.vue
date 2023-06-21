<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="1080"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          v-bind="attrs"
          v-on="on"
          tile
        >
        vincular
        </v-btn>
      </template>
            <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-5">
          Vincular
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false"> <v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <!-- questao -->
        <v-card-text>
          <v-alert color="primary" outlined>
            <p>{{questao.id}}</p>
            <p>{{questao.tese}}</p>
            <p>{{questao.texto}}</p>
          </v-alert>
        </v-card-text>
        <!-- busca -->
        <v-card-text>
            <v-autocomplete
                label="Busca"
                placeholder="Escolha a Lei"
                solo
                dense outlined
                :items="listLaws"
                item-text="nickname"
                item-value="id"
                v-model="law"
                clearable
            ></v-autocomplete>
            <v-btn 
             text class="px-0"
             @click="clearLaw()"
            > Limpar </v-btn>
            <v-btn  v-if="law" @click="cargaLawComplement(law)" class="ml-2" color="primary">Carregar</v-btn>
        </v-card-text>
        <!-- texto da lei -->
        <v-card-text>
            <div v-for="(item, index) in lawText.slice(0, showMore)" :key="index">
              <div class="d-flex jus justify-space-between">
                <div>
                  <div v-if="item.estrutura">
                  <p class="font-weight-medium text-center" v-text="item.textLaw"></p>
                  </div>
                  <div v-else>
                  <p class="formatText" v-text="item.textLaw"></p>
                  </div>
                </div>
                <v-btn 
                  @click="vincular(item, index)"
                  v-if="!item.estrutura" small color="primary" outlined>vincular
                </v-btn>
              </div>
            </div>
            <div v-if="lawText.length > showMore">
                <v-btn 
                block outlined color="success lighten-1"
                @click="showMore +=100"
                >ver mais</v-btn>
                <v-btn 
                block outlined color="success lighten-1"
                @click="showMore += lawText.length"
                >MOSTRAR TUDO</v-btn>
            </div>
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
        law:'',
        lawDefault: 'qrSLeELU-',
        search: '',
        listFilterArt: [],
        filterArtActive: false,
        showMore: 20
        }
    },
    props:{
            questao: Object
    },
    computed:{
        listLaws(){
            return this.$store.getters.readLawsList
        }, 
        lawTextComplete(){
          return this.$store.getters.readLawComplement
        },
        lawText(){
            let textLaw = this.lawTextComplete

            if(this.filterArtActive){
            let list = []
            this.listFilterArt.forEach( art => {
                this.lawTextComplete.forEach ( i => {
                if(art == i.art){
                    list.push(i)
                }
                })
            })
            textLaw = list
            }

            if(this.search){
                let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                //retirar caracteres especiais
                let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                //fazer o filtro
                let filtro =  textLaw.filter(item => exp.test(item.textLaw.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.art ))
                textLaw = filtro
            }

            return textLaw
        },
        cargaLaw(){
        if(this.law){
          this.cargaLawComplement(this.law)
        } else {
          this.cargaLawComplement(this.lawDefault)
        }
        return '!'
      }
    },
    methods:{
        ...mapActions(['cargaLawComplement', 'saveSumulaVincDispositivo']),
        vincular(item, index){
          let data = {}
          data = {
            idLaw: this.law,
            idDispositivo: index,
            dispositive: item
          }
          if(!data.dispositive.sumulas){
            data.dispositive.sumulas = []
          }
          let validador = data.dispositive.sumulas.find(i => i == this.questao.id)

          if(validador){
            this.$store.dispatch("snackbars/setSnackbars", {text:'questao ja cadastrada neste dispositivo', color:'error'})
            return
          }

          data.dispositive.sumulas.push(this.questao.id)

          if(data.idLaw && data.idDispositivo && data.dispositive){
            this.saveSumulaVincDispositivo(data)
            this.$store.dispatch("snackbars/setSnackbars", {text:'salvo com sucesso', color:'success'})
          } else {
            this.$store.dispatch("snackbars/setSnackbars", {text:'há propriedades vazias', color:'error'})
          }
        },
        clearLaw(){
            this.law = ''
            this.listFilterArt = []
            this.filterArtActive = false
        },
    }
  }
</script>

<style lang="scss" scoped>

</style>