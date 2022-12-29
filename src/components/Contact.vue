<template>
  <!-- <form ref="form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="user_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form> -->
  <form ref="form" @submit.prevent="send">
    <label>Name</label>
    <input v-model="name" type="text" name="user_name" />
    <label>Email</label>
    <input v-model="email" type="email" name="user_email" />
    <label>Telefon Numarası</label>
    <input v-model="phoneNumber" type="text" name="phoneNumber" />
    <label>Mesaj</label>
    <textarea v-model="message" name="message"></textarea>
    <input type="submit" value="Gönder" />
  </form>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    };
  },
  methods: {
    ...mapActions(["sendEmail"]),
    async send() {
      await this.sendEmail({
        senderEmail: this.email,
        senderFirstAndLastName: this.name,
        phoneNumber: this.phoneNumber,
        messages: "<p>" + this.message + "</p>",
      });
    },
  },

  //   methods: {
  //     sendEmail() {
  //       emailjs.sendForm('service_gw8zrll', 'template_h7y6q4r', this.$refs.form, 'BtK3PAB1IcltZ_Ews')
  //         .then((result) => {
  //             console.log('SUCCESS!', result.text);
  //         }, (error) => {
  //             console.log('FAILED...', error.text);
  //         });
  //     }
  //   }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
</style>