<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1080"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          outlined
        >
          Vincular
        </v-btn>
      </template>

      <v-card color="grey lighten-2">
        <v-card-title class="text-h5 grey mb-5">
          Vincular
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false"> <v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
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
              <v-col class="my-n5 pl-0">
                <v-chip-group>
                  <v-chip 
                    small color="primary lighten-2" 
                    v-for="item, i in lawsRecentes" :key="i"
                    @click="cargaNew(item), showMore += lawText.length, law = item"
                    close
                    @click:close="excluirLawRecente(item)"
                  >
                    {{nomeLawApa(item)}}
                  </v-chip>
                </v-chip-group>
              </v-col>
              <v-card-actions class="my-n3">
                <v-switch
                  v-show="false"
                  class="mr-2"
                ></v-switch>
                <v-text-field
                  label="Busca"
                  placeholder="digite o número do artigo"
                  v-if="!cargaLoad"
                  @keyup.enter="scroll(artFind)"
                  v-model="artFind"
                ></v-text-field>
                <v-btn
                  v-else
                  text
                  loading
                ></v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                outlined color="primary"
                @click="clearLaw()"
                > Limpar </v-btn>
                <v-btn  
                  v-if="law" 
                  @click="cargaNew(law), showMore += lawText.length" class="ml-2" color="primary">
                  Carregar
                </v-btn>
              </v-card-actions>
          </v-card-text>
          <v-card flat height="600" class="overflow-auto">
            <!-- questao -->
            <v-card-text>
              <v-alert color="primary" outlined>
                <p>{{questao.id}}</p>
                <p>{{questao.answer}}</p>
                <p>{{questao.alternative}}</p>
              </v-alert>
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
                      <p :id="`10${item.art}`" class="formatText" v-text="item.textLaw" :title="`art. ${item.art}`"></p>
                      </div>
                    </div>
                    <v-btn 
                      @click="vincular(item, index)"
                      v-if="!item.estrutura" 
                      small 
                      :outlined="!vincFormat(item)"
                      :color="vincFormat(item)? 'error' : 'primary'">
                      {{vincFormat(item) ? 'Excluir' : 'vincular'}}
                    </v-btn>
                  </div>
                </div>
                <div v-if="lawText.length > showMore">
                    <v-btn 
                    block outlined color="success lighten-1"
                    @click="showMore +=250"
                    >ver mais</v-btn>
                    <v-btn 
                    block text color="success lighten-1"
                    @click="showMore += lawText.length"
                    >mostrar tudo</v-btn>
                </div>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              outlined
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
          showMore: 20,
          artFind: 1,
          cargaLoad: false
        }
    },
    props:{
            questao: Object,
            lawsRecentes: Array
    },
    computed:{
        listLaws(){
            let listDotNot = []
            let list = this.$store.getters.readLawsList

            list.forEach(i => {
              i.nickname = i.nickname.replace('.', '')
              listDotNot.push(i)
            })

            return listDotNot
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
        },
    },
    methods:{
        ...mapActions(['cargaLawComplement', 'linkQuestionDispositive', 'editSetQuestao']),
        vincular(item, index){
          let data = {}
          data = {
            idLaw: this.law,
            idDispositivo: index,
            dispositive: item
          }
          if(!data.dispositive.idQuestions){
            data.dispositive.idQuestions = []
          }
          let validador = data.dispositive.idQuestions.find(i => i == this.questao.id)

          if(validador){

            if(data.idLaw && data.idDispositivo && data.dispositive){
              data.dispositive.idQuestions = data.dispositive.idQuestions.filter(i => i != this.questao.id)
              this.linkQuestionDispositive(data)
              this.questao.vinc = false
              this.editSetQuestao(this.questao)
              return this.$store.dispatch("snackbars/setSnackbars", {text:'Questão desvinculada do dispositivo', color:'success'})
            } else {
              return this.$store.dispatch("snackbars/setSnackbars", {text:'Selecione a Lei na barra de busca', color:'error'})
            }
          }

          data.dispositive.idQuestions.push(this.questao.id)

          if(data.idLaw && data.idDispositivo && data.dispositive){
            this.linkQuestionDispositive(data)
            this.editQuestao()
            this.$store.dispatch("snackbars/setSnackbars", {text:'salvo com sucesso', color:'success'})
          } else {
            this.$store.dispatch("snackbars/setSnackbars", {text:'Selecione a Lei na barra de busca', color:'error'})
          }
        },
        editQuestao(){
            this.questao.vinc = true
            this.editSetQuestao(this.questao)
            this.$store.dispatch("snackbars/setSnackbars", {text:'Vinculado com sucesso', color:'success'})
        },
        clearLaw(){
            this.law = ''
            this.listFilterArt = []
            this.filterArtActive = false
        },
        scroll(ref){
          const loadArt = this.lawText.slice(0, this.showMore).find(i => i.art == ref)
          if(loadArt){
            const element = document.getElementById(`10${ref}`)
            element.scrollIntoView({behavior: "smooth"})
          } else {
            this.$store.dispatch("snackbars/setSnackbars", {text:'Artigo não encontrado ou lei não carregada.', color:'error'})
          }
        },
        cargaNew(law){
          this.cargaLoad = true
          this.cargaLawComplement(law).then((res) => {
            this.cargaLoad = false
          })

          this.$emit('consultaRecente', law)
        },
        nomeLawApa(item){
          let name = this.listLaws.find(i => i.id == item)
          return name.nro
        },
        excluirLawRecente(law){
          this.$emit('excluirLawRct', law)
        },
        vincFormat(item){
          if(item.idQuestions && item.idQuestions.length){
            let result = item.idQuestions.find(i => i == this.questao.id)
            return result
              ? true 
              : false
          } else {
            return false
          }
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>