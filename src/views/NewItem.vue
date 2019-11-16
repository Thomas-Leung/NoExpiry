<template>
  <div id="new-item">
    <h3>New Item</h3>
    <div>
      <form @submit.prevent="saveItem">
        <div class="row">
          <input type="text" v-model="item_id" required />
          <label>Item id</label>
        </div>
        <div class="row">
          <input type="text" v-model="name" required />
          <label>Name</label>
        </div>
        <button type="submit">Submit</button>
        <router-view to="/">Cancel</router-view>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../components/firebaseInit";

export default {
  name: "new-item",
  data() {
    return {
      item_id: null,
      name: null
    };
  },
  methods: {
    saveItem() {
      db.collection("items")
        .add({
          item_id: this.item_id,
          name: this.name
        })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>