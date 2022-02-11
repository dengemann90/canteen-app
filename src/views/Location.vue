<template>
  <div class="main">
    <div class="appframe">
      <div class="container">
        <p class="capital">Location</p>
        <div class="container_all">
          <!-- Hier content -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};

method: {
  let locals = [];

    const response = fetch(
      `https://openmensa.org/api/v2/canteens`
    );
    const responseData = response.json();

    for (const key in responseData) {
      const local = {
        id: responseData[key].id,
        name: responseData[key].name,
        city: responseData[key].city,
        address: responseData[key].address,
        coordinates: responseData[key].coordinates,
      };
      locals.push(local);
    }
}

</script>

<style scoped>
/*  */
</style>