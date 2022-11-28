<template>
  <simplebar class="test" data-simplebar-auto-hide="false">
    <div v-for="n in 10" :key="n">Example content</div>
  </simplebar>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  name: 'app',
  components: {
    simplebar
  }
}
</script>

<style>
.test {
  height: 100px;
}
</style>
