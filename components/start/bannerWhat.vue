<template>
    <v-card class="ml-3 my-2" color="colorBanner">
        <v-card-title class="text-h5">O que é o estudo da lei?</v-card-title>
        <v-card-text>
            <p class="formatText">
                O site estudo da lei é uma aplicação voltada para produtividade nos estudos
                com ênfase, como o próprio nome diz, no estudo da legislação ou lei seca, se preferir.
                Feito por quem foi concursando durante 10 anos, o site possui funcionalidades únicas tais como
                filtro de artigos, conjugação de leis na mesma tela, filtro de súmulas e jurisprudência por disciplina 
                e assunto e ainda vem muito mais.
            </p>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    outlined
                    rounded
                    text
                    to="/legesEstudo"
                >Saiba Mais</v-btn>
            </v-card-actions>
        </v-card-text>

    </v-card>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.formatText{
    font-size: 16px;
}
.colorBanner{
    background: rgb(228,220,240);
    background: -moz-linear-gradient(115deg, rgba(228,220,240,1) 0%, rgba(244,244,247,1) 59%, rgba(243,237,247,1) 100%);
    background: -webkit-linear-gradient(115deg, rgba(228,220,240,1) 0%, rgba(244,244,247,1) 59%, rgba(243,237,247,1) 100%);
    background: linear-gradient(115deg, rgba(228,220,240,1) 0%, rgba(244,244,247,1) 59%, rgba(243,237,247,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#e4dcf0",endColorstr="#f3edf7",GradientType=1);
}

</style>