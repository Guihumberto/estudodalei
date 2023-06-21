<template>
    <v-container style="max-width: 600px;">
        {{task.description}} <br>
        {{task.disciplina}}
      <v-timeline
        dense
        cli1pped
      >
        <v-timeline-item
          fill-dot
          class="white--text mb-12"
          color="orange"
          large
        >
          <template v-slot:icon>
            <span>JH</span>
          </template>
            <v-textarea
              v-model.trim="input"
              hide-details
              flat outlined
              label="Insira com comentário..."
              solo
              @keydown.enter="comment"
            >
            </v-textarea> <br>
            <v-subheader>
              <v-spacer></v-spacer>
              <v-btn
                class="mx-0" color="success"
                outlined small
                @click="comment"
              >
                Salvar
              </v-btn>

            </v-subheader>
        </v-timeline-item>
  
        <v-slide-x-transition
          group
        >
          <v-timeline-item
            v-for="event in timeline"
            :key="event.id"
            class="mb-4"
            color="pink"
            small
          >
          <v-card 
            outlined class="pa-2"
            :color="event.id == deleteId ? 'error': ''"
          >
            <!-- excluir -->
            <v-row 
              justify="space-between"
              v-if="deleteId == event.id">
              <v-col cols="8">
                <p class="text--white">Tem certeza que deseja excluir este comentário?</p>
              </v-col>
              <v-col cols="4">
                <v-btn 
                  color="white" 
                  text
                  @click="deleteId = ''"
                  >Não</v-btn>
                <v-btn 
                  color="white" 
                  outlined
                  @click="deleteComement(event)"
                >Sim</v-btn>
              </v-col>
            </v-row>
            <!-- editar -->
            <v-row 
              justify="space-between"
              v-if="editId == event.id">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  outlined dense
                  v-model="event.text"
                  @keydown.enter="editComment(event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pt-0 text-right">
                <v-btn 
                  color="success" 
                  text x-small
                  @click="editId = ''"
                  >cancelar</v-btn>
                <v-btn 
                  color="success" 
                  outlined x-small
                  @click="editComment(event)"
                >Salvar</v-btn>
              </v-col>
            </v-row>
            <v-row 
              justify="space-between"
              v-else  
            >
              <v-col
                cols="7"
                v-text="event.text"
              ></v-col>
              <v-col
                class="text-right"
                cols="5"
              >
              <span>{{dateFormat(event.time)}}</span>
              <v-btn
                small 
                icon color="secondary"
                @click="editId = event.id"  
              >
                <v-icon small>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn 
                small
                icon color="error"
                @click="deleteId = event.id" 
              >
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-col>
            </v-row>
          </v-card>
          </v-timeline-item>
        </v-slide-x-transition>
  
        <v-timeline-item
          class="mb-6"
          hide-dot
        >
          <span>Fim</span>
        </v-timeline-item>
  
      </v-timeline>
    </v-container>
  </template>
  <script>
  import { mapActions } from 'vuex'
  const shortid = require('shortid');
  import moment from 'moment'

  export default {
    data: () => ({
      commentTask: {},
      input: null,
      editId:'',
      deleteId: ''
    }),
    props:{
        task: Object
    },
    computed: {
      timeline(){
        let list = this.$store.getters.readCommentsTask.filter(i => i.idTask == this.task.id)
        return list.slice().reverse()
      }
    },

    methods: {
      ...mapActions(['cargaListCommentsTask', 'saveCommentTask', 'editCommentTask', 'deleteCommentTask']),
      comment () {
        if(this.input){
          this.commentTask = {
            id: shortid.generate(),
            idTask: this.task.id,
            text: this.input,
            time: new Date()
          }
          this.saveCommentTask(this.commentTask)
          this.$store.dispatch("snackbars/setSnackbars", {text:'Comentário adicionado!!', color:'success'})
          this.input = null
          this.commentTask = {}
        }else {
          this.$store.dispatch("snackbars/setSnackbars", {text:'Campo vazio. Digite uma informação para continuar.', color:'error'})
        }
      },
      deleteComement(item){
        this.deleteCommentTask(item)
        this.deleteId = ''
        this.$store.dispatch("snackbars/setSnackbars", {text:'Comentário excluído!!', color:'success'})
      },
      editComment(item){
        this.editCommentTask(item)
        this.editId = ''
        this.$store.dispatch("snackbars/setSnackbars", {text:'Comentário editado!!', color:'success'})
      },
      dateFormat(date){
              moment.locale('pt-br')
              if(date){
                  const dateM = moment(date).format('DD/MM/YYYY')
                  return dateM
              }else{
                  return 12/12
              }
      },
    },
    created(){
      this.cargaListCommentsTask()
    }
  }
</script>