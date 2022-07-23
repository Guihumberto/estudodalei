<template>
  <div>
    <v-btn
      color="primary"
      text
      @click.stop="dialog = true"
    >
      Listar
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="1080"
    >
      <v-card>
        <v-card-title class="grey lighten-2 text-h5">
          Sumulas
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-subheader>Total: {{listSumulas.length}} (Atualizado até março de 2020)</v-subheader>
     
            <template v-for="(item, index) in listSumulas">
            <v-divider v-if="index != 0" inset></v-divider>
            <v-list-item :key="index">
              <v-list-item-avatar class="white--text" color="indigo">
                {{item.orgao}}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                 Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}
                 <v-chip x-small v-for="(tag, index) in item.tag" :key="index">{{tag}}</v-chip>
                </v-list-item-title>
                <div class="mt-2"> <p class="caption">{{item.text}}</p></div>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon> <v-icon>mdi-arrow-right</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
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
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    computed:{
      listSumulas(){
        const sumulas = this.$store.getters.readSumulas
        return sumulas
      }
    }
  }
</script>