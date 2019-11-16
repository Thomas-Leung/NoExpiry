<template>
  <!-- With the key, any change to the path will trigger a reload of the component with the new data. :key="$route.fullPath" -->
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <router-link to="/">No Expiry</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn lower class="text-none" text v-if="isLoggedIn">{{currentUser}}</v-btn>
        <v-btn text class="text-none" v-if="isLoggedIn">
          <router-link to="/">Dashboard</router-link>
        </v-btn>
        <v-btn text class="text-none" v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </v-btn>
        <v-btn text class="text-none" v-if="!isLoggedIn">
          <router-link to="/register">Register</router-link>
        </v-btn>
        <v-btn text class="text-none" v-if="isLoggedIn" v-on:click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-link to="/new" v-if="isLoggedIn">
        <v-btn
          color="blue-grey lighten-4"
          absolute
          fab
          right
          style="bottom: 0; position: absolute; margin: 0 0 16px 16px;"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  components: {},
  data: function() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
          // this.$router.push("/login");
        });
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
}

/* Remove router link underline */
a {
  text-decoration: none;
  color: black !important;
}
</style>
