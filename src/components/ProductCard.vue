<template>
  <div class="product-card">
    <router-link :to="'/Products/SingleProduct' + '/' + singleItem.id">
      <img
        class="product-img"
        :src="'http://localhost:5000//images/' + singleItem.imgFile"
        alt="The image of the product"
      />
    </router-link>

    <h1 class="product-card-name">
      {{ singleItem.title }} Sinus {{ singleItem.category }}
    </h1>
    <h1 class="product-card-price">{{ singleItem.price | toCurrency }}</h1>
    <button class="add-to-cart" @click="addToCart(singleItem)">
      <i class="gg-shopping-cart"></i> ADD TO CART
    </button>
    <fa icon="fa-solid fa-heart" class="heart-ic" @click="addToLiked(singleItem)" />
    
  </div>
</template>

<script>
export default {
  props: {
    singleItem: Object
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    addToCart(singleItem) {
      this.$store.dispatch("addToCart", singleItem);
    },
    addToLiked(singleItem){
      this.$store.dispatch("addToLiked", singleItem);
    }
  },
};
</script>

<style scoped>
@import url("https://css.gg/shopping-cart.css");
@import url('https://css.gg/heart.css');
.product-card {
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 250px;
  height: 451px;
  left: 365px;
  top: 942px;
  background: rgba(204, 204, 204, 0.5);
}
.product-img {
  margin-top: 20px;
  width: 203px;
  height: 186px;
  object-fit: scale-down;
}
.product-card-name {
  margin-top: 25px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 1500;
  font-size: 20px;
  line-height: 16px;
  color: #000000;
}
.product-card-price {
  margin-top: 25px;
  color: red;
}
.add-to-cart {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 11px;
  width: 120px;
  height: 33px;
  background: #407ba9;
  box-shadow: 2px 4px 4px rgba(0, 0 0.25 0.25 0.25);
  border-radius: 100px;
  color: white;
}
.heart-ic{
height: 3rem;
position:absolute;
transform: translate(-75px);

}
.fa-heart path {
  fill: #98002e;
}
.fa-heart:after {
        content: "";
        background-color: white;
        border-radius: 50%;
        height: 30px;
        position: absolute;
        width: 30px;}
</style>
