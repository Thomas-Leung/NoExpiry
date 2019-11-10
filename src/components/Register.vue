<template>
  <div class="container">
    <h3>Register</h3>
    <form>
      <input type="text" id="email" v-model="email" />
      <label for="email">Email</label>
      <input type="password" id="password" v-model="password" />
      <label for="password">Password</label>
      <button @click="register">Register</button>
    </form>
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
      password: ""
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          cred => {
            return db
              .collection("users")
              .doc(cred.user.uid)
              .collection("items")
              .add({
                item_id: "123",
                name: "hello world"
              })
              .then(() => {
                alert(`Account created for ${cred.user.email}.`);
                this.$router.go({ path: this.$router.push("/") });
              });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>