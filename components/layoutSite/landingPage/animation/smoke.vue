<template>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>

  </ul>
</template>

<script>
  export default {

  }
</script>

<style scoped>
ul {
  position: absolute;
  top: -10%;
  left: 20%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
}
li {
  position: absolute;
  list-style: none;
  width: 25px;
  height: 25px;
  background: rgb(221, 217, 217);
  border-radius: 50%;
}
li:nth-child(even){
  animation: animateEven 10.8s linear infinite;
}
li:nth-child(odd) {
  animation: animateOdd 10.8s linear infinite;
}
li:nth-child(9) {
  animation: none;
  filter: blur(15px);
}
@keyframes animateEven {
  0% {
    transform: translate(0,0) scale(1);
    opacity: 1;
    filter: blur(5px);
  }
  100% {
    transform: translate(100px,-500px) scale(3);
    opacity: 0;
    filter: blur(10px);
  }
}
@keyframes animateOdd {
  0% {
    transform: translate(0,0) scale(1);
    opacity: 1;
    filter: blur(5px);
  }
  100% {
    transform: translate(0px,-500px) scale(3);
    opacity: 0;
    filter: blur(10px);
  }
}
li:nth-child(1) {
  animation-delay: 0s;
}
li:nth-child(2) {
  animation-delay: .4s;
}
li:nth-child(3) {
  animation-delay: .8s;
}
li:nth-child(4) {
  animation-delay: 1.2s;
}
li:nth-child(5) {
  animation-delay: 1.6s;
}
li:nth-child(6) {
  animation-delay: 2s;
}
li:nth-child(7) {
  animation-delay: 2.4s;
}
li:nth-child(8) {
  animation-delay: 2.8s;
}
</style>
