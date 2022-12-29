<template>
  <div id="app">
   <Home/>
    
  </div>
</template>
<script>
import Home from '@/views/HomeView.vue'
import { mapActions } from 'vuex'
export default {
  components:{
    Home
  },
   
  methods: {
    ...mapActions(["initAuth"]),
  },
   async created() {
  await this.initAuth()
  },
}
</script>
<style>
#app {
  padding: 0;
  box-sizing: border-box;
  margin: 0;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ED4302; 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>
