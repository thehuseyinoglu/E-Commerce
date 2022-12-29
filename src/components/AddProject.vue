<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      control: 0,
      name: "",
      description: "",
      slogan: "",
      goals: "",
      technical: "",
      mission: "",
      statusa: true,
      startDate: "",
      endDate: "",
      extra1: "",
      extra2: "",
      extra3: "",
      extra4: "",
      extra5: "",
    };
  },

  async mounted() {},
  methods: {
    ...mapActions(["addProject"]),
    async submitFormProject() {
      console.log(this.statusa);
      let name = this.name;
      let description = this.description;
      let slogan = this.slogan;
      let goals = this.goals;
      let technical = this.technical;
      let mission = this.mission;
      let status = this.statusa;
      let startDate = this.startDate;
      let endDate = this.endDate;
      let extra1 = this.extra1;
      let extra2 = this.extra2;
      let extra3 = this.extra3;
      let extra4 = this.extra4;
      let extra5 = this.extra5;

      if (this.statusa == true) {
        status = true;
      } else {
        status = false;
      }
      console.log(status);
      await this.addProject({
        name,
        description,
        slogan,
        goals,
        technical,
        mission,
        status,
        startDate,
        endDate,
        extra1,
        extra2,
        extra3,
        extra4,
        extra5,
      })
        .then((response) => {
          this.control = 2;
        })
        .catch((error) => {
          this.control = 3;
        });
    },
  },
};
</script>

<template>
  <div class="wrapper p-3">
    <h1>Proje Ekle</h1>
    <form @submit.prevent="submitFormProject" class="text-white">
      <div class="row row-cols-2 text-light gy-3">
        <span>Proje Adı</span>
        <input type="text" v-model="name" />
        <span>Proje Açıklaması</span>
        <input type="text" v-model="description" />
        <span>Proje Sloganı</span>
        <input type="text" v-model="slogan" />
        <span>Proje Amacı</span>
        <input type="text" v-model="goals" />
        <span>Proje Misyonu</span>
        <input type="text" v-model="mission" />
        <label for=""
          ><input type="radio" value="false" v-model="statusa" /> proje
          sonlandı</label
        >
        <label
          ><input type="radio" value="true" v-model="statusa" />Proje
          devamediyor</label
        >
        <span>Proje Başlangıç Zamanı</span>
        <input type="text" v-model="startDate" />
        <span>Proje Bitim Tarihi</span>
        <input type="text" v-model="endDate" />
      </div>
      <span>Proje Bilgisi</span>
      <textarea type="text" v-model="technical" />
      <span>Proje Bilgisi</span>
      <textarea type="text" v-model="extra1" />
      <span>Proje Bilgisi</span>
      <textarea type="text" v-model="extra2" />
      <span>Proje Bilgisi</span>
      <textarea type="text" v-model="extra3" />
      <span>Proje Bilgisi</span>
      <textarea type="text" v-model="extra4" />
      <span>Proje Bilgisi</span>
      <textarea type="text" v-model="extra5" />

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
      <input type="submit" class="btn btn-outline-danger" />
    </form>
  </div>
</template>


<style scoped>
.wrapper {
  background: #283046;
}
.wrapper2 {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  width: 500px;
  background: rgba(255, 255, 255, 0.36);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.6px);
  -webkit-backdrop-filter: blur(10.6px);
  border: 1px solid rgba(255, 255, 255, 0.24);
  padding: 10px;
}
form {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
textarea {
  width: 100%;
  height: 100px;
  padding: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: none;
}
form input[type="text"] {
  max-width: 200px;
  border: 0;
  border-bottom: solid 1px #b4b7bd;
  padding: 5px;
  color: white;
  background: transparent;
}
</style>