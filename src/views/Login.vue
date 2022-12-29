<template>
  <div class="pageBody">
    <form @submit.prevent="onSubmit">
      <div class="column">
        <p class="header">{{ isUser ? "GİRİŞ YAP" : "KAYIT OL" }}</p>
        <p class="text">Lütfen e-mail ve şifrenizi giriniz</p>
           <p v-if="control == 1" class="p-0 m-0 text-warning">
                Giris yapiliyor
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-hourglass-split text-warning"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
                  />
                </svg>
              </p>
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
                Yanlış Şifre - E-Posta
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


        <input
          v-model="user.email"
          type="email"
          class="textInput"
          placeholder="E-posta adresinizi giriniz"
        />
        <input
          v-model="user.password"
          type="password"
          class="textInput"
          placeholder="Şifreniz..."
        />
        <input
          v-if="!isUser"
          v-model="user.firstname"
          type="text"
          class="textInput"
          placeholder="Adiniz..."
        />
        <input
          v-if="!isUser"
          v-model="user.lastname"
          type="text"
          class="textInput"
          placeholder="Soy Adiniz..."
        />
        <div class="">
          <button type="submit" class="button">
            {{ isUser ? "Giriş Yap" : "Kayıt Ol" }}
          </button>
        </div>

        
        <div class="signIn">
          <p class="text">Hesabınız yok mu?</p>
          <a href="#" @click.prevent="isUser = !isUser" class="textButton text">
            {{ isUser ? "Üye değilim" : "Üyeliğim var" }}
          </a>
        </div>
      </div>
    </form>
    
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "loginregister",
  data() {
    return {
      control: 0,
      user: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      },
      isUser: true,
    };
  },
  methods: {
    ...mapActions(["login", "changemenuf"]),

    onSubmit() {
      this.login({ ...this.user, isUser: this.isUser })
        .then((response) => {
          this.control = 2;
          this.$router.push("/");
        })
        .catch((error) => {
          this.control = 3;
        });

      this.control = 1;
    },
   

    mounted() {
      this.changemenuf();
    },
  },
};
</script>
<style scoped>
.pageBody {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10.6px);
  -webkit-backdrop-filter: blur(10.6px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
form {
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10.6px);
  -webkit-backdrop-filter: blur(10.6px);

  border-radius: 10px;
}
.column {
  width: 370px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}
.header {
  color: black;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 24px;
  line-height: 31px;
}
.text {
  color: #737373;
  display: inline-block;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
}
.textInput {
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  padding: 10px;
  border: 2px solid #737373;
}
.button {
  width: 100%;
  background: #0c2e59;
  border-radius: 5px;
  padding: 10px 30px;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  cursor: pointer;
}
.textButton {
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  border: none;
  background-color: inherit;
  text-decoration: underline;
}

@media screen and (max-width: 1150px) {
  .pageTop > img {
    object-fit: cover;
    height: 107px;
  }
}
</style>