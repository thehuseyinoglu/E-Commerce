<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row">
        <div class="col p-2 tabloCustom">
          <div class="table-responsive Datatable">
            <table id="deneme" class="table table-sm align-middle">
              <thead class="tableThead " >
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">Müşteri</th>
                  <th scope="col">sipariş durumu</th>
                  <th scope="col">sipariş Tarihi</th>
                  <th scope="col">Total Ucret</th>
                  <th>Aksiyonlar</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="order in orders.data" :key="order.id">
                  <th class="p-2" scope="row">{{ order.id }}  </th>
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
                      >&euro;{{ order.unitPrice }}</span
                    >
                    <span
                      v-if="order.currencyId == 3"
                      class="text-muted fw-semibold m-0"
                      >&#36;{{ order.unitPrice }}</span
                    >
                    {{ order.totalPrice }}
                  </td>
                  <td>
                    <button
                      class="btn btn-outline-success me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      @click.prevent="al(order.id)"
                    >
                      Durum
                    </button>
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
            <h5 class="modal-title">Durum Değiştir</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <select v-model="stat">
              <option
                v-for="item in status.data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <button class="btn btn-outline-danger ms-2" @click="changeStat">
              Degiştir
            </button>
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
      orders: {},
      status: {},
      stat: "",
      orderDetail:{}
    };
  },
  methods: {
    ...mapActions([
      "fetchCatagories",
      "fetchOrders",
      "fetchStatus",
      "changeStatus",
     
    ]),
    async al(product) {
      this.id = product;
  
    },
    async changeStat() {
      await this.changeStatus({ id: this.id, statusId: this.stat })
        .then((response) => {
          console.log("tamam");
        })
        .catch((error) => {
          console.log("hata");
        });
      this.orders = await this.fetchOrders();
    },
   
  },
  async mounted() {
    this.orders = await this.fetchOrders();
    this.status = await this.fetchStatus();
    
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