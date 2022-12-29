<template>
  <div>
    <select v-model="category">
      <option v-for="item in categorys.data" :key="item.id" :value="item.id">
        <span v-if="item.parentId == 0"> {{ item.name }}</span>
      </option>
    </select>

    <ul>
      <li v-for="a in cat" :key="a.id">
        {{ a.name }}
        <Pro v-if="a.id > 0" :id="a.id" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Pro",
  data() {
    return {
      cat: "",
    };
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapActions(["fetchCategoryId", "addCategory"]),
  },
  async mounted() {
    this.cat = await this.fetchCategoryId({ id: this.id });
  },
};
</script>


