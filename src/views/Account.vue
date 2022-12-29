<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row">
        <div class="col"><h1 class="text-white">Siparislerim</h1></div>
      </div>
      <div class="row">
        <div class="col p-2 tabloCustom">
          <div class="table-responsive">
            <table class="table table-sm align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">Sipariş Detayı - Id</th>
                  <th scope="col">Müşteri</th>
                  <th scope="col">sipariş Tarihi</th>
                  <th scope="col">sipariş durumu</th>
                  <th scope="col">Total Ucret</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="(order, index) in orders.data" :key="index">
                  <th class="p-2" scope="row">
                    <button
                      class="btn btn-outline-success me-2 p-1 border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      @click.prevent="al(order.id)"
                    >
                      {{ order.id }}
                    </button>
                  </th>
                  <td class="p-2">
                    {{ order.firstName }} {{ order.lastName }}
                  </td>
                  <td class="p-2">{{ order.orderDate }}</td>
                  <td class="p-2 tableFont">{{ order.statusName }}</td>
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
                          <th scope="col">Ürün Id</th>
                          <th scope="col">Teknik Servis</th>
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
                          <td class="p-2 tableFont">{{ a.quantity }}</td>
                          <td class="p-2 tableFont">{{ a.productId }}</td>
                          <td class="p-2 tableFont">
                            <a
                              @click="addQr(a.productId)"
                              class="btn btn-outline-warning"
                            >
                              Destek</a
                            >
                            <a
                              @click="qrstatuss(a.productId)"
                              class="btn btn-outline-success mt-2"
                            >
                              Destek Durumu</a
                            >
                          </td>
                        </tr>
                      </tbody>
                      <tfoot class="d-flex">
                        <div
                          class="d-flex"
                          v-for="item in statusr.data"
                          :key="item.id"
                        >
                          <p class="ms-3">{{ item.statusId }}</p>
                          <p v-if="item.statusId == 1">QR oluşturuldu</p>
                          <p v-if="item.statusId == 2">Ürün alındı</p>
                          <p v-if="item.statusId == 3">Ürün Verildi</p>
                        </div>
                      </tfoot>
                    </table>
                    <div
                      class="alert alert-danger"
                      v-if="alertControl"
                      role="alert"
                    >
                      Destek Talebiniz sistemde mevcuttur. Lütfen
                      <strong>Destek Durumu</strong>'ndan kontrol ediniz!
                    </div>
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
import { req } from "vuelidate/lib/validators/common";
import router from "@/router";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      ids: this.$store.state.userId,
      orders: {},
      statusr: "",
      stat: "",
      detail: {},
      qrDetail: {},
      control: [],
     
      alertControl: false,
    };
  },
  computed: {
    ...mapState(["userId"]),
  },
  methods: {
    ...mapActions([
      "fetchOrderDetail",
      "changemenu",
      "detailOrder",
      "userAddQr",
      "getQr",
      "qrStatus",
      "readAndGetQrId",
    ]),
    async al(order) {
      this.detail = await this.detailOrder({ id: order });
      this.statusr = "";
    },
    async addQr(item) {
      let request = {
        userId: 0,
        qrCodeCreateRequest: {
          ownerId: 0,
          productId: 0,
        },
      };
      request.userId = parseInt(this.ids);
      request.qrCodeCreateRequest.ownerId = parseInt(this.ids);
      request.qrCodeCreateRequest.productId = item;

      this.control = await this.readAndGetQrId({
        ownerId: parseInt(this.ids),
        productId: item,
      });

      if (this.control.data.length == 0) {
        console.log("qr yok");
        this.userAddQr(request);
        
        window.location.href = `/destek/${item}`;
      } else {
        console.log("qr var");
        this.alertControl = true;
      }

      //:href="`/destek/${a.productId}`"
    },
    async qrstatuss(item) {
      this.qrDetail = await this.getQr({
        ownerId: this.userId,
        productId: item,
      });
      this.alertControl = false;
      this.qrDurumu(this.qrDetail.data[0].id);
    },
    async qrDurumu(item) {
      this.statusr = await this.qrStatus({ QRCodeId: item });
      console.log(this.statusr);
    },
  },
  async mounted() {
    this.changemenu();
    console.log(this.orders);
    this.orders = await this.fetchOrderDetail({ id: this.ids });
  },
};
</script>

<style  scoped>
.b {
  margin-top: 150px;
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