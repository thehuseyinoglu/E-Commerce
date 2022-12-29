<template>
  <!-- <ul class="">
      <li v-for="a in cat" :key="a.id" :class="['', shopNav.includes(a.parentId) ? '' : 'yok']">
        <a @click="den(a.id)"  class="btn btn-outline-light mt-1 p-1 text-success"> {{ a.name }}</a>
        <SubCatagoryNavbar v-if="a.id > 0" :id="a.id" />
      </li>
    </ul>  -->

  <ul class="submenu" v-if="cat != ''">
    <li v-for="a in cat" :key="a.id">
      <a @click="den(a.id)" class="dropdown-item ">
        {{ a.name }} </a
      >
      <SubCatagoryNavbar class="dropdown-menu" v-if="a.id > 0" :id="a.id" />
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SubCatagoryNavbar",
  data() {
    return {
      cat: "",
      count: 0,
    };
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapActions(["fetchCategoryId", "setShopNav"]),
    den(item) {
      this.setShopNav(item);
    },
  },
  //:class="['', a.parentId == 70023008 ? '' : 'yok']"
  async mounted() {
    this.cat = await this.fetchCategoryId({ id: this.id });
  },
  computed: {
    ...mapState(["shopNav"]),
  },
};
</script>

<style scoped>
.yok {
  display: none;
}
.a {
  z-index: 9999;
}
.dropdown-menu li {
  position: relative;
}
.dropdown-menu .submenu {
  display: none;
  position: absolute;
  left: 100%;
  top: -1px;
}
.dropdown-menu > li:hover > .submenu {
  display: block;
}
</style>


