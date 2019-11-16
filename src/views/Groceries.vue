<template>
  <div class>
    <h1>Groceries page</h1>
    <div class="swipe-content">
      <swipe-list
        class="card"
        :disabled="!enabled"
        :items="mockSwipeList"
        item-key="id"
        @swipeout:click="itemClick"
      >
        <template v-slot="{ item, index, revealLeft, revealRight, close }">
          <!-- item is the corresponding object from the array -->
          <!-- index is clearly the index -->
          <!-- revealLeft is method which toggles the left side -->
          <!-- revealRight is method which toggles the right side -->
          <!-- close is method which closes an opened side -->
          <div class="card-content">
            <!-- style content how ever you like -->
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <span>{{ index }}</span>
          </div>
        </template>
        <template v-slot:left="{ item, close }">
          <div class="swipeout-action blue">
            <v-icon>mdi-card-search-outline</v-icon>
          </div>
          <div class="swipeout-action purple" @click="close">
            <v-icon>mdi-pencil</v-icon>
          </div>
        </template>
        <template v-slot:right="{ item }">
          <div class="swipeout-action red" @click="remove(item)">
            <v-icon>mdi-delete-outline</v-icon>
          </div>
        </template>
      </swipe-list>
      <div v-if="this.mockSwipeList.length === 0">No Item</div>
    </div>
  </div>
</template>

<script>
import { SwipeList } from "vue-swipe-actions";

export default {
  components: {
    SwipeList
  },
  data() {
    return {
      enabled: true,
      mockSwipeList: [
        {
          id: 0,
          title: "Some title",
          description: "some description"
        },
        {
          id: 1,
          title: "Some title",
          description: "some description"
        },
        {
          id: 2,
          title: "Some title",
          description: "some description"
        }
      ]
    };
  },
  methods: {
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
@import '../../node_modules/vue-swipe-actions/dist/vue-swipe-actions.css';

.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}

.swipeout-action.blue {
  color: white;
  background-color: rgb(0, 122, 255);
}
.swipeout-action.blue:hover {
  background-color: darken(rgb(0, 122, 255), 5%);
}
.swipeout-action.purple {
  color: white;
  background-color: rgb(88, 86, 214);
}
.swipeout-action.purple:hover {
  background-color: darken(rgb(88, 86, 214), 5%);
}
.swipeout-action.red {
  color: white;
  background-color: rgb(255, 59, 48);
}
.swipeout-action.red:hover {
  background-color: darken(rgb(255, 59, 48), 5%);
}
.swipeout-action.green {
  color: white;
  background-color: rgb(76, 217, 100);
}
.swipeout-action.green:hover {
  background-color: darken(rgb(76, 217, 100), 5%);
}
.swipeout-list-item {
  flex: 1;
  border-bottom: 1px solid lightgray;
}
.swipeout-list-item:last-of-type {
  border-bottom: none;
}
.card {
  width: 100%;
  background-color: white;
  border-radius: 3px;
  box-shadow: none;
  border: 1px solid lightgray;
}
.card-content {
  padding: 1rem;
}
.transition-right {
  transform: translate3d(100%, 0, 0) !important;
}
.transition-left {
  transform: translate3d(-100%, 0, 0) !important;
}
.toolbar {
  display: flex;
  align-items: center;
}
.toolbar .toolbar-section {
  flex: 0 0 auto;
}
.toolbar .toolbar-section--center {
  flex: 1000 1 0%;
}
</style>