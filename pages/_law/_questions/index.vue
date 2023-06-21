<template>
    <v-container class="mt-5 leges" style="max-width: 1080px">
        <v-btn small text class="px-0 mb-5"
        :to="{
            name: 'law-leges',
            params:{law: title},
        }">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card flat>
            <v-card-text class="text-h6">
                <h3>Lista de Questões</h3>
                <span>
                   {{nameLaw[3]}} <br> Normativo: {{nameLaw[4]}}
                </span>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <!-- <v-card flat class="mt-5">
                <v-card-text>
                    <v-text-field
                        label="Busca"
                        outlined dense
                        placeholder="digite o termo ou artigos"
                        v-model="search"
                        clearable
                        append-icon="mdi-magnify"
                    ></v-text-field>
                </v-card-text>
            </v-card> -->
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
                <div>
                    <questionsList-question :listQuestionsID="listIdQuestions" />
                    <!-- <div v-for="item, i in listIdQuestions" :key="i">
                        <p>{{item}}</p>
                    </div> -->
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data(){
            return{
                title: this.$route.params.law,
                search: '',
                arrayCaputExist: []
            }
        },
        computed:{
            textCompleteLaw(){
                return this.$store.getters.readTextLaw
            },
            nameLaw(){
                return this.$store.getters.readNameLaw
            },
            listIdQuestions(){
                const textLaw = this.textCompleteLaw.filter(law => law.idQuestions)

                let listQuestionsID = []

                textLaw.forEach(text => {
                    text.idQuestions.forEach(questions => {
                        listQuestionsID.push({id:text.id, art: text.art, text: text.textLaw,  idQuestion: questions, order:text.order})
                       
                    })
                })

                return listQuestionsID
            }
        },
        methods:{
            ...mapActions(['cargaTextLaw', 'cargaNameLaw', 'saveFavDispositve', 'cargaFavDispositive', 'removeFavDispositive']),
            cargaLazy(){
                this.cargaFavDispositive(this.title)
                setTimeout(() => {
                    this.listFavDispositive = this.$store.getters.readFavDispositive
                    this.listFavDispositive = [...new Set(this.listFavDispositive)];
                }, 2000)
            },
        },
        created(){
            this.cargaTextLaw(this.title)
            this.cargaNameLaw(this.title)
            this.cargaFavDispositive(this.title)
            this.cargaLazy()
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 32px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
}

</style>