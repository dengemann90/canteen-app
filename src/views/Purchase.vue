<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Purchase</p>
        <div class="container_all">
          <!-- Hier content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

/* Global */
.main {
    /*background-image: url(/Project%202/images/main_background_II.jpg);*/
    /*background-color: #ebeded;*/
    /*background-color: #e1a100;*/
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    /*background-image: url('./images/nutrition.jpg');*/
}

.capital {
    min-height: 20px;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-weight: bold;
    font-size: 25px;
    background-color: #F0FFF0;
}

p.capital {
    margin-top: 4%;
}

.appframe {
    background-color: rgba(255, 255, 255, 0.7);
    /*background: #5792295b;*/
    /*border: 1px solid #7B7B7B;*/
    box-sizing: border-box;
    box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.4);
    border-radius: 5%;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: top 25px;
    min-height: 100vh;
}

.container_all {
    min-height: 500px;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: red;
}

</style>