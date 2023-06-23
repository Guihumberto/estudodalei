<template>
  <div>
    <h1>Pastas</h1>
    <listLaws-folders-addFolder />
    <listLaws-folders-listalall :folders="folders" @addFolder="addFolder($event)" />
  </div>
</template>

<script>
  export default {
    data(){
      return {
        folders: [
          'INSS', 'TCE', 'SEFAZ'
        ]
      }
    },
    methods: {
      addFolder(item){
        console.log("salvar", item);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
