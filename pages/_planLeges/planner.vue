<template>
    <v-container style="max-width:1080px">
        <h1 class="my-5 text-h5">Planejamento - {{planner.name}}</h1>
        <v-btn small text class="px-0 mb-5" @click="$router.go(-1)">
            <v-icon small>mdi-arrow-left</v-icon>
            voltar
        </v-btn>
        <h6 class="caption ml-1">
            {{planner.concurso}} - {{dateFormat(planner.dateStart)}} a {{dateFormat(planner.dateEnd)}}
        </h6>
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
                                title="Será add aos Marcados para Revisão."
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
                        <plan-revMark @listRev="includesRev($event)" />
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
                        <template v-for="item, i in listTasks">
                            <div :key="i">
                                <!-- edição -->
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
                                            <v-list-item-subtitle class="mt-2">
                                                <v-text-field
                                                    filled dense
                                                    v-model="item.description"
                                                    @keydown.enter="editTask(item)"
                                                ></v-text-field>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action class="mt-5 pt-15 pr-5">
                                            <v-row>
                                                <v-btn
                                                    outlined color="primary" 
                                                    @click="editId = ''" 
                                                    class="mr-2">Não</v-btn>
                                                <v-btn
                                                    color="primary" 
                                                    @click="editTask(item)"
                                                >Sim</v-btn>
                                            </v-row>
                                        </v-list-item-action>
                                    </v-list-item>
                                </div>
                                <!-- exclusao -->
                                <div v-else-if="item.id == deleteId">
                                    <v-list-item :key="i" color="error">
                                        <v-list-item-icon class="mr-5">
                                            <v-icon>mdi-alert-box</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                Tem certeza que deseja apagar esta Tarefa?
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <small>essa operação não poderá ser desfeita</small> 
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action class="py-5 pr-5">
                                            <v-row>
                                                <v-btn
                                                    outlined color="error" 
                                                    @click="deleteId = ''" 
                                                    class="mr-2">Não</v-btn>
                                                <v-btn
                                                    color="error" 
                                                    @click="deleteTask(item)"
                                                >Sim</v-btn>
                                            </v-row>
                                        </v-list-item-action>
                                    </v-list-item>
                                </div>
                                <!-- show regular -->
                                <div v-else>
                                    <v-expand-transition>
                                        <v-list-item
                                            v-if="!item.concluido"
                                        >
                                            <v-list-item-icon>
                                                <v-checkbox
                                                    v-model="item.concluido"
                                                    @click="editTask(item)"
                                                ></v-checkbox>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>{{item.nro}}. Tarefa {{item.nro}} 
                                                    <v-icon color="info">{{iconType(item.type)}}</v-icon>
                                                    <v-icon 
                                                        v-if="item.addRev" 
                                                        color="indigo"
                                                        title="Marcado para Revisão"
                                                    >mdi-update</v-icon>
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
                                                    <v-menu offset-y>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                            icon     
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            >
                                                                <v-icon>mdi-dots-vertical</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-list>
                                                            <v-list-item-group
                                                                v-model="selectedMenuItem"
                                                                dense
                                                            >
                                                                <v-list-item
                                                                    dense
                                                                    v-if="!item.addRev"
                                                                    @click="addTaskAddRev(item)"
                                                                >
                                                                    <v-list-item-icon>
                                                                        <v-icon>mdi-update</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-title>Add para Revisão</v-list-item-title>
                                                                </v-list-item>
                                                                <v-list-item
                                                                    v-else
                                                                    @click="removeTaskAddRev(item)"
                                                                    dense
                                                                >
                                                                    <v-list-item-icon>
                                                                        <v-icon>mdi-close</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-title>Remover da Revisão</v-list-item-title>
                                                                </v-list-item>
                                                            </v-list-item-group>
                                                        </v-list>
                                                    </v-menu>
                                                </v-row>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-expand-transition>
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
                                            <plan-timeline :task="item" />
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
        <!-- btn mostar e ocultar concluidas -->
        <v-subheader v-show="listTasks.filter(i => i.concluido).length">
            <v-spacer></v-spacer>
            <v-btn 
                text x-small
                @click="conclShow = !conclShow"
                v-text="conclShow ? 'ocultar concluidas': 'mostrar concluidas'"
                ></v-btn>
        </v-subheader>
        <!-- tarefas concluidas -->
        <v-card
            v-show="conclShow"
            outlined
        >
            <v-card-text>
                <v-list dark>
                    <v-subheader>CONCLUÍDO</v-subheader>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary">
                        <template v-for="item, i in listTasks">
                            <v-list-item 
                                :key="i"
                                v-if="item.concluido"
                            >
                                <v-list-item-icon>
                                    <v-checkbox
                                        v-model="item.concluido"
                                        @click="editTask(item)"
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
        <div class="text-center mt-5" v-show="false">
            <v-pagination
                :length="3"
                disabled
            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

    const shortId = require('shortid')
    export default {
        data: () => ({
            selectedItem: 1,
            selectedMenuItem: 1,
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
            rules:{
                required: (value) => !!value || "Campo obrigatório",
                email: (v) => /.+@/.test(v) || "Deve ser um e-mail válido",
                minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres",
            },
        }),
        computed:{
            planner(){
                return this.$store.getters.readPlanner
            },
            listTasks(){
                return this.$store.getters.readPlanTasks
            },
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
            },
            isConcluidaTask(){
                let list = this.listTasks.filter(i => !i.concluido)

                return list.length
                ? false
                : true
            }
        },
        methods:{
            ...mapActions(['cargaPlannerOne', 'cargaListTasks','savePlannerTask', 'deletePlannerTask', 'editPlannerTask', 'cargaTaskOne', 'editPlanner', 'saveAddRev', 'removeAddRev']),
            addTask(){
                if(this.$refs.refs.validate()){
                    this.task.id = shortId.generate()
                    this.task.planId = this.$route.params.planLeges
                    this.task.nro = this.nroTask
                    this.savePlannerTask(this.task)
                    if(this.task.addRev){
                        this.saveAddRev(this.task)
                    }
                    this.clearTask()
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Tarefa Adicionada!', color:'success'})
                }
                if(this.planner.status == 2){
                    let planner = {
                        id: this.$route.params.planLeges,
                        status: 1,
                        dateConclusion: ''
                    }
                    this.editPlanner(planner)
                }
            },
            addTaskAddRev(item){
                item.addRev = true
                this.editPlannerTask(item);
                this.saveAddRev(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Tarefa Adicionada ao Add Rev!', color:'success'})
            },
            removeTaskAddRev(item){
                item.addRev = false
                this.editPlannerTask(item);
                this.removeAddRev(item)
                this.$store.dispatch("snackbars/setSnackbars", {text:'Tarefa removida dos Add Rev!', color:'error'})
            },
            deleteTask(item){
                this.deletePlannerTask(item)
                this.deleteId = ''
                this.$store.dispatch("snackbars/setSnackbars", {text:'Tarefa Excluída!', color:'error'})
            },
            editTask(item){
                if(this.isConcluidaTask){
                    let planner = {
                        id: this.$route.params.planLeges,
                        status: 2,
                        dateConclusion: new Date()
                    }
                    this.editPlanner(planner)
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Plan concluído!', color:'success'})
                }
                if(!this.listTasks.filter(i => i.concluido).length){
                    this.conclShow = false
                }
                this.editPlannerTask(item);
                this.editId = ''
                this.$store.dispatch("snackbars/setSnackbars", {text:'Tarefa Editada!', color:'success'})
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
            },
            dateFormat(date){
                    moment.locale('pt-br')
                    if(date){
                        const dateM = moment(date).format('DD/MM/YYYY')
                        return dateM
                    }else{
                        return 12/12
                    }
            },
            includesRev(item){
                if(item){
                    item.forEach(el => {
                        el.addRev = false
                        this.removeTaskAddRev(el)
                        el.planId = this.$route.params.planLeges
                        el.rev = true
                        el.status = 1
                        el.nro = this.nroTask
                        this.savePlannerTask(el)
                    });
                }
            }
        },
        created(){
            this.cargaPlannerOne(this.$route.params.planLeges)
            this.cargaListTasks(this.$route.params.planLeges)
        }
    }
</script>

<style scoped>

</style>