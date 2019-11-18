<template>
  <div id="dashboard">
    <Searchbar />
    <p class="dashboard-title">Your Food</p>
    <div class="swipe-content">
      <swipe-list class="card" :disabled="!enabled" :items="items" item-key="item.id">
        <template v-slot="{ item, index, revealLeft, revealRight, close }">
          <!-- item is the corresponding object from the array -->
          <!-- index is clearly the index @swipeout:click="itemClick"-->
          <!-- revealLeft is method which toggles the left side -->
          <!-- revealRight is method which toggles the right side -->
          <!-- close is method which closes an opened side -->
          <div class="card-content">
            <table style="width:100%; border-spacing: 0px;">
              <tr>
                <td class="card-title">{{ item.name }}</td>
                <td class="body-2 font-weight-light" rowspan="2" style="padding: 8px;">
                  Amount
                  <br />
                  {{ item.amount }}
                </td>
                <td
                  style="background-color:#CFD8DC; border-radius:0px 20px 0px 0px; padding:0px 2.5px;"
                >
                  <v-icon dark>mdi-chevron-up</v-icon>
                </td>
              </tr>
              <tr>
                <td
                  class="subtitle-2 font-weight-light"
                  style="text-align:start; padding: 5px 0px 12px 16px;"
                >Expiry: {{ item.dateExpiry }}</td>
                <td
                  style="background-color:#CFD8DC; border-radius:0px 0px 20px 0px; padding:0px 2.5px;"
                >
                  <v-icon dark>mdi-chevron-down</v-icon>
                </td>
              </tr>
            </table>
            <p></p>
          </div>
        </template>
        <template v-slot:left="{ item, close }">
          <div class="swipeout-action grey">
            <v-icon dark>mdi-eye-off</v-icon>
          </div>
          <div class="swipeout-action dark-blue" @click="close">
            <v-icon dark>mdi-pencil</v-icon>
          </div>
        </template>
        <template v-slot:right="{ item }">
          <div class="swipeout-action dark-red" @click="remove(item)">
            <v-icon dark>mdi-delete</v-icon>
          </div>
        </template>
      </swipe-list>
      <div v-if="this.mockSwipeList.length === 0">
        <p class="body-1">
          <v-icon>mdi-noodles</v-icon>No Item
        </p>
      </div>
    </div>

    <ul>
      <li v-for="item in items" :key="item.id">
        Name: {{item.name}}
        <br />
        Amount: {{item.amount}}
        <br />
        Type: {{item.type}}
        <br />
        Safe After expired? {{item.safeAfterExpired}}
        <br />
        Date Created: {{item.dateCreated}}
        <br />
        Date Expiry: {{item.dateExpiry}}
        <router-link :to="{name: 'view-item', params: {item_id: item.id}}">check</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../components/firebaseInit";
import Searchbar from "@/components/Searchbar.vue";
import { SwipeList } from "vue-swipe-actions";

export default {
  name: "dashboard",
  components: {
    Searchbar,
    SwipeList
  },
  data() {
    return {
      items: [],
      receive: false,
      currentUser: false,
      enabled: true,
      mockSwipeList: [
        {
          id: 0,
          name: "Orange",
          amount: 1,
          dateExpiry: "2019-11-13"
        },
        {
          id: 1,
          name: "Apple",
          amount: 1,
          dateExpiry: "2019-11-13"
        }
      ]
    };
  },
  created() {
    // db.collection("items")
    //   .orderBy("name")
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const data = {
    //         id: doc.id,
    //         item_id: doc.data().item_id,
    //         name: doc.data().name
    //       };
    //       this.items.push(data);
    //     });
    //   });
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const dateCreated = this.convertToDate(doc.data().dateCreated);
          const dateExpiry = this.convertToDate(doc.data().dateExpiry);
          const data = {
            id: doc.id,
            name: doc.data().name,
            amount: doc.data().amount,
            type: doc.data().type,
            safeAfterExpired: doc.data().safeAfterExpired,
            dateCreated: dateCreated,
            dateExpiry: dateExpiry
          };
          this.items.push(data);
        });
      });
  },
  methods: {
    convertToDate(timeStamp) {
      const { seconds } = timeStamp;
      const date = new Date(seconds * 1000);
      // Janurary gives 0
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    remove(item) {
      this.mockSwipeList = this.mockSwipeList.filter(i => i !== item);
      // console.log(e, 'remove');
    },
    itemClick(e) {
      console.log(e, "item click");
    }
  }
};
</script>

<style>
@import "../../node_modules/vue-swipe-actions/dist/vue-swipe-actions.css";

.swipe-content {
  /* top (right,left) botton */
  padding: 0px 20px 20px;
}
.card {
  width: 100%;
  border-radius: 0px;
  box-shadow: none;
  /* border: 1px solid lightgray; */
}

.card-content {
  padding: 0rem;
  background: #99cd49;
  border-radius: 20px;
  color: white;
}

.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}

.swipeout-action.grey {
  background-color: rgb(199, 198, 204);
  margin-bottom: 16px;
  border-radius: 10px;
  padding: 30px;
}

.swipeout-action.dark-blue {
  background-color: rgb(74, 111, 163);
  margin-bottom: 16px;
  border-radius: 10px;
  padding: 30px;
}

.swipeout-action.dark-red {
  background-color: #d32f2f;
  margin-bottom: 16px;
  border-radius: 10px;
  padding: 30px;
}

.swipeout-list-item {
  flex: 1;
  /* border-bottom: 1px solid lightgray; */
}

.swipeout-list-item:last-of-type {
  border-bottom: none;
}

/* Dashboard styling */
.dashboard-title {
  font-weight: bold;
  padding-left: 24px;
  font-size: 1.6rem;
  text-align: justify;
}

.card-title {
  text-align: start;
  padding: 12px 0px 5px 16px;
  font-family: Avenir !important;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 120%;
}
</style>