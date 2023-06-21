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
          doutrina
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-5">
          Doutrina - {{questao.id}}
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
          <div v-if="!edit && questao.doutrina">
            <h5 class="text-h5">Comentário da Doutrina Cadastrado</h5>
            <p>{{questao.doutrina}}</p> <v-btn @click="edit = true">editar</v-btn>
          </div>
          <div v-else>
            <v-textarea
              
              label="Doutrina"
              dense outlined
              v-model.trim="questao.doutrina"
            ></v-textarea>
            <v-btn color="error" text @click="edit = false">cancelar</v-btn>
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
        edit: false
        }
    },
    props:{
            questao: Object
    },
    computed:{

    },
    methods:{
        ...mapActions(['editSetQuestao']),
        saveEdition(){ 
          this.editSetQuestao(this.questao)
          this.$store.dispatch("snackbars/setSnackbars", {text:'Comentário inserido com sucesso', color:'success'})
          this.dialog = false
        },
    }
  }
</script>

<style lang="scss" scoped>

</style>