<template>
  <div class="loginpage pt-4">
    <h1>Bienvenido a Jugueterias Otto Kraus</h1>
    <login-comp></login-comp>
  </div>
</template>

<script>
import LoginComp from '../components/LoginComp'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    LoginComp
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style scoped>
  .loginpage {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>