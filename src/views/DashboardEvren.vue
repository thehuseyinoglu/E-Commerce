<template>
  <div class="a">
    <div class="container-fluid">
      <div class="row">
        <div>
          <nav class="navbar navbar-expand-lg position-fixed m-3 zIndex">
            <div class="container-fluid">
              <button
                class="navbar-toggler text-white border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  />
                </svg>
                Dashboard Menu
              </button>
              <div class="collapse navbar-collapse p-1" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item me-2">
                    <a
                      aria-current="page"
                      @click.prevent="countactive = '1'"
                      :class="['nav-link', countactive === '1' ? 'active' : '']"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        class="bi bi-house-door me-1"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                        /></svg
                      >DASHBOARD</a
                    >
                  </li>
                  <li class="nav-item dropdown me-2">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        class="bi bi-box"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"
                        />
                      </svg>
                      İÇERİK
                    </a>
                    <ul class="dropdown-menu border border-0 dropback">
                      <li>
                        <a
                          @click.prevent="countactive = '6'"
                          :class="[
                            'dropdown-item ',
                            countactive === '6' ? 'active' : '',
                          ]"
                          >SAYFA İÇERİĞİ</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown me-2">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        class="bi bi-layers"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z"
                        />
                      </svg>
                      KATALOG
                    </a>
                    <ul class="dropdown-menu dropback border border-0">
                      <li>
                        <a
                          @click.prevent="countactive = '2'"
                          :class="[
                            'dropdown-item',
                            countactive === '2' ? 'active' : '',
                          ]"
                          >ÜRÜNLER</a
                        >
                      </li>
                      <li>
                        <a
                          @click.prevent="countactive = '4'"
                          :class="[
                            'dropdown-item',
                            countactive === '4' ? 'active' : '',
                          ]"
                          >KATEGORİ</a
                        >
                      </li>
                      <li>
                        <a
                          @click.prevent="countactive = '7'"
                          :class="[
                            'dropdown-item',
                            countactive === '7' ? 'active' : '',
                          ]"
                          >KATALOGLAR</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown me-2">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        class="bi bi-receipt"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"
                        />
                        <path
                          d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"
                        />
                      </svg>
                      SATIŞ
                    </a>
                    <ul class="dropdown-menu border border-0 dropback">
                      <li>
                        <a
                          @click.prevent="countactive = '5'"
                          :class="[
                            'dropdown-item',
                            countactive === '5' ? 'active' : '',
                          ]"
                          >SİPARŞLER</a
                        >
                      </li>
                      <li>
                        <a
                          @click.prevent="countactive = '3'"
                          :class="[
                            'dropdown-item',
                            countactive === '3' ? 'active' : '',
                          ]"
                          >KULLANICILAR</a
                        >
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item me-2">
                    <a class="nav-link" aria-current="page" href="/qr">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        class="bi bi-fullscreen"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"
                        /></svg
                      >TEKNİK SERVİS</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <DashboardEvrenInfo v-if="countactive === '1'" />
          <DashboardEvrenProduct v-if="countactive === '2'" />
          <DashboardEvrenUser v-if="countactive === '3'" />
          <DashboardEvrenCatagory v-if="countactive === '4'" />
          <DashboardEvrenOrder v-if="countactive === '5'" />
          <DashboardEvrenEdit v-if="countactive === '6'" />
          <DashboardCatalog v-if="countactive === '7'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardEvrenInfo from "@/components/Dashboard/DashboardInfo.vue";
import DashboardEvrenProduct from "@/components/Dashboard/DashboardProduct.vue";
import DashboardEvrenProject from "@/components/Dashboard/DashboardProject.vue";
import DashboardEvrenCatagory from "@/components/Dashboard/DashboardCatagory.vue";
import DashboardEvrenOrder from "@/components/Dashboard/DashboardOrder.vue";
import DashboardEvrenEdit from "@/components/Dashboard/DashboardEdit.vue";
import DashboardEvrenUser from "@/components/Dashboard/DashboardUser.vue";
import DashboardCatalog from "@/components/Dashboard/DashboardCatalog.vue";
export default {
  data() {
    return {
      countactive: "1",
    };
  },
  components: {
    DashboardEvrenInfo,
    DashboardEvrenProduct,
    DashboardEvrenProject,
    DashboardEvrenCatagory,
    DashboardEvrenOrder,
    DashboardEvrenEdit,
    DashboardEvrenUser,
    DashboardCatalog
  },
};
</script>

<style scoped>
.a {
  margin-top: 110px;
  background-color: #161d31;
  font-family: "Montserrat";
}
.zIndex {
  z-index: 999;
  background-color: #283046;
  width: calc(100% - 4rem);
  border-radius: 5px;
}
nav li a {
  cursor: pointer;
  color: #d0d2d6;
  padding: 0.715rem 1.25rem;
  margin-right: 0.715rem;
  color: #d0d2d6;
  font-size: 14px;
  font-weight: 500;
}
nav li a:hover {
  color: white;
  background-color: #161d31;
  border-radius: 4px;
}
@media screen and (max-width: 1000px) {
  .a {
    margin-top: 60px;
  }
}
.active {
  background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7));
  -webkit-box-shadow: 0 0 6px 1px rgb(115 103 240 / 60%);
  box-shadow: 0 0 6px 1px rgba(115, 103, 240, 0.6);
  border-radius: 4px;
  color: #fff !important;
}
.dropback {
  background-color: #283046;
}
</style>