<template>
    <div>
        <v-dialog
          v-model="dialogPix"
          width="600"
        >
        <v-card>
            <v-toolbar
              dark
              prominent
              flat
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuVm-YL6_9PJNht1AHfR55_fkREqeW3NVA0w&usqp=CAU"
            >
            <template v-slot:img="{ props }">
                <v-img
                v-bind="props"
                gradient="to top right, rgba(84,93,98,.7), rgba(25,32,72,.7)"
                ></v-img>
            </template>

              <v-toolbar-title>Ajude o Estudo da Lei!!</v-toolbar-title>

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
            <p class="pa-2 warning lighten-2 text--bold text-center">
                Se você puder e não for lhe fazer falta, considere fazer uma contribuição.
            </p>
            <div class="mt-5 accountpix">
                <h3 class="text-h6">Pix e-mail:</h3>
                <h3 class="text-h6">leges.estudo@gmail.com</h3>
                <v-btn outlined color="primary" small class="mt-2" @click="copyPix()"><v-icon size="small" class="mr-1">mdi-content-paste</v-icon> copiar</v-btn>
            </div>
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
.accountpix {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@media (max-width: 400px) {
  .accountpix {
    flex-direction: column;
  }
}

</style>
