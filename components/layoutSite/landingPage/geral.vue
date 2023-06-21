<template>
  <v-container class="mt-10">
    <v-row>
      <v-col md="6"  class="d-none d-sm-flex">
        <v-img
          contain
          src="/landingPage/hammerlaw.png"
          min-height="500"
          alt="tela do estudo da lei"
        ></v-img>
      </v-col>
      <v-col lg="6">
        <h4 class="text-h4">Leges - Estudo da Lei</h4>
        <p>
          O site é uma aplicação voltada principalmente para o estudo da lei seca e da jurisprudencia com questoes integradas focado em concursos públicos e exames da ordem..
        </p>
        <v-list color="transparent">
          <v-list-item v-for="item, i in functions" :key="i">
            <v-list-item-icon class="mr-2">
              <v-icon color="success">mdi-check-all</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <p>
          Com o Estudo da Lei é possível fazer filtros inteligentes selecionando dispositivos mais cobrados em provas de concursos públicos e/ou relacionados com jurisprudências e ainda fazer comentários, favoritar dispositivos e gerar caderno com lista de questões. Ainda, cada normativo tem resumo gerado
          em tempo real com os dispositivos mais relevantes cobrados em provas.
        </p>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    data(){
      return{
        functions:[
          'Legislação de forma otimizada para estudo', 'Julgados recentes', 'Súmulas do STF e STJ completas', 'Questões vinculadas a lei e a jurisprudência', 'Planejamento de estudo com resumo', 'Muito mais'
        ],
      }
    }
  }
</script>

<style scoped>

</style>
