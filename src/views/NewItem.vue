<template>
  <div id="new-item">
    <v-card class="mx-auto" color="#7c62a9" elevation="4">
      <v-icon x-large dark style="padding: 20px; font-size:7rem;">mdi-food</v-icon>
    </v-card>
    <router-link to="/">
      <v-row style="padding: 10px 0px 0px 0px;">
        <v-btn text :ripple="false">
        <v-icon left>mdi-chevron-left</v-icon>back
        </v-btn>
      </v-row>
    </router-link>
    <p class="new-item-title">New Item</p>
    <v-form class="add-item-form">
      <v-text-field label="Name" outlined v-model="itemName" color="textField" required></v-text-field>
      <v-text-field
        type="number"
        label="Amount"
        outlined
        v-model="itemAmount"
        color="textField"
        required
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="dateModal"
        :return-value.sync="itemDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="itemDate"
            label="Expiry date"
            prepend-icon="mdi-calendar-alert"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="itemDate" scrollable color="textField">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dateModal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <p class="mb-1">Safe to consume after expiry date?</p>
      <v-switch
        class="switch mt-0"
        color="textField"
        v-model="itemSafeAfterExpiry"
        :label="`${itemSafeAfterExpiry.toString()}`"
      ></v-switch>
      <v-btn dark depressed rounded x-large color="textField" style="padding: 0px 100px;">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import db from "../components/firebaseInit";

export default {
  name: "new-item",
  data() {
    return {
      itemName: null,
      itemAmount: null,
      itemDate: new Date().toISOString().substr(0, 10),
      dateModal: false,
      itemSafeAfterExpiry: false
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
#new-item {
  margin: 16px;
}
.new-item-title {
  font-weight: bold;
  padding-top: 6px;
  font-size: 1.6rem;
  text-align: justify;
}

.switch {
  display: flex;
  justify-content: center;
}
</style>