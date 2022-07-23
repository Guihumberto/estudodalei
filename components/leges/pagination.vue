<template>
  <div class="text-center">
    <v-pagination
      v-model="pages.page"
      :length="totalPages"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
    props:{
        pages: Object
    },
    computed:{
        totalPages (){
            let totalPages = Math.ceil(this.pages.total/this.pages.perPage)
            return totalPages
        }
    },
  }
</script>