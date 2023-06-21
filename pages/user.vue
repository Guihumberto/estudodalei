<template>
    <v-container>
        <h1 class="text-h4">Área do Usuário</h1>
        <v-card class="mt-1" outlined>
            <v-card-text>
                <v-alert type="error" outlined prominent>
                    <p>Esta seção está em fase de construção. Não se preocupe caso ocorra algum erro, 
                        estamos trabalhando no recurso mais produtivo para seus estudos.</p>
                     <v-icon color="error" v-for="item in 20" :key="item">mdi-hammer</v-icon>
                </v-alert>
                <v-btn outlined to="/">home</v-btn>
                <v-btn outlined to="/plan">Planejamento</v-btn>
            </v-card-text>
        </v-card>
        <v-card outlined class="mt-5">
            <v-toolbar
            color="primary lighten-1"
            dark
            flat
            >
            <v-toolbar-title>Favoritos e Pasta de Revisão</v-toolbar-title>

                <v-spacer></v-spacer>
                {{testUser.name}}
                <v-menu
                    left
                    offset-x
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            icon
                        >
                        <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                        <v-list>
                            <v-list-item to="/plan">
                                <v-list-item-title>Planejamento</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                <template v-slot:extension>
                    <v-tabs
                    v-model="tab"
                    align-with-title
                    class="ml-n15"
                    >
                        <v-tabs-slider color="yellow"></v-tabs-slider>

                        <v-tab
                            v-for="item in items"
                            :key="item"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                </template>
            </v-toolbar>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <stageuser-sumulasUser :user="testUser" />
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            em construção...
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            em construção...
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>

  export default {
    data () {
      return {
        tab: null,
        items: [
          'Súmulas', 'Jurisprudências', 'Pastas',
        ],
      }
    },
     middleware: "auth",
     asyncData({store}) {
        const user = store.getters.readUser
        return {
            testUser: {
                name: user.name,
                uid: user.uid
            } 
        }
     },
  }
</script>

<style lang="scss" scoped>

</style>