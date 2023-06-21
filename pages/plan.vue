<template>
    <v-container style="max-width: 1080px" class="mt-5">
        <h1 class="mb-5 text-h5">Planejamento</h1>
        <!-- Incluir plan -->
        <v-card outlined class="pt-5 px-5">
            <v-card-text>
                <v-row class="pb-5 pl-1">
                    Incluir Planejamento <span class="d-none">{{isNullListPlan}}</span>
                </v-row>
                <v-form @submit.prevent="addPlan()" ref="refs">
                <v-row>
                        <v-text-field
                            label="Nome do Plan"
                            placeholder="Digite o nome do planejamento. Ex. Semana 01"
                            outlined dense class="mr-5"
                            @keydown.enter="addPlan(planData)"
                            :rules="[rules.required, rules.minname]"
                            v-model="planData.name"
                        ></v-text-field>
                        <v-btn
                            fab color="success" small
                            type="submit"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
        <!-- busca -->
        <v-card class="mt-5" flat>
            <v-card-text>
                <v-select
                    label="FILTRO"
                    :items="plansList"
                    item-text="concurso"
                    item-value="concurso"
                    v-model="concurso"
                    outlined dense
                    clearable
                ></v-select>
            </v-card-text>
        </v-card>
        <!-- lista de plans -->
        <v-card outlined class="mt-5">
            <v-subheader>ATIVOS</v-subheader>
            <v-card-text>
                <v-row>
                    <v-col
                        v-for="item, i in listFilter" :key="i"
                        cols="12" sm="3"
                        v-if="!item.toFile">

                        <!-- Excluir -->
                        <v-card
                            color="error" dark
                            v-if="deleteId == item.id"
                            min-height="175"
                        >
                            <v-card-title class="pa-0 ">
                                <v-spacer></v-spacer>
                                <v-btn
                                    small icon
                                    @click="deleteId = ''"
                                ><v-icon small>mdi-close</v-icon></v-btn>
                            </v-card-title>
                            <v-card-text
                                class="my-4"
                            >
                                <h4 class="headline text--white"> Excluir {{item.name}}</h4>
                                <small class="caption">todo o progresso será perdido</small>
                                <div class="mt-5 d-flex">
                                    <v-btn
                                        block small outlined
                                        @click="deletePlanData(item.id)"
                                    >excluir</v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                        <!-- editar -->
                        <v-card
                            outlined
                            v-else-if="editId == item.id"
                        >
                            <v-card-title class="my-0 pa-0">
                                <v-spacer></v-spacer>
                                <v-btn
                                    icon
                                    @click="editId = ''"
                                    ><v-icon small>mdi-close</v-icon>
                                </v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    label="Nome do Plan"
                                    v-model.trim="item.name"
                                    dense
                                ></v-text-field>
                                <v-text-field
                                    label="Concurso"
                                    v-model.trim="item.concurso"
                                    dense
                                ></v-text-field>

                                <v-dialog
                                    v-model="showDateDialog"
                                    width="400"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            name="date"
                                            type="text"
                                            label="Período" dense
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            :value="`${dateFormat(item.dateStart)} a ${dateFormat(item.dateEnd)}`"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>

                                    <v-date-picker
                                        v-model="dates"
                                        locale="pt-br"
                                        range
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            small text
                                            @click="showDateDialog = false"
                                        >cancelar</v-btn>
                                        <v-btn
                                            small outlined color="primary"
                                            @click="saveData(item)"
                                        >Ok</v-btn>
                                    </v-date-picker>
                                </v-dialog>

                                <v-btn
                                    block
                                    color="success" x-small
                                    @click="editPlanData(item)"
                                    >Salvar</v-btn>
                            </v-card-text>

                        </v-card>
                        <!-- show -->
                        <v-card
                            min-height="177"
                            class="mx-auto"
                            :color="item.color" dark
                            v-else
                            >
                            <nuxt-link
                                class="linkMeta"
                                :to="{
                                    name:'planLeges-planner',
                                    params:{planLeges: item.id}
                                }">
                                <v-card-text>
                                    <h5 class="text-h5">{{item.name}}</h5>
                                    <v-icon small>mdi-calendar</v-icon>
                                        <small class="overline font-italic">
                                            {{dateFormat(item.dateStart)}} a {{dateFormat(item.dateEnd)}}
                                        </small>
                                    <br>
                                    <v-icon small>mdi-office-building</v-icon><small class="caption">{{item.concurso}}</small><br>
                                    <v-icon small>{{statusSet(item).icon}}</v-icon><small>{{statusSet(item).name}}</small><br>
                                </v-card-text>
                            </nuxt-link>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        icon x-small
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item-group
                                            v-model="selectedItem"
                                            dense
                                        >
                                            <v-list-item
                                            v-for="(list, index) in items"
                                            :key="index"
                                            @click="btnsList(list.id, item)"
                                            >
                                            <v-list-item-icon>
                                                <v-icon v-text="list.icon"></v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-title>{{ list.title }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-menu>
                            </v-card-actions>
                        </v-card>
                        <!-- escolhar a cor -->
                        <v-card v-if="editColor == item.id">
                            <v-card-text>
                                <v-btn
                                    v-for="cor, index in colors" :key="index"
                                    icon :color="cor.color"
                                    @click="item.color = cor.color"
                                >
                                    <v-icon>mdi-square</v-icon>
                                </v-btn>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="editColor = ''" text x-small>cancelar</v-btn>
                                <v-btn @click="editPlanData(item)" text color="success" x-small>salvar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card outlined class="mt-5">
                <v-btn :disabled="!toFileList" small text color="grey" @click="showIsTrue = !showIsTrue">ARQUIVADOS
                    <v-icon
                        v-text="showIsTrue ? 'mdi-chevron-down': 'mdi-chevron-right'"
                    ></v-icon>
                </v-btn>
                <v-card-text v-if="showIsTrue">
                    <v-row>
                        <v-col
                            v-for="item, i in toFileList" :key="i"
                            cols="12" sm="3"
                            >
                            <v-card
                                min-height="100"
                                class="mx-auto"
                                color="grey" dark
                                >
                                <nuxt-link
                                    class="linkMeta"
                                    :to="{
                                        name:'planLeges',
                                        params:{planLeges: item}
                                    }">
                                    <v-card-text>
                                        <h5 class="text-h5">{{item.name}}</h5>
                                        <small>{{item.concurso}}</small><br>
                                        <v-icon small>{{statusSet(item).icon}}</v-icon><small>{{statusSet(item).name}}</small><br>
                                    </v-card-text>
                                </nuxt-link>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        icon x-small
                                        @click="restorePlanData(item)">
                                        <v-icon>mdi-backup-restore</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
        </v-card>
        <v-card outlined class="mt-5">
            <v-subheader>Últimas tarefas</v-subheader>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    small
                    color="success"
                    to="planLeges/disciplinas"
                >Disciplinas</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import {mapActions} from 'vuex'
    import moment from 'moment'
    const shortid = require('shortid');
    let dataHoje = new Date()
    let maisSete = new Date()
    maisSete.setDate(dataHoje.getDate() + 7)

    export default {
            data: () => ({
                selectedItem: 1,
                showIsTrue: false,
                showDateDialog: false,
                editId: '',
                editColor: '',
                deleteId: '',
                concurso: '',
                dates: [],
                planData:{
                    id: '',
                    name: '',
                    concurso: 'REGULAR',
                    toFile: false,
                    dateStart: dataHoje,
                    dateEnd: maisSete,
                    color:'#385F73'
                },
                items: [
                    { id: 1, icon: 'mdi-pencil', title: 'Editar' },
                    { id: 2, icon: 'mdi-delete', title: 'Excluir' },
                    { id: 3, icon: 'mdi-file-replace', title: 'Arquivar' },
                    { id: 4, icon: 'mdi-palette', title: 'Alterar a Cor' },
                ],
                colors:[
                    {color: '#385F73'},
                    {color: 'primary'},
                    {color: 'success'},
                    {color: 'error'},
                    {color: 'warning'},
                    {color: 'lime'},
                    {color: 'teal'},
                    {color: 'indigo'},
                    {color: 'purple'},
                    {color: 'cyan'},
                ],
                status:[
                    {icon: 'mdi-alert-octagon-outline', name:'não iniciado'},
                    {icon: 'mdi-clock-outline', name:'em andamento'},
                    {icon: 'mdi-check-circle-outline', name:'concluído'}
                ],
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    minname: (v) => (v||'').length >= 4 || "Mínimo de 4 caracteres",
                },
            }),
            middleware: "auth",
            computed:{
                plansList(){
                    let listPlans = this.$store.getters.readListPlans
                    return listPlans
                },
                listFilter(){
                    if(this.concurso){
                        return this.plansList.filter(i => i.concurso == this.concurso)
                    } else {
                        return this.plansList
                    }
                },
                toFileList(){
                    let list = this.plansList.filter(i => i.toFile)
                    return list.length
                    ? list
                    : false
                },
                isNullListPlan(){
                    let list = this.plansList.filter(i => i.toFile)
                    if(!list.length){
                        this.showIsTrue = false
                        return true
                    } else {
                        return false
                    }
                },
            },
            methods:{
                ...mapActions(['savePlan', 'cargaListPlans', 'deletePlanner', 'editPlanner']),
                addPlan(){
                    if(this.$refs.refs.validate()){
                        this.planData.id = shortid.generate()
                        this.savePlan(this.planData)
                        this.clearPlanData()
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Plan inserido com com sucesso', color:'success'})
                    }
                },
                deletePlanData(item){
                    this.deletePlanner(item)
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Plan excluído.', color:'success'})
                },
                editPlanData(item){
                    this.editPlanner(item)
                    this.editId = ''
                    this.editColor = ''
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Plan editado.', color:'success'})
                },
                toFilePlan(item){
                    item.toFile = true
                    this.editPlanData(item)
                },
                restorePlanData(item){
                    item.toFile = false
                    this.editPlanData(item)
                },
                clearPlanData(){
                    this.planData = {
                        id: '', name: '', concurso: 'REGULAR', toFile: false, dateStart: '', dateEnd: '', color:'#385F73'
                    }
                },
                btnsList(item, list){
                    switch(item){
                        case 1:
                            this.editId = list.id
                            break

                        case 2:
                            this.deleteId = list.id
                            break

                        case 3:
                           this.toFilePlan(list)
                           this.$store.dispatch("snackbars/setSnackbars", {text:'Plan arquivado.', color:'success'})
                           break

                        case 4:
                            this.editColor = list.id
                            break
                    }
                },
                saveData(item){
                    this.showDateDialog = false
                    item.dateStart = this.dates[0]
                    item.dateEnd = this.dates[1]
                    this.dates = []
                },
                dateMoment(date){
                    moment.locale('pt-br')
                    const dateM = moment(date).format('lll')
                    return dateM
                },
                dateFormat(date){
                    moment.locale('pt-br')
                    if(date){
                        const dateM = moment(date).format('DD/MM')
                        return dateM
                    }else{
                        return 12/12
                    }
                },
                statusSet(item){
                    if(item.status){
                        switch(item.status){
                            case 0:
                                return this.status[0]
                                break
                            case 1:
                                return this.status[1]
                                break
                            case 2:
                                return this.status[2]
                                break

                        }
                    } else {
                        return this.status[0]
                    }
                }
            },
            created(){
                this.cargaListPlans()
            }
        }
</script>

<style scoped>
    .linkMeta{
        text-decoration: none;
        color: aliceblue;
        text-decoration: none;
        transition: all .6s ;
    }
    .linkMeta:hover {
        color: hotpink;
        -webkit-text-stroke: 1px grey;
        transition-timing-function: ease-in-out;
    }

</style>
