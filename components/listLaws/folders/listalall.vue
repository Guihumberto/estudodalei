<template>
  <div>
    <div class="wrapperList">
      <v-card
        class="text-center ma-2 folder"
        width="124"
        height="90"
        flat
        v-for="item, i in folders" :key="i"
      >
        <v-icon
          size="50"
        >mdi-folder</v-icon>
        <h6>{{ item}}</h6>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      folders: false
    }
  }
</script>

<style scoped>
.wrapperList {
  display: flex;
  justify-content: left;
  width: 100%;
  flex-wrap: wrap;
  padding: 1rem;
}
.folder {
  background: transparent;
  transition: .5s;
}
.folder:hover {
  background: rgb(230, 224, 224);
}
</style>
