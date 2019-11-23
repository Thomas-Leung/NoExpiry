<template>
  <v-snackbar :color="color" :multi-line="false" v-model="snackbar">
    {{ text }}
    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  mounted() {
    this.bus.$on("showSnackbar", this.showSnackbar);
  },
  props: ["bus"],
  data: function() {
    return {
      snackbar: false,
      text: "",
      color: ""
    };
  },
  methods: {
    showSnackbar(message, color) {
      this.snackbar = true;
      this.text = message;
      this.color = color;
    }
  }
};
</script>