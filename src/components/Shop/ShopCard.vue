<template>
  <router-link
    class="text-decoration-none text-dark"
    :to="`/magaza/${product.id}`"
    ><div class="card h-100">
      <img
        :src="baseUrl + product.productImages[0].imagePath"
        class="card-img-top img-fluid imgmx"
        alt="..."
      />

      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text desc">
          {{
            product.shortDescription.length > 238
              ? product.shortDescription.slice(0, 238) + "..."
              : product.shortDescription
          }}
        </p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <p
          v-if="product.currencyId == 1 && product.unitPrice !=1000000001"
          class="text-muted fw-semibold m-0 fs-3"
        >
          {{ product.unitPrice }}&#8378;
        </p>
        <p
          v-if="product.currencyId == 2"
          class="text-muted fw-semibold m-0 fs-3"
        >
          &#36;{{ product.unitPrice }}
        </p>
        <p
          v-if="product.currencyId == 3"
          class="text-muted fw-semibold m-0 fs-3"
        >
          &euro;{{ product.unitPrice }}
        </p>
        <p
          v-if="product.currencyId == 1 && product.unitPrice ==1000000001"
          class="text-muted fw-thin m-0 fs-3"
        >
          Teklif Alın
        </p>

        <small class="text-dark fw-semibold" v-if="product.brandName"
          >{{product.brandName}}</small
        >
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Productinfo",
  props: {
    product: Object,
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
};
</script>
<style scoped>
.imgmx {
  max-height: 250px;
}
</style>