<template>
    <v-card outlined flat class="my-16" color="transparent" dark>
        <v-card-text>
            <h3 class="description mb-5"> 
                <v-icon class="tag mr-1 indigo mb-4"></v-icon>
                <span class="white--text text-h4 mb-5">Demonstração</span> 
            </h3>
            <p class="text-h5 white--text">
                
            </p>
            <v-row class="mt-5 text-center">
                <v-col cols="12" sm="6">
                    <v-img
                        contain
                        src="/landingPage/indice.gif"
                        alt="navegação por artigo"
                    ></v-img>
                    <h3>Busca pelo índice.</h3>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-img
                        contain
                        src="/landingPage/filtroart.gif"
                        alt="filtro de artigo"
                    ></v-img>
                    <h3>Filtro de Artigos.</h3>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-img
                        contain
                        src="/landingPage/sumulas.gif"
                        alt="súmulas busca"
                        max-height="320"
                    ></v-img>
                    <h3>Filtro de jurisprudência por disciplina e assunto.</h3>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-img
                        contain
                        src="/landingPage/conjugar.gif"
                        alt="filtro de artigo"
                        max-height="320"
                    ></v-img>
                    <h3>Conjugar Normas na mesma tela.</h3>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.tag{
    height: 30px;
    width: 20px;
}
</style>