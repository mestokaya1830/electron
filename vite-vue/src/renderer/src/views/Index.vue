<template lang="">
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Home Page'
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        const res = await window.api.getUsers()
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
