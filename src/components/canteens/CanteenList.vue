<template>
  <div class="canteen-list">
    <p>city selected: {{ selectedCity }}</p>
    <ul>
      <canteen-item
        v-for="canteen in canteenList"
        :key="canteen.id"
        :canteen="canteen"
        :selectedCanteenId="this.selectedCanteenId"
        @update-selected-canteen="updateSelectedCanteen"
      ></canteen-item>
    </ul>
  </div>
</template>

<script>
import CanteenItem from "./CanteenItem.vue";
export default {
  components: {
    CanteenItem,
  },
  props: ["selectedCity"],
  emits: ["transmit-error-message"],
  data() {
    return {
      selectedCanteenId: "",
      canteenList: [],
      canteenListDB: [
        {
          id: 1,
          name: "Mensa UniCampus Magdeburg",
          city: "Magdeburg",
          address: "Pfälzer Str. 1, 39106 Magdeburg",
          coordinates: [52.139618827301895, 11.647599935531616],
        },
        {
          id: 2,
          name: "Magdeburg Herrenkurg",
          city: "Magdeburg",
          address: "Breitscheidstr. 2, 39114 Magdeburg",
          coordinates: [52.14006658530411, 11.67566657066345],
        },
        {
          id: 3,
          name: "Mensa Stendal",
          city: "Stendal",
          address: "Osterburger Str. 25, 39567 Stendal",
          coordinates: [52.615015758022146, 11.849302053451538],
        },
        {
          id: 4,
          name: "Mensa Wernigerode",
          city: "Wernigerode",
          address: "Friedrichstraße 57 – 59,  38855 Wernigerode",
          coordinates: [51.8257591770436, 10.760003328323364],
        },
        {
          id: 5,
          name: "DomCafete Halberstadt",
          city: "Halberstadt",
          address: "Am Domplatz 16,  38820 Halberstadt",
          coordinates: [51.89534754646133, 11.047461032867432],
        },
        {
          id: 6,
          name: "Hannover Hauptmensa",
          city: "Hannover",
          address: "Callinstraße 23, 30167 Hannover",
          coordinates: [52.38620852444954, 9.714059829711914],
        },
        {
          id: 7,
          name: "Hannover, Contine",
          city: "Hannover",
          address: "Königsworther Platz 1, 30167 Hannover",
          coordinates: [52.3791768, 9.723882099999999],
        },
        {
          id: 8,
          name: "Mensa PZH",
          city: "Garbsen",
          address: "An der Universität 2, 30823 Garbsen",
          coordinates: [52.42584657412015, 9.618701934814453],
        },
        {
          id: 9,
          name: "Mensa Caballus",
          city: "Hannover",
          address: "Bischofsholer Damm 15, 30173 Hannover",
          coordinates: [52.36893, 9.76545],
        },
        {
          id: 10,
          name: "Mensa TiHo-Tower",
          city: "Hannover-test",
          address: "Bünteweg 2, 30559 Hannover",
          coordinates: [52.35441215028723, 9.797573089599608],
        },
        {
          id: 950,
          name: "Diekirch, NOSL Restaurant (Nordstadlycée)",
          city: "Diekirch (Luxembourg)",
          address: "1-7, rue Sauerwiss, L-9278 Diekirch (Luxembourg)",
          coordinates: [49.8642358, 6.1612383],
        },
        {
          id: 266,
          name: "Mensa Regensburger Straße",
          city: "Nürnberg",
          address: "Regensburger Str. 160, 90478 Nürnberg, Germany",
          coordinates: [49.43843605, 11.1130078522348],
        },
        {
          id: 381,
          name: "Casino Cafeteria",
          city: "Frankfurt am Main",
          address:
            "Theodor-W.-Adorno-Platz 2a, 60323 Frankfurt am Main, Germany",
          coordinates: [50.1268884, 8.6669763],
        },
        {
          id: 738,
          name: "Mensa Gymnasium Münchenstein",
          city: "Münchenstein",
          address: "Gymnasium Münchenstein\nBaselstrasse 33\n4142 Münchenstein",
          coordinates: [47.527049, 7.616954],
        },
      ],
    };
  },
  watch: {
    selectedCity() {
      this.filterCity();
    },
  },
  methods: {
    updateSelectedCanteen(canteenId) {
      this.selectedCanteenId = canteenId;
    },
    filterCity() {
      //https://stackoverflow.com/questions/15472764/regular-expression-to-allow-spaces-between-words
      const regex1 = new RegExp("^[A-Za-zäüöÄÜÖ_ *]+$");
      const regex2 = new RegExp("[\\[\\]\\(\\)]");

      const inputValid = regex1.test(this.selectedCity);
      const containsBrackets = regex2.test(this.selectedCity);
      console.log("inputValid", inputValid);
      if (inputValid && !containsBrackets) {
        let filteredCanteenList = this.canteenListDB.filter((canteen) =>
          canteen.city.toLowerCase().match(this.selectedCity.toLowerCase())
        );
        this.canteenList = filteredCanteenList;
      } else {
        if (this.canteenList.length > 0) {
          this.canteenList = [];
        }
        //info an user v-if im template
        this.transmitErrorMessage();
      }
    },
    transmitErrorMessage() {
      const message = "Sonderzeichen und Zahlen sind nicht erlaubt!";
      if (this.selectedCity != "") {
        this.$emit("transmit-error-message", message);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0rem auto;
  max-width: 40rem;
  min-width: 17.5rem;
  padding: 0;
}

.canteen-list {
  padding-top: 2rem;
}
</style>