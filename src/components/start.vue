<template>
  <div class=" a d-flex justify-content-center ">
</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      mainpage: [],
    };
  },
  methods: {
    ...mapActions(["fetchMainRoute", "changemenuf"]),
   
  },
  async mounted() {
    this.mainpage = await this.fetchMainRoute();
    console.log(this.mainpage);
    
  },
};
</script>

<style  scoped>

html, body { height: 100% }

body {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: rebeccapurple;
}
</style>