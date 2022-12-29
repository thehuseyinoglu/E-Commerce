<template>
  <div class="">
    <div class="container">
      <div class="row qr d-flex justify-content-center align-items-center">
        <div class="col col-md-4 text-muted  p-3 d-flex align-items-center qrbg">
          <div class="qrbase" v-if="qrDetail.data">
            <img class="img-fluid"  :src="baseUrl + qrDetail.data[0].qrCodePath" alt="qr code" />
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "QrBase",
  data() {
    return {
      id: this.$route.params.productId,
      qrDetail:{}
    };
  },
  computed: {
    ...mapState(["baseUrl", "userId"]),
  },
  methods: {
    ...mapActions(["getQr"])
  },
  async mounted() {
    this.qrDetail = await this.getQr({ownerId:this.userId , productId:this.id })
    console.log(this.qrDetail);
  },
};
</script>

<style  scoped>
.qr {
  height: 100vh;
}
.qrbase {
  width: 100%;
  height: 500px;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrbg{
  border: solid 1px #f34;
}
</style>