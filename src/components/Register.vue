<template>
  <div class="container">
    <v-card class="mx-auto" max-width="344" shaped>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-10">Register</v-list-item-title>
          <v-text-field label="Email" outlined v-model="email"></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPwd ? 'text' : 'password'"
            name="input-password"
            label="Password"
            hint="At least 6 characters"
            counter
            outlined
            @click:append="showPwd = !showPwd"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar :color="snackbarColor" :multi-line="true" v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "./firebaseInit";

export default {
  name: "register",
  data: function() {
    return {
      email: "",
      password: "",
      showPwd: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters"
      },
      snackbar: false,
      snackbarText: "",
      snackbarColor: "success"
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          cred => {
            const today = new Date();
            return db
              .collection("users")
              .doc(cred.user.uid)
              .collection("items")
              .add({
                name: "Welcome, this is your first item",
                amount: 1,
                type: "food",
                safeAfterExpired: false,
                dateCreated: today,
                dateExpiry: new Date(
                  today.getUTCFullYear(),
                  today.getMonth(),
                  today.getDate() + 3
                )
              })
              .then(() => {
                this.snackbarColor = "success";
                this.snackbar = true;
                this.snackbarText = `Account created for ${cred.user.email}.`;
                setTimeout(() => {
                  this.$router.go({ path: this.$router.push("/") });
                }, 2000);
              });
          },
          err => {
            this.snackbarColor = "error";
            this.snackbar = true;
            this.snackbarText = err.message;
          }
        );
      e.preventDefault();
    }
  }
};
</script>