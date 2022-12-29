<template>
  <div class="bckgrnd rounded-3">
    <div class="container mt-5 mb-5">
      <div class="card a">
        <div class="row g-0">
          <div
            class="
              col-md-6
              border-end
              d-flex
              justify-content-center
              align-items-center
              a
            "
          >
            <div class="d-flex flex-column">
              <div
                id="carouselExampleControls"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner" v-if="product.data">
                  <div
                    :class="['carousel-item', index == '0' ? 'active' : '']"
                    v-for="(item, index) in product.data.productImages"
                    :key="item.index"
                  >
                    <img
                      class="d-block w-100 img-fluid"
                      :src="baseUrl + item.imagePath"
                      alt=""
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center" v-if="product.data">
            <div class="p-3 right-side">
              <div class="d-flex justify-content-between align-items-center">
                <h3>{{ product.data.name }}</h3>
              </div>
              <div class="mt-2 pr-3 content">
                <p>
                  {{ product.data.shortDescription }}
                </p>
              </div>
              <h3>
                <p
                  v-if="
                    product.data.currencyId == 1 &&
                    product.data.unitPrice != 1000000001
                  "
                  class="text-muted fw-semibold m-0 fs-3"
                >
                  {{ product.data.unitPrice }}&#8378;
                </p>
                <p
                  v-if="product.data.currencyId == 2"
                  class="text-muted fw-semibold m-0 fs-3"
                >
                  &#36;{{ product.data.unitPrice }}
                </p>
                <p
                  v-if="product.data.currencyId == 3"
                  class="text-muted fw-semibold m-0 fs-3"
                >
                  &euro;{{ product.data.unitPrice }}
                </p>
                <p
                  v-if="
                    product.data.currencyId == 1 &&
                    product.data.unitPrice == 1000000001
                  "
                  class="text-muted fw-thin m-0 fs-3"
                >
                  <span class="d-none">{{ (priceControl = false) }} </span>

                  Teklif Alın
                </p>
              </h3>
              <div class="ratings d-flex flex-row align-items-center">
                <div class="d-flex flex-row">
                  <i class="bx bxs-star"></i> <i class="bx bxs-star"></i>
                  <i class="bx bxs-star"></i> <i class="bx bxs-star"></i>
                  <i class="bx bx-star"></i>
                </div>
                <p>
                  {{ product.data.longDescription }}
                </p>
              </div>
              <!-- <div class="mt-5">
                <span class="fw-bold">Color</span>
                <div class="colors">
                  <ul id="marker">
                    <li id="marker-1"></li>
                    <li id="marker-2"></li>
                    <li id="marker-3"></li>
                    <li id="marker-4"></li>
                    <li id="marker-5"></li>
                  </ul>
                </div>
              </div> -->
              <div class="mt-5" v-if="priceControl">
                <div class="quantity border d-inline p-3">
                  <button
                    class="btn btn-outline-dark border border-0 me-2 fw-bold"
                    @click="quantity > 0 ? (quantity -= 1) : 0"
                  >
                    -
                  </button>
                  <span class="quant-text m-2">{{ quantity }}</span>
                  <button
                    class="btn btn-outline-dark border border-0 ms-2 fw-bold"
                    @click="quantity += 1"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="buttons d-flex flex-row mt-5 gap-3">
                <button
                  @click="sepeteEkle"
                  class="btn btn-dark"
                  v-if="priceControl"
                >
                  SEPETE EKLE
                </button>
                <button
                  class="btn btn-outline-dark me-2 border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  Detay Gör
                </button>
                <br />

                <p v-if="control == 1" class="p-0 m-0 text-warning">
                  Bekleyiniz
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-hourglass-split text-warning"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
                    />
                  </svg>
                </p>
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
              </div>
              <p class="text-muted fw-bold mt-4" v-if="priceControl == false">
                DEMO VE FİYAT İÇİN İLETİŞİME GEÇİNİZ.
                <a
                  href="https://api.whatsapp.com/send/?phone=905427841585"
                  class="btn btn-outline-success"
                  target="_blank"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                    />
                  </svg>
                </a>
              </p>
              <p class="text-muted" v-if="priceControl == false">
                demo@evrenmakine.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="container">
        <div class="col"></div>
      </div>
    </div>

    <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detaylar</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col d-flex flex-column"></div>
            </div>
            <div class="row">
              <div class="col p-0 tabloCustom1">
                <div class="table-responsive">
                  <table class="table table-bordered align-middle">
                    <thead>
                      <tr class="text-center">
                        <th scope="col">Özellik</th>
                        <th scope="col">Değer</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider text-center">
                      <tr v-for="detail in details.data" :key="detail.id">
                        <td>{{ detail.key }}</td>

                        <td>
                          {{ detail.value }}
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
  </div>
</template>

