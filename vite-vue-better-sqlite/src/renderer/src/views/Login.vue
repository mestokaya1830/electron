<template>
  <div>
    <h1>{{ title }}</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password"  placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="loginResult">{{ loginResult }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Login Page',
      email: '',
      password: '',
      loginResult: ''
    }
  },
  methods: {
    async login() {
      try {
        const data = { email: this.email, password: this.password }
        const res = await window.api.login(data)
        console.log(res)
        if (res.success) {
          this.loginResult = 'Logged in!'
          this.$store.commit('setAuth', res.user)
          this.$router.push('/')
        } else {
          this.loginResult = 'Login failed!'
        }
      } catch (err) {
        this.loginResult = err.message
      }
    }
  }
}
</script>
