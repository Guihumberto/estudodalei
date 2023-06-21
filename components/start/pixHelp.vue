<template>
    <div>
        <v-dialog
          v-model="dialogPix"
          width="600"
        >
        <v-card>
            <!-- <v-app-bar
                flat
                color="#43a047"
                dark
                shrink-on-scroll
                prominent
                src="https://picsum.photos/1920/1080?random"
                fade-img-on-scroll
                scroll-threshold="500"
                >
                <template v-slot:img="{ props }">
                    <v-img
                    v-bind="props"
                    gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
                    ></v-img>
                </template>
                <v-toolbar
                  color="transparent"
                  flat
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="dialogPix = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar>

            </v-app-bar> -->
            <v-toolbar
              dark
              prominent
              flat
              src="https://picsum.photos/1920/1080?random"
            >
            <template v-slot:img="{ props }">
                <v-img
                v-bind="props"
                gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

              <v-toolbar-title>Ajude a manter o Estudo da Lei no ar!!</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn
                icon
                @click="dialogPix = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="mt-5">
            <p>
                O site estudo da lei é uma iniciativa de democratização dos estudos, dando possibilidade a todos
                que possuem este nobre objetivo de passar em concurso público a ter acesso a melhor forma de estudar
                atualmente: estudo da lei + resolução de questões.
            </p>
            <p class="pa-2 warning lighten-2 text--bold">
                Se você puder e não for lhe fazer falta, considere fazer uma contribuição.
            </p>
            <v-row class="mt-5 justify-space-around">
                <h3 class="text-h5">Pix e-mail:</h3>
                <h3 class="text-h5">leges.estudo@gmail.com</h3>
                <v-btn color="primary" small class="mt-2" @click="copyPix()">copiar</v-btn>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-subheader>João Humberto Silva Ribeiro Júnior</v-subheader>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                dialogPix: true,
            }
        },
        methods:{
            copyPix(){
                const text = "leges.estudo@gmail.com"
                navigator.clipboard.writeText(text);
                this.$store.dispatch("snackbars/setSnackbars", {text:'Chave Pix Copiada', color:'success'})
            }
        }
    }
</script>

<style scoped>

</style>
