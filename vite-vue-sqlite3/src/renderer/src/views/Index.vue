<template lang="">
  <div>
    <h1>{{ title }}</h1>
    <div v-if="$store.state.auth">
      <h3>Logged in as : {{ $store.state.auth.email }}</h3>
      <button @click="logout">Logout</button>
      <ul v-for="user in users" :key="user.id">
        <li>{{ user.email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Home Page',
      users: []
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
        this.users = res.users
      } catch (err) {
        console.log(err)
      }
    },
    logout() {
      this.$store.commit('setAuth', null)
      this.$router.push('/login')
    }
  }
}
</script>
