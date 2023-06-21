<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="700"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          fab
          small
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text--white text-h5 primary lighten-2 mb-5">
          Inserir
          <v-spacer></v-spacer>
          <v-btn
            dark
            icon
            @click="dialog = false"
          ><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="save" ref="forms">
                <v-text-field
                    label="Nome"
                    v-model="leges.nickname"
                    placeholder="Digite o Nome da Lei"
                    required
                    dense
                    outlined
                    :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                    label="Nro da Lei"
                    v-model="leges.nro"
                    placeholder="Digite o número da Lei"
                    required
                    dense
                    outlined
                    :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                    label="Data da Lei"
                    v-model="leges.dateLaw"
                    placeholder="Digite a data da Lei"
                    required
                    type="date"
                    dense
                    outlined
                    :rules="[rules.required]"
                ></v-text-field>
                <v-textarea
                    label="Descrição"
                    v-model="leges.description"
                    placeholder="Digite a descrição da Lei"
                    required
                    dense
                    outlined
                    :rules="[rules.required]"
                ></v-textarea>
                <v-autocomplete
                    dense
                    outlined
                    label="Disciplina"
                    :items="tags"
                    item-text="name"
                    item-value="sigla"
                    v-model="tag"
                    @click="includeTag(tag)"
                ></v-autocomplete>
                <v-chip-group>
                  <v-chip
                  close
                  v-for="(item, index) in leges.subject" :key="index"
                  @click="includeTag(item)"
                  >{{item}}</v-chip>
                </v-chip-group>
                <v-card-actions>
                     <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        outlined
                        @click="clearFields"
                    >Limpar</v-btn>
                    <v-btn
                        color="primary"
                        type="submit"
                    >
                        Salvar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        tag: '',
        tags:[
          {name: 'D. Constitucional', sigla: 'DC'},
          {name: 'D. Tributário', sigla: 'DT'},
          {name: 'D. Administrativo', sigla: 'DA'},
          {name: 'D. Previdenciário', sigla: 'PREV'},
          {name: 'D. Empresarial', sigla: 'DE'},
          {name: 'D. Civil', sigla: 'CC'},
          {name: 'D. Penal', sigla: 'DP'},
          {name: 'D. Humanos', sigla: 'DH'}
        ],
        leges:{
            nickname: '',
            nro: '',
            dateLaw: '',
            description: '',
            subject: []
        },
        rules:{
            required: (value) => !!value || "Campo obrigatório",
        }
      }
    },
    methods:{
        clearFields(){
            this.leges = {
            nickname: '',
            nro: '',
            dateLaw: '',
            description: '',
            subject: []
            }
        },
        includeTag(tag){
          if(tag){
           let findTag = this.leges.subject.find(i => i == tag)
           findTag ? this.leges.subject.splice(tag, 1) : this.leges.subject.push(tag)
          }
        },
        save(){
            if(this.$refs.forms.validate()){
                 this.$emit('saveLaw', this.leges)
                 this.clearFields()
                 this.dialog = false
            }
        }
    }
  }
</script>