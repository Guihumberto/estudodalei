<template>
  <v-container>
    <v-card flat class="my-10" color="transparent">
        <v-card-text>
             <h3 class="description mb-5">
                <v-icon class="tag mr-1 indigo mb-4"></v-icon>
                <span class="black--text text-h4 mb-5">Saiba mais</span>
             </h3>
                <v-expansion-panels>
                    <v-expansion-panel
                    v-for="(item,i) in items"
                    :key="i"
                    >
                    <v-expansion-panel-header>
                        <h3 class="text-h6">{{item.title}}</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p class="subtitle-1">{{item.text}}</p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
      data(){
          return{
              items:[
                  {id: 1, title: 'Legislação', text: 'Atualmente, o Estudo da Lei possui 36 leis em sua base, essa quantidade pode ser aumentada de acordo com a necessidade dos nossos usuários/alunos. Basta pedir e nós incluímos. É possível favoritar as leis para vizualizar apenas aquilo que é de seu interesse (necessário estar logado)'},
                  {id: 2, title: 'Busca', text: 'A barra de busca, na área de leitura da lei, funciona de duas formas: é possível buscar por qualquer termo dentro da lei ou digitar o número do artigo. Nesta última é possível filtrar vários artigos, o resultado é a visualização dos artigos escolhidos. Uma excelente ferramenta para metas de consultoria.'},
                  {id: 3, title: 'Índice', text: 'Ao lado da barra de busca, dentro da área de leitura da lei, existe o botão de ÍNDICE. Se a lei estiver estrutura em tópicos (Livro, Título, Capítulo, seção, etc.) será possível ter acesso com um click no botão ao lado do índice escolhido.'},
                  {id: 4, title: 'Conjugar Normas', text: 'Sabe quando uma norma indica um artigo de outra norma e você precisa sair da leitura da lei para buscar o que aquele dspositivo diz? (se você não faz isso pode estar deixando de acertar uma questão). Esta função vai te ajudar bastante! Basta escolher a norma referenciada e ela será incluída acima da leitura atual na cor azul. A função pode ser acessada no botão ADD ao a lado do índice.'},
                  {id: 5, title: 'Conjugar Normas 2', text: 'Essa função pode ser acessada em qualquer lugar da aplicação no botão no canto superior direto da tela, na barra de menu. Por padrão ele vai abrir a CF/88, mas pode ser carregada qualquer outra lei da base. Ela difere da seção anterior por abrir a lei na integra, com a possibilidade de busca por artigo ou termo.'},
                  {id: 6, title: 'Detalhes da área de leitura', text: 'Alguns detalhes que podem melhorar sua experiência no Estudo da Lei são os botões de aumentar e dimuir a letra e o espaçamento do texto. Há também a opção DISPOSITIVO POR PÁGINA, possibilitando escolher a quantidade de dispositivos que o usuário deseja ver na tela. Por padrão são 15 dispositivos na tela e a navegação é feita por paginação.'},
                  {id: 7, title: 'Jurisprudência', text: 'Há duas seções em jurisprudência: Julgados e Súmulas. Elas funcionam da mesma forma, com barra de busca por termo, com possibilidade de filtros por disciplina e assunto. Entretanto, há algumas distinções. Em súmulas, ao digitar o número da súmulas é possível filtrar várias, da mesma forma como funciona o filtro por artigo na área de leitura da lei. Já na área de julgado é possível filtrar pelo número do informativo. Nas duas seções é possível favoritar (necessário estar logado).'},
                  {id: 8, title: 'Questões', text: 'Eis o motivo da criação do Estudo da Lei. As questões são vinculadas aos dispositivos, por isso são encontradas na área de leitura da lei. A partir disso o sistema fará métricas com os dispositivos mais cobrados em provas de concurso público e exame da ordem e a possibilidade de filtros apenas com os dispositivos mais relevantes... maaas calma. O sistema ainda esta em fase beta. Podemos prometer muita coisa boa pela frente.'},
                  {id: 9, title: 'Integração', text: 'Assim como as questões, as súmulas e julgados estão sendo vinculados aos dispositivos da lei, facilitando o aprendizado, dando mais agilidade ao usuário, uma vez que tudo que ele precisa está na lei (a integração está em progresso.).'}
             ]
          }
      }
  }
</script>

<style scoped>
.tag{
  height: 30px;
  width: 20px;
}
</style>
