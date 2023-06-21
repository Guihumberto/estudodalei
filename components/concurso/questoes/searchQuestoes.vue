<template>
    <v-card outlined flat class="mt-5">
        <v-card-text>
            <h5 class="text-h6">Questões cadastradas</h5>
            <div v-if="listQuestions">
                <v-alert type="success">
                    Foram encontrada(s) <strong>{{listQuestions.length}}</strong> questão(ões). <br>
                </v-alert>
                <div class="mt-5" v-for="item, index in listQuestions" :key="index">
                    <p>{{item.alternative}}</p>
                </div>
            </div>
            <div v-else>
                <v-alert type="error" outlined class="mt-5 pt-7">
                    <p>Não foram encontradas questões na busca</p>
                </v-alert>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data(){
            return{

            }
        },
        props:{
            search: false
        },
        computed:{
            listQuestions(){
                let list = this.$store.getters.readQuestions

                if(this.search){
                    //retirar acentuação
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@><|//\\&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    let filtro = list.filter(project => exp.test(project.answer.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test(project.alternative.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ))
                    
                    list = filtro
                } 

                return list.length
                   ? list.slice(0, 10)
                   : false
            }
        },
        methods:{
            ...mapActions(['cargaQuestions'])
        },
        created(){
            this.cargaQuestions()
        }
    }
</script>

<style scoped>

</style>