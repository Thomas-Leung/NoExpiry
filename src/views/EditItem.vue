<template>
  <div id="edit-employee">
    <h3>Edit Item</h3>
    <div>
      <form @submit.prevent="updateItem">
        <div class="row">
          <input dsiabled type="text" v-model="item_id" required />
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
  name: "edit-employee",
  data() {
    return {
      item_id: null,
      name: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("items")
      .where("item_id", "==", to.params.item_id)
      .get()
      .then(queryShapshot => {
        queryShapshot.forEach(doc => {
          next(vm => {
            vm.item_id = doc.data().item_id;
            vm.name = doc.data().name;
          });
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
    updateItem() {
      db.collection("items")
        .where("item_id", "==", this.$route.params.item_id)
        .get()
        .then(queryShapshot => {
          queryShapshot.forEach(doc => {
            doc.ref
              .update({ item_id: this.item_id, name: this.name })
              .then(() => {
                this.$router.push({
                  name: "view-item",
                  params: { item_id: this.item_id }
                });
              });
          });
        });
    }
  }
};
</script>

<style>
</style>