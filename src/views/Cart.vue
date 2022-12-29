<template>
  <div class="carts">
    <div class="card">
      <div class="row">
        <div v-if="counts == 0" class="col-md-8 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4>
                  <b
                    >SEPET
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      class="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      /></svg
                  ></b>
                </h4>
              </div>
            </div>
          </div>
          <div v-if="userId == ''" class="cartWrap">
            <div v-for="(card, index) in realCards" :key="index">
              <div class="row border-top border-bottom">
                <div class="row main align-items-center">
                  <div class="col-2">
                    <img
                      class="img-fluid"
                      v-if="card.productImages"
                      :src="baseUrl + card.productImages[0].imagePath"
                    />
                    <img class="img-fluid" v-else src="../assets/foto1.png" />
                  </div>
                  <div class="col">
                    <div class="row">{{ card.name }}</div>
                    <div class="row text-muted">
                      {{
                        card.shortDescription.length > 26
                          ? card.shortDescription.slice(0, 26) + "..."
                          : card.shortDescription
                      }}
                    </div>
                  </div>
                  <div class="col">
                    <div
                      class="d-flex flex-row justify-content-between"
                      v-for="(value, key, index) in qua"
                      :key="index"
                    >
                      <p
                        @click.prevent="add(card)"
                        class="text-muted p-1 border border-1 b1"
                        v-if="key == card.id"
                      >
                        ekle
                      </p>
                      <p  class="text-muted" v-if="key == card.id">
                        {{ value }} Adet
                      </p>

                      <p
                        @click.prevent="remove(card)"
                        class="text-muted p-1 border border-1 b1"
                        v-if="key == card.id"
                      >
                        cikar
                      </p>
                      <div v-if="key == card.id">
                        <div v-if="card.currencyId == 1">
                          {{ card.unitPrice * value }}&#8378;
                        </div>
                        <div v-if="card.currencyId == 2">
                          &euro;{{ card.unitPrice * value }}
                        </div>
                        <div v-if="card.currencyId == 3">
                          &#36;{{ card.unitPrice * value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="userId != ''" class="cartWrap">
            <div v-for="(card, index) in apiCart" :key="index">
              <div class="row border-top border-bottom">
                <div class="row main align-items-center">
                  <div class="col-2">
                    <img
                      class="img-fluid"
                      v-if="card.productImages"
                      :src="baseUrl + card.productImages[0].imagePath"
                    />
                    <img class="img-fluid" v-else src="../assets/foto1.png" />
                  </div>
                  <div class="col">
                    <div class="row">{{ card.productName }}</div>
                    <div class="row text-muted">
                      {{
                        card.productShortDesc.length > 26
                          ? card.productShortDesc.slice(0, 26) + "..."
                          : card.productShortDesc
                      }}
                    </div>
                  </div>
                  <div class="col">
                    <div class="d-flex flex-row justify-content-between">
                      <p
                        @click.prevent="addApi(card.productId)"
                        class="text-muted p-1 border border-1 b1"
                      >
                        ekle
                      </p>
                      <p  class="text-muted">
                        {{ card.quantity }} Adet
                      </p>

                      <p
                        @click.prevent="removeApi(card.productId)"
                        class="text-muted p-1 border border-1 b1"
                      >
                        cikar
                      </p>
                      <div>
                        <div>{{ card.totalPrice }}{{ card.currencyName }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="back-to-shop">
            <a >&leftarrow;</a
            ><router-link to="/magaza"
              ><span v-if="counts == 0" class="text-muted"
                >Mağazaya Dön</span
              ></router-link
            >
          </div>
        </div>

        <div v-if="counts == 1" class="col-md-8 cart">
          <Login />
          <div class="mt-5 d-flex justify-content-between">
            <a @click="counts--" class="text-muted me-5">Geri</a>
            <a
              v-if="this.userId !== ''"
              @click="ileri"
              class="text-white p-2 bg-success me-5"
              >Ileri</a
            >
          </div>
        </div>

        <div v-if="counts == 5" class="col-md-8 cart">
          <div class="row">
            <div class="col">
              <h4><b>Adres Seçin - Ekleyin</b></h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <select v-model="adresId" class="border-0">
                <option disabled value="">Ekli Adresler</option>
                <option v-for="c in Adress.data" :key="c.id" :value="c.id">
                  {{ c.addressName }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <select v-model="country" class="border-0">
                <option disabled value="">Ülke Seçimi Yapınız</option>
                <option v-for="a in countries.data" :key="a.id" :value="a.id">
                  {{ a.name }}
                </option>
              </select>
            </div>
            <div class="col">
              <select v-model="city" class="border-0">
                <option disabled value="">Şehir Seçimi Yapınız</option>
                <option v-for="a in cities.data" :key="a.id" :value="a.id">
                  {{ a.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row row-cols-2">
            <div class="col">
              <input
                v-model="name"
                class="mb-2"
                type="text"
                placeholder="İsim"
              />
            </div>
            <div class="col">
              <input
                v-model="surname"
                class="mb-2"
                type="text"
                placeholder="Soyisim"
              />
            </div>
            <div class="col">
              <input
                v-model="phoneNumber"
                class="mb-2"
                type="number"
                placeholder="Telefon numarası"
              />
            </div>
            <div class="col">
              <input
                v-model="postalCode"
                class="mb-2"
                type="number"
                placeholder="Posta Kodu"
              />
            </div>
          </div>
          <div class="row row-cols-1">
            <div class="col">
              <input
                v-model="addressName"
                class="mb-2"
                type="text"
                placeholder="Adres İsmi Girin"
              />
            </div>
            <div class="col">
              <input
                v-model="address1"
                class="mb-2"
                type="text"
                placeholder="Adresi Yazın"
              />
            </div>
            <div class="col">
              <input
                v-model="address2"
                class="mb-2"
                type="text"
                placeholder="Detaylı Adres Açıklma"
              />
            </div>
          </div>
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
          <button
            @click.prevent="addAdress"
            class="btn btn-dark w-50 ms-2 mt-2"
          >
            Adres Ekle
          </button>
          <div class="mt-5 d-flex justify-content-between">
            <a @click="counts--" class="text-muted me-5">Geri</a>
          </div>
        </div>
        <div v-if="counts == 4" class="col-md-8 cart">
          <div class="row">
            <div class="col">
              <h4><b>Ödeme Para Birimini Seçiniz</b></h4>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <select v-model="currency" class="border-0">
                <option v-for="a in currencies.data" :key="a.id" :value="a.id">
                  {{ a.currencyName }}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-5 d-flex justify-content-between">
            <a @click="counts = counts - 4" class="text-muted me-5 border-0"
              >Geri</a
            >
          </div>
        </div>

        <div class="col-md-4 summary">
          <div>
            <span :class="['', counts === 3 ? 'text-danger' : '']">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
          <div>
            <h5><b>ÖZET</b></h5>
          </div>
          <hr />
          <div class="row">
            <div class="col" style="padding-left: 0">
              {{ cards.length }} Ürün
            </div>
          </div>
          <form>
            <p>KARGO</p>
            <select>
              <option class="text-muted">STANDART KARGO</option>
            </select>
            <p>KAMPANYA KODU</p>
            <input id="code" placeholder="Kodu giriniz" />
          </form>
          <div
            class="row"
            style="border-top: 1px solid rgba(0, 0, 0, 0.1); padding: 2vh 0"
          ></div>
          <button v-if="counts == 0" @click="toBuy" class="btn toBuy1">
            ÖDEME SAYFASI
          </button>

          <button v-if="counts == 9" @click="comfirm1" class="btn toBuy1">
            SEPETI ONAYLA
          </button>
          <button v-if="counts == 4" @click="doElement" class="btn toBuy1">
            Devam Et
          </button>
          <span v-if="counts == 5 && adresId == ''">ADRESİ SEÇİNİZ</span>

          <p v-if="control == 5" class="p-0 m-0 text-success">
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
          <p v-if="control == 6" class="p-0 m-0 text-danger">
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

          <button
            v-if="counts == 5 && adresId != ''"
            class="btn toBuy1"
            @click.prevent="order"
          >
            Siparişi Oluştur
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Login from "@/components/Shop/ShopLogin.vue";
import Comfirm from "@/components/Shop/ShopComfirm.vue";

export default {
  data() {
    return {
      ids: this.$store.state.userId,
      cards: [],
      realCards: [],
      totalProductPrice: 0,
      totalProductQuantity: 0,
      lenght: 45,
      qua: {},
      counts: 0,
      ids: this.$store.state.userId,
      denemeC: {},
      currency: 1,
      currencies: {},
      cities: [],
      city: "",
      countries: [],
      country: "",
      addressName: "",
      name: "",
      phoneNumber: "",
      surname: "",
      address1: "",
      address2: "",
      postalCode: "",
      Adress: {},
      adresId: "",
      control: 0,
      selectAddress: "",
      orderProductDtos: [],
      apiCart: {},
    };
  },
  components: {
    Login,
    Comfirm,
  },
  methods: {
    ...mapActions([
      "fetchCard",
      "changemenu",
      "addCardProduct",
      "setShopCart",
      "addItemCart",
      "removeItemCart",
      "fetchCurrencies",
      "deleteCard",
      "fetchCountries",
      "fetchCities",
      "fetchAddress",
      "addAddress",
      "addOrder",
      "getCardProduct",
      "increaseProduct",
      "decraseProduct",
      "changeShopCountIncrease",
      "changeShopCountDecrease",
      "setShopCount",
    ]),
    async addAdress() {
      await this.addAddress({
        userId: parseInt(this.ids),
        cityId: this.city,
        countryId: parseInt(this.country),
        addressName: this.addressName,
        name: this.name,
        surname: this.surname,
        phoneNumber: parseInt(this.phoneNumber),
        address1: this.address1,
        address2: this.address2,
        postalCode: parseInt(this.postalCode),
      })
        .then((response) => {
          this.control = 2;
        })
        .catch((error) => {
          this.control = 3;
        });
      this.Adress = await this.fetchAddress({ userId: this.ids });
    },
    async order() {
      await this.addOrder({
        userId: parseInt(this.userId),
        paymentId: 1,
        addressId: this.adresId,
        requiredDate: "",
        shippedDate: "",
        comment: "",
        allowed: true,
        couponCode: "",
        orderProductDtos: this.orderProductDtos,
        currencyId: this.currency,
      })
        .then((response) => {
          this.control = 5;
          this.setShopCart([]);
          console.log("ekle");
        })
        .catch((error) => {
          this.control = 6;
        });

      await this.deleteCard({ userId: parseInt(this.userId) });
    },

    totalquantity() {
      // let total = 0;
      // for (let p of this.cards.data) {
      //   total += p.quantity;
      // }

      // return total;

      var count = {};
      this.cards.forEach(function (i) {
        count[i.id] = (count[i.id] || 0) + 1;
      });
      return count;
    },
    async deleteCards() {
      let userId = this.ids;
      await this.deleteCard({ userId });
      this.counts = 3;
    },
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    async toBuy() {
      if (this.userId == "") {
        this.counts = 1;
      }
      if (this.userId !== "") {
        this.currencies = await this.fetchCurrencies();
        this.cities = await this.fetchCities();
        this.countries = await this.fetchCountries();
        this.Adress = await this.fetchAddress({ userId: this.ids });
        this.counts = 4;
      }
    },
    geri() {
      this.counts = this.counts - 3;
    },
    async ileri() {
      for (let i = 0; i < this.realCards.length; i++) {
        for (let j in this.qua) {
          if (this.realCards[i].id == j) {
            let productId = parseInt(this.realCards[i].id);
            let quantity = this.qua[j];

            this.addCardProduct({
              userId: parseInt(this.userId),
              productId,
              quantity,
            });
          }
        }
      }
      this.apiCart = await this.getCardProduct(this.userId);
      this.currencies = await this.fetchCurrencies();
      this.cities = await this.fetchCities();
      this.countries = await this.fetchCountries();
      this.Adress = await this.fetchAddress({ userId: parseInt(this.userId) });
      this.counts = 4;
    },

    async doElement() {
      this.orderProductDtos = [];

      // for (let i = 0; i < this.apiCart.length; i++) {
      //   for (let j in this.qua) {
      //     if (this.realCards[i].id == j) {
      //       let product = parseInt(this.realCards[i].id);
      //       let quantit = this.qua[j];

      //       this.orderProductDtos.push({
      //         productId: product,
      //         quantity: quantit,
      //       });

      //       // this.orderProductDtos.push(element);
      //     }
      //   }
      // }

      this.apiCart.forEach((element) => {
        let productIds = element.productId;
        let productQuantetys = element.quantity;
        this.orderProductDtos.push({
          productId: productIds,
          quantity: productQuantetys,
        },);
      });
      console.log(this.orderProductDtos);
      this.counts++;
      localStorage.removeItem("cart");
      // let userId = this.ids;
      // await this.deleteCard({ userId });
    },

    comfirm1() {
      let userId = parseInt(this.ids);

      for (let i = 0; i < this.realCards.length; i++) {
        for (let j in this.qua) {
          if (this.realCards[i].id == j) {
            let productId = parseInt(this.realCards[i].id);
            let quantity = this.qua[j];

            this.addCardProduct({ userId, productId, quantity })
              .then((response) => {
                this.counts = 4;
              })
              .catch((err) => {});
          }
        }
      }

      //  this.addCardProduct({ userId, productId, quantity })
      //   .then((response) => {
      //     this.control = 2;
      //   })
      //   .catch((err) => {
      //     this.control = 3;
      //   });
      // this.control = 1;
    },
    goster() {
      let userId = this.ids;
      this.denemeC = this.fetchCard(userId);
    },
    add(product) {
      this.addItemCart(product);
      this.cards = JSON.parse(localStorage.getItem("cart"));

      this.qua = this.totalquantity();
    },
    remove(product) {
      this.removeItemCart(product);
      this.cards = JSON.parse(localStorage.getItem("cart"));

      this.qua = this.totalquantity();
    },

    async addApi(item) {
      await this.increaseProduct({ userId: this.userId, productId: item });
      await this.changeShopCountIncrease();
      this.apiCart = await this.getCardProduct(this.userId);
    },
    async removeApi(item) {
      await this.decraseProduct({ userId: this.userId, productId: item });
      await this.changeShopCountDecrease();
      this.apiCart = await this.getCardProduct(this.userId);
    },
  },
  async mounted() {
    this.changemenu();
    // let userId = this.ids;
    // this.cards = await this.fetchCard(userId);
    if (localStorage.getItem("cart") !== null && this.userId == "") {
      this.cards = JSON.parse(localStorage.getItem("cart"));

      this.qua = this.totalquantity();
      //karta islem cak ordan donenleri yaz
      this.realCards = this.getUniqueListBy(this.cards, "id");
    } else {
      this.apiCart = await this.getCardProduct(this.userId);
    }
    if (this.userId != "" && this.apiCart != []) {
      console.log(this.apiCart);
      this.setShopCount(this.apiCart);
    }
    // this.totalProductQuantity = this.totalquantity();
  },
  computed: {
    ...mapState(["baseUrl", "userId"]),
  },
};
</script>

<style scoped>
.carts {
  min-height: 100vh;
  vertical-align: middle;
  display: flex;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 100px;
}
.title {
  margin-bottom: 5vh;
}
.card {
  margin: auto;
  max-width: 950px;
  width: 90%;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  border: transparent;
}
@media (max-width: 767px) {
  .card {
    margin: 3vh auto;
  }
}
.cart {
  background-color: #fff;
  padding: 4vh 5vh;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
}
@media (max-width: 767px) {
  .cart {
    padding: 4vh;
    border-bottom-left-radius: unset;
    border-top-right-radius: 1rem;
  }
}
.summary {
  background-color: #ddd;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4vh;
  color: rgb(65, 65, 65);
}
@media (max-width: 767px) {
  .summary {
    border-top-right-radius: unset;
    border-bottom-left-radius: 1rem;
  }
}
.summary .col-2 {
  padding: 0;
}
.summary .col-10 {
  padding: 0;
}
.row {
  margin: 0;
}
.title b {
  font-size: 1.5rem;
}
.main {
  margin: 0;
  padding: 2vh 0;
  width: 100%;
}
.col-2,
.col {
  padding: 0 1vh;
}
a {
  padding: 0 1vh;
}
.close {
  margin-left: auto;
  font-size: 0.7rem;
}
img {
  width: 3.5rem;
}
.back-to-shop {
  margin-top: 4.5rem;
}
h5 {
  margin-top: 4vh;
}
hr {
  margin-top: 1.25rem;
}
form {
  padding: 2vh 0;
}
select {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1.5vh 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
}
input {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1vh;
  margin-bottom: 4vh;
  outline: none;
  width: 100%;
  background-color: rgb(247, 247, 247);
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}
.btn {
  background-color: #000;
  border-color: #000;
  color: white;
  width: 100%;
  font-size: 0.7rem;
  margin-top: 4vh;
  padding: 1vh;
  border-radius: 0;
}
.btn:focus {
  box-shadow: none;
  outline: none;
  box-shadow: none;
  color: white;
  -webkit-box-shadow: none;

  transition: none;
}
.btn:hover {
  color: white;
}
a {
  color: black;
}
a:hover {
  color: black;
  text-decoration: none;
}
#code {
  background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.253),
      rgba(255, 255, 255, 0.185)
    ),
    url("https://img.icons8.com/small/16/000000/long-arrow-right.png");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: center;
}
.toBuy1:hover {
  color: black;
  background: white;
}
.cartWrap {
  height: 400px;
  overflow-x: hidden;
}
a {
  cursor: pointer;
}
.b1 {
  cursor: pointer;
}
</style>