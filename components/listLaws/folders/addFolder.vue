<template>
    <v-form class="d-flex my-5" @submit.prevent="sendAddFolder()">
      <v-text-field
        label="Nova Pasta"
        placeholder="Nome da pasta"
        v-model.trim="nameFolder"
        outlined
        dense
      ></v-text-field>
      <v-btn type="submit" color="success" class="ml-2">Criar</v-btn>
    </v-form>
</template>

<script>
  export default {
    data(){
      return {
        nameFolder: ''
      }
    },
    methods: {
      sendAddFolder(){
        this.$emit('addFolder')
        this.nameFolder = ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
