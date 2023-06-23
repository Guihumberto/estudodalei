<template>
    <div class="container">
            <v-progress-circular
            :size="120"
            :width="10"
            color="purple"
            indeterminate
            ></v-progress-circular>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
.container {
width: 100vw;
height: 80vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
position: relative;
}
</style>
