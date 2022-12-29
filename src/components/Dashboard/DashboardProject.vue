<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row d-flex justify-content-around">
       <div class="col-12 col-xl-7 p-0 tabloCustom mb-3">
          <div class="table-responsive">
             <table class="table table-bordered align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">proje</th>
                  <th scope="col">Proje İsmi</th>
                  <th scope="col">Durumu</th>
                  <th scope="col">Sloganı</th>
                  <th scope="col">Fotoğraf</th>
                  
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="product in products.data" :key="product.id">
                  <th scope="row">{{ product.id }}</th>
                  <td class="d-flex justify-content-center">
                    <img v-if="product.projectImages[0]"
                      class="img-fluid"
                      style="height: 50px"
                      :src="baseUrl + product.projectImages[0].imagePath"
                      alt=""
                    />
                  </td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.status }}</td>
                  <td>{{ product.slogan }}</td>
                  <td>
                    <button
                      class="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      @click.prevent="al(product.id)"
                    >
                      Fotoğraf Ekle
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-xl-4">
          <div class="w-100 h-auto d-flex justify-content-center">
            <AddProject />
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Fotoğraf Ekle</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row"><div class="col-12">
            <div class="input-group">
              <input
                type="file"
                @change="onFileChanged"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
              <button
                class="btn btn-outline-secondary"
                @click="onUpload"
                type="button"
                id="inputGroupFileAddon04"
              >
                Button
              </button>
            </div></div></div>
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
import { mapActions, mapState } from "vuex";
import AddProject from "@/components/AddProject.vue";
export default {
  data() {
    return {
      products: {},
      selectedFile: null,
      selectedFileName: null,
      id: "BOŞ",
    };
  },
  methods: {
    ...mapActions(["fetchProjects", "addProjectImage"]),
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name;
    },
    onUpload() {
      let formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFileName);
      formData.append("projectId", this.id);
      this.addProjectImage(formData);
    },
    al(product) {
      this.id = product;
 
    },
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  async mounted() {
    this.products = await this.fetchProjects();
  
  },
  components: {
    AddProject,
  },
};
</script>

<style scoped>
.b {
  margin-top: 90px;
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