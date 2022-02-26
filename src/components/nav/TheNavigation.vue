<template>
  <nav class="navbar">
    <!-- location -->
    <router-link to="/location">
      <i class="fas regular fa-map fa-2x"></i>
    </router-link>
    <!-- plan -->
    <router-link to="/plan">
      <i class="fas regular fa-calendar-day fa-2x"></i>
    </router-link>
    <!-- favorites -->
    <router-link to="/favorites">
    <i class="fas regular fa-heart fa-2x"></i>
    </router-link>
    <!-- profile -->
    <router-link to="/profile">
      <i class="fas solid fa-user fa-2x"></i>
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
  /* background-color: #8aa969; */
  background-image: url('../../assets/background.png');
  width:76%;
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
  color: rgba(0, 0, 0, 0.7);
}

a:hover,
a:active,
a.router-link-active {
  color: rgba(255, 255, 255, 0.90);
}
</style>