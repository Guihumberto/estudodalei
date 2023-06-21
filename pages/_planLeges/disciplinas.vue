<template>
    <v-container style="max-width:1080px;">
        <h1>Disciplinas</h1> 
        <v-btn small text class="px-0 mb-5" @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-row class="mt-5">
            <v-col cols="4">
                <v-card
                    class="mx-auto"
                    min-height="500"
                    outlined
                >
                    <v-card-text>
                        <v-list>
                            <v-subheader>DISCIPLINAS</v-subheader>
                            <v-list-item-group
                                    v-model="selectedItem"
                                    color="primary"
                                >
                                    <v-list-item
                                    v-for="(item, i) in items"
                                    :key="i"
                                    @click=""
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
                        
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="8">
                <v-card 
                    outlined
                    min-height="500"
                >
                    <v-card-text>
                        <h6 class="text-h6">Conteúdo</h6><br>
                        <p v-for="item, i in timeline" :key="i"> 
                           {{item.text}}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

  export default {
    data: () => ({
      selectedItem: 1,
      disciplinaId: null,
      items: [
        { id: 1, text: 'D. Administrativo', icon: 'mdi-flag' },
        { id: 2, text: 'D. Constitucional', icon: 'mdi-flag' },
        { id: 3, text: 'D. Tributário', icon: 'mdi-flag' },
      ],
    }),
    computed:{
        timeline(){
            let list = this.$store.getters.readCommentsTask

            if(this.disciplinaId){
                console.log("error");
            }

            return list.slice().reverse()
        }
    },
    methods:{
        ...mapActions(['cargaListCommentsTask'])
    },
    created(){
        this.cargaListCommentsTask()
    }
  }
</script>

<style scoped>

</style>