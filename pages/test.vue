<template>
    <div>
        <h1>testes</h1>
        {{list.length}}
        <div>
            <p v-for="item, index, in list" :key="index">
                {{item.nro}}
            </p>
            
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        computed:{
            list(){
                let listSumula = this.$store.getters.readSumulas.filter(i => i.orgao == 'STF' && i.vinculante == false)
                
                return listSumula
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>