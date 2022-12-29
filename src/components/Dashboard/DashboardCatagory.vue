<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row d-flex justify-content-around">
        <div class="col-12 col-xl-5 p-0 tabloCustom">
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Kategoriler</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="catagorie in catagories.data" :key="catagorie.id">
                  <th v-if="catagorie.parentId == 0" scope="row">
                    {{ catagorie.id }}
                  </th>
                  <td v-if="catagorie.parentId == 0">
                    <span class="fw-bold"
                      >{{ catagorie.name }}
                      <button
                        @click.prevent="deleteCat(catagorie.id)"
                        class="btn btn-danger p-1 ms-2"
                      >
                        Sil
                      </button>
                    </span>
                    <SubCatagory2 :id="catagorie.id" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-xl-3 p-0 tabloCustom">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>

                  <th scope="col">Tüm Kategoriler</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="catagorie in catagories.data" :key="catagorie.id">
                  <th scope="row">{{ catagorie.id }}</th>

                  <td>
                    {{ catagorie.name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-xl-3 p-0 tabloCustom">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">
                    Marka
                    <button
                      class="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal1"
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="brand in brands.data" :key="brand.id">
                  <th scope="row">{{ brand.id }}</th>
                  <td>
                    {{ brand.name }}
                    <button
                      data-bs-toggle="modal"
                      @click="brandCategory(brand.name)"
                      data-bs-target="#myModal2"
                      class="btn btn-outline-warning p-1 ms-3"
                    >
                      İlişkilendir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- <div class="col-12 col-xl-3 aaaa">
        <div class="catagory">
          <h1>Kategori Ekle</h1>
          <form @submit.prevent="submitFormCategory" class="wrapper">
            <label>Katagori Ekle</label>
            <input type="text" v-model="catagoryName" />
            <input type="submit" class="btn btn-primary mt-2" />
          </form>
        </div>
        <div class="catagory">
          <h1>Alt Kategori Ekle</h1>
          <form @submit.prevent="submitFormSubCategory" class="wrapper">
            <label>Alt Katagori Ekle</label>
            <input type="text" v-model="subCatagoryName" />
            {{ subCatagoryName }}
            <input type="submit" class="btn btn-primary mt-2" />
          </form>
        </div>
        <div class="catagory">
          <h1>Marka Ekle</h1>
          <form @submit.prevent="submitFormBrand" class="wrapper">
            <label>Katagori Ekle</label>
            <input type="text" v-model="brandName" />
            <input type="submit" class="btn btn-primary mt-2" />
          </form>
        </div>
      </div> -->
      <div class="row mt-4 d-flex justify-content-center">
        <div class="col col-lg-3 text-center modalback">
          <h1>Kategori Ekle</h1>
          <form @submit.prevent="submitFormCategory" class="wrapper">
            <div class="">
              <input class="text-white" type="text" v-model="catagoryName" />
              <input type="submit" class="btn btn-primary mt-2" />
              <p v-if="controlCata == 2" class="p-0 m-0 text-success">
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
              <p v-if="controlCata == 3" class="p-0 m-0 text-danger">
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
            </div>
          </form>
        </div>
        <div class="col col-lg-4 text-center modalback">
          <h1>Alt Kategori Ekle</h1>
          <form @submit.prevent="submitFormSubCategory" class="wrapper">
            <div class="">
              <select v-model="parentCategory">
                <option disabled value="">Seçim yapiniz</option>
                <option
                  v-for="item in catagories.data"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
              <input class="text-white" type="text" v-model="subCatagoryName" />
              <input type="submit" class="btn btn-primary mt-2" />
              <p v-if="cSub == 2" class="p-0 m-0 text-success">
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
              <p v-if="cSub == 3" class="p-0 m-0 text-danger">
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
            </div>
          </form>
        </div>
      </div>
    </div>

    <div id="myModal1" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content modalback">
          <div class="modal-header">
            <h5 class="modal-title">Marka Ekle</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="col">
              <form @submit.prevent="submitFormBrand" class="wrapper">
                <input class="text-dark" type="text" v-model="brandName" />
                <input type="submit" class="btn btn-primary mt-2" />
                <p v-if="controlBrand == 2" class="p-0 m-0 text-success">
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
                <p v-if="controlBrand == 3" class="p-0 m-0 text-danger">
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
              </form>
              <p v-if="controlSubCata == 2" class="p-0 m-0 text-success">
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
              <p v-if="controlSubCata == 3" class="p-0 m-0 text-danger">
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="myModal2" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content modalback">
          <div class="modal-header">
            <h5 class="modal-title">Kategoriyi Seçiniz</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="col">
              <form @submit.prevent="submitFormCAtegoryBrand" class="wrapper">
                <select v-model="parentCategory">
                  <option disabled value="">Seçim yapiniz</option>
                  <option
                    v-for="item in catagories.data"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <input type="submit" class="btn btn-primary mt-2" />
                <p v-if="controlBrand == 2" class="p-0 m-0 text-success">
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
                <p v-if="controlBrand == 3" class="p-0 m-0 text-danger">
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
              </form>
              <p v-if="controlSubCata == 2" class="p-0 m-0 text-success">
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
              <p v-if="controlSubCata == 3" class="p-0 m-0 text-danger">
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SubCatagory2 from "@/components/SubCategory2.vue";
export default {
  data() {
    return {
      controlCata: 0,
      controlSubCata: 0,
      controlBrand: 0,
      catagories: {},
      subCatagory: [],
      brands: {},
      catagoryName: "",
      subCatagoryName: "",
      brandName: "",
      parentCategory: "",
      brandToCate: "",
      deneme: 1,
      cSub: "",
    };
  },
  components: {
    SubCatagory2,
  },

  async mounted() {
    this.catagories = await this.fetchCatagories();
    this.brands = await this.fetchBrands();
  },

  methods: {
    ...mapActions([
      "fetchCatagories",
      "addCategory",
      "addBrand",
      "fetchSubCategorys",
      "fetchBrands",
      "fetchCategoryId",
      "deleteCategory",
    ]),
    async deleteCat(id) {
      let a = id;
      await this.deleteCategory(id);
      this.catagories = await this.fetchCatagories();
    },
    async submitFormCategory() {
      let name = this.catagoryName;

      await this.addCategory({
        id: 0,
        name,
        parentId: 0,
      })
        .then((response) => {
          this.controlCata = 2;
        })
        .catch((error) => {
          this.controlCata = 3;
        });
      this.catagories = await this.fetchCatagories();
    },
    async submitFormSubCategory() {
      await this.addCategory({
        id: 0,
        name: this.subCatagoryName,
        parentId: this.parentCategory,
      })
        .then((response) => {
          this.cSub = 2;
        })
        .catch((error) => {
          this.cSub = 3;
        });
      this.catagories = await this.fetchCatagories();
    },

    async submitFormBrand() {
      let name = this.brandName;

      await this.addBrand({
        name,
      })
        .then((response) => {
          this.controlBrand = 2;
        })
        .catch((error) => {
          this.controlBrand = 3;
        });
      this.brands = await this.fetchBrands();
    },
    brandCategory(item) {
      this.brandToCate = item;
    },
    async submitFormCAtegoryBrand() {
      await this.addCategory({
        id: 0,
        name: this.brandToCate,
        parentId: this.parentCategory,
      })
        .then((response) => {
          this.controlBrand = 2;
        })
        .catch((error) => {
          this.controlBrand = 3;
        });
      this.catagories = await this.fetchCatagories();
    },
  },
};
</script>

<style  scoped>
.b {
  margin-top: 80px;
}
.tabloCustom {
  background-color: #283046;
  color: #fff !important;

  height: 500px;
  overflow-y: auto;
}
.tabloCustom table {
  color: #b4b7bd !important;
}
table tr:hover {
  color: #fff !important;
  cursor: pointer;
}
tr {
  border-color: #646464;
}
.tableThead {
  background-color: #343d55;
}
.tableFont {
  font-weight: 600;
}
.modalback {
  color: #b4b7bd;
}
.modalback input[type="text"] {
  border: 0;
  border-bottom: solid 1px #b4b7bd;
  background: transparent;
  margin: 5px;
}
</style>