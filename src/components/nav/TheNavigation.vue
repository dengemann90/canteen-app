<template>
  <nav class="navbar">
    <!-- locations -->
    <router-link to="/locations">
      <i class="fas solid fa-compass fa-2x"></i>
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
    <!-- TopPage -->
    <!-- <i class="fade" id="pagetop" @click="toTop">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4a5568"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </i> -->
  </nav>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
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
  background-image: url("../../assets/background.png");
  width: 76%;
  margin-left: 10%;
  margin-right: 10%;
  box-shadow: 30px 30px 30px rgba(0, 0, 0, 0.4);
  border-start-start-radius: 15px;
  border-start-end-radius: 15px;
}

nav a {
  text-decoration: none;
  font-size: 12px;
  padding-left: 20px;
  padding-right: 20px;
  color: rgba(0, 0, 0, 0.7);
  cursor: none;
}

nav .fade {
  position: absolute;
  right: 1%;
}

a:hover,
a:active,
a.router-link-active {
  color: rgba(255, 255, 255, 0.9);
}
</style>