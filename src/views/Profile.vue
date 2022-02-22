<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Mein Profil</p>
        <p>{{ profileTitle }}</p>
        <p>{{ profileDescription }}</p>
        <div class="container_all">
          <ul v-if="activeLink === '/profile'">
            <router-link to="/profile/general_settings">
              <li>Allgemein</li>
            </router-link>
            <router-link to="/profile/nutrition">
              <li>Ernährungsform</li>
            </router-link>
            <router-link to="/profile/allergens_additives">
              <li>Allergene & Zusatzstoffe</li>
            </router-link>
          </ul>
          <general-settings
            v-if="activeLink === '/profile/general_settings'"
          ></general-settings>
          <nutriton-list
            v-if="activeLink === '/profile/nutrition'"
          ></nutriton-list>
          <allergens-additives-list
            v-if="activeLink === '/profile/allergens_additives'"
          ></allergens-additives-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralSettings from "../components/profile/GeneralSettings.vue";
import NutritonList from "../components/profile/NutritionList.vue";
import AllergensAdditivesList from "../components/profile/AllergensAdditivesList.vue";
export default {
  components: {
    GeneralSettings,
    NutritonList,
    AllergensAdditivesList,
  },
  data() {
    return {};
  },
  computed: {
    activeLink() {
      return this.$route.fullPath;
    },
    profileTitle() {
      switch (this.activeLink) {
        case "/profile":
          return "App-Einstellungen";
        case "/profile/general_settings":
          return "allgemeine Einstellungen";
        case "/profile/nutrition":
          return "Ernährungsform";
        case "/profile/allergens_additives":
          return "Allergene & Zusatzstoffe";
        default:
          null;
      }
      return null;
    },
    profileDescription() {
      if (this.activeLink == "/profile/nutrition") {
        return "Wie ernährst du dich?";
      }
      if (this.activeLink == "/profile/allergens_additives") {
        return "Welche Zutaten/Inhaltsstoffe sollen vermieden werden?";
      }
      return null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0rem auto;
  max-width: 40rem;
  padding: 0;
}

li {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 25px;
  padding: 1rem;
}
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

li:hover {
  background-color: rgba(138, 169, 105, 0.2);
}
</style>



alt
          <!--   {path: '/general_settings', component:GeneralSettings},
  {path: '/nutrition', component:Nutrition},
  {path: '/allergens_additives', component:AllergensAdditives},
   -->
          <!-- <div class="main-setting setting">
            <div id="setting-nut"><b>Nutrition</b></div>
            <ul>
              <li>Vegetarian</li>
              <li>Vegan</li>
              <li>Lacto-Vegetarian</li>
            </ul>
            <div id="setting-allerg"><b>Allergens & Additives</b></div>
          </div> -->

/* .setting {
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
  } */