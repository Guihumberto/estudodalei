<template>
  <div>
    <v-btn
      color="primary"
      icon
      @click.stop="dialog = true"
    >
      <v-icon>mdi-eye-arrow-right</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Nome da Legislação</span>
        </v-card-title>
        <v-card-text>
          <div>
            <template v-for="(item, index) in textLaw">
                <p :key="index">{{item.textLaw}}</p>
            </template>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
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
    props:{
        textLaw: false
    }
  }
</script>