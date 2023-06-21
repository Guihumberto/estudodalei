<template>
<div class="font-face" v-scroll-reveal="{ delay: 350 }">
    <div class="black">
        <v-container style="max-width: 1080px">
            <v-app-bar dark flat color="transparent" class="mx-n5">
                <div class="d-flex">
                    <v-icon color="indigo" large class="mr-1">mdi-sun-compass</v-icon>
                    <h5 to="/" class="text-h5 leges">Estudo da Lei</h5>
                </div>
                <v-spacer></v-spacer>
                <div class="mr-1 d-none d-sm-flex">
                    <v-btn to="/" text>Início</v-btn>
                    <v-btn to="/laws" text>Leis</v-btn>
                    <v-btn to="/sumulas" text class="mx-2">Súmulas</v-btn>
                    <v-btn to="/juris" text>Julgados</v-btn>
                </div>
                <v-btn v-show="false" to="/login" text class="ml-2 mr-0" rounded color="indigo lighten-2" outlined>Login</v-btn>
            </v-app-bar>
            <v-card dark flat class="my-16" color="transparent">
                <v-row class="mt-16">
                    <v-col cols="12" sm="6" class="my-auto">
                        <h1 class="text-h3 title">Estudo da Lei</h1>
                        <p class="mt-5 text-h5 description">Estude a legislação integrada a questões e jurisprudência de forma única.</p>
                        <v-btn to="/laws" class="px-14" dark x-large color="indigo">ACESSAR</v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-img alt="pessoa estudando no pc" src="/landingPage/hero-illustration.svg"></v-img>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
    <v-container style="max-width: 1080px">
        <v-card flat>
            <v-card-text>
                <v-img
                    contain
                    src="/landingPage/banner1.png"
                    max-height="500"
                    alt="tela do estudo da lei"
                ></v-img>
            </v-card-text>
        </v-card>
    </v-container>
    <div class="what my-16">
        <v-container style="max-width: 1080px">
            <v-card class="my-16">
                <v-card-text class="text black--text">
                    <h3 class="description mb-5"> 
                        <v-icon class="tag mr-1 indigo mb-3"></v-icon>
                        <span class="black--text text-h4 mb-5">O que é o Estudo da Lei?</span> 
                    </h3>
                    <p style="font-size: 22px">Estudo da Lei é uma aplicação voltada para a otimização do estudo da legislação com foco em questões de concurso público, 
                        integrando jurisprudência e doutrina no texto da lei e direcionando para os dispositivos mais relevantes para prova.
                    </p>
                    <p style="font-size: 22px">Com questões, doutrina e jurisprudências vinculadas ao texto da lei, a ferramenta Estudo da Lei tem o propósito de 
                        tornar a leitura da lei mais agradável, melhorando o aprendizado.
                    </p>       
                </v-card-text>
            </v-card>
        </v-container>
    </div>
    <div>
        <v-container style="max-width: 1080px">
            <apresentation-test />
        </v-container>
    </div>
    <div class="black">
        <v-container style="max-width: 1080px">
            <apresentation-filtroArt />
        </v-container>
    </div>
    <v-container style="max-width: 1080px">
        <!-- Funcionalidades -->
        <!-- o básico -->
        <v-card flat>
            <v-card-title class="description mb-5"> <span class="tag mr-3 indigo"></span>Funcionalidades</v-card-title>
            <v-row align="center">
                <v-col cols="12" sm="6">
                    <v-card-title class="indigo lighten-2 white--text ml-4 py-2 mb-5">
                        <v-icon class="mr-2">mdi-square-opacity</v-icon> O básico
                    </v-card-title>
                    <v-card-text class="text" style="font-size: 1.2rem; line-height: 2.0rem;">
                        <p>Busca da legislação por disciplina, nome ou número da lei, com área
                            de favoritos personalizada.
                        </p>
                        <p>
                            Leitura da lei, com índice pelo livro capítulo, 
                            título, seção, subseção.
                        </p>
                        <p>
                            Busca textual ou por artigo, filtrando apenas pelo 
                            dispositivo que você quer ver na tela.
                        </p>
                    </v-card-text>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card outlined color="indigo" max-width="400" class="mx-auto">
                        <v-img alt="tela do estudo da lei" contain src="/landingPage/telaLeges.png"
                        >
                            <div class="fill-height bottom-gradient"></div>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <!-- o avançado -->
        <v-card flat class="my-16">
            <v-row align="center">
                <v-col cols="12" sm="6">
                     <v-card outlined color="indigo" max-width="400" class="mx-auto">
                        <v-img alt="tela de navegação" contain src="/landingPage/banner3.png">
                            <div class="fill-height bottom-gradient"></div>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card-title class="indigo lighten-2 white--text py-2 mb-5"><v-icon class="mr-2">mdi-square-opacity</v-icon> O Avançado</v-card-title>
                    <v-card-text class="text" style="font-size: 1.2rem; line-height: 2.0rem;">
                        <p>Abertura de até 3 (três) leis na mesma tela.</p>
                        <p>Lei para consulta acessível em qualquer lugar da aplicação, a qualquer momento.</p>
                        <p>Deslocamento da leitura da lei por artigo.</p>
                        <p>Tudo otimizado para mobile e com PWA.</p>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <!-- o diferencial -->
        <v-card flat>
            <v-row align="center">
                <v-col cols="12" sm="6">
                    <v-card-title class="indigo lighten-2 white--text ml-4 py-2 mb-5"><v-icon class="mr-2">mdi-square-opacity</v-icon> O diferencial</v-card-title>
                    <v-card-text class="text" style="font-size: 1.2rem; line-height: 2.0rem;">
                        <p>Questões e jurisprudências relacionados com os dispositivos da lei.</p>
                        <p>Filtro por disciplina e assunto na Jurisprudência.</p>
                        <p>Estatísticas dos dispositivos da lei mais cobrados por banca.</p>
                    </v-card-text>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card outlined color="indigo" max-width="400" class="mx-auto">
                        <v-img contain src="/landingPage/banner4.png" alt="tela de índice - tutorial">
                            <div class="fill-height bottom-gradient"></div>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
    <!-- demo -->
    <div class="black">
        <v-container style="max-width: 1080px">
            <apresentation-demo />
        </v-container>
    </div>
    <div>
        <v-container style="max-width: 1080px">
            <!-- como pode me ajudar -->
        <v-card flat class="my-16">
            <v-card-text>
                <h3 class="description mb-5"> 
                    <v-icon class="tag mr-1 indigo"></v-icon>
                    Como tudo isso pode me ajudar?
                </h3>
                <v-row>
                    <v-col cols="12" sm="6" md="4" v-for="item, index in helps" :key="index">
                        <v-card>
                            <v-card-title class="white--text py-3 indigo mb-5">{{item.title}}</v-card-title>
                            <v-card-text>
                                <p>{{item.text}}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        </v-container>
    </div>
    <div class="aboutme d-flex align-center ">
        <v-container style="max-width: 1080px">
            <apresentation-enterApp />
        </v-container>
    </div>
    <!-- tutorial -->
    <div>
        <v-container style="max-width: 1080px">
            <apresentation-knowMore />
        </v-container>
    </div>
    <!-- mail -->
    <div class="black">
        <v-container style="max-width: 1080px">
            <mail />
        </v-container>
    </div>
     <!-- footer -->
    <div>
        <v-container style="max-width: 1080px">
            <apresentation-footer />
        </v-container>
    </div>
