<template>
    <v-card outlined flat class="my-16" color="transparent" dark>
        <v-card-text>
            <h3 class="description mb-5"> 
                <v-icon class="tag mr-1 indigo mb-4"></v-icon>
                <span class="white--text text-h4 mb-5">Filtro e Navegação</span> 
            </h3>
            <p class="text-h5 white--text">
                É possível filtrar um ou vários artigos de maneira simples e ágil. Se preferir navegu pela lei
                utilizando o índice com a estrutura oficial ou por artigo com um simples clique/toque.
            </p>
            <v-row class="mt-5">
                <v-col cols="12" sm="6">
                    <v-img
                    contain
                    src="/landingPage/tela1.jpeg"
                    alt="filtro de artigos"
                ></v-img>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col l cols="12" sm="6">
                    <v-img
                    contain
                    src="/landingPage/tela2.jpeg"
                    alt="busca pelo índice"
                ></v-img>
                </v-col>
                <v-col cols="12">
                    <v-img
                        contain
                        src="/landingPage/tela3.gif"
                        alt="navegação por artigo"
                    ></v-img>
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