<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      mainpage: {},
      key: "",
      value: "",
      abouts: {},
      aboutValue: "",
      aboutKey: "",
      images: {},
      imagesShop: {},
      key1: "anasayfa",
      key2: "magaza",
    };
  },
  computed: {
    ...mapState(["baseUrl"]),
  },
  methods: {
    ...mapActions([
      "fetchMain",
      "mainUpdate",
      "fetchAbout",
      "aboutUpdate",
      "addPageImage",
      "fetchImage",
      "deletePageImages",
      "degis",
      "degis2"
    ]),


// async klick(){
//    await this.degis({key:"Nasıl Çalışır" , value:"asd"})
// },
// async plick(){
//   await this.degis2({id:5})
// },

  onFileChangedShop(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name;
    },
    async onUploadShop() {
      let formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFileName);
      formData.append("key", "magaza");
      await this.addPageImage(formData);
      this.imagesShop = await this.fetchImage(this.key2);
    },

    async deletePageImage(id) {
      await this.deletePageImages(id);
      this.images = await this.fetchImage(this.key1);
      this.imagesShop = await this.fetchImage(this.key2);
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name;
    },
    async onUpload() {
      let formData = new FormData();
      formData.append("image", this.selectedFile, this.selectedFileName);
      formData.append("key", "anasayfa");
      await this.addPageImage(formData);
      this.images = await this.fetchImage(this.key1);
    },
    async submitFormMain() {
      let key = this.key;
      let value = this.value;

      await this.mainUpdate({ key, value });
      this.mainpage = await this.fetchMain();
    },
    async submitFormAbout() {
      let key = this.aboutKey;
      let value = this.aboutValue;

      await this.aboutUpdate({ key, value });
      this.abouts = await this.fetchAbout();
    },
  },
  async mounted() {
    this.mainpage = await this.fetchMain();
    this.abouts = await this.fetchAbout();
    this.images = await this.fetchImage(this.key1);
    this.imagesShop = await this.fetchImage(this.key2);
  },
};
</script>

<template>
  <div class="container-fluid wrapp text-white">
    <div class="row d-flex justify-content-around">
      <div class="col col-md-5 content p-3 mb-4">
        <div class="row d-flex justify-content-around" v-if="mainpage.data">
          <div class="col">
            <h1>ANASAYFA</h1>
            <span class="colortitle">Hakkımızda</span>
            <h4 class="mb-4 colorchange">{{ mainpage.data[0].value }}</h4>
            <span class="colortitle">Bizi neden tercih Etmelisiniz</span>
            <h6 class="colorchange">{{ mainpage.data[1].value }}</h6>
            <span class="colortitle">Görünüm</span>
            <h6 class="colorchange">{{ mainpage.data[2].value }}</h6>
            <span class="colortitle">Penetrant Nedir</span>
            <h6 class="colorchange">{{ mainpage.data[3].value }}</h6>
            <span class="colortitle">Nerede Kullanılır</span>
            <h6 class="colorchange">{{ mainpage.data[4].value }}</h6>
            <span class="colortitle">Nasıl Çalışır</span>
            <h6 class="colorchange">{{ mainpage.data[5].value }}</h6>
          </div>
          <div class="col">
            <form
              @submit.prevent="submitFormMain"
              class="d-flex flex-column mt-5"
            >
              <select v-model="key" class="p-2 mb-3">
                <option disabled value="">secim yapiniz</option>
                <option
                  v-for="item in mainpage.data"
                  :key="item.id"
                  :value="item.key"
                  class="option"
                >
                  {{ item.key }}
                </option>
              </select>

              <textarea
                v-if="key != 'gorunum'"
                type="text"
                v-model="value"
                class="mb-3"
              />

              <div v-if="key == 'gorunum'">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value="varsayılan"
                    v-model="value"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Varsayilan Görünüm
                  </label>
                </div>
                <div class="form-check mb-4">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="magaza"
                    v-model="value"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Mağaza Görünüm
                  </label>
                </div>
              </div>
              <input type="submit" class="btn btn-outline-danger" />
            </form>
          </div>
        </div>
        <div class="row mt-4">
          <!-- <div class="col-12">
            <h4>Anasayfa Fotoğrafları</h4>

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
                Ekle
              </button>
            </div>
          </div> -->
          <div class="col-12">
            <div class="row mt-3">
              <div
                class="col d-flex flex-column justify-content-between"
                v-for="image in images.data"
                :key="image.id"
              >
                <img
                  class="img-fluid"
                  :src="baseUrl + image.imagePath"
                  alt=""
                />
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="deletePageImage(image.id)"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            
          </div>
        </div>
      </div>
      <div class="col col-md-5 content p-3 mb-4">
        <div class="row d-flex justify-content-around" v-if="mainpage.data">
          <div class="col">
            <h1>MAĞAZA</h1>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <h4>Mağaza Slider</h4>

            <div class="input-group">
              <input
                type="file"
                @change="onFileChangedShop"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
              <button
                class="btn btn-outline-secondary"
                @click="onUploadShop"
                type="button"
                id="inputGroupFileAddon04"
              >
                Ekle
              </button>
            </div>
          </div>
          <div class="col-12">
            <div class="row mt-3">
              <div
                class="col d-flex flex-column justify-content-between"
                v-for="image in imagesShop.data"
                :key="image.id"
              >
                <img
                  class="img-fluid"
                  :src="baseUrl + image.imagePath"
                  alt=""
                />
                <button
                  class="btn btn-outline-danger"
                  @click.prevent="deletePageImage(image.id)"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="alert alert-danger p-2" role="alert">
              Anasayfanin çalışabilmesi için en az 1 tane fotoğraf olmalıdır!
            </div>
            <!-- <button @click.prevent="klick">buton</button>
            <button @click.prevent="plick">buton</button> -->
          </div>
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
</style>