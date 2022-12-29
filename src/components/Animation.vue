<template>
  <div class="container d-flex justify-content-center">
    <div class="contentwe">
      <h2>
        <h1 class="title">
          PETRA METALÜRJİ A.Ş. <br />
          <div class="rotate-words">
            <span style="--d: 0s">Tahribatsız</span>
            <span style="--d: 3s">kaynak muayenesi</span>
            <span style="--d: 6s">Penetrant Sıvısı</span>
          </div>
        </h1>
      </h2>
      <a class="iletisim text-decoration-none mt-lg-5" href="#iletisim"
        >BİZE ULAŞIN</a
      >
    </div>
  </div>
</template>

<script>
export default {
  created() {
    //     setInterval(function () {
    //     const show = document.querySelector("span[data-show]");
    //     const next =
    //         show.nextElementSibling || document.querySelector("#a");
    //     const up = document.querySelector("span[data-up]");
    //     if (up) {
    //         up.removeAttribute("data-up");
    //     }
    //     show.removeAttribute("data-show");
    //     show.setAttribute("data-up", "");
    //     next.setAttribute("data-show", "");
    // }, 2000);
  },
  destroyed() {
    //clearInterval();
  },
};
</script>

<style  scoped>
.title {
  position: relative;
  color: #fff;
  font-size: 64px;
}
.rotate-words {
  display: inline;
  margin-left: 10px;
}
.rotate-words span {
  width: max-content;
  position: absolute;
  background-color: #BF9076;
  padding-inline: 10px;
  opacity: 0;
  transform-origin: 10% 75%;
  animation: rotateWords 9s var(--d) linear infinite;
}
h2{
  font-size: 64px;
}
@keyframes rotateWords {
  5% {
    opacity: 1;
  }
  10%,
  20% {
    opacity: 1;
    transform: rotate(3deg);
  }
  15% {
    transform: rotate(-1deg);
  }
  25% {
    opacity: 0;
    transform: translateY(90px) rotate(10deg);
  }
}
.contentwe {
  margin-left: 8%;
}
.iletisim {
  padding: 15px 40px;
  margin: 15px auto;
  color: #fff;

  font-size: 20px;
  font-weight: medium;
  outline: none;
  position: relative;
  border: none;
  backdrop-filter: blur(4px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.iletisim:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    50deg,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 1) 70%,
    transparent 71%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  transition: 0.6s;
}

.iletisim:hover:after {
  background-position: -20% 0;
  cursor: pointer;
}



@media (max-width: 991.98px) {
.title {
  position: relative;
  color: #fff;
  font-size: 37px;
}
.iletisim {
  padding: 5px 20px;
  
}
}

@media (min-width: 992px) {
}
</style>