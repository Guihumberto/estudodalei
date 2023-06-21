<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-pencil-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2 mb-5">
          Editar Súmula
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-radio-group v-model="sumula.orgao" row>
                    <v-radio
                        v-for="n in orgao"
                        :key="n"
                        :label="n"
                        :value="n"
                    ></v-radio>
                </v-radio-group>
                <v-text-field
                    label="Número"
                    v-model="sumula.nro"
                    outlined dense
                ></v-text-field>
                <v-textarea
                    label="Texto da Súmula"
                    v-model="sumula.text"
                    outlined dense
                ></v-textarea>
                <div class="d-flex">
                    <v-text-field
                        label="Tags"
                        v-model="insertNewTag"
                        outlined dense
                    ></v-text-field>
                    <v-btn 
                        @click="insertTag(insertNewTag)"
                        icon>
                        <v-icon color="success">mdi-plus-circle</v-icon>
                    </v-btn>
                </div>
                <div>
                    <v-chip-group
                        active-class="primary--text"
                        column
                    >
                        <v-chip
                        v-for="tag, index in sumula.tag"
                        :key="tag"
                        close
                        @click:close="sumula.tag.splice(index, 1)"
                        >
                        {{ tag }}
                        </v-chip>
                    </v-chip-group>
                </div>
                <v-checkbox
                  v-model="sumula.cancel"
                  label="Súmula Cancelada"
                  color="red"
                ></v-checkbox>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="saveEditSumula()"
          >
            Salvar
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
        radioGroup: 1,
        orgao:['STF', 'STJ'],
        insertNewTag: '',
      }
    },
    props:{
        sumula: Object
    },
    methods:{
        ...mapActions(['editSumulaFB']),
        insertTag(item){
            this.sumula.tag.push(item.toUpperCase())
            this.insertNewTag = ''
        },
        saveEditSumula(){ 
            this.editSumulaFB(this.sumula)
            this.dialog = false
    
        }
    }
  }
</script>