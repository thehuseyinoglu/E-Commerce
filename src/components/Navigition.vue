<template>
  <div>
    <nav
      class="navbar navbar-expand-xl navbar-dark bg-dark fixed-top"
      id="mainNavbar"
      style="padding: 0"
    >
      <div class="container">
        <a href="#anasayfa" class="navbar-brand logo"
          ><h1>PETRA METALÜRJİ</h1></a
        >
        <button
          type="button "
          class="navbar-toggler border border-0"
          data-bs-toggle="offcanvas"
          data-bs-target="#myNavbar"
          aria-controls="myNavbar"
          aria-label="menuyu acma kapama butonu"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="myNavbar"
          aria-labelledby="myLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="myLabel">Menu</h5>
            <button
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Kapat"
            ></button>
          </div>

          <div class="offcanvas-body text-dark">
            <ul
              class="
                navbar-nav
                justify-content-end
                flex-grow-1
                text-uppercase
                ms-auto
                py-lg-2
                nav-area
                textC
              "
            >
              <li
                class="nav-item"
                data-bs-dismiss="offcanvas"
                :class="teknikClass"
              >
                <router-link to="/qr" class="nav-link" active-class="active"
                  >QR Okuma</router-link
                >
              </li>

              <li
                class="nav-item"
                data-bs-dismiss="offcanvas"
                :class="dashClass"
              >
                <router-link
                  to="/dashboard"
                  class="nav-link"
                  active-class="active"
                  >Dashboard</router-link
                >
              </li>

              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link
                  active-class="active"
                  to="/anasayfa"
                  class="nav-link"
                  >Anasayfa</router-link
                >
              </li>
              <li class="nav-item" v-if="!menu" data-bs-dismiss="offcanvas">
                <a href="/anasayfa#hakkimizda" class="nav-link">HAKKIMIZDA</a>
              </li>
              <li class="nav-item" v-if="!menu" data-bs-dismiss="offcanvas">
                <a href="/anasayfa#hizmetler" class="nav-link">HIZMETLER</a>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <router-link active-class="active" to="/magaza" class="nav-link"
                  >MAGAZA</router-link
                >
              </li>
              <li class="nav-item" v-if="!menu" data-bs-dismiss="offcanvas">
                <a href="/anasayfa#iletisim" class="nav-link">ILETISIM</a>
              </li>
              <li
                class="nav-item position-relative"
                v-if="menu"
                data-bs-dismiss="offcanvas"
              >
                <router-link to="/sepet" class="nav-link"
                  >SEPET
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    /></svg
                ></router-link>
                <span
                  v-if="userId == '' && shopCart.length > 0"
                  class="
                    position-absolute
                    top-0
                    start-100
                    badge
                    rounded-pill
                    bg-danger
                  "
                  >{{ shopCart.length }}
                  <span class="visually-hidden">unread messages</span></span
                >
                <span
                  v-if="userId != '' && shopCount > 0"
                  class="
                    position-absolute
                    top-0
                    start-100
                    badge
                    rounded-pill
                    bg-danger
                  "
                  >{{ shopCount }}
                  <span class="visually-hidden">unread messages</span></span
                >
              </li>
              <li
                class="nav-item position-relative"
                v-if="menu"
                data-bs-dismiss="offcanvas"
              >
                <router-link to="/hesap" class="nav-link"
                  >HESAP
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    />
                  </svg>
                </router-link>
              </li>
              <li class="nav-item" :class="logoutClass">
                <a class="nav-link" @click.prevent="logouta">ÇIKIŞ</a>
              </li>
              <li
                class="nav-item"
                :class="logoutClass1"
                data-bs-dismiss="offcanvas"
              >
                <router-link to="/login" class="nav-link"
                  >GİRİŞ YAP</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      menucontrol: true,
    };
  },
  methods: {
    ...mapActions(["logout", "changemenu", "fetchCard"]),
    logouta() {
      this.logout();
    },
    menuChangeShop() {
      this.menucontrol = false;
    },
    menuChangeMain() {
      this.menucontrol = true;
    },
  },
  computed: {
    ...mapState(["menu", "shopCart", "shopCount", "userId"]),
    logoutClass() {
      return {
        lihide: !this.$store.getters.showclass,
      };
    },
    logoutClass1() {
      return {
        lihide1: this.$store.getters.showclass,
      };
    },
    dashClass() {
      return {
        dash: !this.$store.getters.isAuthenticated,
      };
    },
    teknikClass() {
      return {
        tekni: !this.$store.getters.isTeknik,
      };
    },

    menuchange() {
      return {
        a: this.menu,
      };
    },
    menuchangereverse() {
      return {
        a: !this.menu,
      };
    },
  },
};
</script>

