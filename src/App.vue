<template>
  <!-- With the key, any change to the path will trigger a reload of the component with the new data. :key="$route.fullPath" -->
  <v-app>
    <v-app-bar v-if="!isLoggedIn" app>
      <v-toolbar-title class="headline">
        <router-link to="/">No Expiry</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- <v-btn text class="text-none" v-if="isLoggedIn">
          <router-link to="/">Dashboard</router-link>
        </v-btn>-->
        <v-btn text class="text-none" v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </v-btn>
        <v-btn text class="text-none" v-if="!isLoggedIn">
          <router-link to="/register">Register</router-link>
        </v-btn>
        <!-- <v-btn text class="text-none" v-if="isLoggedIn" v-on:click="logout">Logout</v-btn> -->
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <transition name="fade" mode="out-in">
        <router-view @showSnackbar="showSnackbar"/>
      </transition>
    </v-content>
    <Snackbar :bus="bus"/>
  </v-app>
</template>

<script>
import Vue from 'vue';
import firebase from "firebase";
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: "App",
  components: {
    Snackbar
  },
  data: function() {
    return {
      isLoggedIn: false,
      currentUser: false,
      bus: new Vue()
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
    },
    showSnackbar(message, color) {
      this.bus.$emit('showSnackbar', message, color);
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  beforeMount() {
    if (localStorage.darkMode) {
      this.$vuetify.theme.dark = localStorage.darkMode === "true";
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
}

/* Remove router link underline */
a {
  text-decoration: none;
  color: black !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
