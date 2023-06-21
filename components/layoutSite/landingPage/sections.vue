<template>
  <div class="information">
          <a v-for="item, i in sections" :key="i">
            {{ item.name }}
          </a>
      </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
.information {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.information a {
  color: #fff;
  margin-right: 1rem;
  padding: 5px;
  transition: .5s;
}
.information a:hover {
  box-shadow: 2px 2px transparent, -.5em 0 0 white;
}
@media (max-width: 380px) {
  .information {
    flex-direction: column;
  }
}
</style>
