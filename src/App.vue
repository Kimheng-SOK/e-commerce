


<template>
  <Navbar />
  <router-view />
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    return {};
  }
}
</script>

<style scoped>

</style>
