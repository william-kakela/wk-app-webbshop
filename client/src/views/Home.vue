<template>
  <div class="body">
    <Top title="Shop" />
    <section class="container">
      <div class="Product__Card">
        <ul>
          <li v-for="product in products" :key="product.id">
            {{ product.name }}
            <img :src="product.image" alt="" />
            {{ product.price }}

            <button
              class="buy__Button"
              type="button"
              @click="addProductToCart(product)"
            >
              Lägg till produkt till varukorgen!
            </button>
          </li>
        </ul>
      </div>
    </section>

    <section class="container">
      <div class="product__Card">
        <Top title="Kundvagn" />
        <ul>
          <li v-for="(item, index) in cart" :key="index">
            {{ item.name }}
            <img :src="item.image" alt="" />
            {{ item.price }}

            <button
              class="remove__Button"
              type="button"
              @click="deleteProductInCart(item.id)"
            >
              Ta bort produkt från varukorgen!
            </button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import ProductService from '@/core/ProductService.js'
import CartService from '@/core/CartService.js'
import Top from '@/components/Top'

export default {
  name: 'Home',
  components: {
    Top
  },

  created () {
    this.getProducts()
    this.getCart()
  },
  data () {
    return {
      products: [],
      cart: []
    }
  },
  methods: {
    getProducts () {
      ProductService.getProducts().then(data => (this.products = data.data))
    },
    getCart () {
      CartService.getCart().then(data => (this.cart = data.data))
    },
    addProductToCart (product) {
      CartService.addProductToCart(product).then(() => this.getCart())
    },
    deleteProductInCart (id) {
      CartService.deleteProductInCart(id).then(() => this.getCart())
    }
  }
}
</script>

<style scoped>
.body {
  background-color: lightgray;
}

li {
  list-style: none;
}

.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
}

.product__Card {
  background-color: white;
  background-position: center;
  object-fit: contain;
  min-height: 270px;
  width: 60%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 10px;
}

.buy__Button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 24px;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;
}
.remove__Button {
  background-color: red;
  border: none;
  color: white;
  padding: 10px 24px;
  border-radius: 10px;
  text-align: center;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;
}
img {
  height: 200px;
  background-position: center;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