</div>

</template>

<script>
    export default {
        layout: 'landingPage',
        head: {
            title: 'Estudo da Lei - Lei Seca',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { 
                hid: 'description', 
                name: 'description', 
                content: 'Leges Estudo - Estudo da lei - Constituição Federal, Lei, lei seca, Legislação, Norma, súmulas, STJ, STF, jurisprudência, questões e lei com questões e lei com jurisprudência' 
                },
                { name: 'format-detection', content: 'telephone=no' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/fantasma.png' }
            ]
        },
        data(){
            return{
                helps:[
                    {id: 1, title: "Consultoria", text: "O faciitador de filtro de artigos integrado com a juriprudência que te poupará muito tempo na hora de achar os artigos indicados."},
                    {id: 2, title: "Estudo da Lei", text: "A aplicação possui letras e cores otimizadas para leitura, perfeito para ler em telas. O estudo da lei foi feito por um concurseiro raiz."},
                    {id: 3, title: "Integração", text: "Os dispositivos das leis estão sendo integrados a questões e jurisprudência, a cada dia que passa essa integração se torna mais robusta."},
                    {id: 4, title: "Relevância", text: "Para revisar ou focar na reta final, o Estudo da lei dá estatísticas dos dispositivos mais cobrados em provas. Clique no botão e tudo estará na tela."},
                    {id: 5, title: "Eficiência", text: "A lei está indicando artigo de outra legislação? coloque ambos na mesma tela ou abra a outra lei na integra a qualquer momento, sem sair da leitura atual."},
                    {id: 6, title: "É Gratuito", text: "Sem propagandas, sem pegadinhas. Na nossa fase beta o sistema está totalmente aberto para uso. Faça questões, acesse leis e jurisprudência. Entre e aproveite!"},
                ]
            }
        }
        
    }
