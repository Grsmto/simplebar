<template>
  <simplebar class="test" data-simplebar-auto-hide="false" @scroll="onScroll">
    <div v-for="n in 10" :key="n">Example content</div>
  </simplebar>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

export default {
  name: 'app',
  components: {
    simplebar
  },
  methods: {
    onScroll(e) {
      // eslint-disable-next-line
      console.log('onscroll', e)
    }
  }
}
</script>

<style>
.test {
  height: 100px;
}
</style>
