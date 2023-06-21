<template>
    <v-card outlined class="pa-5 ml-5">   
        <h6 class="text-h6">Jurisprudência</h6>
        <v-card-text v-if="sumulas.length">
            <strong>Súmulas</strong>  <br>
            <div v-for="item, i in sumulas" :key="i">
                <span>{{item.orgao}} - Súmula <span v-if="item.vinculante">Vinculante</span> {{item.nro}}</span>
                <p>{{item.text}}</p>
            </div>
        </v-card-text>
        <v-card-text v-if="juris.length">
            <strong>Julgados</strong>  <br>
            <div class="mt-5" v-for="item, i in juris" :key="i">
                <span>{{item.orgao}}</span>
                <p>{{item.tese}}</p>
                <p>{{item.texto}}</p>
                <p>{{item.julgado}}</p>
                <v-divider></v-divider>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props:{
            jurisId: Array,
            sumulasId: Array
        },
        computed:{
            sumulas(){
                const sumulas = this.$store.getters.readSumulas
                let newSumulas = []

                if (Array.isArray(this.sumulasId)){

                       this.sumulasId.forEach (i => 
                        sumulas.forEach(sumula => {
                            if(sumula.id == i)
                            newSumulas.push(sumula)
                        })
                    )

                    return newSumulas

                } else {
                    return newSumulas
                }
                
            },
            juris(){
                const juris = this.$store.getters.readJuris
                let newJuris = []

                if (Array.isArray(this.jurisId)){

                       this.jurisId.forEach (i => 
                        juris.forEach(juris => {
                            if(juris.id == i){
                                newJuris.push(juris)
                            }
                        })
                    )

                    return newJuris

                } else {
                    return newJuris
                }
                
            },
        }
    }
</script>

<style scoped>

</style>