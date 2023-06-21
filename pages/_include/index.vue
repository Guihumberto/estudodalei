<template>
    <v-container class="mt-5" style="max-width: 1080px;">
    <v-btn outlined class="mb-5" text @click="$router.go(-1)">voltar</v-btn>
        <v-card outlined flat min-height="40vh">
            <v-alert
                color="primary"
                dark
                icon="mdi-arrow-down-box"
            >
                Copie abaixo o texto do normativo: 
                {{title}}
            </v-alert>
            <v-card-text>
                <v-form @submit.prevent="save()" ref="form">
                    <v-text-field
                        label="Artigo Anterior"
                        dense
                        outlined
                        v-model="art"
                        type="number"
                    ></v-text-field>
                    <v-textarea
                        label="Texto da Lei"
                        placeholder="Copie o texto da lei nesta área"
                        outlined
                        dense
                        v-model="textlaw"
                        :height="textlaw ? '70vh' : '20vh'"
                        counter
                        :rules="[rules.required]"
                    ></v-textarea>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"  
                            @click="textlaw = ''" 
                        >Limpar</v-btn>
                        <v-btn
                            outlined
                            color="primary"  
                            type="submit"
                        >Salvar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
        <v-card outlined flat class="mt-5" v-show="textWork[0]">
            <v-card-title>
                {{textWork.length}}
                <v-spacer></v-spacer>
                <v-btn @click="saveLawText()" color="success" text>Salvar</v-btn>
                <adm-viewLaw :textLaw="textWork" />
                <v-btn icon color="error" @click="textWork = []"><v-icon>mdi-delete-circle</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-list>
                    <template v-for="(item, index) in textWork" >
                        <v-list-item :key="index">
                            <v-list-item-icon>
                                {{item.art}}
                            </v-list-item-icon>
                            <v-list-item-icon>
                                {{item.order}}
                            </v-list-item-icon>
                            <v-list-item-content>
                                <p class="font-weight-bold" v-if="item.estrutura">{{item.textLaw}}</p>
                                <p v-else>{{item.textLaw}}</p>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn @click="item.estrutura = !item.estrutura" x-small icon><v-icon>mdi-refresh</v-icon></v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

    import {mapActions} from 'vuex';
    const shortid = require('shortid');   

    export default {
        data(){
            return{
                id: this.$route.query.id,
                title: this.$route.params.include,
                textlaw: '',
                rules:{
                    required: (value) => !!value || "Campo Obrigatório"
                },
                textWork: [],
                art: 0,
                order: 0,
                part1: '',
                keyEstrutura: false,
                orderEstrutura: 1000
            }
        },
        methods:{
            ...mapActions(['setTextLaw']),
            save(){
                if(this.$refs.form.validate()){
                    //limpar o array numa nova chamada
                    this.textWork = []
                    this.order = 0
                    this.orderEstrutura = 1000
                    //definição do que não faz parte da estrutura
                    let arrayTextLawEstrutura = [   'Art.', 'Arts.','§', 'Parágrafo único', 'Paragrafo unico.',
                                                    'I -', 'I-', 'II -', 'II-', 'III', 'IV -', 'V -', 'VI -', 
                                                    'VII -', 'VIII -', 'IX', 'X', 'X-', 'X - ',
                                                    'XX', 'XXX', 'XL', 'L -', 'L-', 'LX', 'LI -',  'LI-', 'LII', 'LIV -', 'LIV-', 'LV', 'LIX',
                                                    'a)', 'b)', 'c)', 'd)', 'e)', 'f)', 'g)', 'h)', 'i)', 'j)', 'k)', 'l)', 'm)', 'n)', 'o)',
                                                    'p)', 'q)', 'r)', 's)', 't)', 'u)', 'v)', 'x)', 'y)', 'w)', 'z)',
                                                    '1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.',  '11.', '12.', '13.', '14.', '15.', '16.', '17.', '18.', '19.', '20.',  '21.', '22.', '23.', '24.', '25.', '26.', '27.', '28.', '29.', '30.',
                                                    '1-', '2-','3-', '4-', '5-','6-',  '7-', '8-','9-', '10-', 
                                                    '1 -', '2 -','3 -', '4 -', '5 -','6 -', '7 -', '8 -','9 -', '10 -'  
                                                ]

                    //pegar os index de Estrutura
                    let arrayEstrturaONly = ['LIVRO ', 'TÍTULO ', 'CAPÍTULO ', 'SEÇÃO ', 'SUBSEÇÃO ']

                    //pegar o texto da lei e setar numa variavel
                    let texto = this.textlaw.replaceAll('–', '-')
                    //limpar a variavel de origem
                    this.textlaw = ''
                    //tirar 
                    let arrayTexto = texto.split(/(\r\n|\n|\r)/gm)
                    arrayTexto = arrayTexto.filter((i) => i )
                    arrayTexto = arrayTexto
                                            .filter(i => i != '\n' )
                                            .map(item => item.trim())
                    arrayTexto.map(item => {

                        let count = 0
                        //verificar se é estrutura ou nao
                        arrayTextLawEstrutura.forEach( i => item.startsWith(i) ? count++ : count)
                        let value = count > 0  ? false : true

                        //começa de qual artigo
                        let art = 0

                        //a ordem para artigo comeca do 10, sendo 10 artigo
                        let order = 0

                        //pegar o número do artigo
                        if(item.toLowerCase().startsWith('art.')){                   
                            let test = item.substr(5, 5)                            
                            let nTest = test.replace(/[^0-9]/g,'').length

                            if(nTest >= 4 ){
                                art = item.trim().substr(5, 5).replace(/[^0-9]/g,'');
                                this.art = parseInt(art)
                                this.order = 10
                            } else {
                                art = item.trim().substr(4, 5).replace(/[^0-9]/g,'');
                                this.art = parseInt(art)
                                this.order = 10
                            }
                        }

                        //estabelecer a ordem para texto da lei que nao for artigo
                        if(!value && !item.toLowerCase().startsWith('art.') ){
                            this.order++
                        }

                        //estabelecer a ordem para estrutura
                        if(value){
                            this.order = `${this.order}.1`
                            if(item.toLowerCase().startsWith('livro')){
                                this.order = 2
                            }
                            if(item.toLowerCase().startsWith('título')){
                                this.order = 3
                            }
                            if(item.toLowerCase().startsWith('capítulo')){
                                this.order = 4
                            }
                            if(item.toLowerCase().startsWith('seção')){
                                this.order = 5
                            }
                            if(item.toLowerCase().startsWith('subseção')){
                                this.order = 6
                            }
                        }

                        //salvar no array para printar na tela
                        if(value){
                            //salvar estrutura
                            let textEstruturaComplete = ""
                            let artEstrutura = ""
                            let orderEstrutura = ""

                            this.keyEstrutura ? artEstrutura = this.art : artEstrutura = this.art++
                            this.keyEstrutura = true

                            if(this.order == 0.1){
                                textEstruturaComplete = item
                                artEstrutura = 1
                                orderEstrutura  = 1
                            }
                            if(this.order == 2 || this.order == 2.1){
                                orderEstrutura  = 2
                                this.order == 2 ? this.part1 = item : ''
                                this.order == 2.1 ? textEstruturaComplete = this.part1 + ' - ' + item : ''
                            }
                            if(this.order == 3 || this.order == 3.1){
                                orderEstrutura  = 3
                                this.order == 3 ? this.part1 = item : ''
                                this.order == 3.1 ? textEstruturaComplete = this.part1 + ' - ' + item : ''
                            }
                            if(this.order == 4 || this.order == 4.1){
                                orderEstrutura  = 4
                                this.order == 4 ? this.part1 = item : ''
                                this.order == 4.1 ? textEstruturaComplete = this.part1 + ' - ' + item : ''
                            }
                            if(this.order == 5 || this.order == 5.1){
                                orderEstrutura  = 5
                                this.order == 5 ? this.part1 = item : ''
                                this.order == 5.1 ? textEstruturaComplete = this.part1 + ' - ' + item : ''
                            }
                            if(this.order == 6 || this.order == 6.1){
                                orderEstrutura  = 6
                                this.order == 6 ? this.part1 = item : ''
                                this.order == 6.1 ? textEstruturaComplete = this.part1 + ' - ' + item : ''
                            }

                            if(!orderEstrutura) {
                                artEstrutura = this.art--
                                artEstrutura--
                                this.keyEstrutura = false
                                orderEstrutura = this.orderEstrutura++
                                this.order = orderEstrutura
                                value = false
                                textEstruturaComplete = item
                            }

                            if(textEstruturaComplete){
                                let text = {
                                    id: shortid.generate(),
                                    art: artEstrutura,
                                    order: orderEstrutura,
                                    estrutura:value,
                                    textLaw: textEstruturaComplete
                                }
                                this.textWork.push(text)
                                this.part1 = ''
                            }
                            
                        } else {
                            this.keyEstrutura = false
                            //salvar texto da lei (caput + dispositivos)
                            let text = {
                                id: shortid.generate(),
                                art: this.art,
                                order: this.order,
                                estrutura:value,
                                textLaw: item
                            }
                            this.textWork.push(text)
                            this.part1 = ''
                        }

                    })
                   this.art = 0 
                }
            },
            saveLawText(){
                let law = [this.id, this.textWork ]
                this.setTextLaw(law)
                this.textWork = []
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>