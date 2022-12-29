<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row g-2 row-cols-1 row-cols-md-2 row-cols-xl-4">
        <div class="col">
          <div class="card cardCustom">
            <div class="card-body">
              <div class="row d-flex align-items-center">
                <div class="col-8 text-left">
                  <h3 class="floatEnd fw-semibold" v-if="products.data">
                    {{ products.data.count }} Adet
                  </h3>
                  <span>Toplam urun</span>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  <div
                    class="b-avatar badge-light-primary rounded-circle"
                    style="width: 64px; height: 64px"
                  >
                    <span class="b-avatar-custom"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        class="bi bi-bag-check productData"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card cardCustom">
            <div class="card-body">
              <div class="row d-flex align-items-center">
                <div class="col-8 text-left">
                  <h3 class="floatEnd fw-semibold" v-if="products.data">
                    {{ products.data.count }} Adet
                  </h3>
                  <span>Toplam urun</span>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  <div
                    class="b-avatar badge-light-primary rounded-circle"
                    style="width: 64px; height: 64px"
                  >
                    <span class="b-avatar-custom"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        class="bi bi-bag-check productData"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card cardCustom">
            <div class="card-body">
              <div class="row d-flex align-items-center">
                <div class="col-8 text-left">
                  <h3 class="floatEnd fw-semibold" v-if="products.data">
                    {{ orders.data.length }} Adet
                  </h3>
                  <span>Toplam Sipariş</span>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  <div
                    class="b-avatar badge-light-primary rounded-circle"
                    style="width: 64px; height: 64px"
                  >
                    <span class="b-avatar-custom"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        class="bi bi-bag-check productData"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card cardCustom">
            <div class="card-body">
              <div class="row d-flex align-items-center">
                <div class="col-8 text-left">
                  <h3 class="floatEnd fw-semibold" v-if="products.data">
                    {{ catagories.data.length }} Adet
                  </h3>
                  <span>Toplam Kategori</span>
                </div>
                <div class="col-4 d-flex justify-content-center">
                  <div
                    class="b-avatar badge-light-primary rounded-circle"
                    style="width: 64px; height: 64px"
                  >
                    <span class="b-avatar-custom"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        class="bi bi-bag-check productData"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row gy-3">
        <div class="col d-flex justify-content-center"></div>
        <div class="col d-flex justify-content-center"></div>
      </div>
      <div class="row mt-3 gy-3 d-flex justify-content-around">
        <div class="col-md-8 p-0 tabloCustom">
          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Müşteri</th>
                  <th scope="col">sipariş durumu</th>
                  <th scope="col">sipariş Tarihi</th>
                  <th scope="col">Total Ucret</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="order in orders.data" :key="order.id">
                  <th class="p-2" scope="row">
                    <button
                      class="btn btn-outline-success me-2 p-1 border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      @click.prevent="al(order.userId, order.id)"
                    >
                      {{ order.id }}
                    </button>
                  </th>
                  <td class="p-2">
                    {{ order.firstName }} {{ order.lastName }}
                  </td>
                  <td class="p-2 tableFont">{{ order.statusName }}</td>
                  <td class="p-2">{{ order.orderDate }}</td>
                  <td class="p-2 tableFont">
                    <span
                      v-if="order.currencyId == 1"
                      class="text-muted fw-semibold m-0"
                      >{{ order.unitPrice }}&#8378;</span
                    >
                    <span
                      v-if="order.currencyId == 2"
                      class="text-muted fw-semibold m-0 ms-1"
                      >&#36;{{ order.unitPrice }}</span
                    >
                    <span
                      v-if="order.currencyId == 3"
                      class="text-muted fw-semibold m-0"
                      >&euro;</span
                    >
                    {{ order.totalPrice }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-3 p-0 tabloCustom">
          <div class="table-responsive">
            <table class="table table-sm">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Kategori Adı</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="catagorie in catagories.data" :key="catagorie.id">
                  <td scope="row">{{ catagorie.id }}</td>
                  <th>{{ catagorie.name }}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detay</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col p-2 tabloCustom">
                  <div class="table-responsive">
                    <table class="table table-sm align-middle">
                      <thead class="tableThead">
                        <tr>
                          <th scope="col">Ürün Kodu</th>
                          <th scope="col">Ürün Adı</th>
                          <th scope="col">Adet</th>
                          <th scope="col">Destek Durumu</th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        <tr
                          v-for="(a, index) in detail.orderProductDtos"
                          :key="index"
                        >
                          <th class="p-2" scope="row">{{ a.productCode }}</th>
                          <td class="p-2">
                            {{ a.productName }}
                          </td>
                          <td class="p-2 tableFont">
                            {{ a.quantity }}
                          </td>
                          <td class="p-2 tableFont">
                            <button
                              @click="qrstatuss(a.productId)"
                              class="btn btn-outline-success mt-2"
                            >
                              Gör
                            </button>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot class="d-flex">
                        <div
                          class="d-flex"
                          v-for="item in status.data"
                          :key="item.id"
                        >
                          <p class="ms-3">{{ item.statusId }}</p>
                          <p v-if="item.statusId == {}">Destek bulunamadı</p>
                          <p v-if="item.statusId == 1">QR oluşturuldu</p>
                          <p v-if="item.statusId == 2">Ürün alındı</p>
                          <p v-if="item.statusId == 3">Ürün Verildi</p>
                        </div>
                      </tfoot>
                    </table>
                  </div>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      catagories: {},
      orders: {},
      products: {},
      detail: {},
      user: "",
      qrDetail: {},
      status: {},
      details: {},
    };
  },
  methods: {
    ...mapActions([
      "fetchCatagories",
      "fetchOrders",
      "fetchProducts",
      "detailOrder",
      "getQr",
      "qrStatus",
       "fetchProductsPage",
    ]),
    async al(id, order) {
      this.detail = await this.detailOrder({ id: order });
      this.user = id;
      this.status = {};
    },
    async qrstatuss(item) {
      this.qrDetail = await this.getQr({
        ownerId: this.user,
        productId: item,
      });

      this.qrDurumu(this.qrDetail.data[0].id)
     
    },
    async qrDurumu(item) {
      this.status = await this.qrStatus({ QRCodeId: item });
     
    },
  },
  async mounted() {
    this.catagories = await this.fetchCatagories();
    this.orders = await this.fetchOrders();
   // this.products = await this.fetchProducts();
     this.products = await this.fetchProductsPage({
      Page: 1,
      PageSize: 10,
    });
  
  },
};
</script>

<style scoped>
.b {
  margin-top: 70px;
  width: 100%;
}
.badge-light-primary {
  color: #7367f0 !important;
}
.b-avatar {
  text-align: center;
  font-size: 0.857rem;
  font-weight: 600;
  background-color: rgba(115, 103, 240, 0.12);
}
.b-avatar-custom {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-mask-image: radial-gradient(#fff, #000);
  mask-image: radial-gradient(#fff, #000);
}
.cardCustom {
  background-color: #283046;
  color: #d0d2d6;
  border-radius: 10px;
}
span {
  font-size: 14px;
  color: #b4b7bd;
  font-weight: 500;
  margin: 0;
}
h3 {
  color: #d0d2d6;
}
.productData {
  color: #7367f0;
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
</style>