</script>

<style scoped>
.colorBanner{
    background: rgb(252,250,255);
    background: -moz-linear-gradient(115deg, rgba(252,250,255,1) 0%, rgba(139,150,167,1) 48%, rgba(242,245,249,1) 100%);
    background: -webkit-linear-gradient(115deg, rgba(252,250,255,1) 0%, rgba(139,150,167,1) 48%, rgba(242,245,249,1) 100%);
    background: linear-gradient(115deg, rgba(252,250,255,1) 0%, rgba(139,150,167,1) 48%, rgba(242,245,249,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfaff",endColorstr="#f2f5f9",GradientType=1);
}
.font-face {
    font-family: 'Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,';
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    hyphens: auto;
  }

.leges{
    font-weight: 500;
}
.title {
    font-weight: 700;
}
.description {
    font-size: 2.2rem;
    line-height: 3rem;
    font-weight: 400;
    hyphens: auto;
}
.text{
    font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
    display: block;
    font-size: 1.8rem;
    line-height: 2.5rem;
    text-align: justify;
    hyphens: auto;
}

.tag{
    height: 30px;
    width: 20px;
}

.footer {
    font-size: 1.2rem;
    line-height: 3rem;
    font-weight: 400;
}

.titleBarcard{
    color: aliceblue;
    background: rgb(102,100,106);
    background: -moz-linear-gradient(115deg, rgba(102,100,106,1) 0%, rgba(0,0,0,1) 59%, rgba(243,237,247,1) 100%);
    background: -webkit-linear-gradient(115deg, rgba(102,100,106,1) 0%, rgba(0,0,0,1) 59%, rgba(243,237,247,1) 100%);
    background: linear-gradient(115deg, rgba(102,100,106,1) 0%, rgba(0,0,0,1) 59%, rgba(243,237,247,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#66646a",endColorstr="#f3edf7",GradientType=1);
}

.what{
    background: linear-gradient(
        to right,
        #201d2e 50%,
        #f6f6f6 50%
    ) fixed;
}

.boxWhat{
    width: 90vmin;
    background-color: #ffffff;
    padding: 50px 40px;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 5px;
    box-shadow: 0 20px 35px rgba(60,60,60,0.2);
}

.bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
}

.aboutme {
  height: 30vw;
  background: url("https://s3-us-west-2.amazonaws.com/files.bradengelhardt.com/brad-bg-main.jpg")
    no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
}

</style>