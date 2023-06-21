<template>
    <v-container class="mt-5" style="max-width: 1080px">
        <h1 class="text-h4 mb-2">{{findConcurso.name}}</h1>
        <v-btn small text class="px-0 mb-5" text @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <v-card class="mb-2" outlined> 
            <v-card-text>
                <h5 class="text-h5 mb-5">Informações Gerais</h5>
                <v-row>
                    <v-col cols="6" sm="4">
                        {{findConcurso.name}} <br>
                        Banca: {{findConcurso.banca}} <br>
                        Situação: <v-chip small outlined color="success">{{nameStatus(findConcurso.status)}}</v-chip> <br>
                        Inscrição:  {{findConcurso.dateStartIns}} <span v-show="findConcurso.dateStartIns">a</span> {{findConcurso.dateLastIns}}<br>
                        Data da prova:  {{findConcurso.dateProva}}<br>
                    </v-col>
                    <v-col cols="6" sm="8">
                        Cargos <br>
                        <p v-for="item, index in findConcurso.cargos" :key="index">
                            <v-row>
                                <v-col cols="12" sm="6">{{item.name}} </v-col>
                                <v-col cols="12" sm="2">Vagas: {{item.vagas}}</v-col>
                                <v-col cols="12" sm="2">
                                    <v-btn 
                                        v-if="item.id"
                                        :to="{
                                            name: 'concurso-ementa-ementa',
                                            params:{ementa: item.id},
                                            query:{id:item.name}  
                                        }"
                                        dark small outlined 
                                        class="primary lighten-2">ver conteúdo</v-btn>
                                </v-col>
                            </v-row>
                             
                        </p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        
        <v-card outlined>
            <v-card-title>Leis disponíveis no Leges Estudo</v-card-title>
            <v-card-text>
                <v-expansion-panels class="mb-6">
                    <v-expansion-panel
                        v-for="(item, i) in listDiciplinasConcursos"
                        :key="i"
                    >
                        <v-expansion-panel-header expand-icon="mdi-menu-down">
                        {{disciplinName(item)}}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-list>
                                <template v-for="list, index in listLawConcurso.filter(i => i.subject == item)">
                                    <v-list-item :key="index" 
                                        :to="{
                                            name: 'law-leges',
                                            params:{law: list.id},
                                            // query:{id:item.nro}  
                                        }"
                                        >
                                        <v-list-item-icon>
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            {{list.nickname}} - {{list.nro}}
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    
    export default {
        data(){
            return{
                id: this.$route.params.concurso,
                status:[
                    {name: 'em breve', id: 0},
                    {name: 'Autorizado', id: 1},
                    {name: 'Edital Publicado', id: 2},
                    {name: 'Inscrições Abertas', id: 3},
                    {name: 'Inscrições Encerradas', id: 4},
                ]
            }
        },
        computed:{
            lawListConcurso(){
                const list = this.$store.getters.readConcursosList
                return list
            },
            findConcurso(){
                const lawConcurso = this.lawListConcurso.find(i => i.id == this.id)
                return lawConcurso || {name: '', banca: '', status: '', dateStartIns: '', dateLastIns:'', dateProva:'', cargos:[]}
            },
            idListConcurso(){
                const siglasDisciplinas = this.findConcurso.disciplinas
                return siglasDisciplinas
            },
            discplinaList(){
                const disciplinas = this.$store.getters.readDisciplinas 
                return disciplinas 
            },
            lawList(){
                return this.$store.getters.readLawsList
            },
            listLawConcurso(){
                let laws = []
                if(Array.isArray(this.lawList) && Array.isArray(this.idListConcurso)){
                    Array.from(this.lawList)
                    this.lawList.forEach( law => {
                        this.idListConcurso.forEach(id => {
                            if(id == law.id){
                                laws.push(law)
                            }
                        })
                    })
                }
                return laws
            },
            listDiciplinasConcursos(){
                let disciplinasSigla = []
                let disciplinas = this.listLawConcurso.map(i => i.subject)
                disciplinas.forEach(i => {
                    disciplinasSigla.push(i[0])
                })
                disciplinasSigla = [...new Set(disciplinasSigla)]
                return disciplinasSigla || []
            },
        },
        methods:{
            nameStatus(item){
                let name = ''
                name = this.status.find(i => i.id == item)
                return name.name
            },
            disciplinName(item){
                let name = this.discplinaList.find(i => i.sigla == item)
                return name.name
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>