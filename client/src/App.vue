<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <PostComponent/>
  </div>
</template>

<script>
import PostComponent from './components/PostComponent.vue'

export default {
  name: 'App',
  components: {
    PostComponent
  }
}
</script>

<style>
html {
    background-color: #E4E9FD;
    background-image: -webkit-linear-gradient(65deg, #A683E3 50%, #E4E9FD 50%);
    min-height: 1000px;
    font-family: 'helvetica neue';
}
</style>
