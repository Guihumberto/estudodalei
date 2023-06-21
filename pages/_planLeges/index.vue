<template>
    <v-container style="max-width:1080px">
        <h1 class="my-5 text-h5">Planejamento - Semana 01</h1>
        {{$route.params}}
        <v-btn small text class="px-0 mb-5" @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <!-- inclusao de tarefa -->
        <v-card outlined class="py-5 px-5">
            <v-card-title class="mt-0 pt-0">
                Incluir Tarefa
                <v-spacer></v-spacer>
                <v-btn 
                    @click="taskShow = !taskShow"
                    icon>
                    <v-icon
                        v-text="taskShow ? 'mdi-chevron-down': 'mdi-chevron-right'"    
                    >
                        mdi-chevron-right
                    </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text v-show="taskShow">
                <v-form @submit.prevent="addTask()" ref="refs">
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-select
                                label="Disciplina"
                                :items="disciplinas"
                                item-text="name"
                                item-value="id"
                                v-model="task.disciplina"
                                outlined dense
                                clearable
                                :rules="[rules.required]"
                            ></v-select>
                            <v-checkbox
                                label="incluir na Revisão"
                                v-model="task.addRev"
                                title="Será incluído uma revisão no próximo Plan"
                            ></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-textarea
                                label="Tarefa"
                                placeholder="Digite o nome da tarefa (Tópico do conteúdo da disciplina)"
                                outlined dense 
                                v-model.trim="task.description"
                                :rules="[rules.required, rules.minname]"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row class="mt-n6 justify-end">      
                        <v-radio-group
                            v-model="task.type"
                            row
                            >
                            <v-radio
                                v-for="item, i in type" :key="i"
                                :label="item.name"
                                :value="item.id"
                                :title="item.description"
                            ></v-radio>
                        </v-radio-group>
                    </v-row>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="success"
                            type="submit"
                            class="mr-2"
                            >
                            <v-icon small>mdi-plus</v-icon>
                            incluir
                        </v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
        <!-- Listagem de tarefas -->
        <v-card outlined class="mt-5">
            <!-- tarefas pendentes -->
            <v-card-text>
                <v-list three-line>
                    <v-subheader v-if="listTasks.filter(i => !i.concluido).length">PENDENTE</v-subheader>
                    <v-subheader v-else>Não há tarefas pendentes neste Plan!</v-subheader>  
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary">
                        <template v-for="item, i in listTasks.filter(i => !i.concluido)">
                            <div v-if="item.id == editId">
                                <v-list-item :key="i" color="warning">
                                    <v-list-item-icon>
                                        <v-icon>mdi-circle-edit-outline</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{item.nro}}. Tarefa {{item.nro}} 
                                            <v-icon>{{iconType(item.type)}}</v-icon>
                                            <v-btn 
                                                v-if="item.rev"
                                                x-small color="warning">REV</v-btn>
                                        </v-list-item-title>
                                        <v-list-item-subtitle class="font-weight-bold">
                                            {{nameDisciplina(item.disciplina)}}
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle>
                                            <v-text-field
                                                outlined dense
                                                v-model="item.description"
                                            ></v-text-field>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action class="py-15 pr-5">
                                        <v-row>
                                            <v-btn
                                                outlined color="primary" 
                                                @click="editId = ''" 
                                                class="mr-2">Não</v-btn>
                                            <v-btn
                                                color="primary" 
                                                @click="editId = ''"
                                            >Sim</v-btn>
                                        </v-row>
                                    </v-list-item-action>
                                </v-list-item>
                            </div>
                            <div v-else-if="item.id == deleteId">
                                <v-list-item :key="i" color="error">
                                    <v-list-icon class="mr-5">
                                        <v-icon>mdi-alert-box</v-icon>
                                    </v-list-icon>
                                    <v-list-item-content>
                                        Tem certeza que deseja apagar esta Tarefa?
                                    </v-list-item-content>
                                    <v-list-item-action class="py-5 pr-5">
                                        <v-row>
                                            <v-btn
                                                outlined color="error" 
                                                @click="deleteId = ''" 
                                                class="mr-2">Não</v-btn>
                                            <v-btn
                                                color="error" 
                                                @click="deleteTask(item.id)"
                                            >Sim</v-btn>
                                        </v-row>
                                    </v-list-item-action>
                                </v-list-item>
                            </div>
                            <div v-else>
                                <v-list-item :key="i">
                                    <v-list-item-icon>
                                        <v-checkbox
                                            v-model="item.concluido"
                                        ></v-checkbox>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>{{item.nro}}. Tarefa {{item.nro}} 
                                            <v-icon>{{iconType(item.type)}}</v-icon>
                                            <v-btn 
                                                v-if="item.rev"
                                                x-small color="warning">REV</v-btn>
                                        </v-list-item-title>
                                        <v-list-item-subtitle class="font-weight-bold">
                                            {{nameDisciplina(item.disciplina)}}
                                        </v-list-item-subtitle>
                                        <v-list-item-subtitle>
                                            {{item.description}}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-row>
                                            <v-btn 
                                                icon
                                                @click="dialogId = item.id, dialogTimeline = true" 
                                            >
                                                <v-icon>mdi-comment-outline</v-icon>
                                            </v-btn>
                                            <v-btn 
                                                icon
                                                @click="editId = item.id" 
                                            >
                                                <v-icon>mdi-note-edit-outline</v-icon>
                                            </v-btn>
                                            <v-btn 
                                                icon color="error"
                                                @click="deleteId = item.id"                                  
                                            >
                                                <v-icon>mdi-delete-outline</v-icon>
                                            </v-btn>
                                            <v-btn icon v-if="false">
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </v-row>
                                    </v-list-item-action>
                                </v-list-item>
                            </div>
                            <v-divider></v-divider>
                            <v-dialog 
                                v-model="dialogTimeline" 
                                v-if="dialogId == item.id"
                                width="800">
                                <v-card>
                                    <v-card-title>
                                        Pontos Relevantes
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                            @click="dialogTimeline = false, dialogId = ''"
                                            icon>
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <plan-timeline :task="{item}" />
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </template>
                    </v-list-item-group>
                </v-list>
                <v-subheader v-show="listTasks.filter(i => i.concluido).length">
                    <v-spacer></v-spacer>
                    <v-btn 
                        text x-small
                        @click="conclShow = !conclShow"
                        v-text="conclShow ? 'ocultar concluidas': 'mostrar concluidas'"
                        ></v-btn>
                </v-subheader>
            </v-card-text>
            <!-- tarefas concluidas -->
            <v-card-text v-show="conclShow">
                <v-list color="grey" dark>
                    <v-subheader>CONCLUÍDO</v-subheader>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary">
                        <template v-for="item, i in listTasks.filter(i => i.concluido)">
                            <v-list-item :key="i">
                                <v-list-item-icon>
                                    <v-checkbox
                                        v-model="item.concluido"
                                    ></v-checkbox>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{item.nro}}. Tarefa {{item.nro}} 
                                        <v-icon>{{iconType(item.type)}}</v-icon>
                                        <v-btn 
                                            v-if="item.rev"
                                            x-small color="warning">REV</v-btn>
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="font-weight-bold">
                                        {{nameDisciplina(item.disciplina)}}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                        {{item.description}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-row>
                                        <v-btn icon>
                                            <v-icon>mdi-comment-outline</v-icon>
                                        </v-btn>
                                    </v-row>
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
        <!-- paginaçao de metas -->
        <div class="text-center mt-5">
            <v-pagination
            :length="3"
            disabled
            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
    const shortId = require('shortid')
    export default {
        data: () => ({
            selectedItem: 1,
            checkTask: true,
            conclShow: false,
            dialogTimeline: true,
            dialogId: '',
            deleteId: '',
            editId: '',
            taskShow: true,
            task:{
                id: null,
                planId: '',
                nro: 1,
                disciplina: '',
                description: '',
                relevante: false,
                type: '',
                addRev: false,
                rev: false,
                status: '',
                dateFinish: '',
                concluido: false,
            },
            disciplinas: [
                {id: 1, name: 'Direito Administrativo'},
                {id: 2, name: 'Direito Constitucional'},
                {id: 3, name: 'Direito Previdenciário'},
                {id: 4, name: 'Direito Tributário'},
                {id: 5, name: 'Português'},
                {id: 6, name: 'Raciocínio Lógico'},
                {id: 7, name: 'Informática'},
                {id: 8, name: 'Direito Eleitoral'},
                {id: 9, name: 'Regimento Interno'},
                {id: 10, name: 'Direito das Pessoas Com Deficiência'},
                {id: 11, name: 'Normas Aplicáveis aos Servidores Públicos Federais'},
                {id: 12, name: 'Direito das Pessoas Com Deficiência'},
                {id: 21, name: 'Java Iniciante'},
                {id: 22, name: 'Java Trilha'},
                {id: 23, name: 'Java Projetos'},
            ],
            status: [
                {id: 1, name: 'Não Iniciado'},
                {id: 2, name: 'Pendente'},
                {id: 3, name: 'andamento'},
                {id: 4, name: 'Concluído'},
            ],
            type:[
                {id: 1, name: 'PDF', description: 'PDF ou qualquer outro tipo de leitura', icon:'mdi-file-pdf-box'},
                {id: 2, name: 'Vídeo', description: 'Vídeo, audios, aulas presenciais, afins', icon:'mdi-video'},
                {id: 3, name: 'Questões', description: 'Resolução de questões em quaquer tipo de mídia', icon:'mdi-list-status'}
            ],
            listTasks:[],
            rules:{
                required: (value) => !!value || "Campo obrigatório",
                email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
                minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
            },
        }),
        computed:{
            nroTask(){
                if(this.listTasks.length){
                    let maxNro
                    maxNro = this.listTasks.map(i => i.nro)
                    maxNro = Math.max(...maxNro)
                    maxNro++
                    return maxNro
                } else {
                    return 1
                }
            }
        },
        methods:{
            addTask(){
                if(this.$refs.refs.validate()){
                    this.task.id = shortId.generate()
                    this.task.planId = this.$route.params.planLeges
                    this.task.nro = this.nroTask
                    this.listTasks.push(this.task)
                    this.clearTask()
                }
            },
            deleteTask(item){
                this.listTasks = this.listTasks.filter(i => i.id != item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Tarefa Excluída!', color:'error'})
            },
            editTask(item){
                console.log(item);
            },
            timeLime(item){

            },
            clearTask(){
                this.task = {
                    id: null,
                    planId: '',
                    nro: 1,
                    disciplina: '',
                    description: '',
                    relevante: false,
                    type: '',
                    addRev: false,
                    rev: false,
                    status: '',
                    dateFinish: '',
                }
            },
            iconType(item){
                if(item){
                    let icon = this.type.find(i => i.id == item)
                    return icon.icon
                }
            },
            nameDisciplina(item){
                if(item){
                    let disciplina = this.disciplinas.find(i => i.id == item)
                    return disciplina.name
                }
            }
        }
    }
</script>

<style scoped>

</style>