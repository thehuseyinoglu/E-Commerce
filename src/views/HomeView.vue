<template>
  <div class="home">
<Navigation/>

    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

import Navigation from "@/components/Navigition.vue"
import { mapState ,mapActions} from 'vuex';
export default {
  name: "HomeView",
  components: {
    Navigation
  },
 computed:{
  ...mapState(["shopCart"])
 },
 methods: {
  ...mapActions(["setShopCart"])
 },
 mounted() {
    let sCart = JSON.parse(localStorage.getItem("cart"));
    if (sCart != null) {
      this.setShopCart(sCart);
    }else{
       this.setShopCart([]);
    }
  },
};
</script>
