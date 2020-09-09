<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
      src="https://images.unsplash.com/photo-1587654780291-39c9404d746b"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://marcasretro.files.wordpress.com/2010/08/ottokraus.jpg"
          transition="scale-transition"
          width="60"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="currentUser" text to="/toys">Juguetes</v-btn>
      <v-btn text to="/">Home</v-btn>
      <v-btn v-if="currentUser" @click.prevent="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-card>
      <v-footer
      absolute
        class="font-weight-medium">
        <v-col
          class="text-center"
          cols="12">
          {{ new Date().getFullYear() }} — <strong>Otto Kraus</strong>
        </v-col>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    ...mapActions(['setUser']),
    logout(){
      firebase.auth().signOut().then( () => {
        this.$router.push('/')
        this.setUser( undefined)
      })
    }
  }
}
</script>

<style scoped>

</style>