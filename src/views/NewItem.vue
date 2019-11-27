<template>
  <div id="new-item">
    <v-card class="mx-auto" color="newItem" elevation="4">
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
    <v-form class="add-item-form" @submit.prevent="saveItem">
      <v-text-field label="Name" outlined v-model="name" color="newItem" required></v-text-field>
      <v-text-field
        type="number"
        label="Amount"
        outlined
        v-model="amount"
        color="newItem"
        required
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="dateModal"
        :return-value.sync="dateExpiry"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateExpiry"
            label="Expiry date"
            prepend-icon="mdi-calendar-alert"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateExpiry" scrollable color="newItem">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dateModal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(dateExpiry)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
      <p class="mb-1">Safe to consume after expiry date?</p>
      <v-switch
        class="switch mt-0"
        color="newItem"
        v-model="safeAfterExpiry"
        :label="`${safeAfterExpiry.toString()}`"
      ></v-switch>
      <!-- :style="[{'padding': '0px 100px'}, this.$vuetify.theme.dark? {'color':'white'}:{'color':'white'}]" -->
      <v-btn
        dark
        depressed
        rounded
        x-large
        color="newItem"
        style="padding: 0px 100px"
        type="submit"
      >Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../components/firebaseInit";

export default {
  name: "new-item",
  data() {
    return {
      name: null,
      amount: 1,
      dateExpiry: new Date().toISOString().substr(0, 10),
      dateModal: false,
      safeAfterExpiry: false
    };
  },
  methods: {
    saveItem() {
      if (this.name === null || this.amount === null) {
        this.$emit("showSnackbar", "Name or amount cannot be empty", "error");
      } else {
        const today = new Date();
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("items")
          .add({
            name: this.name,
            amount: parseInt(this.amount),
            type: "food",
            safeAfterExpiry: this.safeAfterExpiry,
            dateCreated: today,
            dateExpiry: new Date(this.dateExpiry + ' ') // add a space removes bug in js
          })
          .then(() => {
            this.$router.push("/", () => {
              this.$emit("showSnackbar", "Item added", "success");
            });
          })
          .catch(err => console.log(err));
      }
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