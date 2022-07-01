<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>

import ProductCard from '@/components/ProductCard'
import EventSerivce from '../services/EventSerivce.js'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data() {
    return {
      products: null
    }
  },
  created() {
    EventSerivce.getEvents()
    .then((response) => {
      this.products = response.data
    }).catch((err) => {
      console.log(err);
    })
  },
} 

</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>