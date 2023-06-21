<template>
    <v-container class="container">
            <v-progress-circular
            :size="120"
            :width="10"
            color="purple"
            indeterminate
            ></v-progress-circular>
    </v-container>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.container {
width: 100vw;
height: 100vh;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}
</style>