<template>
  <div>
    <div class="container">
      <div
        class="row qrReader d-flex justify-content-center align-items-center"
      >
        <div class="col col-md-6">
          <qrcode-stream @init="onInit" @decode="onDecode"></qrcode-stream>
          <p class="text-muted">{{ error }}</p>
          <p class="text-white" v-if="qrId.data">
            QR ID: {{ qrId.data[0].id }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      error: "",
      decodedString: "",
      qrId: {},
      ids: this.$store.state.userId,
      
    };
  },
  components: {
    QrcodeStream,
  },

  watch: {
    qrId() {},
  },
  methods: {
    ...mapActions(["readAndGetQrId", "statusChangeQr"]),
    async onInit(promise) {
      // show loading indicator

      try {
        const { capabilities } = await promise;

        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "user denied camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "no suitable camera device installed";
        } else if (error.name === "NotSupportedError") {
          this.error = "page is not served over HTTPS (or localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "maybe camera is already in use";
        } else if (error.name === "OverconstrainedError") {
          this.error =
            "did you requested the front camera although there is none?";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "browser seems to be lacking features";
        }
      } finally {
        // hide loading indicator
      }
    },
    async onDecode(decodedString) {
      this.decodedString = decodedString.split(" ");
      this.qrId = await this.readAndGetQrId({
        ownerId: this.decodedString[1],
        productId: this.decodedString[3],
      });
      this.qrChangeStatus(this.qrId.data[0].id);
    },
    qrChangeStatus(item) {
      this.statusChangeQr({
        qrCodeId: item,
        userId: parseInt(this.ids),
      });
    },
  },
  computed: {
    ...mapState(["userId"]),
  },
   
};
</script>

<style scoped>
.qrReader {
  height: 100vh;
}
</style>