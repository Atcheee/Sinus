<template>
  <div>
    <SingleProductCard />
    <div class="product-info">
      <div class="product-headers">
        <h2>Overview</h2>
        <h2>Reviews</h2>
        <h2>Questions</h2>
        <h2>Specifications</h2>
      </div>
      <div class="product-header-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          expedita culpa officiis tempore odio dolor rerum possimus illo magnam
          maiores dolorem, blanditiis sequi animi necessitatibus rem architecto
          repellat nisi eligendi accusamus distinctio praesentium commodi?
          Quisquam aut sequi non veritatis id?
        </p>
      </div>
    </div>
    <div class="product-placement">
      <h1>Related Products</h1>
      <article class="product-grid">
        <ProductCard
          v-for="(item, index) in items"
          :key="index"
          :singleItem="item"
        />
      </article>
    </div>
  </div>
</template>

<script>
import SingleProductCard from "@/components/SingleProductCard.vue";
import ProductCard from "@/components/ProductCard.vue";
export default {
  components: { SingleProductCard, ProductCard },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("fetchItems");
  },
  computed: {
    items() {
      return this.$store.state.thing;
    },
  },
};
</script>

<style scoped>
.product-headers {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  grid-gap: 9.5rem;
  padding-bottom: 3rem;
}
.product-headers h2 {
  cursor: pointer;
  border-bottom: 5px solid #2f88ff;
}
.product-header-description {
  display: flex;
  justify-content: center;
}
.product-header-description p {
  font-family: "Work Sans", sans-serif;
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
  width: 46%;
}
.product-placement {
  display: grid;
  justify-content: center;
}
.product-placement h1 {
  font-family: "Quando", serif;
  font-weight: normal;
  font-size: 36px;
  display: flex;
  justify-content: flex-start;
  margin-top: 3rem;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 6rem;
  justify-content: center;
  justify-items: center;
  align-items: end;
}
</style>
