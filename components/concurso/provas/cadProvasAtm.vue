<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="700"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="warning lighten-1"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Incuir Cargo
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="white--text text-h5 warning lighten-2 mb-5">
            Incluir cargo
          </v-card-title>
  
          <v-card-text>
            <h5 class="text-h5 mb-5">Dados de Inclusão: </h5>
            id: {{lastId}}<br>
            banca: {{prova.banca}} <br>
            orgao: {{prova.orgao}} <br>
            cargo: {{prova.name}} <br>
            Ano: {{prova.year}} <br>
            Tipo: {{prova.type == 1 ? 'V/F' : 'ME'}} <br>
            <v-select
                label="Área"
                placeholder="escolha a área"
                dense outlined
                :items="area"
                item-value="id"
                item-text="name"
                v-model="codArea"
                :rules="[rules.required]"
            ></v-select>

          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="grey"
              text
              @click="dialog = false"
            >
              cancelar
            </v-btn>
            <v-btn
              color="primary"
              text outlined
              @click="saveCargoAtm()"
            >
              Incluir
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
          codArea: 0,
          area:[
                {id: 1, name: 'Controle'},
                {id: 2, name: 'Fiscal'},
                {id: 3, name: 'Jurídica'},
                {id: 4, name: 'Magistratura'},
                {id: 5, name: 'OAB'},
                {id: 6, name: 'Outras'},
            ],
          rules:{
                required: (value) => !!value || "Campo obrigatório",
                email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
                minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
            },
        }
      },
      props:{
        prova: Object
      },
      computed:{
            listProves(){
                let list = this.$store.getters.readProvas.filter( i => i)
                return list
            },
            lastId(){
                let last = this.listProves.at(-1)
                last = parseInt(last.id)
                return last+1
            }
      },
      methods:{
        ...mapActions(['setProve']),
        saveCargoAtm(){
            if(this.codArea){

                let prova2 = {}
         
                prova2.id = this.lastId,
                prova2.cargo = this.prova.name,
                prova2.banca = 2,
                prova2.active = true
                prova2.area = this.codArea
                prova2.orgao = this.prova.orgao
                prova2.year = this.prova.year
                prova2.type = this.prova.type

                this.setProve(prova2)
              

                this.prova.area = ''
                this.$store.dispatch("snackbars/setSnackbars", {text:'Prova salva com sucesso.', color:'success'})
                this.dialog = false
                this.$emit('clearAll')
            } else {
                this.$store.dispatch("snackbars/setSnackbars", {text:'Selecione a área.', color:'error'})
            }   
        }
      }
    }
  </script>