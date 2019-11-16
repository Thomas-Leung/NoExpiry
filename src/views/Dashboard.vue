<template>
  <div id="dashboard">
    <Searchbar />
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
        <router-link :to="{name: 'view-item', params: {item_id: item.id}}">check</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../components/firebaseInit";
import Searchbar from "@/components/Searchbar.vue";

export default {
  name: "dashboard",
  components: {
    Searchbar
  },
  data() {
    return {
      items: [],
      receive: false,
      currentUser: false
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
.v-list-item__title {
  text-align: start;
}
</style>