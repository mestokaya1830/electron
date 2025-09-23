<template lang="">
  <div>
    <Navbar />
    <RouterView></RouterView>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
