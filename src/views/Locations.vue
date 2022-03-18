<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <div class="capital">
          Location<img class="logo-img" src="../assets/LogoTransparent.png" />
        </div>
        <div class="content">
          <canteen-selector
            @transmit-canteen-list="updateCanteenList"
          ></canteen-selector>
        </div>
        <div class="container_all">
          <canteen-list :canteenList="this.canteenList"></canteen-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CanteenSelector from "../components/canteens/CanteenSelector.vue";
import CanteenList from "../components/canteens/CanteenList.vue";
export default {
  components: {
    CanteenSelector,
    CanteenList,
  },
  data() {
    return {
      canteenList: [],
    };
  },
  methods: {
    updateCanteenList(canteenList) {
      this.canteenList = canteenList;
    },
  },
};
</script>

<style scoped>
/*  */
</style>