<style  scoped>
.textC {
  color: black;
}
#mainNavbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #212529;
}
#mainNavbar .navbar-nav .nav-item .nav-link {
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1rem;
  color: #fff;
  letter-spacing: 0.06em;
}
.navbar-brand img {
  width: 100px;
  height: 100px;
}
@media (max-width: 991.98px) {
  #mainNavbar .navbar-nav .nav-item .nav-link {
    color: #212529;
  }
  #mainNavbar .navbar-brand img {
    width: 50px;
    height: 50px;
  }
  #mainNavbar {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
}

@media (min-width: 992px) {
  #mainNavbar {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: none;
    background-color: transparent;
    transition: padding-top 0.3s ease-in-out, padding-bottom 0.3s ease-in-out;
    -webkit-transition: padding-top 0.3s ease-in-out,
      padding-bottom 0.3s ease-in-out;
    -moz-transition: padding-top 0.3s ease-in-out,
      padding-bottom 0.3s ease-in-out;
    -ms-transition: padding-top 0.3s ease-in-out,
      padding-bottom 0.3s ease-in-out;
    -o-transition: padding-top 0.3s ease-in-out, padding-bottom 0.3s ease-in-out;
  }

  #mainNavbar .navbar-brand img {
    transition: font-size 0.3s ease-in-out;
    -webkit-transition: font-size 0.3s ease-in-out;
    -moz-transition: font-size 0.3s ease-in-out;
    -ms-transition: font-size 0.3s ease-in-out;
    -o-transition: font-size 0.3s ease-in-out;
  }

  #mainNavbar .navbar-nav .nav-item {
    margin-right: 1rem;
  }

  #mainNavbar .navbar-nav .nav-item:last-child {
    margin-right: 0;
  }

  #mainNavbar.navbar-mobile .navbar-brand {
    width: 15px;
    height: 15px;
  }

  #mainNavbar.navbar-mobile {
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: #212529;
  }
}

.nav-area a {
  position: relative;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  padding: 5px 10px;
  transition: 0.5s;
  margin-right: 10px;
}
.nav-area li {
  margin-right: 10px;
}
.nav-area a::before,
.nav-area a:after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: red;
  transition: 0.5;
  opacity: 0;
}

.nav-area a:before {
  top: 0;
  left: 0;
}
.nav-area a:after {
  bottom: 0;
  right: 0;
}
.nav-area a:hover:before,
a:hover:after {
  opacity: 1;
  width: 100%;
  transition: 0.5s;
}
.submenu {
  position: absolute;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  transform: skewX(-25deg);
  transform-origin: left top;
}

.submenu li {
  background-color: #34495e;
  position: relative;
  overflow: hidden;
}

.submenu > li > a {
  padding: 1em 2em;
}

.submenu > li::after {
  content: "";
  position: absolute;
  top: -125%;
  height: 100%;
  width: 100%;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.9);
}
.logo h1 {
  border-right: 1px solid #fff;
  padding: 5px;
  color: white;
}
/* Odd stuff */
.submenu > li:nth-child(odd) {
  transform: skewX(-25deg) translateX(0);
}

.submenu > li:nth-child(odd) > a {
  transform: skewX(25deg);
}

.submenu > li:nth-child(odd)::after {
  right: -50%;
  transform: skewX(-25deg) rotate(3deg);
}

/* Even stuff */
.submenu > li:nth-child(even) {
  transform: skewX(25deg) translateX(0);
}

.submenu > li:nth-child(even) > a {
  transform: skewX(-25deg);
}

.submenu > li:nth-child(even)::after {
  left: -50%;
  transform: skewX(25deg) rotate(3deg);
}

/* Show dropdown */
.submenu,
.submenu li {
  opacity: 0;
  visibility: hidden;
}

.submenu li {
  transition: 0.2s ease transform;
}

li:hover .submenu,
li:hover .submenu li {
  opacity: 1;
  visibility: visible;
}

li:hover .submenu li:nth-child(even) {
  transform: skewX(25deg) translateX(15px);
}

li:hover .submenu li:nth-child(odd) {
  transform: skewX(-25deg) translateX(-15px);
}
.lihide {
  display: none;
}
.lihide1 {
  display: none;
}
.tekni {
  display: none;
}
.dash {
  display: none;
}
#evren {
  font-size: 14px;
}
</style>