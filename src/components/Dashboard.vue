<template>
  <div id="dashboard">
    <v-toolbar dense floating class="searchBar">
      <v-text-field hide-details prepend-icon="mdi-magnify" single-line></v-text-field>

      <v-menu bottom left :close-on-content-click="true" :nudge-width="300" offset-y>
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
                <v-btn
                  :class="darkMode? 'white--text' : 'grey--text'"
                  icon
                  @click="darkMode = !darkMode"
                >
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
            <v-btn text class="red--text caption">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>

    <h3>Items</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        Name: {{item.name}}
        <br />
        Amount: {{item.amount}}
        <br />
        Type: {{item.type}}
        <br />
        Safe After expired? {{item.safeAfterExpired}}
        <br />
        Date Created: {{item.dateCreated}}
        <br />
        Date Expiry: {{item.dateExpiry}}
        <router-link :to="{name: 'view-item', params: {item_id: item.item_id}}">check</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "./firebaseInit";

export default {
  name: "dashboard",
  data() {
    return {
      items: [],
      receive: false,
      currentUser: false,
      darkMode: false
    };
  },
  created() {
    // db.collection("items")
    //   .orderBy("name")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id,
    //         item_id: doc.data().item_id,
    //         name: doc.data().name
    //       };
    //       this.items.push(data);
    //     });
    //   });
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const dateCreated = this.convertToDate(doc.data().dateCreated);
          const dateExpiry = this.convertToDate(doc.data().dateExpiry);
          const data = {
            id: doc.id,
            name: doc.data().name,
            amount: doc.data().amount,
            type: doc.data().type,
            safeAfterExpired: doc.data().safeAfterExpired,
            dateCreated: dateCreated,
            dateExpiry: dateExpiry
          };
          this.items.push(data);
        });
      });

    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    convertToDate(timeStamp) {
      const { seconds } = timeStamp;
      const date = new Date(seconds * 1000);
      // Janurary gives 0
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
};
</script>

<style scoped>
.searchBar.v-toolbar {
  border-radius: 10px;
}

.v-list-item__title {
  text-align: start;
}
</style>