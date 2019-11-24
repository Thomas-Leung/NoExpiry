<template>
  <div id="dashboard">
    <Searchbar @search="query = $event" />
    <p class="dashboard-title">Your Food</p>
    <div id="swipe-content" v-scroll:#swipe-content="onScroll">
      <swipe-list class="card" :disabled="!enabled" :items="computedList" item-key="item.id">
        <template v-slot="{ item, index, revealLeft, revealRight, close }">
          <!-- item is the corresponding object from the array -->
          <!-- index is clearly the index @swipeout:click="itemClick"-->
          <!-- revealLeft is method which toggles the left side -->
          <!-- revealRight is method which toggles the right side -->
          <!-- close is method which closes an opened side -->
          <div class="card-content" :class="item.color">
            <table style="width:100%; border-spacing: 0px;">
              <tr>
                <td class="card-title" @click="itemClick(item.id)">{{ item.name }}</td>
                <td class="body-2 font-weight-light" rowspan="2" style="padding: 8px;">
                  Amount
                  <br />
                  {{ item.amount }}
                </td>
                <td
                  style="background-color:#CFD8DC; border-radius:0px 20px 0px 0px; padding:0px 2.5px;"
                  @click="changeAmount(item, 'increase')"
                >
                  <v-icon dark>mdi-chevron-up</v-icon>
                </td>
              </tr>
              <tr>
                <td
                  class="font-weight-light"
                  style="text-align:start; padding: 5px 0px 12px 16px;"
                >Expiry: {{ item.dateExpiry }}</td>
                <td
                  style="background-color:#CFD8DC; border-radius:0px 0px 20px 0px; padding:0px 2.5px;"
                  @click="changeAmount(item, 'decrease')"
                >
                  <v-icon dark>mdi-chevron-down</v-icon>
                </td>
              </tr>
            </table>
            <p></p>
          </div>
        </template>
        <template v-slot:left="{ item, close }">
          <div class="swipeout-action grey" @click="close">
            <v-icon dark>mdi-eye-off</v-icon>
          </div>
          <div class="swipeout-action dark-blue" @click="editItem">
            <v-icon dark>mdi-pencil</v-icon>
          </div>
        </template>
        <template v-slot:right="{ item }">
          <div class="swipeout-action dark-red" @click="removeItem(item)">
            <v-icon dark>mdi-delete</v-icon>
          </div>
        </template>
      </swipe-list>
      <div v-if="this.computedList.length === 0">
        <p class="body-1">
          <v-icon>mdi-noodles</v-icon>No Item
        </p>
      </div>
    </div>

    <router-link to="/new">
      <transition name="fade">
        <v-btn
          dark
          color="fab"
          elevation="4"
          fixed
          fab
          right
          style="bottom: 0; margin: 0 0 16px 16px;"
          v-if="fab"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </transition>
    </router-link>
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
      // itemList has color property after fetch but not in firestore
      itemList: [],
      receive: false,
      currentUser: false,
      enabled: true, // enable swipe items
      fab: true,
      query: ""
    };
  },
  beforeMount() {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("items")
      .orderBy("dateExpiry")
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
            safeAfterExpiry: doc.data().safeAfterExpiry,
            dateCreated: dateCreated,
            dateExpiry: dateExpiry
          };
          this.itemList.push(data);
        });
      })
      .then(() => {
        // need to wait for all gets
        this.addColorToList();
      });
  },
  methods: {
    convertToDate(timeStamp) {
      const { seconds } = timeStamp;
      const date = new Date(seconds * 1000);
      // Janurary gives 0
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    itemClick(itemId) {
      // console.log(itemId, "item click");
      // this.$router.push({name: 'view-item', params: {item_id: itemId}});
    },
    editItem() {
      console.log("Edit item is coming soon.");
    },
    changeAmount(item, change) {
      if (change === "decrease" && item.amount === 1) {
        return;
      } else {
        // this won't include color attribute as we are modifying firsbase data
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("items")
          .doc(item.id)
          .get()
          .then(queryShapshot => {
            if (!queryShapshot.exists) {
              this.$emit(
                "showSnackbar",
                "Something went wrong. Try again later.",
                "error"
              );
            } else {
              let data = queryShapshot.data();
              if (change === "increase") {
                data.amount += 1;
                queryShapshot.ref.update(data).then(() => {
                  item.amount += 1;
                });
              } else {
                data.amount -= 1;
                queryShapshot.ref.update(data).then(() => {
                  item.amount -= 1;
                });
              }
            }
          });
      }
    },
    removeItem(item) {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("items")
        .doc(item.id)
        .get()
        .then(queryShapshot => {
          if (!queryShapshot.exists) {
            this.$emit(
              "showSnackbar",
              "Cannot delete item. Try again later.",
              "error"
            );
          } else {
            queryShapshot.ref.delete();
            this.itemList = this.itemList.filter(i => i !== item);
            this.$emit("showSnackbar", "Item deleted", "info");
          }
        });
    },
    onScroll(e) {
      // if it can be scroll and scroll
      if (
        e.target.scrollHeight > e.target.clientHeight &&
        e.target.scrollTop > 100
      ) {
        this.fab = false;
      } else {
        this.fab = true;
      }
    },
    addColorToList() {
      var result = [];
      var tempExpiredList = [];
      const tdy = new Date();
      const time = "T00:00:00";
      // convert [__ob__: Observer] (vue special array) to normal array
      var list = JSON.parse(JSON.stringify(this.itemList));
      list.forEach(item => {
        // convert string to date
        const expiryDate = new Date(item["dateExpiry"] + time);
        // check if expired (negative means expired)
        const dayDiff = Math.ceil((expiryDate - tdy) / (1000 * 60 * 60 * 24));
        if (dayDiff > 3) {
          item["color"] = "card-green";
          result.push(item);
        } else if (dayDiff > 0) {
          item["color"] = "card-yellow";
          result.push(item);
        } else {
          if (item.safeAfterExpiry === true) {
            item["color"] = "card-indigo";
          } else {
            item["color"] = "card-red";
          }
          tempExpiredList.push(item);
        }
      });
      // sort safe and unsafe items after expired (safe goes on the top)
      tempExpiredList.sort((a, b) => {
        if (a.safeAfterExpiry > b.safeAfterExpiry) {
          // reverse the logic with sort
          return -1;
        } else {
          return 1;
        }
      });
      result = tempExpiredList.concat(result);
      this.itemList = result;
    }
  },
  computed: {
    computedList: function() {
      var vm = this;
      return this.itemList.filter(function(item) {
        // if match will be zero
        return (
          item["name"].toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        );
      });
    }
  }
};
</script>

<style>
@import "../../node_modules/vue-swipe-actions/dist/vue-swipe-actions.css";

#swipe-content {
  padding: 0px 20px;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  /* fill up bottom space of the dashboard */
  position: absolute;
  width: 100%;
  top: 135px;
  bottom: 0px;
}

.card {
  width: 100%;
  border-radius: 0px;
  box-shadow: none;
  /* border: 1px solid lightgray; */
}

.card-indigo {
  background: #6c6de5;
}
.card-red {
  background: #ff4c5f;
}
.card-yellow {
  background: #faab1e;
}
.card-green {
  background: #86c01e;
}

.card-content {
  padding: 0rem;
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
  width: 65%;
  text-align: start;
  padding: 12px 0px 5px 16px;
  font-family: Avenir !important;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 120%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>