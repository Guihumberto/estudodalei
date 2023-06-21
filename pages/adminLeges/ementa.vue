<template>
    <v-container style="max-width: 1080px" v-if="$store.state.adm">
        <v-btn 
            :to="{name: 'admin', 
                  params:{tab:3}
                 }" 
            text><v-icon>mdi-chevron-left</v-icon> voltar</v-btn>
        <h1 class="my-5 text-h5">Importar Ementas</h1>
        <v-card outlined>
            <v-card-text>
                <v-select
                    label="Concurso"
                    dense outlined
                    :items="listConcurso"
                    item-text="name"
                    item-value="id"
                    v-model="nameConcurso"
                ></v-select>
                <v-select
                    label="Cargo"
                    dense outlined
                    :items="selectedConcurso.cargos"
                    item-text="name"
                    item-value="id"
                    v-model="nameCargo"
                    v-if="nameConcurso"
                ></v-select>
                <v-textarea
                    label="Texto"
                    dense outlined
                    v-model="text"
                ></v-textarea>
                <v-radio-group v-model="typeSelect" row>
                    <v-radio
                        v-for="item, index in type"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></v-radio>
                </v-radio-group>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="listContent = '', listGeral = []">limpar</v-btn>
                    <v-btn 
                        @click="importText()"
                        outlined color="success">Importar</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>

        <v-card class="mt-5" outlined>
            <v-subheader>
                <v-spacer></v-spacer>
                <v-btn @click="salvar">Salvar</v-btn>
            </v-subheader>
            <v-card-text>
                <v-treeview :items="listGeral"></v-treeview>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
    const shortid = require('shortid');

    export default {
        data(){
            return{
                text: '',
                listContent: '',
                listGeral: [],
                panel: [0, 1],
                disabled: false,
                typeSelect: '',
                type:[
                    {id: 1, name: "Conhecimentos Gerais"},
                    {id: 2, name: "Conhecimentos Específico"}
                ],
                nameConcurso: '',
                nameCargo: '',
    
            }
        },
        methods:{
            ...mapActions(['saveEmenta']),
            importText(){
                if(this.text && this.typeSelect){
                    let temp = []
                    temp.push(this.text.split(':')[0])
                    temp.push(this.text.substring( temp[0].length +1 ))
                    this.listContent = {
                        id: shortid.generate(),
                        name: temp[0],
                        type: this.typeSelect,
                    }
                    let content = temp[1].replace('\n', ' ').split(". ")
                    content = content.map(i => i.trim())
                    content = content.map(i => i.replace('\n', ' '))
                    content = content.map(i => i.replace('\n', ' '))
                    content = content.map(i => i.split('\n').join(' '))
                    content = content.filter(i => i)
                    
                    let listTemp = []
                    content.forEach(topic =>{
                        let temp = []
                        if(topic.indexOf(':') != -1){
                             temp.push(topic.split(':')[0])
                             temp.push(topic.substring( temp[0].length +1 ).replace('\n', ' '))
                        }else{
                            temp.push(topic)
                        }
                        
                        let agregador = temp[0].replace('\n', ' ')
                        let subjects = ''
                        let subListx = []
                        if(temp[1]){
                            let xtemp = ''
                            subjects = temp[1].split(';').map(i => i.replace('\n', ' '))
                            subjects.forEach(i => {
                               xtemp = {id: shortid.generate(), name: i, idDisciplina: this.listContent.id}
                               subListx.push(xtemp)
                            })
                        }

                        // funcao para apagar todas apagar todas as ocorrencias \n
        
                        let org = {id: shortid.generate(), name: agregador, children: subListx, idDisciplina: this.listContent.id }
                        listTemp.push(org)  
                    })

                    this.listContent.children = listTemp

                    this.listGeral.push(this.listContent)
                    this.text = ''
                    this.listContent = {}
                }
            },
            salvar(){
                if(this.nameConcurso && this.nameCargo){

                    this.listGeral.forEach( i => {
                        let data = [this.nameConcurso, this.nameCargo, i]
                        this.saveEmenta(data)
                    })   
                }
            }
        },
        computed:{
            listConcurso(){
                return this.$store.getters.readConcursosList
            },
            selectedConcurso(){
                if(this.nameConcurso){
                    let concurso = this.listConcurso.find(i => i.id = this.nameConcurso)
                    return concurso
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
}
</style>