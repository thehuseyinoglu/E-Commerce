<template>
  <div>
    <ul >
      <li  v-for="a in cat" :key="a.id" >
            
            <button class="btn btn-outline-light mt-1 p-1" @click.prevent="yaz(a.id)">{{ a.name }}</button>
        <SubCatagory  v-if="a.id > 0" :id="a.id" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SubCatagory",
  data() {
    return {
      cat: "",
    };
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapActions(["fetchCategoryId", "addCategory","setCategoryId","deleteCategory"]),
    yaz(i) {   
    this.setCategoryId(i)
  },
  },
  deleteCat({id}){
    this.deleteCategory({id})
  },
  async mounted() {
    this.cat = await this.fetchCategoryId({ id: this.id });
  },
};
</script>


