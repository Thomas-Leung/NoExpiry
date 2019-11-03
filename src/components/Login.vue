<template>
  <div class="container">
    <h3>Login</h3>
    <form>
      <input type="text" id="email" v-model="email"/>
      <label for="email">Email</label>
      <input type="password" id="password" v-model="password">
      <label for="password">Password</label>
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "login",
   data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.user.email}`);
            //reload the whole page
            this.$router.go({path: this.$router.path});
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