<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Profile</p>
        <div class="container_all">
          <div class="main-setting setting">
            <div id="setting-nut"><b>Nutrition</b></div>
            <ul>
              <li>Vegetarian</li>
              <li>Vegan</li>
              <li>Lacto-Vegetarian</li>
            </ul>
            <div id="setting-allerg"><b>Allergens & Additives</b></div>
          </div>
          <!-- Hier die MAP -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.setting {
  min-height: 20px;
  min-width: 100%;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem; 
}

#setting-nut {
float: both;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
border-radius: 12px;
padding: 1rem; 
margin-left: 0px;
margin-top: 0px;
}

#setting-allerg {
float: both;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
border-radius: 12px;
padding: 1rem; 
margin-left: 0px;
margin-top: 5px;
}

ul {
  margin:0;
  padding:0;
}

li {
  list-style-type: none;
  position: relative;
  left: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 1px;
  padding: 0.5rem;  
  margin-top: 0.5rem;
}

</style>