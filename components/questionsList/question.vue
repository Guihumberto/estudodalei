<template>
    <div>
        <template v-for="item, index in questoes">
            <v-card :key="index">
                <v-card-text>
                    <p style="text-transform: uppercase; font-size: 18px;" class="font-weight-bold">
                        {{prova(item.prove).cargo}}/{{prova(item.prove).orgao}}/{{prova(item.prove).year}}
                    </p>                
                    <p class="formatText">{{item.answer}}</p>
                    <p class="formatText">{{item.alternative}}</p>
                </v-card-text>
                <v-card-text>
                    <div class="my-8">
                        <v-btn 
                            :disabled="!!item.msg"
                            @click="item.resp = 1" small outlined :color="item.resp == 1? 'primary':'grey'">Certo</v-btn>
                        <v-btn 
                            :disabled="!!item.msg"
                            @click="item.resp = 0" small outlined :color="item.resp == 0? 'error':'grey'">Errado</v-btn>
                    </div>
                    <v-btn 
                        v-if="!item.msg"
                        @click="resolver(item)" 
                        :disabled="item.resp == null" 
                        tile color="success">Resolver
                    </v-btn>
                    <v-alert 
                        v-else
                        :type="item.resp == item.value ? 'success' : 'error'"
                        outlined
                    >
                        <p>{{item.msg}} 
                            <v-btn 
                                text
                                color="primary"
                                @click="showTextLaw = !showTextLaw"
                                > 
                                <v-icon>mdi-note-text-outline</v-icon> 
                                {{showTextLaw?'Ocultar Dispositivo':'Mostrar Dispositivo'}}
                            </v-btn>
                        </p>
                        <div v-show="showTextLaw">
                            <p v-for="item, i in textLaw(item.id)" :key="i">
                                <span v-if="item.order != 10">Art. {{item.art}}, </span>
                                <span>{{item.text}}</span>
                            </p> 
                        </div>  
                    </v-alert>
                </v-card-text>
            </v-card>
        </template>
        <div class="text-center my-5">
            <v-pagination
                v-model="pagination.page"
                :length="totalPages"
                circle
            ></v-pagination>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                pagination:{
                    page: 1,
                    perPage: 1,
                },
                showTextLaw: false
            }
        },
        props:{
            listQuestionsID: Array
        },
        computed:{
            questoesComplete(){
                return this.listQuestionsID.length
            },
            questoes(){
                const questoes = this.$store.getters.readQuestions
                let newQuestoes = []

                const listQuestion = this.listQuestionsID.map(item => item.idQuestion)

                const listQuestionsID = [...new Set(listQuestion)];

                if (listQuestionsID){
                       listQuestionsID.forEach (i => 
                        questoes.forEach(questao => {
                            if(questao.id == i)
                            newQuestoes.push(questao)
                        })
                    )
                } 

                let page = this.pagination.page - 1
                let start = page * this.pagination.perPage
                let end = start + this.pagination.perPage
                
                return newQuestoes.slice(start, end)
         
            },
            prova(){
                const proves = this.$store.getters.readProvas.filter(i => i)
                return (item) => proves.find( p => p.id == item)
            },
            totalPages (){
                let totalPages = Math.ceil(this.questoesComplete/this.pagination.perPage)
                return totalPages
            },
        },
        methods:{
            resolver(item){
                if(item.resp != null){
                    item.resp == item.value ? item.msg = 'você acertou' : item.msg = 'você errou'
                }
                return
            },
            textLaw(item){
                const text = this.listQuestionsID.filter( question => question.idQuestion == item)
                return text
            }
        },
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
        font-size: 16px;
    }
</style>