<script>
import Onerilen from "@/components/Onerilen.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "ProductDetail",
  components: {
    Onerilen,
  },
  data() {
    return {
      control: 0,
      product: {},
      indexx: 0,
      quantity: 1,
      productId: this.$route.params.productId,
      ids: this.$store.state.userId,
      details: [],
      id: this.$route.params.productId,
      priceControl: true,
    };
  },
  computed: {
    ...mapState(["baseUrl", "userId", "shopCart"]),
  },
  async mounted() {
    this.product = await this.fetchProduct(this.$route.params.productId);
    this.quantity = 1;
    this.details = await this.fetchproductdetils({ id: this.id });

    this.changemenu();
  },
  methods: {
    ...mapActions([
      "changemenu",
      "fetchProduct",
      "addCardProduct",
      "addItemCart",
      "removeItemCart",
      "fetchDetail",
      "fetchproductdetils",
      'changeShopCountIncrease'
    ]),

    nextImage() {
      let slider = this.product.data.productImages;
      this.index++;
      if (this.index == slider.length) {
        this.index = 0;
      }
    },
    beforeImage() {
      if (this.index === 0) {
        this.index = 4;
      }
      this.index--;
    },
    sepetsil() {
      // let pro = this.product.data;
      // console.log(pro);
      // let index = this.shopCart.indexOf(this.product.data);
      // console.log(index);

      this.removeItemCart(this.product.data);

      // let pro = this.product.data;
      // console.log(pro);
    },
    sepeteEkle() {
      for (let i = 0; i < this.quantity; i++) {
        this.addItemCart(this.product.data)
          .then((response) => {
            this.control = 2;
          })
          .catch((error) => {
            this.control = 3;
          });
      }

      if (this.userId != "") {
        this.addCardProduct({
          userId: parseInt(this.userId),
          productId:parseInt(this.productId) ,
          quantity:parseInt(this.quantity) ,
        });
       
        this.changeShopCountIncrease()

      }

      //var testObject = { one: 1, two: 2, three: 3 };

      //localStorage.setItem("testObject", JSON.stringify(testObject));

      // Retrieve the object from storage
      //var retrievedObject = localStorage.getItem("testObject");

      //console.log("retrievedObject: ", JSON.parse(retrievedObject));

      //let userId = parseInt(this.ids);
      //let productId = parseInt(this.$route.params.productId);
      //let quantity = this.quantity;

      //localStorage.setItem( productId, JSON.stringify({ userId, productId, quantity }));

      // this.addCardProduct({ userId, productId, quantity })
      //   .then((response) => {
      //     this.control = 2;
      //   })
      //   .catch((err) => {
      //     this.control = 3;
      //   });
      // this.control = 1;
    },
  },
};
</script>

<style scoped>
.a {
  height: 550px;
}
.bckgrnd {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card {
  border: none;
  overflow: hidden;
}

.main_image {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  height: 400px;
  width: 100%;
  overflow: hidden;
}
.heart {
  height: 29px;
  width: 29px;
  background-color: #eaeaea;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content p {
  font-size: 12px;
}
.ratings span {
  font-size: 14px;
  margin-left: 12px;
}
.colors {
  margin-top: 5px;
}
.colors ul {
  list-style: none;
  display: flex;
  padding-left: 0px;
}
.colors ul li {
  height: 20px;
  width: 20px;
  display: flex;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}
.colors ul li:nth-child(1) {
  background-color: #6c704d;
}
.colors ul li:nth-child(2) {
  background-color: #96918b;
}
.colors ul li:nth-child(3) {
  background-color: #68778e;
}
.colors ul li:nth-child(4) {
  background-color: #263f55;
}
.colors ul li:nth-child(5) {
  background-color: black;
}
.right-side {
  position: relative;
}
.search-option {
  position: absolute;
  background-color: #000;
  overflow: hidden;
  align-items: center;
  color: #fff;
  width: 200px;
  height: 200px;
  border-radius: 49% 51% 50% 50% / 68% 69% 31% 32%;
  left: 30%;
  bottom: -250px;
  transition: all 0.5s;
  cursor: pointer;
}
.search-option .first-search {
  position: absolute;
  top: 20px;
  left: 90px;
  font-size: 20px;
  opacity: 1000;
}
.search-option .inputs {
  opacity: 0;
  transition: all 0.5s ease;
  transition-delay: 0.5s;
  position: relative;
}
.search-option .inputs input {
  position: absolute;
  top: 200px;
  left: 30px;
  padding-left: 20px;
  background-color: transparent;
  width: 300px;
  border: none;
  color: #fff;
  border-bottom: 1px solid #eee;
  transition: all 0.5s;
  z-index: 10;
}
.search-option .inputs input:focus {
  box-shadow: none;
  outline: none;
  z-index: 10;
}
.search-option:hover {
  border-radius: 0px;
  width: 100%;
  left: 0px;
}
.search-option:hover .inputs {
  opacity: 1;
}
.search-option:hover .first-search {
  left: 27px;
  top: 25px;
  font-size: 15px;
}
.search-option:hover .inputs input {
  top: 20px;
}
.search-option .share {
  position: absolute;
  right: 20px;
  top: 22px;
}
.buttons .btn {
  height: 50px;
  width: 150px;
  border-radius: 0px !important;
}
@media screen and (max-width: 800px) {
  .a {
    height: auto;
  }
}
.bb {
  width: 100%;
  height: 200px;
}
</style>