<script>
import { mapActions, mapState } from "vuex";
import Pro from "@/components/pro.vue";
import { required } from "vuelidate/lib/validators";
import SubCatagory from "@/components/SubCatagory.vue";
export default {
  components: {
    Pro,
    SubCatagory,
  },
  computed: {
    ...mapState(["categoryIdd"]),
  },
  data() {
    return {
      control: 0,
      productName: "",
      productCode: "",
      brands: {},
      brand: 1,
      SubCategorys: {},
      SubCategory: 1,
      categorys: {},
      category: 1,
      unitPrice: 1,
      shortdec: "",
      longdec: "",
      locations: "",
      stock: 1,
      createdDate: "a",
      updatedDate: "a",
      suplierId: 1,
      currencies: {},
      currency: 1,
      cats: [],
      deneme: "",
      main: {},
      showCategory: false,
    };
  },
  validations: {
    productName: {
      required,
    },
    brand: {
      required,
    },
    SubCategory: {
      required,
    },
    category: {
      required,
    },
    unitPrice: {
      required,
    },
    shortdec: {
      required,
    },
    longdec: {
      required,
    },
    locations: {
      required,
    },
    stock: {
      required,
    },
  },
  async mounted() {
    this.brands = await this.fetchBrands();
    this.deneme = this.categoryIdd;
    this.categorys = await this.fetchCatagories();
    this.currencies = await this.fetchCurrencies();
    console.log(this.currencies);
  },
  methods: {
    ...mapActions([
      "fetchBrands",
      "fetchSubCategorys",
      "fetchCatagories",
      "addProduct",
      "fetchCurrencies",
      "getCatagoryId",
      "fetchCatagoriesMain",
      "setCategoryId",
    ]),
    yaz(i) {
      this.setCategoryId(i);
    },
    async addCatagoryId(categoryId) {
      if (categoryId != 0) {
        console.log(categoryId + " kategori id");
        if (this.cats.includes(categoryId)) {
          let cat = await this.getCatagoryId({ categoryId });
          this.addCatagoryId(cat.parentId);
        } else {
          this.cats.push(categoryId);
          console.log(this.cats + " cats dizi");
          let cat = await this.getCatagoryId({ categoryId });

          if (cat.parentId == 0) {
            console.log(this.cats + " cats dizi sifira esit");
            return this.cats;
          } else {
            this.addCatagoryId(cat.parentId);
            console.log(this.cats + " cats dizi sifira esit degil");
          }
        }
      }
    },

    async findCatagory(categoryId) {
      let cat = await this.getCatagoryId({ categoryId });
      this.cats.push(cat.parentId);
      console.log(this.cats);
    },
    async submitFormProduct() {
      let categoryId = this.cats;
      let name = this.productName;
      let productCode = this.productCode;
      let brandId = this.brand;
      let categoryAddRequest = { categoryId };
      let unitPrice = parseFloat(this.unitPrice);
      let longDescription = this.longdec;
      let shortDescription = this.shortdec;
      let pLocation = this.locations;
      let createdDate = this.createdDate;
      let updatedDate = this.updatedDate;
      let supplierId = this.suplierId;
      let currencyId = parseInt(this.currency);
      let unitsInStock = parseInt(this.stock);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.addProduct({
          name,
          productCode,
          brandId,
          categoryAddRequest,
          unitPrice,
          longDescription,
          shortDescription,
          pLocation,
          createdDate,
          updatedDate,
          supplierId,
          currencyId,
          unitsInStock,
        })
          .then((response) => {
            this.control = 2;
          })
          .catch((error) => {
            this.control = 3;
          });
      }
    },
  },
  watch: {
    async ["categoryIdd"](value) {
      this.deneme = this.categoryIdd;
    },
  },
};
</script>

<template>
  <div class="wrapper p-3">
    <h1 class="text-white">ÜRÜN EKLE</h1>
    <form @submit.prevent="submitFormProduct" class="text-white">
      <label>Ürün Adi</label>
      <input type="text" v-model="productName" />
      <span
        v-if="!$v.productName.required && $v.productName.$dirty"
        class="text-danger"
        >Bu Alani Doldurun</span
      >
      <label>Ürün Kodu</label>
      <input type="text" v-model="productCode" />
      <label>Marka</label>
      <select v-model="brand">
        <option v-for="item in brands.data" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>

      <label>Kategori</label>
      <button
        @click.prevent="showCategory = !showCategory"
        class="btn btn-outline-warning text-light"
      >
        Kategorileri Göster
      </button>

      {{ showCategory }}

      <div v-if="showCategory" class="bg-dark p-4">
        <div v-for="item in categorys.data" :key="item.id">
          <div v-if="item.parentId == 0">
            <button
              @click.prevent="yaz(item.id)"
              class="btn btn-outline-light mt-1 p-1"
            >
              {{ item.name }}
            </button>
            <SubCatagory :id="item.id" />
          </div>
        </div>
        <button
          v-if="cats.length == 0"
          @click.prevent="addCatagoryId(deneme)"
          class="btn btn-success"
        >
          Ekle
        </button>
        <button @click.prevent="cats = []" class="btn btn-success ms-3">
          Resetle</button
        ><br /><span
          >Daha önceden kategori seçtıyseniz lütfen ilk önce reset'e
          basınız</span
        >
      </div>
      <span>Seçilen kategori numaraları{{ cats }}</span>

      <span>Fiyatı</span>
      <div class="input-group mb-3">
        <span class="input-group-text"
          ><select v-model="currency" class="border-0">
            <option v-for="a in currencies.data" :key="a.id" :value="a.id">
              {{ a.currencyName }}
            </option>
          </select>
        </span>
        <input
          type="number"
          v-model="unitPrice"
          class="form-control"
          aria-label="Amount (to the nearest dollar)"
          step="any"
        />
      </div>

      <span
        v-if="!$v.unitPrice.required && $v.unitPrice.$dirty"
        class="text-danger"
        >Bu Alani Doldurun</span
      >
      <span>Ürün Detaylı Açıklaması</span>
      <textarea type="text" v-model="longdec" />
      <span>Ürün Kısa Açıklaması</span>
      <textarea type="text" c v-model="shortdec" />
      <span>Ürün Konumu</span>
      <input type="text" v-model="locations" />
      <span
        v-if="!$v.locations.required && $v.locations.$dirty"
        class="text-danger"
        >Bu Alani Doldurun</span
      >
      <span>Stok Sayısı</span>
      <input type="number" v-model="stock" />
      <span v-if="!$v.stock.required && $v.stock.$dirty" class="text-danger"
        >Bu Alani Doldurun</span
      >

      <p v-if="control == 2" class="p-0 m-0 text-success">
        Tamamlandı
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-check-circle text-success"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
          />
        </svg>
      </p>
      <p v-if="control == 3" class="p-0 m-0 text-danger">
        Bir şeyler ters gitti
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-circle text-danger"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </p>
      <input type="submit" class="btn btn-outline-danger" />
    </form>
  </div>
</template>


<style scoped>
.wrapper {
  background: #283046;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
textarea {
  width: 100%;
  height: 100px;
  padding: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: none;
}
form input[type="text"] {
  width: 300px;
  border: 0;
  border-bottom: solid 1px #b4b7bd;
  padding: 5px;
  color: white;
  background: transparent;
}
.yok {
  display: none;
}
</style>