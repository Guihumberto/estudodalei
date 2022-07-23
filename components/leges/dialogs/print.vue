<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="1080"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
            small icon
            v-bind="attrs"
            v-on="on">
            <v-icon small class="mr-1">mdi-printer</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Imprimir
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        

        <v-card-text class="mt-5">
            <v-btn @click="print" color="primary" outlined><v-icon class="mr-1">mdi-file-pdf-box</v-icon>Download</v-btn>
        </v-card-text>    

        <v-card-text v-show="true">
            <v-tabs
            v-model="tabs"
            centered
            >
            <v-tab
                v-for="(item, index) in tabName"
                :key="index"
            >
                {{item}}
            </v-tab>
            </v-tabs>
           <v-tabs-items v-model="tabs">
             <v-tab-item >
              <div ref="content">
                 <v-card flat outlined >
                     <v-row>
                         <v-col cols="6" class="borderVertical">
                             <v-card-text>
                                 <v-card class="mb-5" outlined>
                                     <v-card-text>
                                        <p class="text-h5 text-center">{{law[3]}}</p>
                                        <p class="text-center mt-n3">{{law[4]}}</p>
                                        <p class="mt-5 formatText">{{law[1]}}</p>
                                     </v-card-text>
                                 </v-card>
                                 <div v-for="(item, index) in textLaw" :key="index">
                                     <p v-if="item.estrutura" class="font-weight-medium text-center" v-text="item.textLaw"></p>
                                     <p v-else class="formatText" v-text="item.textLaw"></p>
                                 </div>
                             </v-card-text>
                         </v-col>
                     </v-row>
                 </v-card>
                 </div>
             </v-tab-item>
                <v-tab-item ref="completoPdf">
                    <v-card flat outlined>
                        <v-row>
                            <v-col cols="12">
                                <v-card-text>
                                    <v-card class="mb-5" outlined>
                                        <v-card-text>
                                           <v-row>
                                            <v-col cols="6">
                                                <p class="text-h5">{{law[3]}}</p>
                                                <p class="mt-n3">{{law[4]}}</p>
                                            </v-col>
                                            <v-col cols="6">
                                                <p class="mt-2 formatText">{{law[1]}}</p>
                                            </v-col>
                                           </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <div v-for="(item, index) in textLaw" :key="index">
                                        <p v-if="item.estrutura" class="font-weight-medium text-center" v-text="item.textLaw"></p>
                                        <p v-else class="formatText" v-text="item.textLaw"></p>
                                    </div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>

        <v-card-text v-show="false">
          <div ref="teste">
            <div>
              <p>{{law[3]}}</p>
              <p>{{law[4]}}</p>
              <p>{{law[1]}}</p>
            </div>
           
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  import jspdf from 'jspdf'

  export default {
    data () {
      return {
        dialog: false,
        tabName: ['Coluna', 'Página Inteira'],
        tabs: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      
      }
    },
    props:{
        textLaw: false,
        law: false
    },
    methods:{
        print() {
           const pdf = new jspdf({
              orientation: "portrait",
              unit: "in",
              format: "letter"
            });
            pdf.setFontSize(16).text(this.law[3], 0.5, 1.0);
            pdf.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
            pdf
              .setFont("helvetica")
              .setFontSize(12)
              .text(this.law[1], 0.5, 3.5, { align: "left", maxWidth: "7.5" });

            // pdf
            // .setFont("times")
            // .setFontSize(11)
            // .setFontStyle("italic")
            // .setTextColor(0, 0, 255)
            // .text(
            //   "This is a simple footer located .5 inches from page bottom",
            //   0.5,
            //   pdf.internal.pageSize.height - 0.5
            // )

            const html = this.$refs.teste.innerHTML


            pdf.save(`${this.law[4]}.pdf`)
         
        },
    }
  }
</script>

<style scoped>
    .borderVertical{
       border-right: 6px solid rgb(186, 186, 207);
    }
    .formatText{
    text-align: justify;
    hyphens: auto;
}
</style>