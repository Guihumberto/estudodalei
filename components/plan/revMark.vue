<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text color="warning"
            v-bind="attrs"
            v-on="on"
            :title="alertTextIcon.text"
            :disabled="!listMarkRev.length"
          >
          <v-icon
            v-text="alertTextIcon.icon"
            class="mr-1"
          ></v-icon>
          marcados para revisão
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="text-h5 grey lighten-2 mb-5">
            <v-icon class="mr-1">mdi-message-draw</v-icon>
            Lista de Marcados para Revisão
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="dialog = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
  
          <v-card-text>
            <v-list
                two-line
            >
                <v-subheader>Tarefas</v-subheader>

                <v-list-item-group
                    v-model="selected" multiple
                    active-class="pink--text"
                >
                    <template v-for="item, i in listMarkRev">
                        <v-list-item 
                            :key="item.description"
                            @click="addListAddRev(item)"
                        >
                            <template v-slot:default="{ active }">
                                <v-list-item-content>
                                    <v-list-item-title>{{item.description}}</v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{findDisciplina(item.disciplina).name}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                                    <v-icon
                                    v-if="!active"
                                    color="grey lighten-1"
                                    >
                                    mdi-check
                                    </v-icon>

                                    <v-icon
                                    v-else
                                    color="yellow darken-3"
                                    >
                                    mdi-check-bold
                                    </v-icon>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                        <v-divider
                            v-if="i < listMarkRev.length - 1"
                            :key="i"
                        ></v-divider>
                    </template>
                </v-list-item-group>
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
            <v-btn
              color="primary"
              outlined
              :disabled="!listAddRev.length"
              @click="sendAddRev()"
            >
              Adicionar
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
        selected: [],
        listAddRev: [],
        disciplinas: [
                {id: 1, name: 'Direito Administrativo'},
                {id: 2, name: 'Direito Constitucional'},
                {id: 3, name: 'Direito Previdenciário'},
                {id: 4, name: 'Direito Tributário'},
                {id: 5, name: 'Português'},
                {id: 6, name: 'Raciocínio Lógico'},
                {id: 7, name: 'Informática'},
                {id: 8, name: 'Direito Eleitoral'},
                {id: 9, name: 'Regimento Interno'},
                {id: 10, name: 'Direito das Pessoas Com Deficiência'},
                {id: 11, name: 'Normas Aplicáveis aos Servidores Públicos Federais'},
                {id: 12, name: 'Direito das Pessoas Com Deficiência'},
                {id: 21, name: 'Java Iniciante'},
                {id: 22, name: 'Java Trilha'},
                {id: 23, name: 'Java Projetos'},
            ],
      }
    },
    computed:{
        listTasks(){
            return this.$store.getters.readPlanTasks.map(i => i.id)
        },
        listMarkRev(){
        
            let list = this.$store.getters.readListAddRev.filter(i => i.addRev)

            if(list.length){
              this.listTasks.forEach(id => {
                list = list.filter(item => item.id != id)
              })
            }

            return list
        },
        alertTextIcon(){
          let alarm = this.listMarkRev
          return alarm.length
          ? {icon: 'mdi-alarm', text:"tarefas marcadas para revisão"}
          : {icon: 'mdi-alarm-off', text:"tarefas marcadas para revisão"}

        }
    },
    methods:{
        ...mapActions(['cargaListTasks','cargaListAddRev']),
        isExistTask(item){
            let task = this.listAddRev.find(i => i.id == item.id)
            return !!task
        },
        addListAddRev(item){
            if(!this.isExistTask(item)){
                this.listAddRev.push(item)
            }else{
                this.removeListAddRev(item)
            }
        },
        removeListAddRev(item){
            this.listAddRev = this.listAddRev.filter(i => i.id != item.id)
        },
        sendAddRev(){
            this.dialog = false
            this.$emit('listRev', this.listAddRev)
            this.listAddRev = []
        },
        findDisciplina(item){
          let disciplina = this.disciplinas.find(i => i.id == item)
          return disciplina
          ? disciplina
          : {id: 0, name: 'não cadastrado'}
        }
    },
    created(){
        this.cargaListTasks(this.$route.params.planLeges)
        this.cargaListAddRev()
    }
  }
</script>