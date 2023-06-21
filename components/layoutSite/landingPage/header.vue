<template>
  <header class="header">
    <div class="headerDiv">
      <h1 class="mr-5"><a to="/">Leges Estudo</a></h1>
    </div>
  </header>
</template>

<script>
  export default {
    data(){
    }
  }
</script>

<style scoped>
.header {
  width: 100%;
  min-height: 8vh;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.headerDiv{
  width: 1160px;
  height: 5vh;
  display: flex;
  justify-content: end;
  align-items: center;
}
.header h1 {
  animation: aparecer 1s ease forwards;
  animation-delay: 1.5s;
  opacity: 0;
  transition: .5s;
}
@keyframes aparecer {
  100%{
    opacity: 1;
  }
}
.headerDiv h1 a {
  transition: .5s;
}
.headerDiv h1 a:hover {
  color: rgb(143, 160, 247);
}
.header a {
  font-size: 20px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
}

</style>
