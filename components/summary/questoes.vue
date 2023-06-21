<template>
    <v-card outlined class="pa-5 ml-5" v-if="questoesComplete.filter(i => i.doutrina).length || questoesComplete.filter(i => i.value).length">
        <v-card-text v-if="questoesComplete.filter(i => i.value).length">
            <h6 class="text-h6">Sentenças Verdadeiras</h6>
            <ul v-for="item, i in questoesComplete.filter(i => i.value)" :key="i">
                <li>
                    <p>{{item.alternative}}</p>
                </li>
            </ul>
        </v-card-text>
        <v-card-text v-if="questoesComplete.filter(i => i.doutrina).length">
            <h6 class="text-h6">Comentários</h6>
            <div v-for="item, i in questoesComplete.filter(i => i.doutrina)" :key="i">
                <p class="mt-5">{{item.doutrina}}</p>
                <v-divider></v-divider>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props:{
            questoesId: Array
        },
        computed:{
            questoesComplete(){
                const questoes = this.$store.getters.readQuestions
                let newQuestoes = []

                if (this.questoesId){
                       this.questoesId.forEach (i => 
                        questoes.forEach(questao => {
                            if(questao.id == i)
                            newQuestoes.push(questao)
                        })
                    )
                } 

                return newQuestoes
            },
        }
    }
</script>

<style scoped>

</style>