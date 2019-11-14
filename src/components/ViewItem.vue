<template>
  <div id="view-item">
    <ul>
      <li>
        <h4>{{item_id}}</h4>
      </li>
      <li>
        <h4>{{name}}</h4>
      </li>
    </ul>
    <router-link to="/">Back</router-link>
    <button @click="deleteItem">Delete</button>
    <div v-if="item_id !== null">
      <router-link :to="{name: 'edit-item', params: {item_id: item_id}}">
        <v-btn color="red darken-2" absolute dark fab bottom right style="margin-bottom:50px">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "./firebaseInit";

export default {
  name: "view-item",
  data() {
    return {
      item_id: null,
      name: null
    };
  },
  // navigation guard
  beforeRouteEnter(to, from, next) { // eslint-disable-line no-unused-vars
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .doc(to.params.item_id)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.exists) {
          next("/notFound");
        }
        let data = querySnapshot.data();
        next(vm => {
          vm.name = data.name;
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("items")
        .where("item_id", "==", this.$route.params.item_id)
        .get()
        .then(queryShapshot => {
          queryShapshot.forEach(doc => {
            this.item_id = doc.data().item_id;
            this.name = doc.data().name;
          });
        });
    },
    deleteItem() {
      if (confirm("Are you sure?")) {
        db.collection("items")
          .where("item_id", "==", this.$route.params.item_id)
          .get()
          .then(queryShapshot => {
            queryShapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

<style>
</style>