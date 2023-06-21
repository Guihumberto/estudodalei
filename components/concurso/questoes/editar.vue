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
          editar
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-5">
          Editar Questão - {{questao.id}}
        </v-card-title>
        <!-- questao -->
        <v-card-text>
          <v-alert color="primary" outlined>
            <p>{{questao.answer}}</p>
            <p>{{questao.alternative}}</p>
          </v-alert>
        </v-card-text>
        <!-- Editar campos -->
        <v-card-text>
            <v-select
              label="Prova"
              Assunto
              dense outlined
              :items="listProvas"
              item-text="cargo"
              item-value="id"
              v-model="questao.prove"
              clearable
            ></v-select>
            <v-select
              label="Disciplina"
              Assunto
              dense outlined
              :items="listDisciplinas"
              item-text="name"
              item-value="id"
              v-model="questao.subject"
              clearable
            ></v-select>
            <v-textarea
              label="Pergunta"
              dense outlined
              v-model="questao.answer"
            ></v-textarea>
            <v-textarea
              label="Alternativa"
              dense outlined
              v-model="questao.alternative"
            ></v-textarea>
            <v-btn @click="questao.value = 0" :outlined="!questao.value == 0" color="error" class="mr-2">Falso</v-btn>
            <v-btn @click="questao.value = 1" :outlined="!questao.value == 1" color="primary">Verdadeiro</v-btn>
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
          <v-btn class="success" @click="saveEdition()">Salvar</v-btn>
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
        }
    },
    props:{
            questao: Object
    },
    computed:{
          listDisciplinas(){
              return this.$store.getters.readDisciplinas
          },
          listProvas(){
              return this.$store.getters.readProvas
          },
          questaoValidar(){
          const { alternative, answer, prove, subject } = this.questao
          if(alternative && answer && prove && subject){
            return true
          } else {
            return false
          }  
        }
    },
    methods:{
        ...mapActions(['editSetQuestao']),
        saveEdition(){ 
          if(this.questaoValidar){
            this.editSetQuestao(this.questao)
            this.$store.dispatch("snackbars/setSnackbars", {text:'editado com sucesso', color:'success'})
            this.dialog = false
          } else {
            this.$store.dispatch("snackbars/setSnackbars", {text:'não foi possível salvar', color:'error'})
          }
        },
    }
  }
</script>

<style lang="scss" scoped>

</style>