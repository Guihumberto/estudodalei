<template>
    <v-card 
        class="mb-16"
        outlined 
        color="transparent">
        <v-card-text>
            <h3 class="description mb-5"> 
                <v-icon class="tag mr-1 indigo mb-3"></v-icon>
                <span class="black--text text-h4 mb-5">Legislação integrada</span> 
            </h3>
            <p class="text-h5">A legislação do site está sendo integrada com questões e jurisprudência, com vinculação por dispositivo. <br>
            Faça o teste abaixo clicando nos botões:</p>
            <v-card outlined color="primary lighten-3">
                <v-card-text id="dispositive">
                <!-- MENU jurisprudencia e questoes -->
                        <div class="mb-1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on" 
                                        title="Qtd de Questões" @click="show = true, tab = 0" 
                                        x-small outlined color="success">1
                                    </v-btn>
                                </template>
                                <span>Questões</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        title="Qtd de Jurisprudência" @click="show = true, tab = 1" 
                                        x-small outlined color="warning">2
                                    </v-btn>
                                </template>
                                <span>Súmulas</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        title="Qtd de Julgados" @click="show = true, tab = 2" 
                                        x-small outlined color="orange">1
                                    </v-btn>
                                </template>
                                <span>Julgados</span>
                            </v-tooltip>
                            <v-btn 
                                :href="show ? '#integration' : '#dispositive'"
                                @click="show = !show, tab = 0" x-small icon>
                                <v-icon title="expandir" color="secondary" small>
                                    {{show ? 'mdi-chevron-down-circle' : 'mdi-chevron-right-circle' }}
                                </v-icon>
                            </v-btn>
                        </div>   
                <p class="formatText">
                    {{textLaw}}
                </p>
                <v-expand-transition>
                    <v-card outlined v-if="show" id="integration">
                     <v-system-bar dark color="primary">
                        <v-spacer></v-spacer>
                        <v-btn @click="show = false" icon ><v-icon>mdi-close</v-icon></v-btn>
                     </v-system-bar>
                     <v-card-title class="pa-0">
                        <v-tabs
                            v-model="tab"
                        >
                            <v-tab>Questões</v-tab>
                            <v-tab>Súmulas</v-tab>
                            <v-tab>Julgados</v-tab>
                        </v-tabs>
                     </v-card-title>   
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <v-card-text>
                                    <template>
                                        <div>
                                            <p style="text-transform: uppercase; font-size: 18px;" class="font-weight-bold">
                                            XXXIV EXAME/OAB/FGV/2022
                                            </p>
                                            <p class="formatText" style="font-size: 1.3rem">
                                                Ataulfo é servidor público estável de um pequeno Município, ocupante de cargo administrativo de carreira junto ao Poder Executivo, cuja remuneração era composta pelas seguintes rubricas, determinadas por lei do mencionado ente federativo: (I) vencimentobase, de valor inferior ao salário-mínimo; (II) abono salarial, utilizado para alcançar o salário-mínimo; (III) adicional de tempo de serviço. O Município editou, recentemente, a Lei XYZ, que conferiu à carreira de Ataulfo nova gratificação, estipulada em 10% (dez por cento) sobre o total da remuneração até então percebida pelo mencionado servidor (somatório das rubricas (I), (II) e (III)). Acerca da remuneração de Ataulfo, com base na situação hipotética narrada, assinale a afirmativa correta.
                                            </p>
                                            <p class="formatText" style="font-size: 1.3rem">
                                                A remuneração de Ataulfo é inconstitucional porque seu vencimento-base não poderia ser inferior ao salário-mínimo.
                                            </p>
                                            <div class="my-8">
                                                <v-btn 
                                                :disabled="msg"
                                                @click="resp = 1" small outlined :color="resp == 1? 'primary':'grey'">Certo</v-btn>
                                                <v-btn 
                                                :disabled="msg"
                                                @click="resp = 0" small outlined :color="resp == 0? 'error':'grey'">Errado</v-btn>
                                            </div>
                                            <v-btn 
                                                v-if="!msg"
                                                @click="resolver(resp)" 
                                                :disabled="resp == null" 
                                                tile color="success">Resolver
                                            </v-btn>
                                            <v-alert 
                                                v-else
                                                :type="resp == value ? 'success' : 'error'"
                                                outlined
                                            >
                                                <p>{{msg}}</p>
                                            </v-alert>
                                        </div>
                                        <div class="text-center my-5">
                                            <v-pagination
                                                v-model="page"
                                                length="1"
                                                circle
                                            ></v-pagination>
                                        </div>
                                    </template>
                                </v-card-text>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card-text>
                                    <v-list>
                                        <template >
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        <v-chip label dark color="indigo" x-small>STF</v-chip> Súmula Vinculante 4 </v-list-item-title>
                                                    <v-list-item-subtitle></v-list-item-subtitle>
                                                    <div class="pl-1 mt-1"> 
                                                        <p class="formatText" style="font-size: 1.3rem">
                                                            Salvo nos casos previstos na Constituição, o salário mínimo não pode ser usado como indexador de base de cálculo de vantagem de servidor público ou de empregado, nem ser substituído por decisão judicial.
                                                        </p>
                                                    </div>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-divider></v-divider>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        <v-chip label dark color="indigo" x-small>STF</v-chip> Súmula Vinculante 15 </v-list-item-title>
                                                    <v-list-item-subtitle></v-list-item-subtitle>
                                                    <div class="pl-1 mt-1"> 
                                                        <p class="formatText" style="font-size: 1.3rem">
                                                            O cálculo de gratificações e outras vantagens do servidor público não incide sobre o abono utilizado para se atingir o salário mínimo.
                                                        </p>
                                                    </div>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </template>
                                        
                                    </v-list>
                                </v-card-text>
                            </v-tab-item>  
                            <v-tab-item>
                                <v-card-text>
                                    <v-list>
                                        <template>                              
                                            <v-list-item >
                                                <v-list-item-content>
                                                    <v-list-item-title>
                                                        <v-chip label dark color="indigo" small>STF</v-chip>
                                                        <span class="ml-2">SERVIDORES PÚBLICOS</span>
                                                    </v-list-item-title>
                                                    <v-list-item-subtitle></v-list-item-subtitle>
                                                    <div class="pl-1 mt-1"  style="font-size: 1.3rem"> 
                                                        <p class="formatText">
                                                            O vencimento-base pode ser fixado em valor inferior ao salário mínimo, o que não pode ocorrer é que a remuneração total do servidor seja inferior ao salário mínimo.
                                                        </p>
                                                        <p class="formatText">
                                                            1. A aplicação do art. 7º, IV, da CF aos servidores públicos leva em conta a remuneração total recebida, não havendo óbice para a fixação de vencimento base em quantia inferior ao salário mínimo nacional (RE 197072, Relator (a): Min. MARÇO AURÉLIO, Tribunal Pleno, DJ de 08-06-2001; RE 265129, Relator (a): Min. ILMAR GALVÃO, Tribunal Pleno, DJ de 14-11-2002). 2. A jurisprudência do Supremo Tribunal Federal é firme no sentido de que o princípio da irredutibilidade salarial não é ofendido quando o valor nominal da remuneração global do servidor é preservado. 3. Agravo regimental parcialmente conhecido e, nessa parte, desprovido.
                                                        </p>
                                                        <p class="font-italic">
                                                            (STF - RE: 449427 PR, Relator: Min. TEORI ZAVASCKI, Data de Julgamento: 06/08/2013, Segunda Turma, Data de Publicação: ACÓRDÃO ELETRÔNICO DJe-164 DIVULG 21-08-2013 PUBLIC 22-08-2013)O
                                                        </p>
                                                    </div>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </template>
                                        
                                    </v-list>
                                </v-card-text>
                            </v-tab-item>       
                        </v-tabs-items>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="show = false" text small>Ocultar</v-btn>
                        </v-card-actions> 
                    </v-card>
                </v-expand-transition>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                tab: null,
                page: 1,
                resp: null,
                msg: false,
                value: 0,
                show: false,
                textLaw: 'IV - salário mínimo , fixado em lei, nacionalmente unificado, capaz de atender a suas necessidades vitais básicas e às de sua família com moradia, alimentação, educação, saúde, lazer, vestuário, higiene, transporte e previdência social, com reajustes periódicos que lhe preservem o poder aquisitivo, sendo vedada sua vinculação para qualquer fim;'
            
            }
        },
        methods:{
            resolver(resp){
                if(resp != null){
                    resp == this.value ? this.msg = 'você acertou' : this.msg = 'você errou'
                }
                return
            }
        },
    }
</script>

<style scoped>
html {
    scroll-behavior: smooth;
}
.formatText{
    text-align: justify;
    hyphens: auto;
    font-family: 'Inter', sans-serif;
    line-height: 32px;
    font-weight: 400;
    color: #36344D;
    letter-spacing: .3px;
    font-size: 1.5rem;
    line-height: 1.3;
}
.tag{
    height: 30px;
    width: 20px;
}

</style>