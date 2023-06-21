<template>
    <div>
        <p class="text-h6">Meus Comentários</p>
        <v-alert 
            outlined color="grey"
            class="pb-0"
            v-for="item, i in comments" :key="i"
        >
            <p 
                style="color:black"
            >{{item.comment}}
            </p>
            <v-chip-group>
                <v-chip 
                    title="editar"
                    outlined small>
                    <v-icon small>mdi-file-document-edit</v-icon>
                </v-chip>
                <v-chip 
                    color="error"
                    title="apagar"
                    outlined small @click="deleteComment(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                </v-chip>
            </v-chip-group>
        </v-alert>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props:{
            comments: Array
        }
    }
</script>

<style scoped>

</style>