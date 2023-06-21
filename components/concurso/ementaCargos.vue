<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          outlined
          small
        >
          <v-icon small>mdi-text-box</v-icon>
          ementa
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-5">
          Ementa Verticalizada
        </v-card-title>
        <v-card-text>
            <v-card outlined class="my-3">
                <v-card-text>
                    <h5 class="text-h5 mb-5">Conhecimentos Gerais</h5>
                    <v-expansion-panels focusable>
                            <v-expansion-panel 
                            v-for="disciplina, index in ementa.filter( i => i.type == 1)" :key="index">
                            <v-expansion-panel-header>{{disciplina.disciplina}}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list>
                                    <v-list-item v-for="topic, i in disciplina.content" :key="i">
                                        <v-list-item-content>
                                            <v-list-item-subtitle> <v-icon>mdi-chevron-right</v-icon> {{topic.topic}}</v-list-item-subtitle>
                                            <v-list>
                                                <v-list-item v-for="subject, i in topic.subject" :key="i"> 
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle>- {{subject.name}}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
                <v-card-text>
                    <h5  class="text-h5 mb-5">Conhecimentos Específicos</h5>
                     <v-expansion-panels focusable>
                            <v-expansion-panel 
                            v-for="disciplina, index in ementa.filter( i => i.type == 2)" :key="index">
                            <v-expansion-panel-header>{{disciplina.disciplina}}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list>
                                    <v-list-item v-for="topic, i in disciplina.content" :key="i">
                                        <v-list-item-content>
                                            <v-list-item-subtitle> <v-icon>mdi-chevron-right</v-icon> {{topic.topic}}</v-list-item-subtitle>
                                            <v-list>
                                                <v-list-item v-for="subject, i in topic.subject" :key="i"> 
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle>- {{subject.name}}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-card>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            cancelar
          </v-btn>
          <v-btn
            color="primary"
            outlined
            @click="dialog = false"
          >
            IMPORTAR
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
        idConcurso: this.$route.params.concurso
      }
    },
    props:{
        idCargo: true
    },
    computed:{
        ementa(){
                let ementa = this.$store.getters.readEmenta
                return ementa
            }
    },
    methods:{
        ...mapActions(['cargaEmenta']),
        ementaCarregar(){
            console.log(this.idCargo)
            this.cargaEmenta([this.idConcurso, this.idCargo])
        }
    },
    fetch(){
            this.ementaCarregar()
        }
  }
</script>