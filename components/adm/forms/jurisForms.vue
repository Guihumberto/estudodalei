<template>
<div>
    <v-card-text class="mt-5">
        <v-form @submit.prevent="viewJuris()" ref="form">
                            <v-autocomplete
                                dense
                                outlined
                                label="Disciplina"
                                :items="tags"
                                item-text="name"
                                item-value="sigla"
                                v-model="disciplina"
                                :rules="[rules.required]"
                            ></v-autocomplete>
                            <v-textarea
                                label="Súmula"
                                v-model.trim="jurisText"
                                placeholder="Nro da juris, Texto, Tags"
                                outlined
                                dense
                                :rules="[rules.required]"
                                :height="jurisText ? '70vh' : '20vh'"
                            >
                            </v-textarea>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn outlined @click="clearFields()" color="primary">limpar</v-btn>
                                <v-btn type="submit" color="primary">Enviar</v-btn>
                            </v-card-actions>
                        </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
        <v-subheader>
            Quantidade: {{jurisList.length}}
            <v-spacer></v-spacer>
            <v-btn class="mr-2" small outlined color="success" @click="jurisList = []">Limpar</v-btn>
            <v-btn small color="success" @click="salvar()">Salvar</v-btn>
        </v-subheader>
        <v-list>
            <template v-for="item, index, in jurisList">
                <v-divider class="my-3"></v-divider>
                <v-list-item :key="index">
                    <v-list-item-content>
                        <v-list-item-title>
                            <v-chip>{{item.orgao}}</v-chip>
                            <v-chip>{{item.info}}</v-chip>
                            <v-chip>{{item.disciplina}}</v-chip>
                            <v-chip-group>
                                <v-chip>{{item.subject}}</v-chip>
                            </v-chip-group>
                            <v-spacer></v-spacer>
                        </v-list-item-title>
                        <p class="formatText"> {{item.tese}}</p>
                        <p class="formatText"> {{item.texto}}</p>
                        <p class="mt-1 font-italic font-weight-light">{{item.julgado}}</p>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-card-text>
</div>
</template>

<script>
    import { mapActions } from 'vuex'
    const shortid = require('shortid');
    export default {
        data(){
            return{
                jurisText: '',
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                },
                jurisList: [],
                disciplina: "",
                tags: [
                    {name: 'D. Constitucional', sigla: 'DC'},
                    {name: 'D. Tributário', sigla: 'DT'},
                    {name: 'D. Administrativo', sigla: 'DA'},
                    {name: 'D. Previdenciário', sigla: 'PREV'},
                    {name: 'D. Empresarial', sigla: 'DE'},
                    {name: 'D. Civil', sigla: 'CC'},
                    {name: 'D. Penal', sigla: 'DP'},
                    {name: 'D. Ambiental', sigla: 'AMB'},
                    {name: 'Criança e Adolescente', sigla: 'ECA'},
                    {name: 'Direito Notarial E Registral', sigla: 'DNR'},
                    {name: 'Direito Eleitoral', sigla: 'ELT'},
                ],
            }
        },
        computed:{

        },
        methods:{
            ...mapActions(['setJuris']),
            viewJuris(){
                if(this.$refs.form.validate()){

                    let listJuris = []
                    let temp = this.jurisText.split('\n\n  ')
                   
                    temp = temp.map(tese => tese.replace("  \n", ""))
                    temp = temp.map(tese => tese.trim())

                    temp = temp.forEach(jus => {
                        let tempJus = jus.split('\n')
                        let tese = {}

                        tempJus = tempJus.map( tj => tj.trim())
                        tempJus = tempJus.filter (i => i)

                        let orgaoInfo = tempJus[2].split("-")
                        let orgao = orgaoInfo[0].split(": ")
                        let info = orgaoInfo[1].split(": ")

                        let disciplinaSubject = tempJus[1]
                        let subject = disciplinaSubject.replace("Direito Constitucional ", "")
                        subject = subject.replace(" Geral", "")
                        subject = subject.split(' ')
                        subject = subject.map(i => i.toLowerCase())
                        subject = [...new Set(subject)]
                        subject = subject.join(' ')

                        let disciplina = this.disciplina
                        let last = tempJus[tempJus.length -1]

                        let qtdTexto = tempJus.length - 4

                        let texto = tempJus.splice(3, qtdTexto).join('\n')

                        tese = {
                            id: shortid.generate(),
                            tese: tempJus[0].trim(3, ),
                            texto: texto.trim(),
                            disciplina: disciplina.trim(),
                            subject: subject.trim(),
                            orgao: orgao[1].trim(),
                            info: info[1].trim(),
                            julgado: last.trim()
                        }
                        listJuris.push(tese)
                    })

                    this.jurisList = listJuris
                    this.clearFields()
                }
            },
            salvar(){
                this.jurisList.forEach( juris => {
                    this.setJuris(juris)
                })
                this. jurisList = []
            },
            clearFields(){
                this.jurisText = ''
            }
            
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
}
</style>