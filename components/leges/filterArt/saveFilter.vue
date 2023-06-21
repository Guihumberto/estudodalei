<template>
    <v-card>
        <v-system-bar
            color="primary"
        >
        <v-spacer></v-spacer>
        <v-btn @click="close" x-small icon><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <v-card-text v-if="user">
            <v-form ref="form">
                <v-select
                    dense outlined
                    v-model="nameFolder"
                    :items="folderList"
                    label="Pasta"
                    :append-outer-icon="folderDialog ? 'mdi-close' : 'mdi-plus-circle'"
                    clearable
                    @click:append-outer="folderDialog = !folderDialog"
                    :disabled="folderDialog"
                >
                </v-select>
    
                <v-text-field
                    v-if="folderDialog"
                    dense
                    label="Nome da Pasta"
                    v-model="nameFolder"
                    class="mt-n2"
                    :rules="[rules.required, rules.minname]"
                ></v-text-field>
    
                <v-text-field
                    label="Nome do Filtro"
                    placeholder="digite um nome para o filtro"
                    dense
                    v-model="nameFilter"
                    :rules="[rules.required, rules.minname]"
                    class="mb-5 mt-3"
                >
                </v-text-field>
                    Arts: <span v-for="item, i in artsOrder" :key="i">{{item}}<span>, </span></span>
                <v-divider></v-divider>
                {{law[4]}}
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="close" small text>Cancelar</v-btn>
                    <v-btn @click="save" small color="success">Salvar</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
        <v-card-text v-else class="text-center">
            <p>Necessário <b class="primary--text">login</b> para esta funcionalidade</p>
            <v-btn to="/login"> <v-icon class="mr-2">mdi-account</v-icon> Login</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';
    const shortid = require('shortid');

    export default {
        data(){
            return{
                fav: true,
                message: false,
                hints: true,
                folderDialog: false,
                nameFolder: '',
                nameFilter: '',
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    minname: (v) => (v||'').length >= 4 || "Mínimo 4 caracteres"
                },
            }
        },
        props:{
            arts: Array,
            law: Array
        },
        computed:{
            artsOrder(){
                return this.arts.sort(this.order)
            },
            user(){
                const user = this.$store.getters.readUser
                return user.uid
            },
            folderList(){
                let folder = this.$store.getters.readFilterArts.map(i => i.folder)
                return folder
            }
        },
        methods:{
            ...mapActions(['saveFilterArts', 'cargaFilterArts']),
            save(){
                if(!this.nameFolder){
                    return this.$store.dispatch("snackbars/setSnackbars", {text:'Selecione o nome da Pasta.', color:'error'})
                }
                if(this.$refs.form.validate()){
                    let data = {
                        id: shortid.generate(),
                        law: this.law[2],
                        folder: this.nameFolder, 
                        filter: this.nameFilter,
                        arts: this.arts
                    }
                    this.saveFilterArts(data)
                    this.clearFields()
                    this.close()
                    this.$store.dispatch("snackbars/setSnackbars", {text:'Filtro salvo com sucesso.', color:'success'})
                }
            },
            clearFields(){
                this.nameFilter = ''
                this.nameFolder = ''
                this.folderDialog = false
            },
            close(){
                this.$emit('close')
            },
            order(a, b){
                return a -  b   
            },
            cargaFilterArtsUser(){
                if(this.user){
                    this.cargaFilterArts()
                }
            }
        },
        created(){
            this.cargaFilterArtsUser()
        }
    }
</script>

<style lang="scss" scoped>
</style>