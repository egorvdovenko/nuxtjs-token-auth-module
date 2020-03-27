<template>
  <div>
    Login!
    <form @submit.prevent="onLoginSubmit">
      <input
        v-model="login"
        type="text"
        name="login"
        required
      >
      <input
        v-model="password"
        type="password"
        name="password"
        value="password"
        required
      >
      <button>
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  tokenAuth: false,
  data () {
    return {
      login: 'login',
      password: 'password'
    }
  },
  methods: {
    onLoginSubmit () {
      this.$tokenAuth
        .login({
          data: {
            login: this.login,
            password: this.password
          }
        })
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('login.vue => onLoginSubmit() => response: ', response)

          this.$router.push({
            name: 'index'
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('login.vue => onLoginSubmit() => error: ', error)
        })
    }
  }
}
</script>
