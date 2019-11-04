<template>
  <div class="container">
    <v-card class="mx-auto" max-width="344" shaped>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-10">Login</v-list-item-title>
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
        <v-btn text @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: "",
      showPwd: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters"
      }
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
            this.$router.go({ path: this.$router.replace("/") });
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