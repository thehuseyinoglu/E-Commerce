<template>
  <div class="a bg-light">
    <div class="container">
      <!-- <div class="row m-0">
        <nav class="navbar navbar-expand-lg bg-light m-0 text-align-center">
          <button
            class="navbar-toggler border border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button
                  @click="catagoryProduct = ''"
                  class="btn border-0"
                  type="button"
                >
                  Anasayfa
                </button>
              </li>
              <li
                class="nav-item"
                v-for="(cate, index) in mainCategories.data"
                :key="index"
              >
                <a
                  @click="den(cate.id)"
                  class="nav-link active"
                  aria-current="page"
                >
                  {{ cate.name }}</a
                >
                <SubCatagoryNav :id="cate.id" />
              </li>
              <li class="nav-item">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Arama Yap..."
                />
              </li>
            </ul>
          </div>
        </nav>
      </div> -->
      <input
        class="search mt-3"
        v-model="searchs"
        type="text"
        placeholder="Arama Yap..."
      />
      <button @click="searchProduct" class="btn btn-outline-warning py-0">
        Ara
      </button>
      <div class="row m-0 mt-2">
        <div class="col">
          <div class="container">
            <nav class="navbar navbar-expand-lg">
              <div class="container-fluid position-relative">
                <button
                  class="navbar-toggler text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#nav"
                >
                  <span
                    id="aaaa"
                    class="navbar-toggler-icon text-dark fw-semibold"
                  ></span>
                  <span>Kategoriler</span>
                </button>
                <div class="collapse navbar-collapse" id="nav">
                  <ul class="navbar-nav list v">
                    <li class="nav-item cursor">
                      <a @click="den('')" class="nav-link">Anasayfa</a>
                    </li>
                    <li
                      class="
                        nav-item
                        dropdown
                        d-flex
                        aligin-items-center
                        cursor
                        active
                      "
                      v-for="(cate, index) in mainCategories.data"
                      :key="index"
                    >
                      <a
                        class="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        {{ cate.name }}</a
                      >

                      <SubCatagoryNav class="dropdown-menu" :id="cate.id" />
                    </li>
                    <li>
                      <div class="dropdown">
                        <button
                          class="btn fw-semibold dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Markalar
                        </button>
                        <ul class="dropdown-menu">
                          <li v-for="item in brands.data" :key="item.id">
                            <a
                              class="dropdown-item cursor"
                              @click="zen(item.id)"
                              >{{ item.name }}</a
                            >
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="container mt-2 mb-5">
        <div
          id="carouselExampleIndicators"
          class="carousel slide carouselCustom m-auto"
          data-bs-ride="true"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="4000">
              <img
                src="../assets/slider.png"
                class="img-fluid"
                alt="evrenmakine"
              />
            </div>
            <div
              class="carousel-item"
              v-for="item in imagesShop.data"
              :key="item.id"
              data-bs-interval="4000"
            >
              <img
                :src="baseUrl + item.imagePath"
                class="img-fluid"
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <!-- <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 shopboard"
        v-if="products.data"
      >
        <div
          class="col"
          v-for="(product, index) in filteredItems"
          :key="index"
          :class="[
            '',
            product.productCategories != null &&
            product.productCategories.some((e) => e.categoryId === shopNav)
              ? ''
              : 'yok',
          ]"
        >
          <ShopCard :product="product" />
        </div>
        <div
          class="col"
          v-for="(product, index) in filteredItems"
          :key="'all' + index"
          :class="['', shopNav == '' ? '' : 'yok']"
        >
          <ShopCard :product="product" />
        </div> -->

      <div class="row">
        <div class="col">
          <select class="mb-3" v-model="pageSize" placeholder="asdasd">
            <option value="10">10 ürün göster</option>
            <option value="20">20 ürün göster</option>
            <option value="30">30 ürün göster</option>
            <option value="50">50 ürün göster</option>
          </select>
          <button @click="goPageSize" class="btn btn-outline-success py-0 ms-2">
            Listele
          </button>
        </div>
      </div>

      <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 shopboard"
        v-if="productsPage.data"
      >
        <div
          class="col"
          v-for="product in productsPage.data.items"
          :key="product.id"
        >
          <ShopCard :product="product" />
        </div>
      </div>

      <div class="row row-cols-1">
        <div class="col d-flex justify-content-center position-relative">
          <!-- <nav class="my-3" aria-label="Page navigation example">
            <ul class="pagination m-1" v-if="productsPage.data">
              <li class="page-item">
                <a
                  @click="beforePage"
                  class="page-link cursor"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="(item, index) in productsPage.data.pages"
                :key="index"
                class="page-item pageCustom"
              >
                <a
                  @click="goPage(index + 1)"
                  class=""
                  :class="[
                    'page-link cursor',
                    index + 1 === page ? 'activeCustom' : '',
                  ]"
                  >{{ index + 1 }}</a
                >
              </li>

              <li class="page-item">
                <a @click="nextPage" class="page-link cursor" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> -->
          <div class="position-absolute bottom-0 start-50 translate-middle-x">
            <div
              v-if="pageDiv && !search"
              class="p-2 bg-white row row-cols-5 ani"
            >
              <div
                class=""
                :class="[
                  ' cursor col pageNumber text-center',
                  index + 1 === page ? 'activeCustom' : '',
                ]"
                v-for="(item, index) in productsPage.data.pages"
                :key="index"
              >
                <a @click="goPage(index + 1)">{{ index + 1 }}</a>
              </div>
            </div>

            <div
              v-if="pageDiv && search"
              class="p-2 bg-white row row-cols-5 ani"
            >
              <div
                class=""
                :class="[
                  ' cursor col pageNumber text-center',
                  index + 1 === page ? 'activeCustom' : '',
                ]"
                v-for="(item, index) in productsPage.data.pages"
                :key="index"
              >
                <a @click="goPageSearch(index + 1)">{{ index + 1 }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!search" class="row row-cols-1">
        <div class="col d-flex justify-content-center">
          <div class="d-flex align-items-center p-3 bg-white">
            <button
              class="btn btn-outline-dark p-1 border border-3"
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
            </button>

            <span class="my-0 mx-3">Sayfa: {{ page }}</span>

            <button
              class="btn btn-outline-dark p-1 border border-3"
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
            </button>
            <a type="button" class="p-1 text-dark" @click="pageDiv = !pageDiv">
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

      <div v-if="search" class="row row-cols-1">
        <div class="col d-flex justify-content-center">
          <div class="d-flex align-items-center p-3 bg-white">
            <button
              class="btn btn-outline-dark p-1 border border-3"
              @click="beforePageSearch"
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
            </button>

            <span class="my-0 mx-3">Sayfa: {{ page }}</span>

            <button
              class="btn btn-outline-dark p-1 border border-3"
              @click="nextPageSearch"
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
            </button>
            <a type="button" class="p-1 text-dark" @click="pageDiv = !pageDiv">
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

      <div
        class="mt-3 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 shopboard"
        v-if="catalogs.data"
      >
        <!-- <div
          class="col"
          v-for="(product, index) in filteredItems"
          :key="index"
          :class="[
            '',
            product.productCategories != null &&
            product.productCategories.some((e) => e.categoryId === shopNav)
              ? ''
              : 'yok',
          ]"
        >
          <ShopCard :product="product" />
        </div> -->

        <div
          v-for="item in catalogs.data"
          :key="'catalog' + item.id"
          :class="['col', 'marka' + item.brandId == shopNav ? '' : 'yok']"
        >
          <div
            class="card border-dark mb-3 position-relative"
            style="max-width: 18rem"
          >
            <span
              class="
                position-absolute
                top-0
                start-50
                translate-middle
                badge
                rounded-pill
                bg-danger
              "
              >pdf<span class="visually-hidden">unread messages</span></span
            >
            <div class="card-header">{{ item.brandName }}</div>
            <div class="card-body text-dark">
              <a
                class="text-decoration-none"
                target="_blank"
                :href="baseUrl + item.path"
              >
                <p class="card-text text-warning fw-semibold">
                  {{ item.name }}
                </p></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCard from "@/components/Shop/ShopCard.vue";
