<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-xl-8 p-0 mb-1 position-relative">
          <div class="row">
            <div class="col">
              <!-- <input v-model="search" type="text" placeholder="Arama Yap..." /> -->
              <select class="mb-3" v-model="pageSize">
                <option value="10">10 ürün göster</option>
                <option value="20">20 ürün göster</option>
                <option value="30">30 ürün göster</option>
                <option value="50">50 ürün göster</option>
              </select>
              <button @click="goPageSize" class="btn btn-success ms-2">
                Listele
              </button>
            </div>
            <div class="col d-flex justify-content-end ">
              <div class="d-flex align-items-center text-white border border-1">
                <a
                  class="  p-1 cursor "
                  @click="beforePage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-chevron-double-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </a>

                <span class="my-0 mx-3">Sayfa: {{ page }}</span>

                <a
                  class=" p-1 "
                  @click="nextPage"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-chevron-double-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </a>
                <a
                  type="button"
                  class="p-1 text-light"
                  @click="pageDiv = !pageDiv"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
           <div class="position-absolute  end-0">
            <div v-if="pageDiv" class="p-2 bg-white row row-cols-5 ani">
              <div
                class=""
                :class="[
                    ' cursor col pageNumber text-center',
                    index + 1 === page ? 'activeCustom' : '',
                  ]"
                v-for="(item, index) in productsPage.data.pages"
                :key="index"
              >
                <a
                  @click="goPage(index + 1)"
               
                  
                  >{{ index + 1 }}</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-8 p-0 mb-3 tabloCustom">
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead class="tableThead">
                <tr class="text-center">
                  <th scope="col">#Id</th>
                  <th scope="col">Fotoğraf</th>
                  <th scope="col">Ürün Adı</th>
                  <th scope="col">Kısa Açıklaması</th>
                  <th scope="col">Stok Durumu</th>
                  <th scope="col">Fiyatı</th>
                  <th scope="col">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody
                class="table-group-divider text-center"
                v-if="productsPage.data"
              >
                <tr
                  v-for="product in productsPage.data.items"
                  :key="product.id"
                >
                  <th scope="row">{{ product.id }}</th>
                  <td class="d-flex justify-content-center">
                    <img
                      class="img-fluid"
                      style="height: 50px"
                      :src="baseUrl + product.productImages[0].imagePath"
                      alt=""
                    />
                  </td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.shortDescription }}</td>
                  <td>
                    <button
                      class="btn btn-outline-success ms-2 p-1"
                      data-bs-toggle="modal"
                      data-bs-target="#myModalStok"
                      @click.prevent="showStock(product.id)"
                    >
                      Stok Durumu
                    </button>
                  </td>
                  <td>
                    <span
                      v-if="
                        product.currencyId == 1 &&
                        product.unitPrice != 1000000001
                      "
                      class="text-muted fw-semibold m-0"
                      >{{ product.unitPrice }}&#8378;
                      <button
                        class="btn btn-outline-success ms-2 p-1"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal3"
                        @click.prevent="al(product.id)"
                      >
                        Değiştir
                      </button></span
                    >
                    <span
                      v-if="product.currencyId == 2"
                      class="text-muted fw-semibold m-0 ms-1"
                      >&#36;{{ product.unitPrice }}
                      <button
                        class="btn btn-outline-success ms-2 p-1"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal3"
                        @click.prevent="al(product.id)"
                      >
                        Değiştir
                      </button></span
                    >
                    <span
                      v-if="product.currencyId == 3"
                      class="text-muted fw-semibold m-0"
                      >&euro; {{ product.unitPrice }}
                      <button
                        class="btn btn-outline-success ms-2 p-1"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal3"
                        @click.prevent="al(product.id)"
                      >
                        Değiştir
                      </button></span
                    >
                    <span
                      v-if="
                        product.currencyId == 1 &&
                        product.unitPrice == 1000000001
                      "
                      class="text-muted fw-semibold m-0"
                      >Teklif Alınız
                      <button
                        class="btn btn-outline-success ms-2 p-1"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal3"
                        @click.prevent="al(product.id)"
                      >
                        Değiştir
                      </button></span
                    >
                  </td>
                  <td>
                    <button
                      class="btn btn-outline-success me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      @click.prevent="alp(product.id)"
                    >
                      Fotoğraf +
                    </button>
                    <button
                      class="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal1"
                      @click.prevent="als(product.id)"
                    >
                      Detay +
                    </button>
                    <button
                      class="btn btn-outline-danger ms-2"
                      @click.prevent="prodel(product.id)"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-12 col-xl-4">
          <div class="w-100 h-auto d-flex justify-content-center">
            <AddProduct />
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Fotoğraf Ekle</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="input-group">
                  <input
                    type="file"
                    @change="onFileChanged"
                    class="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    @click="onUpload"
                    type="button"
                    id="inputGroupFileAddon04"
                  >
                    Ekle
                  </button>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="col d-flex flex-column justify-content-between"
                v-for="item in productImages.data"
                :key="item.imggPath"
              >
                <img class="img-fluid" :src="baseUrl + item.imagePath" alt="" />
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="deleteImage(item.id)"
                >
                  Sil
                </button>
              </div>
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
    <div id="myModal1" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detay Ekle</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col d-flex flex-column">
                <form
                  @submit.prevent="submitFormPro"
                  class="d-flex flex-column"
                >
                  <span class="fw-semibold">Özellik</span>
                  <input
                    type="text"
                    v-model="key"
                    class="mb-1 w-75 inputCustom"
                  />
                  <span class="fw-semibold">Değer</span>
                  <input
                    type="text"
                    v-model="value"
                    class="mb-2 w-75 inputCustom"
                  />
                  <input
                    type="submit"
                    class="btn btn-outline-danger w-25 mb-3"
                  />
                </form>
                <form
                  @submit.prevent="submitFormUpdate"
                  class="d-flex flex-column mt-5"
                >
                  <span class="fw-semibold">Güncelle</span>
                  <select v-model="key" class="p-2 mb-3" v-if="details.data">
                    <option disabled value="">secim yapiniz</option>
                    <option
                      v-for="item in details.data"
                      :key="item.id"
                      :value="item.key"
                      class="option"
                    >
                      {{ item.key }}
                    </option>
                  </select>
                  <textarea type="text" v-model="value" class="mb-2 p-2" />

                  <input type="submit" class="btn btn-outline-danger" />
                </form>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col p-0 tabloCustom1">
                <div class="table-responsive">
                  <table class="table table-bordered align-middle h-50">
                    <thead>
                      <tr class="text-center">
                        <th scope="col">Özellik</th>
                        <th scope="col">Değer</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider text-center">
                      <tr v-for="detail in details.data" :key="detail.id">
                        <td>{{ detail.key }}</td>

                        <td class="d-flex justify-content-between">
                          {{ detail.value }}
                          <div>
                            <button
                              class="btn btn-danger"
                              @click.prevent="deleteDet(detail.id)"
                            >
                              sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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

    <div id="myModal3" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Fiyat Değiştir</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <form @submit.prevent="submitChangePrice" class="wrapper">
                  <div class="">
                    <input
                      class="text-dark"
                      type="number"
                      step="any"
                      v-model="changePrice"
                      placeholder="Fiyati değiştir"
                    />
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="teklif"
                        v-model="priceControl"
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Fiyat Bilgisi İçin İletişime Geçiniz.{{ priceControl }}
                      </label>
                    </div>
                    <input
                      type="submit"
                      class="btn btn-outline-success ms-2 mt-2"
                    />
                    <p v-if="controlPrice == 2" class="p-0 m-0 text-success">
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
                    <p v-if="controlPrice == 3" class="p-0 m-0 text-danger">
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
              <div class="col-12 mt-3">
                <select v-model="currency" class="border-0">
                  <option value="" disable>Para birimini değiştir</option>
                  <option
                    v-for="a in currencies.data"
                    :key="a.id"
                    :value="a.id"
                  >
                    {{ a.currencyName }}
                  </option>
                </select>
                <button
                  @click.prevent="changeCurrency"
                  class="ms-2 btn btn-outline-success"
                >
                  Gönder
                </button>
              </div>
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

    <div id="myModalStok" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Stok Kontrol</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <span>Stok Miktari : {{ stock.unitInStock }}</span>
              </div>
              <div class="col-12 mt-3">
                <button
                  @click.prevent="removeStock"
                  class="btn btn-outline-danger"
                >
                  Çıkar
                </button>
                <input v-model="quantityy" class="mx-3 w-25" type="number" />
                <button
                  @click.prevent="addStock"
                  class="btn btn-outline-success"
                >
                  Ekle
                </button>
              </div>
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
import { mapActions, mapState } from "vuex";
import AddProduct from "@/components/AddProduct.vue";
export default {
  data() {
    return {
      products: {},
      selectedFile: null,
      selectedFileName: null,
      id: "BOŞ",
      key: "",
      value: "",
      details: [],
      search: "",
      controlPrice: "",
      changePrice: "",
      currencies: {},
      currency: "",
      stock: {},
      quantityy: 1,
      productImages: {},
      priceControl: false,
pageDiv:false,
      productsPage: {},
      page: 1,
      pageSize: 10,
    };
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "addProductImage",
      "fetchDetail",
      "detailUpdate",
      "detailAdd",
      "fetchproductdetils",
      "detailUpdate",
      "deleteDetail",
      "productDelete",
      "chanheProductPrice",
      "fetchCurrencies",
      "changeProductCurrency",
      "fetchProductStok",
      "increaseStok",
      "decreaseStok",
      "getProductImages",
      "deleteProductImages",
      "fetchProductsPage",
    ]),
    async deleteImage(id) {
      await this.deleteProductImages(id);
      this.productImages = await this.getProductImages(this.id);
    },
    async removeStock() {
      await this.decreaseStok({
        productId: this.id,
        quantity: this.quantityy,
      });
      this.stock = await this.fetchProductStok({ productId: this.id });
    },
    async addStock() {
      await this.increaseStok({
        productId: this.id,
        quantity: this.quantityy,
      });
      this.stock = await this.fetchProductStok({ productId: this.id });
    },

    async showStock(productId) {
      this.id = productId;
      this.stock = await this.fetchProductStok({ productId });
   
    },
    async changeCurrency() {
      await this.changeProductCurrency({
        productId: this.id,
        currencyId: this.currency,
      });
      this.productsPage = await this.fetchProductsPage({
        Page: this.page,
        PageSize: this.pageSize,
      });
    },
    async submitChangePrice() {
      if (this.priceControl != false) {
        this.changePrice = 1000000001;
        this.currency = 1;
        await this.changeCurrency();
      }

      await this.chanheProductPrice({
        productId: this.id,
        unitPrice: this.changePrice,
      });
      this.productsPage = await this.fetchProductsPage({
        Page: this.page,
        PageSize: this.pageSize,
      });
    },
    async prodel(id) {
      await this.productDelete({ id });
      this.productsPage = await this.fetchProductsPage({
        Page: this.page,
        PageSize: this.pageSize,
      });
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name;
    },
    async onUpload() {
      let formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFileName);
      formData.append("productId", this.id);
      await this.addProductImage(formData);
      this.productImages = await this.getProductImages(this.id);
    },
    async al(product) {
      this.id = product;
    },
    async alp(id) {
      this.id = id;
  
      this.productImages = await this.getProductImages(this.id);
     
    },
    async als(product) {
      this.id = product;
      this.details = await this.fetchproductdetils({ id: this.id });
    },
    async submitFormPro() {
      let key = this.key;
      let value = this.value;
      let productId = this.id;

      await this.detailAdd({ productId, key, value })
        .then((response) => {
          console.log("ok");
        })
        .catch((error) => {
       
        });

      this.details = await this.fetchproductdetils({ id: this.id });
    },
    async submitFormUpdate() {
      await this.detailUpdate({
        productId: this.id,
        key: this.key,
        value: this.value,
      });
      this.details = await this.fetchproductdetils({ id: this.id });
    },
    async deleteDet(productId) {
      let id = productId;
      await this.deleteDetail({ id });
      this.details = await this.fetchproductdetils({ id: this.id });
    },
    async goPageSize() {
      this.page = 1;
      this.productsPage = await this.fetchProductsPage({
        Page: 1,
        PageSize: this.pageSize,
      });
    },
    async nextPage() {
      if (this.page <= this.productsPage.data.pages - 1) {
        this.page++;
        this.productsPage = await this.fetchProductsPage({
          Page: this.page,
          PageSize: this.pageSize,
        });
      }
    },
    async beforePage() {
      if (this.page != 1) {
        this.page--;
        this.productsPage = await this.fetchProductsPage({
          Page: this.page,
          PageSize: this.pageSize,
        });
      }
    },
    async goPage(item) {
    
      this.page = item;
      this.productsPage = await this.fetchProductsPage({
        Page: this.page,
        PageSize: this.pageSize,
      });
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
    filteredItems() {
      return this.products.data.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  async mounted() {
    //this.products = await this.fetchProducts();

    this.productsPage = await this.fetchProductsPage({
      Page: this.page,
      PageSize: this.pageSize,
    });

    this.currencies = await this.fetchCurrencies();
  },
  components: {
    AddProduct,
  },
};
</script>

<style scoped>
.b {
  margin-top: 90px;
}
.tabloCustom {
  background-color: #283046;
  color: #fff !important;
  height: 600px;
  overflow-y: auto;
}
.tabloCustom table {
  color: #b4b7bd !important;
}
.tabloCustom1 {
  background-color: #283046;
  color: #fff !important;
  height: 300px;
  overflow-y: auto;
}
.tabloCustom1 table {
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
.inputCustom {
  border: 0;
  border-bottom: solid 1px black;
  color: #000 !important;
}
input[type="text"] {
  border: 0;
  border-bottom: solid 1px #b4b7bd;
  padding: 5px;
  color: white;
  background: transparent;
  transition: 0.5s;
}
input:focus {
  border-color: #555;
  background-color: #b4b7bd;
}
select {
  width: 200px;
  border: 0;
  border-bottom: 1px solid #fff;
  color: #e74c3c;
  background: transparent;
}
nav {
  height: 38px;
}
.a {
  cursor: pointer;
  background: transparent;
  color: gray;
}
.activeCustom {
  background: #e74c3c;
  color: white;
}
a{
  cursor: pointer;
}
</style>