<template>
  <div id="dashboard">
    <h3>Items</h3>
    <ul>
      <li v-for="item in items" :key="item.id">{{item.item_id}}:{{item.name}}
      <router-link :to="{name: 'view-item', params: {item_id: item.item_id}}">
      check
      </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import db from "./firebaseInit";

export default {
  name: "dashboard",
  data() {
    return {
      items: []
    };
  },
  created() {
    db.collection("items").orderBy('item_name')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            item_id: doc.data().item_id,
            name: doc.data().item_name
          };
          this.items.push(data);
        });
      });
  }
};
</script>

<style>
</style>