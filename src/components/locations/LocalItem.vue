<template>
<li>
    <h1>{{canteen.name}}</h1>
      <h1>{{canteen.city}}</h1>
        <h1>{{canteen.address}}</h1>
</li>
</template>

<script>
export default {
    props:['canteen']
}
</script>