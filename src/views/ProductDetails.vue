<template>
  <div v-if="product">
    <h1>{{product.title}}</h1>
    <p>{{product.description}}</p>
    <span>Price: {{product.price}} || Quantity: {{product.quantity}}</span>
    <img :src="product.img">
  </div>
</template>

<script>
import EventSerivce from '../services/EventSerivce.js'

  export default {
    props: ['id'],
    data() {
      return {
        product: null
      }
    },

    created() {
      EventSerivce.getEvent(this.id)
        .then((response) => {
          this.product = response.data
        }).catch((err) => {
          console.log(err);
        })
  },
  }
</script>