<template>
    <v-card class="ml-3 mt-2" outlined color="primary lighten-4">
        <v-card-text>
            <v-row>
                <v-col cols="3" sm="2" md="1">
                    <v-avatar size="74" tile>
                        <v-img  
                            :src="sumulas.img">
                        </v-img>
                    </v-avatar>
                </v-col>
                <v-col cols="9" sm="10" md="8" class="my-auto">
                        <p class="mb-0" v-text="sumulas.text"></p>
                        <small>{{sumulas.alert}}</small>
                </v-col>
                <v-col cols="12" sm="12" md="3" class="my-auto text-right">
                    <v-btn color="teal" dark to="/sumulas"> ACESSAR SÚMULAS</v-btn>
                </v-col>
            </v-row>    
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                sumulas:{
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGN84swpzETpMy9e4znR7lQvcZT1gxjEQKvQ&usqp=CAU',
                    text: 'Faça busca por números ou termos do texto de súmulas do STJ/STF ou se preferir use a classificação por disciplina.',
                    alert: '**As súmulas estão sendo atualizadas diariamente.'
                }
            }
        }        
    }
</script>

<style lang="scss" scoped>

</style>