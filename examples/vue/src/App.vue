<template>
  <div id="app">
    <Simplebar class="test" force-visible>
      <div v-for="n in 10" :key="n">Example content</div>
    </Simplebar>
  </div>
</template>

<script>
import Simplebar from 'simplebar-vue';
// import 'simplebar-vue/dist/simplebar.min.css';

export default {
  name: 'App',
  components: {
    Simplebar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
