<template>
  <nav class="navbar">
    <!-- location -->
    <router-link to="/location"
      ><!-- location -->
      <img src="../../../public/img/icons/map.svg" height="25" width="25">
    </router-link>
    <!-- plan -->
    <router-link to="/plan"
      ><img src="../../../public/img/icons/plan.svg" height="25" width="25">
    </router-link>
    <!-- favorites -->
    <router-link to="/favorites"
      ><img src="../../../public/img/icons/favorite.svg" height="25" width="25">
    </router-link>
    <!-- purchase -->
    <router-link to="/purchase"
      ><img src="../../../public/img/icons/purchase.svg" height="25" width="25">
    </router-link>
    <!-- profile -->
    <router-link to="/profile"
      ><img src="../../../public/img/icons/profile.svg" height="25" width="25">
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  color: rgb(171, 175, 175);
}

/*navbar*/

nav {
  text-align: center;
  padding-top: 14px;
  padding-bottom: 14px;
}

.navbar {
  position: fixed;
  bottom: 0;
  background-size: cover;
  /*background-repeat: no-repeat;*/
  /*background-color: #e1a100;*/
  /*background-color: #ebeded;*/
  background-color: #8aa969;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  box-shadow: 30px 30px 30px rgba(0, 0, 0, 0.4);
  border-start-start-radius: 15px;
  border-start-end-radius: 15px;
}

nav a {
  text-decoration: none;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  color: black;
}
</style>