<template>
  <router-link :to="{name: 'ProductDetails', params: { id: product.id } }">
    <div class="event-card">
      <h4>{{product.title}}</h4>
      <span>Price: {{product.price}} || Quantity: {{product.quantity}}</span>
      <img :src="product.img">
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>

<style scoped>

.event-card {
  padding: 1rem;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

img {
  margin-top: 1rem;
}

</style>
