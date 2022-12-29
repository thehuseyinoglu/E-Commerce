import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import jwt_decode from "jwt-decode";
import axios from "axios"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: () =>
      import("../components/start.vue"),
    async beforeEnter(to, from, next) {
      const request = await axios.get('/api/MainPages/getall')
      let a = request.data.data
      if (a[2].value == 'magaza') {
        next("/magaza");
      } else {
        next('/anasayfa')
      }
    }
  },

  {
    path: "/anasayfa",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mainView.vue"),

  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import("../views/DashboardEvren.vue"),
    beforeEnter(to, from, next) {
      if ($cookies.get("tokenAdastra")) {
        let decoded = jwt_decode($cookies.get("tokenAdastra"));

        Object.keys(decoded).forEach(function (key) {
          if (key == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role") {
            const role = decoded[key]

            if (role.includes("ROLE_ADMIN")) {
              next()
            } else {
              next("/iletisim")
            }
          }
        });


      } else {
        next("/")
      }
    }
  },

  {
    path: "/about",
    name: "about",
    component: () =>
      import("../views/AboutView.vue"),
  },
  {
    path: "/magaza",
    name: "shop",
    component: () =>
      import("../views/Shop.vue"),
  },
  {
    path: "/magaza/:productId",
    name: "shopDetail",
    component: () =>
      import("../views/ShopDetail.vue"),
  },
  {
    path: '/sepet',
    name: 'sepet',
    component: () =>
      import("../views/Cart.vue"),
  },
  {
    path: '/hesap',
    name: 'hesap',
    component: () =>
      import("../views/Account.vue"),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: '/destek/:productId',
    name: 'qr',
    component: () =>
      import("../views/QrCode.vue"),
  },
  {
    path: '/qr',
    name: 'qrReader',
    component: () =>
      import("../views/QrReader.vue"),
    beforeEnter(to, from, next) {
      if ($cookies.get("tokenAdastra")) {
        let decoded = jwt_decode($cookies.get("tokenAdastra"));

        Object.keys(decoded).forEach(function (key) {
          if (key == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role") {
            const role = decoded[key]

            if (role.includes("ROLE_ADMIN") || role.includes("ROLE_TEKNIK")) {
              next()
            } else {
              next("/")
            }
          }
        });
      } else {
        next("/")
      }
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
