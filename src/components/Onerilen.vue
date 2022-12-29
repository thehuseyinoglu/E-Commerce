<template>
  <div>
    <div class="row aa">
      <div class="col" v-for="(product, index) in products.data" :key="index">
        <ShopCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ShopCard from "@/components/Shop/ShopCard.vue";
export default {
  components: {
    ShopCard,
  },
  data() {
    return {
      products: {},
    };
  },
  async mounted() {
    this.products = await this.fetchProducts();
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
};
</script>

<style scoped>
.aa{
    display: flex;
    width: 500px;
    scroll-snap-type: x mandatory;
    scroll-padding:25px;
column-gap: 20px;    
}
</style>