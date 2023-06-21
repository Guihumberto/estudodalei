<template>
    <v-card flat>
            <v-card-title class="text-v-card-title mb-5">
                Questões CESPE V/F
                <v-btn small color="primary" class="ml-2" to="../questoes/listQuestions">ver</v-btn>
            </v-card-title>
            <v-card outlined>
                <v-card-text>
                    <v-select
                        label="Assunto"
                        dense outlined
                        :items="subjects"
                        item-value="id"
                        item-text="name"
                        v-model="subject"
                    ></v-select>
                    <v-textarea
                        label="Questão"
                        dense outlined
                        height="20vw"
                        v-model="questions"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions class="mt-n6 mr-3 ">
                    <v-spacer></v-spacer>
                    <v-checkbox
                        label="Anulada"
                        color="red"
                        class="mr-2"
                        v-model="canceled"
                    ></v-checkbox>
                    <v-checkbox
                        label="Desatualizada"
                        color="warning"
                        v-model="outdated"
                    ></v-checkbox>
                </v-card-actions>
            </v-card>
            <v-card outlined class="mt-5">
                <div v-if="!questionGravar.length">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn outlined @click="importSave()">Listar</v-btn>
                    </v-card-title>
                    <v-card-text >
                        BANCA: {{_questions.banca}} <br>
                        ANO: {{_questions.year}} <br>
                        cargo: {{_questions.name}} <br>
                        Orgao: {{_questions.orgao}}<br>
                        Texto: {{_questions.answer}} <br>
                        Assertiva {{_questions.alternative}} <br>
                    </v-card-text>
                </div>
                <v-divider></v-divider>
                <v-card-text v-if="questionGravar.length">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="clearFields()">Limpar Tudo</v-btn>
                        <v-btn color="primary" @click="saveBD()">Salvar BD</v-btn>
                    </v-card-title>
                    <div class="mb-5" v-for="item, index in questionGravar" :key="index">
                        <v-subheader>
                            <concurso-provas-cadProvasAtm :prova="_questions" v-if="item.prove == 0" @clearAll="clearFields()" />
                        </v-subheader>
                        <p>{{item.prove}} / {{item.subject}}</p>
                        <p>{{item.answer}}</p>
                        <p>{{item.alternative}}</p>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small @click="item.value = 1" :outlined="item.value == 0" color="success">Certo</v-btn>
                            <v-btn small @click="item.value = 0" :outlined="item.value == 1" color="error">Errado</v-btn>
                        </v-card-actions>
                    </div>
                </v-card-text>
            </v-card>
            <concurso-questoes-searchQuestoes 
                v-if="!questionGravar.length && _questions.alternative" 
                :search="_questions.alternative" 
            />
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex'
    const shortid = require('shortid');

    export default {
        name: 'questions',
        data(){
            return{
                questions: '',
                subject: 0,
                canceled: false,
                outdated: false,
                bancas:[
                    {id: 1, name: 'FGV'},
                    {id: 2, name: 'CESPE'},
                    {id: 3, name: 'FCC'},
                ],
                subjects:[
                    {id: 1, name:'Direito Administrativo', sigla: 'DA'},
                    {id: 2, name:'Direito Constitucional', sigla: 'DC'},
                    {id: 3, name:'Direito Tributário', sigla: 'DT'},
                    {id: 4, name: 'D. Previdenciário', sigla: 'PREV'},
                    {id: 5, name: 'D. Empresarial', sigla: 'DE'},
                    {id: 6, name: 'D. Civil', sigla: 'CC'},
                    {id: 7, name: 'D. Penal', sigla: 'DP'},
                    {id: 8, name: 'D. Financeiro', sigla: 'DF'},
                    {id: 9, name: 'D. Ambiental', sigla: 'AMB'},
                    {id: 10, name: 'D. Trabalho', sigla: 'TRAB'},
                    {id: 11, name: 'Processo CIvil', sigla: 'TRAB'},
                    {id: 12, name: 'Processo Penal', sigla: 'TRAB'},
                    {id: 13, name: 'Processo trabalho', sigla: 'TRAB'},
                    {id: 14, name: 'D. Cultural', sigla: 'CTL'},
                    {id: 15, name: 'D. Criança e Adolescente', sigla: 'ECA'},
                    {id: 16, name: 'D. Consumidor', sigla: 'CSD'},
                    {id: 17, name: 'D. Internacional', sigla: 'ITN'},
                    {id: 18, name: 'D. Humanos', sigla: 'HMN'},
                    {id: 19, name: 'Ética', sigla: 'ETC'},
                    {id: 20, name: 'Teorias', sigla: 'FSJ'},
                ],
                questionsProve: [
                    {id: 1, answer: '', alternative: '', value: 0, subject:1, prove: 1}
                ],
                questionGravar: []
            }
        },
        computed:{
            _questions(){
                let bancaAnoExame
                let banca
                let answer
                let name
                let year
                let orgao
                let alternative
                let type = 1

                if(this.questions){
                    let list = this.questions.split('\n')
                    list = list.map(i => i.replace('\n', ''))
                    list = list.filter(i => i)
                    list = list.map(i => i.trim())
                    
                    bancaAnoExame = list[0]
                    bancaAnoExame = bancaAnoExame.split('/')

                    if(bancaAnoExame.length >= 3){
                        bancaAnoExame.splice(1, 1)
                    }

                    if(bancaAnoExame.at(-1).includes("mais")){
                        let ano = bancaAnoExame.at(-1).substr(0, 4)
                        bancaAnoExame[1] = ano

                    }


                    if(!bancaAnoExame[2]){
                       let cargo = bancaAnoExame[0]
                       bancaAnoExame[0] = cargo + " ()"
                    }

                    let bancaCargo = bancaAnoExame[0].split('-')
                    banca = bancaCargo[0]
                    let cargoOrgao = bancaCargo[1].split('(')
                    name = bancaCargo[1].replace(/\(.+/g, "") ? bancaCargo[1].replace(/\(.+/g, "") : ""
                    year = bancaAnoExame[bancaAnoExame.length - 1]
                    orgao = cargoOrgao[1].replace(')', '') ? cargoOrgao[1].replace(')', '') : ""

                    let divider = list.findIndex(i => i == 'A')

                    answer = list.slice(1, divider).join('\n')
                    alternative = list[list.length - 1]

                }
                    return {
                        banca,
                        orgao,
                        name, 
                        year,
                        answer, 
                        alternative,
                        type
                    }
                
            },
            provas(){
                const list = this.$store.getters.readProvas.filter(i => i && i.active)
                return list
            }
        },
        methods:{
            ...mapActions(['setQuestions']),
            provaSearch(name){
                let result = this.provas.filter(i => i.cargo.trim() == name.trim())
                return result.length
                ? result[0].id
                : 0
            },
            importSave(){      
                let prove = this.provaSearch(this._questions.name)

                    let question = {}
                    question = {
                        id: shortid.generate(), 
                        answer: this._questions.answer.replace('\n', ''), 
                        alternative: this._questions.alternative.replace('\n', ''), 
                        value: 0, 
                        subject: this.subject, 
                        prove: prove,
                        canceled: this.canceled,
                        outdated: this.outdated
                    }
                    this.questionGravar.push(question)
            },
            saveBD(){
                if(this.questionGravar.length && this.subjects){
                    let n = 1
                    let allCorreto = this.questionGravar.filter(i => i.value == 0 )
                    let allErrado = this.questionGravar.filter(i => i.value == 1)

                    if(allCorreto.length == 4 || allErrado == 4){
                            this.$store.dispatch("snackbars/setSnackbars", {text:'Escolha uma certa ou uma errada', color:'error'})
                    } else {
                        this.questionGravar.forEach(i => {
                            this.setQuestions(i)
                            n++
                            this.$store.dispatch("snackbars/setSnackbars", {text:`Gravou ${n - 1} `, color:'success'})
                            this.clearFields()
                        })
                    }

                } else {
                    if(!this.subjects){
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Falta a Disciplina', color:'error'})
                    }
                    if(!this.questionGravar.length){
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Faltam as questoes', color:'error'})
                    }
                }
            },
            clearFields(){
                this.questions = ''
                this.questionGravar = []
                this.canceled = false
                this.outdated = false
            }
        }
    }
</script>

<style scoped>

</style>