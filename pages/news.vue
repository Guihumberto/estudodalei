<template>
    <v-container class="mt-5" style="max-width: 1080px" v-scroll-reveal.reset="{ delay: 350 }">
        <h1 class="text-h4 mb-5">Novidades</h1>
        <v-btn outlined class="mb-5" text @click="$router.go(-1)">voltar</v-btn>
        <v-card class="mt-5" outlined>
            <v-card-text>
                <p>Dê uma conferida no que vem por ai</p>
                <v-card
                    class="mx-auto"
                >
                    <v-img
                    src="https://www.fundacred.org.br/site/wp-content/uploads/2019/04/cacd-diplomata-itamaraty-diplomacia-sugestao-de-leitura-brasil-e-israel.png"
                    height="300px"
                    dark
                    >
                        <v-row class="fill-height">
                            <v-card-title>
                                <div class="text-h4 pl-12 pt-12 sombraText">
                                    Estudo da Lei
                                </div>
                            </v-card-title>
                        </v-row>
                    </v-img>

                    <v-list two-line>
                        <template v-for="item, index in news">
                            <v-divider inset></v-divider>

                            <v-list-item :key="index">
                                <v-list-item-icon>
                                <v-icon color="indigo">
                                    mdi-arrow-right-circle
                                </v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title class="mb-2">{{item.title}}</v-list-item-title>                 
                                        <p class="caption formatText">{{item.text}}</p>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </v-card-text>
            <v-card-text>
                <v-alert>
                    <p class="formatText font-italic">"Nós acreditamos que um uma boa preparação em prova de concurso público necessariamente passa pelo estudo da lei seca,
                     em algum momento você irá fazer o estudo da lei e irá precisar de uma boa ferramenta de apoio"</p> 
                     <v-subheader>
                        <v-spacer></v-spacer>
                        João Humberto
                     </v-subheader>
                     <p class="formatText mt-2 font-weight-light">entre 70% a 80% de uma prova de concurso é composta por questionamentos diretos acerca das disposições legais.</p>
                </v-alert>
            </v-card-text>
            <v-card-text>
                <v-card outlined>
                    <v-card-text>
                        <div class="text-center">
                            <v-avatar 
                                size="108"
                                color="red" class="mb-5">
                                <span class="white--text text-h5">JH</span>
                            </v-avatar> <br>
                            <span class="font-weight-medium">João Humberto Silva Ribeiro Júnior </span> <br>
                            Idealizador e desenvolvedor do Estudo da Lei - Leges <br>
                            www.estudodalei.com.br <br>
                            <p class="mt-5 formatText">
                                Servidor Público há 12 anos, atualmente é Auditor Fiscal da Fazenda Estadual, 
                                mas já passou pelo Tribunal de Contas, Fazenda Municipal e outros órgãos e autarquias da esfera Municipal, Estadual e Federal.
                            </p>
                        </div>

                    </v-card-text>
                </v-card>

            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data(){
            return{
                news:[
                        {title: "Questões de Concurso", text:"Não é questões de concurso da forma tradicional... talvez sim :), de todo modo, são questões de concurso relacionadas com os dispositivos da lei, no qual você pode acessar com um clique."},
                        {title: "Dispositivos da lei mais cobrados", text:"Em decorrência das questões vinculadas, será possível ter acesso a estatísticas da lei, mostrando os pontos relevantes cobrados em prova."},
                        {title: "Súmulas vinculadas aos dispositivos da lei", text:"você já pode conferir uma breve amostra dessa funcionalidade na CF/88 e no CTN"},
                        {title: "Jurisprudência vinculada aos dispositivos da lei", text:"Estamos trabalhando nesse momento nessa funcionalidade para entregar a melhor experiência em sites de estudo da lei."},
                        {title: "Área do Usuário", text:"Uma área incrível para você organizar sua lei da melhor forma, com indicações de pontos relevantes e montar seu resumo da lei de forma ágil"},
                        {title: "Muito mais", text:"Tá vindo muita coisa boa por aí, acompanhe a gente pelo instagram para não perder as novidades."},
                    ]
            }
        }
    }
</script>

<style scoped>
.formatText{
    text-align: justify;
    hyphens: auto;
}
.sombraText{
    text-shadow: 0.1em 0.1em 0.2em black
}
</style>