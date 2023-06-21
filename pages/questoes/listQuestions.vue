<template>
    <v-container style="max-width:1080px">
        <v-btn 
            :to="{name: 'admin', 
                  params:{tab:4}
                 }" 
            text><v-icon>mdi-chevron-left</v-icon> voltar</v-btn>
        <h5 class="text-h5 mb-5">Lista de Questões</h5>
        <!-- busca -->
        <v-card class="mb-5">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            label="Disciplina"
                            outlined dense
                            :items="listDisciplinas"
                            item-text="name"
                            item-value="id"
                            v-model="disciplina"
                            clearable
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            label="Prova"
                            outlined dense 
                            :items="listProvas.filter(i => i.active)"
                            item-text="cargo"
                            item-value="id"
                            v-model="prova"
                            clearable
                        ></v-select>
                    </v-col>
                    <v-col cols="12" class="mt-0 pt-0 d-flex">
                        <v-checkbox
                            label="não vinculadas"
                            v-model="vincs"
                        ></v-checkbox>
                        <v-checkbox
                            label="com comentários"
                            v-model="justComment"
                            class="ml-2"
                        ></v-checkbox>
                        <v-checkbox
                            label="desatualizadas"
                            v-model="outdated"
                            color="warning"
                            class="ml-2"
                        ></v-checkbox>
                        <v-checkbox
                            label="anuladas"
                            v-model="canceled"
                            color="error"
                            class="ml-2"
                        ></v-checkbox>
                    </v-col>
                </v-row>
                <v-text-field
                    dense
                    class="mx-2"
                    outlined
                    append-icon="mdi-magnify"
                    label="Busca"
                    placeholder="Digite o texto ou assertiva da questao..."
                    v-model="search"
                    required
                    clearable
                ></v-text-field>
            </v-card-text>
        </v-card>
        <!-- questoes -->
        <v-card outlined>
            <v-card-title>
                <v-spacer></v-spacer>
                Qtd: {{listQuestions.length}}
            </v-card-title>
            <v-card-text>
                <template v-for="item, index, in listQuestions.slice(0, showMore)">
                    <div class="mb-5" :key="index">
                        <p class="font-weight-black black--text" style="font-size: 18px">
                            <span v-if="item.prove > 0">
                            {{(findRef2(item.prove)).orgao}} / {{(findRef2(item.prove)).cargo}} / {{(findRef2(item.prove)).year}}
                            </span> 
                            <span v-else class="error--text">Não há registro da prova</span>/ 
                            {{(findRef1(item.subject)).name}}
                            <v-icon color="success" v-if="item.vinc || item.doutrina">mdi-check-circle</v-icon>
                        </p>
                        
                        <p class="formatText">{{item.answer}}</p>
                        <p class="formatText">{{item.alternative}}</p>
                        <concurso-questoes-menuLink :questao="item"/>
                    </div>
                    <v-divider class="my-5"></v-divider>
                </template>
                <v-btn 
                    v-if="listQuestions.length > showMore"
                    outlined color="primary" block @click="showMore +=10">ver mais
                </v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
    import concurso from '../_concurso/concurso.vue';
    export default {
  components: { concurso },
        data(){
            return{
                showMore: 10,
                reverse: false,
                disciplina: 0,
                prova: 0,
                search: '',
                vincs: false,
                justComment: false,
                outdated: false,
                canceled: false
            }
        },
        computed:{
            listQuestions(){
                let list = this.$store.getters.readQuestions

               if(this.disciplina){
                list = list.filter( i => i.subject == this.disciplina)
               }

               if(this.prova){
                list = list.filter( i => i.prove == this.prova)
               }

               if(this.justComment){
                list = list.filter( i => i.doutrina)
               }

               if(this.outdated){
                list = list.filter( i => i.outdated)
               }

               if(this.canceled){
                list = list.filter( i => i.canceled)
               }

               if(this.vincs){
                list = list.filter( i => !i.vinc)
                list = list.filter( i => !i.doutrina)
               }

               if(this.search){
                //retirar acentuação
                let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                //retirar caracteres especiais
                let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                //fazer o filtro
                let filtro = list.filter(project => exp.test(project.answer.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test(project.alternative.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ))
                
                list = filtro

                } 

                return list.sort(this.order)
            },
            listDisciplinas(){
                return this.$store.getters.readDisciplinas
            },
            listProvas(){
                let list = this.$store.getters.readProvas.filter( i => i)
                return list
            },
            findRef1(){
                return (item) => this.listDisciplinas.find( i => i.id == item)
            },
            findRef2(){
                return (item) => this.listProvas.find( i => i.id == item)
            }
        },
        methods:{
            ...mapActions(['cargaQuestions']),
            order(a, b){ 
                if (a.answer > b.answer) {
                    return 1;
                }
                if (a.answer < b.answer) {
                    return -1;
                }
                return 0;
            }
        },
        created(){
            this.cargaQuestions()
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    line-height: 32px;
    font-size: 18px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
}

</style>