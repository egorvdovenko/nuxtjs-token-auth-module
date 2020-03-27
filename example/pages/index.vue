<template>
  <div>
    Index!
    <form @submit.prevent="onInvalidRequestSubmit">
      <button>Send request with invalid token</button>
    </form>
    <form @submit.prevent="onLogoutSubmit">
      <button>Logout</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    onLogoutSubmit () {
      this.$tokenAuth
        .logout()
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('index.vue => onLogoutSubmit() => response: ', response)

          this.$router.push({
            name: 'login'
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('index.vue => onLogoutSubmit() => error: ', error)
        })
    },
    onInvalidRequestSubmit () {
      this.$axios
        .post('/api/invalid')
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log('index.vue => onInvalidRequestSubmit() => response: ', response)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('index.vue => onInvalidRequestSubmit() => error: ', error)
        })
    }
  }
}
</script>
