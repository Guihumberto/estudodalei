<template>
    <v-container class="mt-5" style="max-width: 1080px">
    <v-card class="mb-5" outlined v-if="nameLaw[0]">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                     <v-card-title>
                        {{nameLaw[3]}}
                    </v-card-title>
                    <div class="pl-4">
                        Normativo: {{nameLaw[4]}} <br>
                        {{nameLaw[0].split('-').reverse().join('/')}}
                    </div>
                </v-col>
                <v-col class="pt-8" cols="12" sm="6">
                    <p class="formatText pl-4">{{nameLaw[1]}}</p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <!-- barra de loading -->
    <v-card v-else>
        <v-skeleton-loader
            class="mx-auto"
            type="card"
        ></v-skeleton-loader>
    </v-card>
    <!-- menus -->
    <v-row align-content-space-between class="mb-2">
        <v-col class="mb-n3" cols="12" sm="6">
            <v-text-field
                dense
                outlined
                label="Busca"
                append-icon="mdi-magnify"
                v-model.trim="search"
                @keydown.enter="filterJustArt(search.replace(/[^0-9]/g,''))"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
            <v-btn-toggle>
                <v-btn @click="font.fontSize++" small icon><v-icon small>mdi-format-annotation-plus</v-icon></v-btn>
                <v-btn @click="font.fontSize--" small icon><v-icon small>mdi-format-annotation-minus</v-icon></v-btn>
                <v-btn @click="font.spacement++" small icon><v-icon small>mdi-format-paragraph-spacing</v-icon></v-btn>
                <v-btn @click="font.spacement--" small icon><v-icon small>mdi-format-vertical-align-center</v-icon></v-btn>
                <v-btn small icon><v-icon small>mdi-format-font</v-icon></v-btn>
            </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="4">
            <v-btn-toggle>
                <leges-dialogs-otherLaws title="conjugar normas" @listOtherLaws="OtherLaws($event)" />
                <leges-dialogs-estrutura :estrutura="estruturaList" @indice="searchIndice($event)" />
                <leges-dialogs-print v-show="false" :law="nameLaw" :textLaw="textLaw.textComplete" />
                <leges-dialogs-anexos />
            </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="2" class="mt-n6" v-if="!artsFilterActive">
            <v-select
            v-if="dispositiveBtn"
            :items="dispositivosPerPage"
            :label="`Dispositivos por página: ${pagination.perPage}`"
            dense
            v-model="pagination.perPage"
            v-show="!search"
            ></v-select>
            <v-btn @click="dispositiveBtnAuto" v-show="!search" v-else x-small text>Dispositivo por página: {{pagination.perPage}} <v-icon small>mdi-chevron-down</v-icon> </v-btn>
        </v-col>
        <v-col class="mt-n6" cols="12">
            <div v-if="search.replace(/[^0-9]/g,'')">
            <v-chip 
                @click="filterJustArt(search.replace(/[^0-9]/g,''))"
                 >
                Art. {{search.replace(/[^0-9]/g,'')}}
            </v-chip>
        </div>
        <div>
             <v-chip-group
                mandatory
                active-class="primary--text"
                v-if="artsFilterActive"
             >
                <v-chip @click="pageFilter(false)" class="transparent pr-0" v-if="artsFilter.length == 1"><v-icon>mdi-arrow-left-drop-circle-outline</v-icon></v-chip>
                <v-chip
                    v-for=" tag in artsFilter" :key="tag"
                    @click:close="artFilterRemove(tag)"
                    close
                    >
                        art. {{tag}}
                </v-chip>
                <v-btn @click="clearAllArtsFilter()" v-if="artsFilter.length > 1" text color="error">Limpar</v-btn>
                <v-chip @click="pageFilter(true)" class="transparent pl-0" v-if="artsFilter.length == 1"><v-icon>mdi-arrow-right-drop-circle-outline</v-icon></v-chip>
             </v-chip-group>
        </div>
        </v-col>
    </v-row>
    <!-- Pagination top -->
    <div class="text-right">
        <v-btn class="mr-0 pr-0" small color="error" v-show="artIndice" text @click="clearSearchIndice">fechar buscar por índice</v-btn>
    </div>
    <div class="text-center mb-2" v-if="!search && !artsFilterActive">
        <v-pagination
        v-model="pagination.page"
        :length="totalPages"
        :total-visible="7"
        ></v-pagination>
    </div>
    <!--termo nao encontrado -->
    <v-card v-if="textLaw == 99"
        outlined min-height="20vw" class="my-5">
        <v-card-text>
            <v-alert
                type="error"
                outlined
            >
                Termo pesquisado não encontrado na norma... refaça a busca!
            </v-alert>
        </v-card-text>
    </v-card>
    <!-- text law -->
    <v-card outlined v-else-if="textLaw.text.length">
        <v-card-text v-if="listOhterLaw" class="primary lighten-5">
            <v-card-title class="mb-2 py-1 primary text-button white--text">{{nameOtherLaw.nickname}} - {{nameOtherLaw.nro}}
                <v-spacer></v-spacer>
                <v-btn icon dark @click="viewOtherLaw = !viewOtherLaw"> <v-icon>{{viewOtherLaw ? 'mdi-minus-box-outline': 'mdi-plus-box-outline'}}</v-icon> </v-btn>
                <v-btn icon dark @click="listOhterLaw = 0"> <v-icon>mdi-close</v-icon> </v-btn>
            </v-card-title>
            <v-expand-transition>
                <div class="pa-2" v-show="viewOtherLaw">
                    <div v-for="(item, index) in listOhterLaw" :key="index" :style="{ fontSize: font.fontSize + 'px'}">
                        <p :style="{lineHeight: font.spacement }"  class="formatText"
                            :title="`art. ${item.art}`"
                            v-html="item.textLaw.startsWith('Art') ?  `<b>${item.textLaw.substr(0, 4)}</b> ${item.textLaw.substr(4)}` : item.textLaw">
                        </p>
                    </div>
                </div>
            </v-expand-transition>
        </v-card-text>
        <v-divider v-show="listOhterLaw"></v-divider>
        <v-card-title v-show="listOhterLaw" class="py-1 grey lighten-2 text-button">{{nameLaw[3]}} - {{nameLaw[4]}}</v-card-title>
        <v-card-text class="mt-5">
            <div>
                <div v-for="(item, index) in textLaw.text" :key="index" :style="{ fontSize: font.fontSize + 'px'}">
                    <div v-if="item.estrutura">
                        <p v-show="!artsFilterActive || artIndice" class="font-weight-medium text-center" v-text="item.textLaw"></p>
                    </div>
                    <div v-else class="mb-2">
                        <!-- menu -->
                        <div v-if="item.sumulas" >
                        <v-btn @click="item.show = !item.show" x-small icon><v-icon color="success" small>{{item.show ? 'mdi-chevron-down-circle' : 'mdi-chevron-right-circle' }}</v-icon></v-btn></div>
                        <!-- texto da lei -->
                        <p :style="{lineHeight: font.spacement }"  class="formatText" 
                            :title="`art. ${item.art}`"
                            v-html="item.textLaw.startsWith('Art') ?  `<b>${item.textLaw.substr(0, 4)}</b> ${item.textLaw.substr(4)}` : item.textLaw">
                        </p>
                        <!-- materias congregados -->
                        <v-expand-transition>
                            <v-card outlined v-if="item.show">
                               <box-add :sumulasId="item.sumulas" />
                            </v-card>
                        </v-expand-transition>
                    </div>
                </div>
            </div>
            <div class="text-center" v-if="artIndice">
                <v-btn @click="qtdArtIndice += 10" outlined>mostrar mais <v-icon class="ml-1 mr-n2">mdi-plus</v-icon></v-btn>
            </div>
        </v-card-text>     
    </v-card>
    <!-- load -->
    <v-card v-else>
        <v-skeleton-loader
            class="mx-auto"
            type="article, actions"
        ></v-skeleton-loader>
        <v-skeleton-loader
            class="mx-auto"
            type="article, actions"
        ></v-skeleton-loader>
    </v-card>
    <!-- Pagination Botton -->
    <div class="text-center mt-2" v-if="!search && !artsFilterActive">
        <v-pagination
        v-model="pagination.page"
        :length="totalPages"
        :total-visible="7"
        ></v-pagination>
    </div>
    <div class="my-16 py-16"></div>
    </v-container>
