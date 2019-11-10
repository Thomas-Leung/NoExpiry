<template>
  <div id="dashboard">
    <h3>Items</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{item.item_id}}:{{item.name}}
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
      receive: false
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
          const data = {
            id: doc.id,
            item_id: doc.data().item_id,
            name: doc.data().name
          };
          this.items.push(data);
        });
      });
  }
};
</script>

<style>
</style>