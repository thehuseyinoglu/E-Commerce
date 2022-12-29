<template>
  <div class="carts1">
    <div class="card1">
      <div class="row">
        <div v-if="counts == 0" class="col cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4>
                  <b
                    >SEPETI ONAYLA
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="currentColor"
                      class="bi bi-cart-check"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                      />
                      <path
                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                      /></svg
                  ></b>
                </h4>
              </div>
            </div>
          </div>
          <div class="cartWrap">
            <div v-for="(card, index) in realCards" :key="index">
              <div class="row border-top border-bottom">
                <div class="row main align-items-center">
                  <div class="col-2">
                    <img
                      class="img-fluid"
                      v-if="card.productImages"
                      :src="baseUrl + card.productImages[0].imagePath"
                    />

                    <span>X</span>
                  </div>
                  <div class="col">
                    <div class="row">{{ card.name }}</div>
                    <div class="row text-muted">
                      {{ card.shortDescription }}
                    </div>
                  </div>
                  <div class="col">
                    <div
                      class="d-flex flex-row justify-content-between"
                      v-for="(value, key, index) in qua"
                      :key="index"
                    >
                      <p href="#" class="text-muted" v-if="key == card.id">
                        {{ value }} Adet
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Login from "@/components/Shop/ShopLogin.vue";
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
    };
  },
  components: {
    Login,
  },
  methods: {
    ...mapActions(["fetchCard", "changemenu"]),
    totalPrice() {
      // let total = 0;
      // for (let p of this.cards.data) {
      //   total += p.totalPrice;
      // }
      // console.log(total);
      // return total;

      let temp = this.cards.map(function (item) {
        return parseFloat(item.unitPrice);
      });

      let sum = temp.reduce(function (prev, next) {
        return prev + next;
      }, 0);

      return sum;
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
    getUniqueListBy(arr, key) {
      return [...new Map(arr.map((item) => [item[key], item])).values()];
    },
    toBuy() {
      if (this.userId == "") {
        this.counts = 1;
      }
      if (this.userId !== "") {
        this.counts = 3;
      }
    },
  },
  async mounted() {
    this.changemenu();
    // let userId = this.ids;
    // this.cards = await this.fetchCard(userId);

    // this.totalProductQuantity = this.totalquantity();
    this.cards = JSON.parse(localStorage.getItem("cart"));
    this.totalProductPrice = this.totalPrice();
    this.qua = this.totalquantity();
    //karta islem cak ordan donenleri yaz
    this.realCards = this.getUniqueListBy(this.cards, "id");
  },
  computed: {
    ...mapState(["baseUrl", "userId"]),
  },
};
</script>

<style scoped>
.carts1 {
  vertical-align: middle;
  display: flex;
  font-family: sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
}
.title {
  margin-bottom: 5vh;
}
.card1 {
  margin: auto;
  max-width: 950px;
  width: 90%;

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
</style>