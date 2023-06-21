<template>
  <v-card
    class="mx-auto"
    width="256"
    outlined
    color="#f2f5f9"
  >
      
        <div class="text-center pt-5 pb-2 colorTitle white--text">
          <v-avatar>
            <v-img src="data:image/jpeg;base64,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"></v-img>
          </v-avatar>
          <h5 class="text-h6">Estudo da Lei</h5>
          <p class="caption">www.estudodalei.com.br</p>
        </div>

      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.url"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'Home', icon: 'mdi-home', url: '/' },
        // { text: 'Administração', icon: 'mdi-upload', url: '/admin' },
        { text: 'Leis', icon: 'mdi-book-open-variant', url: '/laws' },
        { text: 'Súmulas', icon: 'mdi-scale-balance', url: '/sumulas' },
        { text: 'Julgados', icon: 'mdi-gavel', url: '/juris' },
        { text: 'Novidades', icon: 'mdi-bookshelf', url: '/news' },
        // { text: 'ENTRAR', icon: 'mdi-login', url: '/login' },
      ],
    }),
  }
</script>
<style scoped>
.colorTitle{
  background: rgb(110,108,107);
  background: -moz-linear-gradient(115deg, rgba(110,108,107,1) 0%, rgba(179,185,194,1) 48%, rgba(89,94,101,1) 100%);
  background: -webkit-linear-gradient(115deg, rgba(110,108,107,1) 0%, rgba(179,185,194,1) 48%, rgba(89,94,101,1) 100%);
  background: linear-gradient(115deg, rgba(110,108,107,1) 0%, rgba(179,185,194,1) 48%, rgba(89,94,101,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#6e6c6b",endColorstr="#595e65",GradientType=1);
}
</style>