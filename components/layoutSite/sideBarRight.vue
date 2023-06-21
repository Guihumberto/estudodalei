<template>
<div>
  <v-system-bar
    fixed
    window
    dark
    color="primary"
    >{{cargaLaw}}{{nameLaw}}
    <v-spacer></v-spacer>
    <v-btn
      x-small
      icon
      v-if="law"
      @click="clearLaw()"
    ><v-icon>mdi-close</v-icon></v-btn>
  </v-system-bar>

  <v-card
    class="mx-auto mt-5 mb-16"
    outlined
    color="#f7f7f9"
  >    
    <div class="text-center pt-5 pb-2">
      <h5 class="text-h6">Busca</h5>
    </div>
  <v-divider></v-divider>

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
      v-if="!law"
    ></v-autocomplete>
    <v-btn v-else text class="px-0"
      @click="clearLaw()"
    > {{nameLaw}} <v-icon class="ml-1">mdi-close-circle</v-icon></v-btn>
    
    <v-card-title class="text-center primary white--text py-1">
      {{nameLaw}}
    </v-card-title>
    </v-card-text>
    <v-card-text>
      <div v-for="(item, index) in lawText.slice(0, showMore)" :key="index">
        <div v-if="item.estrutura">
          <p class="font-weight-medium text-center" v-text="item.textLaw"></p>
        </div>
        <div v-else>
          <p class="formatText" v-text="item.textLaw"></p>
        </div>
      </div>
      <div v-if="lawText.length > showMore">
        <v-btn 
          block outlined color="success lighten-1"
          @click="showMore +=10"
        >ver mais</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <v-footer fixed>
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-text-field
                dense
                solo
                outlined class="mb-n5"
                label="Busca"
                placeholder="Digite um termo ou número do artigo"
                append-icon="mdi-magnify"
                v-model.trim="search"
                clearable
                @keydown.enter="filterJustArt(search.replace(/[^0-9]/g,''))"
            ></v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-sheet
          class="px-1"
        >
          <v-chip-group column>
            <v-chip 
              v-for="item, index in listFilterArt" :key="index"
              close
              @click:close="removeArt(index)"
              >
                art. {{item}}
            </v-chip>
            <v-chip
              v-if="listFilterArt.length > 1"
              outlined
              color="error"
              @click="listFilterArt = [], filterArtActive = false"
            >limpar</v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
  </v-footer>
</div>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    data: () => ({
      law:'',
      lawDefault: 'qrSLeELU-',
      search: '',
      listFilterArt: [],
      filterArtActive: false,
      showMore: 20
    }),
    computed:{
      listLaws(){
        return this.$store.getters.readLawsList
      }, 
      nameLaw(){
        let nickname
        if(this.law){
          nickname = this.listLaws.find(i => i.id == this.law)
        } else {
          nickname = this.listLaws.find(i => i.id == this.lawDefault)
        }

        return nickname
        ? nickname.nickname
        : ''
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
      lastArt(){
                const law = this.lawTextComplete
                const lastArt = law[law.length -1]
                return lastArt.art
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
      ...mapActions(['cargaLawComplement']),
      isArtFilter(art){
         let result = this.listFilterArt.find(i => i == art)
         return !!result
      },
      filterJustArt(art){     
                if(!this.search){
                  this.$store.dispatch("snackbars/setSnackbars", {text:'Digite um nº ou um termo', color:'error'})
                }  else if(art <= this.lastArt && art > 0){
                    if(!this.isArtFilter(art)){
                      this.listFilterArt.push(art)
                      this.filterArtActive = true
                      this.search = ''
                    } else {
                      this.$store.dispatch("snackbars/setSnackbars", {text:'artigo já está filtrado', color:'error'})
                    }
                } else {
                  this.$store.dispatch("snackbars/setSnackbars", {text:'artigo não existe', color:'error'})
                }
      },  
      removeArt(index){
        this.listFilterArt.splice(index, 1)
        if(!this.listFilterArt.length){
          this.filterArtActive = false
        }
      },
      clearLaw(){
        this.law = ''
        this.listFilterArt = []
        this.filterArtActive = false
      }
    },
    created(){
      this.cargaLawComplement(this.lawDefault)
    }
  }
</script>
<style scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
}
</style>