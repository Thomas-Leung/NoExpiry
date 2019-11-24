<template>
  <div class="searchbar-content">
    <!-- v-sheet is used to add margin for search bar without any scroll in dashboard -->
    <v-sheet
      :style="[{'height': '16px'},this.$vuetify.theme.dark? {'background-color':'#303030'}:{}]"
    ></v-sheet>
    <v-toolbar :elevation="0" min-width="90vw" class="searchBar" color="searchbar">
      <v-text-field hide-details prepend-icon="mdi-magnify" style="width:75vw;" single-line></v-text-field>
      <v-menu bottom left :close-on-content-click="true" :nudge-width="300" offset-y offset-x>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>mdi-account-card-details</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="userEmail">{{currentUser}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="toggleDarkMode">
                  <v-icon>mdi-brightness-6</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>

          <v-list>
            <v-list-item-group>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon style="padding-left:4px;">mdi-basket</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Groceries list</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text class="red--text caption" @click="logout">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    toggleDarkMode: function() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = localStorage.darkMode = false;
      } else {
        this.$vuetify.theme.dark = localStorage.darkMode = true;
      }
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
          // this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
.searchBar.v-toolbar {
  border-radius: 10px;
}

.searchBar {
  margin: 0px 16px 16px 16px;
}
</style>