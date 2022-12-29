<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      selectedFile: null,
      selectedFileName: null,
      brands: {},
      brandId: "",
      catalogs: {},
    };
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  methods: {
    ...mapActions(["addPdf", "fetchBrands", "fetchPdf", "deletePdf"]),

    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name;
    },
    async onUpload() {
      let formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFileName);
      formData.append("brandId", this.brandId);
      formData.append("name", this.selectedFileName);
      await this.addPdf(formData);
      this.catalogs = await this.fetchPdf();
    },
    async pdfDelete(item) {
      await this.deletePdf(item);
    this.catalogs = await this.fetchPdf();
    },
  },
  async mounted() {
    this.brands = await this.fetchBrands();
    this.catalogs = await this.fetchPdf();
  
  },
};
</script>

<template>
  <div class="container-fluid wrapp text-white">
    <div class="row d-flex justify-content-around">
      <div class="col col-md-5 content p-3 mb-4">
        <div class="row d-flex justify-content-around">
          <div class="col">
            <h1>PDF Ekle</h1>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <select class="mb-3" v-model="brandId">
              <option disabled value="">
                Katalog Eklemek İstediğiniz Markayı seçiniz
              </option>
              <option
                v-for="item in brands.data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <div class="input-group">
              <input
                type="file"
                @change="onFileChanged"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                accept=".pdf,.doc"
              />
              <button
                class="btn btn-outline-secondary"
                @click="onUpload"
                type="button"
                id="inputGroupFileAddon04"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-xl-8 p-0 mb-3 tabloCustom">
        <div class="table-responsive">
          <table class="table table-bordered align-middle">
            <thead class="tableThead">
              <tr class="text-center">
                <th scope="col">#Id</th>
                <th scope="col">brandName</th>
                <th scope="col">Dosya</th>
                <th scope="col">Aksiyonlar</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" v-if="catalogs.data">
              <tr v-for="item in catalogs.data" :key="item.id">
                <th scope="row">{{ item.id }}</th>

                <td>{{ item.brandName }}</td>
                <td>{{ item.name }}</td>

                <td>
                  <button
                    class="btn btn-outline-danger ms-2"
                    @click.prevent="pdfDelete(item.id)"
                  >
                    Sil
                  </button>
                  <a
                    class="btn btn-outline-success ms-2"
                   :href="baseUrl + item.path"
                   target="_blank"
                  >
                    pdf 'i Aç
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  display: none;
}
.wrapp {
  width: 100%;

  padding: 10px;
  margin-top: 100px;
}
select {
  background: transparent;
  border-color: #3b4253;
  color: #b4b7bd;
  border-radius: 5px;
}
.content {
  background-color: #283046;
  border-radius: 10px;
}
.colortitle {
  color: #b4b7bd;
}
.colorchange {
  color: #d0d2d6;
}
.tabloCustom {
  background-color: #283046;
  color: #fff !important;
  max-height: 600px;
  overflow-y: auto;
}
.tabloCustom table {
  color: #b4b7bd !important;
}
.tabloCustom1 {
  background-color: #283046;
  color: #fff !important;
  height: 300px;
  overflow-y: auto;
}
.tabloCustom1 table {
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