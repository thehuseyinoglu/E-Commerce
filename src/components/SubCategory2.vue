<template>
  <div>
    <ul>
      <li v-for="a in cat" :key="a.id">
        <button
          class="btn btn-outline-light mt-1 p-1"
          @click.prevent="yaz(a.id)"
        >
          {{ a.name }}</button
        ><button
          @click.prevent="deleteCat(a.id)"
          class="btn btn-danger p-1 ms-2"
        >
          Sil
        </button>
        <SubCatagory2 v-if="a.id > 0" :id="a.id" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SubCatagory2",
  data() {
    return {
      cat: "",
    };
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapActions([
      "fetchCategoryId",
      "addCategory",
      "setCategoryId",
      "deleteCategory",
    ]),
    yaz(i) {
      this.setCategoryId(i);
    },
   async deleteCat(id) {
      let a = id;
     await this.deleteCategory(id);
      
    },
  },

  async mounted() {
    this.cat = await this.fetchCategoryId({ id: this.id });
  },
};
</script>