import { mapActions, mapState } from "vuex";
import SubCatagoryNav from "@/components/SubCatagoryNavbar.vue";
export default {
  data() {
    return {
      products: {},
      productCate: [],
      catagories: {},
      subCatagories: {},
      catagoryProduct: "",
      searchs: "",
      mainCategories: {},
      imagesShop: {},
      key: "magaza",
      catalogs: {},
      brands: {},
      productsPage: {},
      page: 1,
      pageSize: 10,
      pageDiv: false,
      apiCart: [],
    };
  },

  computed: {
    ...mapState(["shopNav", "baseUrl", "search", "userId"]),
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

    this.brands = await this.fetchBrands();
    this.catalogs = await this.fetchPdf();
    this.catagories = await this.fetchCatagories();
    this.mainCategories = await this.fetchCatagoriesMain();

    this.imagesShop = await this.fetchImage(this.key);
    this.changesearchf();
    this.changemenu();
    this.apiCart = await this.getCardProduct(this.userId);
    if (this.userId != "" && this.apiCart != []) {
      console.log(this.apiCart);
      this.setShopCount(this.apiCart);
    }
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "fetchCatagories",
      "changemenu",
      "fetchSubCategorys",
      "fetchCatagoriesMain",
      "setShopNav",
      "fetchImage",
      "fetchPdf",
      "fetchBrands",
      "fetchProductsPage",
      "fetchProductsPageCategory",
      "fetchProductsPageSearch",
      "fetchProductsPageSearch",
      "changesearchf",
      "changesearch",
      "setShopCount",
      "getCardProduct",
    ]),

    async categoryProduct(item) {
      this.page = 1;
      this.productsPage = await this.fetchProductsPageCategory({
        id: item,
        Page: 1,
        PageSize: this.pageSize,
      });
    },
    async searchProduct() {
      this.setShopNav("");
      this.changesearch();
      this.page = 1;
      this.productsPage = await this.fetchProductsPageSearch({
        searchQuery: this.searchs,
        Page: 1,
        PageSize: this.pageSize,
      });
    },

    async nextPage() {
      if (this.page <= this.productsPage.data.pages - 1) {
        this.page++;
        if (this.shopNav != "") {
          this.productsPage = await this.fetchProductsPageCategory({
            id: this.shopNav,
            Page: this.page,
            PageSize: this.pageSize,
          });
        } else {
          this.productsPage = await this.fetchProductsPage({
            Page: this.page,
            PageSize: this.pageSize,
          });
        }
      }
    },
    async beforePage() {
      if (this.page != 1) {
        this.page--;

        if (this.shopNav != "") {
          this.productsPage = await this.fetchProductsPageCategory({
            id: this.shopNav,
            Page: this.page,
            PageSize: this.pageSize,
          });
        } else {
          this.productsPage = await this.fetchProductsPage({
            Page: this.page,
            PageSize: this.pageSize,
          });
        }
      }
    },
    async goPage(item) {
      this.page = item;

      if (this.shopNav != "") {
        this.productsPage = await this.fetchProductsPageCategory({
          id: this.shopNav,
          Page: this.page,
          PageSize: this.pageSize,
        });
      } else {
        this.productsPage = await this.fetchProductsPage({
          Page: this.page,
          PageSize: this.pageSize,
        });
      }
    },

    async nextPageSearch() {
      if (this.page <= this.productsPage.data.pages - 1) {
        this.page++;
        this.productsPage = await this.fetchProductsPageSearch({
          searchQuery: this.searchs,
          Page: this.page,
          PageSize: this.pageSize,
        });
      }
    },
    async beforePageSearch() {
      if (this.page != 1) {
        this.page--;

        this.productsPage = await this.fetchProductsPageSearch({
          searchQuery: this.searchs,
          Page: this.page,
          PageSize: this.pageSize,
        });
      }
    },
    async goPageSearch(item) {
      this.page = item;

      this.productsPage = await this.fetchProductsPageSearch({
        searchQuery: this.searchs,
        Page: this.page,
        PageSize: this.pageSize,
      });
    },

    async goPageSize() {
      this.productsPage = await this.fetchProductsPage({
        Page: 1,
        PageSize: this.pageSize,
      });
    },

    async den(item) {
      this.changesearchf();
      this.setShopNav(item);
      this.productsPage = await this.fetchProductsPage({
        Page: 1,
        PageSize: this.pageSize,
      });
    },
    zen(item) {
      this.changesearchf();
      this.pageDiv = false;
      this.setShopNav("marka" + item);
    },
    getProductCategory(product) {
      this.productCate = product.productCategories.map(function (element) {
        return element.categoryId;
      });
    },
  },
  watch: {
    async shopNav() {
      if (this.shopNav != "") {
        this.productsPage = this.categoryProduct(this.shopNav);
      }
    },
  },
  components: {
    ShopCard,
    SubCatagoryNav,
  },
};
</script>

<style  scoped>
.ani {
  transition: display 0.5s;
}

.a {
  margin-top: 110px;
  min-height: 100vh;
}

.catagoryButton {
  border: none;
}
.yok {
  display: none;
}
.carouselCustom {
  max-width: 1100px;
}
.dropdown-menu li {
  position: relative;
}
.dropdown-menu .submenu {
  display: none;
  position: absolute;
  left: 100%;
  top: -7px;
}
.dropdown-menu > li:hover > .submenu {
  display: block;
}
.search {
  border: 0;
  border-bottom: solid 1px #000;
  background: transparent;
  color: dark;
}
.list li a {
  color: #283046;
  font-weight: 600;
  text-transform: capitalize;
}
.cursor {
  cursor: pointer;
}
.cursor:hover a {
  color: coral !important;
}
.v {
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
}
.shopboard {
  min-height: 200px;
}
#aaaa {
  color: red !important;
}
select {
  width: 200px;
  border: 0;
  border-bottom: 1px solid #000;
  background: transparent;
}
.pageCustom {
  margin-right: 2px;
  margin-left: 2px;
  border-radius: 3px;
}
.pageCustom a {
  border-radius: 50px;
}
.activeCustom {
  color: white;
  background-color: coral;
}
</style>