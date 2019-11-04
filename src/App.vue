<template>
  <!-- With the key, any change to the path will trigger a reload of the component with the new data. :key="$route.fullPath" -->
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/">
          <span class="font-weight-regular">No Expiry</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">{{currentUser}}</div>
      <div v-if="isLoggedIn">
        <router-link to="/">Dashboard</router-link>
      </div>
      <div v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="!isLoggedIn">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="isLoggedIn">
        <button v-on:click="logout">Logout</button>
      </div>
      <v-btn text href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-link to="/new">
        <v-btn color="blue darken-2" absolute dark fab bottom right style="margin-bottom:50px">
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
