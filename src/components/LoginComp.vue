<template>
  <div>
    <v-card width="400px" class="mx-auto mt-5">
    <v-card-title primary-title>
      <h1 class="mx-auto">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" label="Username" prepend-icon="mdi-account-circle" />
        <v-text-field 
        v-model="password"
        @click:append="showPassword = !showPassword" 
        label="Password" 
        :type="showPassword ? 'text' : 'password'" 
        prepend-icon="mdi-lock" 
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off' " />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="login" color="info">Login</v-btn>
    </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then( () => {
        this.setUser({
          email: this.email,
        })
        console.log (this.email)
        console.log(this.password)
        this.$router.push('/toys')
      })
      .catch(() => {
        alert("Usuario no válido")
      })
    }
  }
}
</script>
