<template lang="">
  <div>
    <h1>{{ title }}</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="registerResult">{{ registerResult }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Register Page',
      email: '',
      password: '',
      registerResult: ''
    }
  },
  mounted() {},
  methods: {
    async register() {
      try {
        const data = {
          email: this.email,
          password: this.password
        }
        const res = await window.api.register(data)
        if (res.success) {
          this.registerResult = 'Registered!'
        } else {
          this.registerResult = 'Registration failed!'
        }
      } catch (err) {
        this.registerResult = err.message
      }
    }
  }
}
</script>