</template>

<script>
    import { mapActions } from 'vuex';
import boxAdd from '../../components/leges/box/boxAdd.vue';

    export default {
  components: { boxAdd },
        data(){
            return{
                dispositiveBtn: false,
                // id: this.$route.query.id,
                title: this.$route.params.law,
                dispositivosPerPage: [15, 30, 50],
                artsFilter: [],
                artsFilterActive: false,
                search: '',
                listOhterLaw: '',
                nameOtherLaw: '',
                viewOtherLaw: true,
                pagination:{
                    page: 1,
                    perPage: 15,
                },
                font:{
                    fontSize: 14,
                    spacement: 1.5,
                    fontStyle: '',
                },
                boxAdd: false,
                artIndice: '',
                qtdArtIndice: 10
            }
        },
        computed:{
            textLaw(){
                const textTemp = this.$store.getters.readTextLaw

                if(this.artIndice){
                    
                    let indice = textTemp.findIndex(i => i.textLaw == this.artIndice)
                    return { text: textTemp.slice(indice, indice + this.qtdArtIndice)}
                }
                else if(this.artsFilterActive){
                    let filtro = this.$store.getters.readTextLaw
                    let novoFiltro = []

                    if(this.artsFilter){
                        filtro = filtro.forEach(item => {
                            this.artsFilter.forEach( art => {
                                if(art == item.art){
                                    novoFiltro.push(item)
                                }
                            })
                        })
                    }

                    return {text: novoFiltro}

                } else if(this.search){
                    let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    //retirar caracteres especiais
                    let exp = new RegExp(search.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, ""), "i")
                    //fazer o filtro
                    let filtro =  this.$store.getters.readTextLaw.filter(item => exp.test(item.textLaw.normalize('NFD').replace(/[\u0300-\u036f]/g, "") ) || exp.test( item.art ))

                    return filtro.length
                            ? {text: filtro}
                            : 99
                
                } else {
                    let page = this.pagination.page - 1
                    let start = page * this.pagination.perPage
                    let end = start + this.pagination.perPage
                    return {
                            totalDispositivos: this.$store.getters.readTextLaw.length,
                            text: textTemp.slice(start, end),
                            textComplete: this.$store.getters.readTextLaw
                           }
                }
            },
            estruturaList(){
                const list = this.$store.getters.readTextLaw || []
                return list.filter(i => i.estrutura)
            },
            nameLaw(){
                return this.$store.getters.readNameLaw
            },
            totalPages (){
                let totalPages = Math.ceil(this.textLaw.totalDispositivos/this.pagination.perPage)
                return totalPages
            },
            lastArt(){
                const law = this.$store.getters.readTextLaw
                const lastArt = law[law.length -1]
                return lastArt.art
            }
        },
        methods:{
            ...mapActions(['cargaTextLaw', 'cargaNameLaw']),
            dispositiveBtnAuto(){
                this.dispositiveBtn = true
                setTimeout(() => {
                    this.dispositiveBtn = false
                }, "3000")
            },
            filterJustArt(art){     
                if(art <= this.lastArt){
                    this.artIndice = ''
                    this.search = ''
                    let findArt = this.artsFilter.find( x => x == art ) 
                    if(!findArt){
                        art > 0 ? this.artsFilter.push(art) : ''
                    }
                    
                    if(this.artsFilter.length > 0) {
                        this.artsFilterActive = true
                    } else {
                        this.artsFilterActive = false
                    } 
                }
            },  
            pageFilter(item){
                let art = this.artsFilter[0]
                if(item) {
                    art == this.lastArt ? art : art++  
                  
                } else {
                  art == 1 ? art : art--
                }   
                this.artsFilter = []
                this.artsFilter.push(art)
                console.log(art);
            },
            artFilterRemove(art){
                let artRemove = this.artsFilter.findIndex( i => i == art)
                this.artsFilter.splice(artRemove, 1)
                
                if(!this.artsFilter.length > 0) {
                    this.artsFilterActive = false
                }
            },
            clearAllArtsFilter(){
                this.artsFilter = []
                this.artsFilterActive = false
            },
            OtherLaws(event){
               this.nameOtherLaw = event[0]
               this.listOhterLaw = event[1]
            },
            searchIndice(art){
                console.log(art);
                this.artsFilterActive = true
                this.artIndice = art
            },
            clearSearchIndice(){
                this.artIndice = ''
                this.artsFilterActive = false
            },
        },
        created(){
            this.cargaTextLaw(this.title)
            this.cargaNameLaw(this.title)
        }
    }
</script>

<style lang="scss" scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
}
</style>