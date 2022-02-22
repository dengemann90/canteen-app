<template>
  <div>
  <ul v-for="nutrition in nutritionList" :key="nutrition.type">
    <li>
        <div>
            <p><b>{{nutrition.type}}</b></p>
            <p>{{nutrition.description }}</p>
            </div>
            <div>
                <img :src="require( `../../assets/${nutrition.imageName}.png`)" alt="vegan" width="150" height="150 ">
            </div>
    </li>
  </ul></div>
</template>

<script>
export default {
  data() {
    return {
      nutritionList: [
        {
          type: "Omnivore",
          description: "Du isst sowohl pflanzliche als auch tierische Produkte",
          imageName: 'Omnivore'
        },
            {
              type: "Pescetarisch",
              description:
                "Du isst eigentlich veggie, machst bei Fisch aber eine Ausnahme",
                 imageName: 'Pescetarisch'
            },
        {
          type: "Vegetarisch",
          description: "Du verzichtest auf Fleisch und Fisch",
          imageName: 'Vegetarisch'
        },
        {
          type: "Vegan",
          description: "Du verzichtest auf alle tierischen Produkte",
          imageName: 'Vegan'
        },
      ],
    };
  },
  computed:{
      imageName(){
         return 'Omnivoreo';
      }
  }
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
  border-radius: 15px;
  padding: 1rem;
}
</style>