<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="800"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
            small outlined
            title="Anexos"
            v-bind="attrs"
            v-on="on">
           <v-icon small class="mr-1">mdi-filter</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Filtros
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="mt-5" v-if="user">
          <v-list v-if="filterList[0]">
            <template v-for="item, index in filterList">
              <v-divider v-if="index != 0"></v-divider>
              <v-list-item @click="filterActivePush(item)" :key="index">
                <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-1 mb-1">mdi-folder</v-icon>{{item.folder}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="overline">
                      <v-icon small class="mr-1 mb-1">mdi-file</v-icon>{{item.filter}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Arts: <span v-for="art, i in item.arts" :key="i"> <span v-if="i != 0">,</span> {{art}}</span> 
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon large>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
          <v-alert type="error" outlined v-else>
            Não há filtros salvos nesta lei
          </v-alert>
        </v-card-text>
        <v-card-text class="text-center mt-5" v-else>
          <p>Necessário estar logado para esta funcionalidade</p>
          <v-btn to="/login"> <v-icon class="mr-2">mdi-account</v-icon> Login</v-btn>
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
      law: true
    },
    computed:{
      user(){
        const user = this.$store.getters.readUser
        return user.uid
      },
      filterList(){
          let folder = this.$store.getters.readFilterArts
          folder = folder.filter(i => i.law == this.law[2])
          return folder
      }
    },
    methods:{
      ...mapActions(['cargaFilterArts']),
      filterActivePush(item){
        if(item.arts){
          this.$emit('filterArtsPush', item.arts)
          this.$store.dispatch("snackbars/setSnackbars", {text:'Filtro na tela.', color:'success'})
          this.dialog = false
        }
      },
      cargaFilterArtsUser(){
          if(this.user){
              this.cargaFilterArts()
          }
      }
    },
    created(){
        this.cargaFilterArtsUser()
    }
  }
</script>