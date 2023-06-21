<template>
    <div>
        <v-btn-toggle mandatory dense>
             <concurso-questoes-vincular :questao="questao" @consultaRecente="lawRecente($event)" :lawsRecentes="laws" @excluirLawRct="exLawRct($event)" />
            <concurso-questoes-doutrina :questao="questao"/>
            <concurso-questoes-editar :questao="questao"/>
            <v-btn @click="deleteQuestion(questao.id)">apagar</v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        data(){
            return{
                laws:[]
            }
        },
        props:{
            questao: Object
        },
        methods:{
            ...mapActions(['removeQuestion']),
            deleteQuestion(item){
                this.removeQuestion(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Questão removida.', color:'success'})
            },
            lawRecente(event){
                let findLaw = this.laws.find(i => i == event)
                if(!findLaw){
                    this.laws.push(event)
                }
            },
            exLawRct(law){
                this.laws = this.laws.filter(i => i != law)
            }
        }
    }
</script>

<style scoped>

</style>