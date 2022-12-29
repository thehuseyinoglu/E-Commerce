import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import router from "@/router";
import jwt_decode from "jwt-decode";
import axiosInstance from "@/store/axiosInstance"

axios.defaults.baseURL = "url"

Vue.use(Vuex);

const Mutations = {
  SETTOKEN: 'SETTOKEN',
  CLEARTOKEN: "CLEARTOKEN",
  CHANGEMENU: "CHANGEMENU",
  CHANGEMENUF: "CHANGEMENUF",
  SETROLE: "SETROLE",
  CLEARROLE: "CLEARROLE",
  TEKNIKSETROLE: "TEKNIKSETROLE",
  TEKNIKCLEARROLE: "TEKNIKCLEARROLE",
  SETUSERID: "SETUSERID",
  CLEARUSERID: "CLEARUSERID",
  ADDITEMCART: "ADDITEMCART",
  REMOVEITEMCART: "REMOVEITEMCART",
  SETSHOPCART: "SETSHOPCART",
  CLEARSHOPCART: "CLEARSHOPCART",
  SETPAGE: "SETPAGE",
  SETCATAGORYID: "SETCATAGORYID",
  SETSHOPNAV: "SETSHOPNAV",
  CHANGESEARCH: "CHANGESEARCH",
  CHANGESEARCHF: "CHANGESEARCHF",
  SETSHOPCOUNT: "SETSHOPCOUNT",
  CLEARSHOPCOUNT: "CLEARSHOPCOUNT",
  CHANGESHOPCOUNT: "CHANGESHOPCOUNT",
  DOWNSHOPCOUNT: "DOWNSHOPCOUNT"
}

export default new Vuex.Store({
  state: {
    token: '',
    menu: false,
    role: false,
    teknikrole: false,
    baseUrl: "https://evrenmakine.com",
    userId: "",
    shopCart: [],
    page: '',
    categoryIdd: '',
    shopNav: "",
    search: false,
    shopCount: ''
  },
  mutations: {
    [Mutations.SETPAGE](state, page) {
      state.token = page
    },
    [Mutations.SETTOKEN](state, token) {
      state.token = token
    },
    [Mutations.CLEARTOKEN](state) {
      state.token = ''
    },
    [Mutations.CHANGEMENU](state) {
      state.menu = true
    },
    [Mutations.CHANGEMENUF](state) {
      state.menu = false
    },
    [Mutations.SETSHOPCOUNT](state, item) {
      let totalCount = 0
      if (item != null) {
        item.forEach(element => {
          let count = element.quantity
          totalCount = totalCount + count

        });
        state.shopCount = totalCount
      }

    },
    [Mutations.CLEARSHOPCOUNT](state) {
      state.shopCount = ''
    },
    [Mutations.CHANGESHOPCOUNT](state) {
      state.shopCount++
    },
    [Mutations.DOWNSHOPCOUNT](state) {
      state.shopCount--
    },
    [Mutations.CHANGESEARCH](state) {
      state.search = true
    },
    [Mutations.CHANGESEARCHF](state) {
      state.search = false
    },
    [Mutations.SETROLE](state, role) {
      state.role = role
    },
    [Mutations.CLEARROLE](state) {
      state.role = false
    },
    [Mutations.TEKNIKSETROLE](state, role) {
      state.teknikrole = role
    },
    [Mutations.TEKNIKCLEARROLE](state) {
      state.teknikrole = false
    },
    [Mutations.SETUSERID](state, id) {
      state.userId = id
    },
    [Mutations.CLEARUSERID](state,) {
      state.userId = ""
    },
    [Mutations.CLEARSHOPCART](state,) {
      state.shopCart = []
    },

    [Mutations.SETSHOPCART](state, cart) {
      state.shopCart = cart
    },
    [Mutations.SETCATAGORYID](state, categoryId) {
      state.categoryIdd = categoryId
    },
    [Mutations.SETSHOPNAV](state, item) {
      state.shopNav = item
    },
    [Mutations.ADDITEMCART](state, product) {
      state.shopCart.push(product)
      localStorage.setItem("cart", JSON.stringify(state.shopCart));
    },
    [Mutations.REMOVEITEMCART](state, product) {
      //state.shopCart.splice(state.shopCart.indexOf(product))
      let index = state.shopCart.findIndex(item => item.id === product.id)
      if (index !== -1) {
        state.shopCart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.shopCart));
      }
      else {
        console.log('Ok')
      }
    }
  },
  actions: {

    setShopNav({ commit }, item) {
      commit(Mutations.SETSHOPNAV, item)
    },
    setPage({ commit }, page) {
      commit(Mutations.SETTOKEN, page)
    },
    setCategoryId({ commit }, categoryId) {
      commit(Mutations.SETCATAGORYID, categoryId)
    },
    setToken({ commit }, token) {
      commit(Mutations.SETTOKEN, token)
    },
    clearToken({ commit }) {
      commit(Mutations.CLEARTOKEN)
    },
    changemenu({ commit }) {
      commit(Mutations.CHANGEMENU)

    },
    changemenuf({ commit }) {
      commit(Mutations.CHANGEMENUF)
    },
    changesearch({ commit }) {
      commit(Mutations.CHANGESEARCH)
    },
    changesearchf({ commit }) {
      commit(Mutations.CHANGESEARCHF)
    },
    setShopCount({ commit }, item) {
      commit(Mutations.SETSHOPCOUNT, item)
    },
    clearShopCount({ commit }) {
      commit(Mutations.CLEARSHOPCOUNT)
    },
    changeShopCountIncrease({ commit }) {
      commit(Mutations.CHANGESHOPCOUNT)
    },
    changeShopCountDecrease({ commit }) {
      commit(Mutations.DOWNSHOPCOUNT)
    },
    setRole({ commit }, role) {
      commit(Mutations.SETROLE, role)
    },
    clearRole({ commit }) {
      commit(Mutations.CLEARROLE)
    },
    tekniksetRole({ commit }, role) {
      commit(Mutations.TEKNIKSETROLE, role)
    },
    teknikclearRole({ commit }) {
      commit(Mutations.TEKNIKCLEARROLE)
    },
    clearShopCart({ commit }) {
      commit(Mutations.CLEARSHOPCART)
    },
    clearUserid({ commit }) {
      commit(Mutations.CLEARUSERID)
    },
    setUserid({ commit }, id) {
      commit(Mutations.SETUSERID, id)
    },
    setShopCart({ commit }, cart) {
      commit(Mutations.SETSHOPCART, cart)
    },
    addItemCart({ commit }, product) {
      commit(Mutations.ADDITEMCART, product)
    },
    removeItemCart({ commit }, product) {
      commit(Mutations.REMOVEITEMCART, product)
    },

    //Auth
    async initAuth({ commit, dispatch }) {
      //let token = localStorage.getItem("tokenAdastra")
      let token = $cookies.get("tokenAdastra")
      if (token) {
        // let expirationDate = localStorage.getItem("expirationDate")
        let expirationDate = $cookies.get("expirationDate")
        // let decoded = jwt_decode(localStorage.getItem("tokenAdastra"));
        let decoded = jwt_decode($cookies.get("tokenAdastra"));
        Object.keys(decoded).forEach(function (key) {

          if (key == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role") {
            const roles = decoded[key]

            if (roles.includes("ROLE_ADMIN")) {
              dispatch("setRole", true)
            }
            if (roles.includes("ROLE_TEKNIK")) {
              dispatch("tekniksetRole", true)
            }
          }
          if (key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
            const id = decoded[key]
            dispatch("setUserid", id)
          }
        });

        let time = new Date().getTime()

        if (time >= +expirationDate) {
          await dispatch("logout")
        }
        else {
          await dispatch("setToken", token)
          let timerSecond = +expirationDate - time
          await dispatch("setTimeoutTimer", timerSecond)
        }
        await dispatch("setToken", token)
      } else {
        let patth = window.location.pathname
        if (patth == "/dashboard") {
          router.push("/login")
          return false
        }
      }
    },

    async login({ commit, dispatch, state }, authData) {  //iki tane is user ve user bilgilerini iceren sey gelicek 2 tane 
      let authlink = "/api/Auth/register"
      let obj = {
        email: authData.email,
        password: authData.password,
        firstname: authData.firstname,
        lastname: authData.lastname,
      }
      if (authData.isUser) {
        authlink = "/api/Auth/login"
        obj = {
          email: authData.email,
          password: authData.password,
        }
      }
      return await axios.post(
        authlink,
        obj
      ).then(response => {
        dispatch('setToken', response.data.data.token)
        $cookies.set("tokenAdastra", response.data.data.token)
        // localStorage.setItem("tokenAdastra", response.data.data.token)
        //localStorage.setItem("expirationDate", new Date().getTime() + 3600000)
        $cookies.set("expirationDate", new Date().getTime() + 3600000)
        //localStorage.setItem("expirationDate", new Date().getTime() + 10000)
        dispatch("setTimeoutTimer", 3600000)
        //dispatch("setTimeoutTimer", 10000)
        //let decoded = jwt_decode(localStorage.getItem("tokenAdastra"));
        let decoded = jwt_decode($cookies.get("tokenAdastra"));
        Object.keys(decoded).forEach(function (key) {
          if (key == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role") {
            const roles = decoded[key]

            if (roles.includes("ROLE_ADMIN")) {
              dispatch("setRole", true)
            }
            if (roles.includes("ROLE_TEKNIK")) {
              dispatch("tekniksetRole", true)
            }
          }
          if (key == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
            const id = decoded[key]
            dispatch("setUserid", id)
          }
        });
      })

    },
    async logout({ commit, dispatch, state }) {
      await dispatch("clearToken")
      await dispatch("clearRole")
      await dispatch("teknikclearRole")
      await dispatch("clearUserid")
      await dispatch("clearShopCart")
      localStorage.removeItem("cart")
      // localStorage.removeItem("expirationDate")
      $cookies.remove("tokenAdastra")
      $cookies.remove("expirationDate")
      router.replace("/login")
    },

    async setTimeoutTimer({ dispatch }) {
      setTimeout(() => {
        dispatch('logout')
      }, 3600000)

    },

    async deleteRole({ state, dispatch }, { userId, roleId }) {
      const request = await axiosInstance().delete('/api/Auth/deleteRoleToUser', { data: { userId, roleId } })

      return request.data
    },

    async fetchUser() {
      const request = await axios.get('/getAllUser')

      return request.data
    },




    //Roles
    async fetchRole() {
      const request = await axiosInstance().get('/api/Roles/getall')

      return request.data
    },

    async addRole({ name }) {
      const request = await axiosInstance().post('/api/Roles/add', { name })

      return request.data
    },

    async addRoleUser({ state, dispatch }, { userId, roleId }) {
      const request = await axiosInstance().post('/api/Auth/addRoleToUser', { userId, roleId })

      return request.data
    },

    //EmailSenders
    async sendEmail({ state, dispatch }, { senderEmail, senderFirstAndLastName
      , phoneNumber, messages }) {
      const request = await axios.post('/api/EmailSenders/SendEmailToInfo', null, {
        params: {
          senderEmail, senderFirstAndLastName
          , phoneNumber, messages
        }
      })
      return request.data
    },

    //Products
    async chanheProductPrice({ state, dispatch }, { productId, unitPrice }) {
      const request = await axiosInstance().post(`/api/Products/changeUnitPrice/${productId}/${unitPrice}`)

      return request.data
    },

    async changeProductCurrency({ state, dispatch }, { productId, currencyId }) {
      const request = await axiosInstance().post(`/api/Products/changeUnitPriceAndCurrencyId/${productId}/${currencyId}`)

      return request.data
    },

    //StockControls
    async fetchProductStok({ state }, { productId }) {
      const request = await axios.get(`/api/StockControls/getStockDetails/${productId}`)

      return request.data.data
    },
    async increaseStok({ state, dispatch }, { productId, quantity }) {
      const request = await axiosInstance().put(`/api/StockControls/increaseStock/${productId}/${quantity}`)

      return request.data
    },
    async decreaseStok({ state, dispatch }, { productId, quantity }) {
      const request = await axiosInstance().put(`/api/StockControls/decreaseStock/${productId}/${quantity}`)

      return request.data
    },

    async fetchProductsPage({ state, dispatch }, { Page, PageSize }) {
      const request = await axios.get(`/api/Products/getallwithPagination?Page=${Page}&PageSize=${PageSize}`)

      return request.data
    },
    async fetchProductsPageCategory({ state, dispatch }, { id, Page, PageSize }) {
      const request = await axios.get(`/api/Products/getAllProductsByCategoryId/${id}?Page=${Page}&PageSize=${PageSize}`)

      return request.data
    },
    async fetchProductsPageSearch({ state, dispatch }, { searchQuery, Page, PageSize }) {
      const request = await axios.get(`/api/Products/getAllProductsBySearchQuery/${searchQuery}?Page=${Page}&PageSize=${PageSize}`)

      return request.data
    },

    async fetchProducts() {
      const request = await axios.get('/api/Products/getall')

      return request.data
    },

    async fetchProduct({ state }, productId) {
      const request = await axios.get(`/api/Products/getProductInformationById/${productId}`)

      return request.data
    },

    //TechnicalServices
    async qrStatus({ state, dispatch }, { QRCodeId }) {
      const request = await axios.get(`/api/TechnicalServices/GetAllByQRCodeId?QRCodeId=${QRCodeId}`)

      return request.data
    },
    async statusChangeQr({ state }, { qrCodeId, userId }) {
      const request = await axiosInstance().post(`/api/TechnicalServices/ChangeStatus`, { qrCodeId, userId })

      return request.data
    },

    async createQr({ state, dispatch }, { }) {
      const request = await axios.post('/api/TechnicalServices/add', {})

      return request.data
    },
    async userAddQr({ state, dispatch }, data) {
      const request = await axios.post('/api/TechnicalServices/add', data)

      return request.data
    },

    //QRCode
    async readAndGetQrId({ state }, { ownerId, productId }) {
      const request = await axios.get(`/api/QRCode/GetByOwnerIdAndProductId/${ownerId}/${productId}`)

      return request.data
    },
    async getQr({ state, dispatch }, { ownerId, productId }) {
      const request = await axios.get(`/api/QRCode/GetByOwnerIdAndProductId/${ownerId}/${productId}`)

      return request.data
    },

    //Currencies
    async fetchCurrencies() {
      const request = await axios.get('/api/Currencies/getAll')

      return request.data
    },

    //ProductCustomizations
    async detailAdd({ state, dispatch }, { productId, key, value }) {
      const request = await axiosInstance().post('/api/ProductCustomizations/add', { productId, key, value })

      return request.data
    },
    async fetchproductdetils({ state }, { id }) {
      const request = await axios.get(`/api/ProductCustomizations/getbyProductId/${id}`)


      return request.data
    },

    async detailUpdate({ state, dispatch }, { productId, key, value }) {
      const request = await axiosInstance().post('/api/ProductCustomizations/update', { productId, key, value })

      return request.data
    },

    async deleteDetail({ state }, { id }) {
      const request = await axiosInstance().post(`/api/ProductCustomizations/delete/${id}`)

      return request.data
    },

    //About
    async fetchAbout() {
      const request = await axios.get('/api/Abouts/getall')
      return request.data
    },

    async aboutUpdate({ state, dispatch }, { key, value }) {
      const request = await axiosInstance().post('/api/Abouts/update', { key, value })
      return request.data
    },

    //Categories
    async fetchCatagories() {
      const request = await axios.get('/api/Categories/getall')

      return request.data
    },
    async fetchCatagoriesMain() {
      const request = await axios.get('/api/Categories/getAllMainCategories')

      return request.data
    },

    async fetchSubCategorys() {
      const request = await axios.get('/api/SubCategories/getall')

      return request.data
    },

    async deleteCategory({ state, dispatch }, id) {
      const request = await axiosInstance().post(`/api/Categories/delete/${id}`)

      return request.data
    },

    async getCatagoryId({ state, dispatch }, { categoryId }) {
      const request = await axios.get(`/api/Categories/getById/${categoryId}`)

      return request.data.data

    },
    async fetchCategoryId({ state }, { id }) {
      const request = await axios.get(`/api/Categories/getAllSubCategories/${id}`)

      return request.data.data
    },
    async addCategory({ state, dispatch }, { id, name, parentId }) {
      const request = await axiosInstance().post('/api/Categories/add', { id, name, parentId })

      return request.data
    },
    async addSubCatagories({ state, dispatch }, { name, categoryId }) {
      const request = await axiosInstance().post('/api/SubCategories/add', { name, categoryId })

      return request.data
    },

    //Orders
    async fetchOrders() {
      const request = await axios.get('/api/Orders/getall')

      return request.data
    },
    async changeStatus({ state, dispatch }, { id, statusId }) {
      const request = await axiosInstance().post(`/api/Orders/changeOrderStatus/${id}/${statusId}`)

      return request.data
    },
    async fetchOrderDetail({ state }, { id }) {
      const request = await axios.get(`/api/Orders/getAllByUserId/${id}`)


      return request.data
    },
    async addOrder({ state, dispatch }, { userId, paymentId, addressId, requiredDate, shippedDate, comment, allowed, couponCode, orderProductDtos, currencyId }) {
      const request = await axios.post('/api/Orders/add', { userId, paymentId, addressId, requiredDate, shippedDate, comment, allowed, couponCode, orderProductDtos, currencyId })

      return request.data
    },

    async detailOrder({ state }, { id }) {
      const request = await axios.get(`/api/Orders/${id}`)

      return request.data.data

    },
    //Files

    async fetchPdf() {
      const request = await axios.get('/api/Files/getAll')

      return request.data
    },
    async deletePdf({ state, dispatch }, id) {
      const request = await axiosInstance().post(`/api/Files/delete/${id}`)

      return request.data
    },
    async addPdf({ state, dispatch }, formData) {
      const request = await axios.post('/api/Files/add', formData)

      return request.data
    },


    //Brands
    async fetchBrands() {
      const request = await axios.get('/api/Brands/getall')

      return request.data
    },

    async addBrand({ state, dispatch }, name) {
      const request = await axiosInstance().post('/api/Brands/add', name)

      return request.data
    },

    //ProjectImages
    async fetchProjectImages({ state }, projectId) {
      const request = await axios.get(`/api/ProjectImages/getbyprojectid/${projectId}`)

      return request.data
    },

    async addProjectImage({ state, dispatch }, formData) {
      const request = await axios.post('/api/ProjectImages/add', formData)

      return request.data
    },

    //Statuses
    async fetchStatus() {
      const request = await axios.get('/api/Statuses/getall')

      return request.data
    },

    //Cities
    async fetchCities() {
      const request = await axios.get('/api/Cities/getall')

      return request.data
    },
    //Countries
    async fetchCountries() {
      const request = await axios.get('/api/Countries/getall')

      return request.data
    },

    //Addresses
    async fetchAddress({ state }, { userId }) {
      const request = await axios.get(`/api/Addresses/getAll/${userId}`)

      return request.data
    },

    async addAddress({ state, dispatch }, { userId, cityId, countryId, addressName, name, surname, phoneNumber, address1, address2, postalCode }) {
      const request = await axios.post('/api/Addresses/add', { userId, cityId, countryId, addressName, name, surname, phoneNumber, address1, address2, postalCode })

      return request.data
    },

    //ProductImages
    async getProductImages({ state }, productId) {
      const request = await axiosInstance().get(`/api/ProductImages/getbyproductid/${productId}`)

      return request.data

    },
    async deleteProductImages({ state }, productId) {
      const request = await axiosInstance().post(`/api/ProductImages/delete/${productId}`)

      return request.data

    },
    async addProductImage({ state, dispatch }, formData) {
      const request = await axios.post('/api/ProductImages/add', formData)

      return request.data
    },

    //Images
    async deletePageImages({ state }, id) {
      const request = await axiosInstance().delete(`/api/Images/delete/${id}`)

      return request.data

    },

    async addPageImage({ state, dispatch }, formData) {
      const request = await axios.post('/api/Images/add', formData)

      return request.data
    },

    async fetchImage({ state }, key) {
      const request = await axios.get(`/api/Images/getbykey/${key}`)

      return request.data
    },

    //Electronics
    async addProduct({ state, dispatch }, { name, productCode, brandId, unitPrice, longDescription, shortDescription, pLocation, createdDate, updatedDate, supplierId, currencyId, categoryAddRequest, unitsInStock }) {
      const request = await axiosInstance().post('/api/Electronics/add', { name, productCode, brandId, unitPrice, longDescription, shortDescription, pLocation, createdDate, updatedDate, supplierId, currencyId, categoryAddRequest, unitsInStock })

      return request.data
    },

    async productDelete({ state, dispatch }, { id }) {
      const request = await axiosInstance().post(`/api/Electronics/delete/${id}`)

      return request.data
    },

    //Projects
    async addProject({ state, dispatch }, { name, description, slogan, goals, technical, mission, status, startDate, endDate, extra1, extra2, extra3, extra4, extra5 }) {
      const request = await axiosInstance().post('/api/Projects/add', { name, description, slogan, goals, technical, mission, status, startDate, endDate, extra1, extra2, extra3, extra4, extra5 })

      return request.data
    },
    async fetchProjects() {
      const request = await axios.get('/api/Projects/getall')

      return request.data
    },
    async fetchProject({ state }, projectId) {
      const request = await axios.get(`/api/Projects/getById/${projectId}`)

      return request.data
    },

    //MainPages
    async mainUpdate({ state, dispatch }, { key, value }) {

      const request = await axiosInstance().post('/api/MainPages/update', { key, value })

      return request.data
    },
    async fetchMain() {
      const request = await axios.get('/api/MainPages/getall')

      return request.data
    },
    async fetchMainRoute() {
      const request = await axios.get('/api/MainPages/getall')

      return request.data.data
    },

    //Carts
    async getCardProduct({ state, dispatch }, userId) {
      const request = await axios.get(`/api/Carts/getAllCartByUserId/${userId}`)

      return request.data.data
    },

    async fetchCard({ state }, userId) {
      const request = await axios.get(`/api/Carts/getAllCartByUserId/${userId}`)

      return request.data.data

    },
    async deleteCard({ state }, { userId }) {
      const request = await axiosInstance().post(`/api/Carts/deleteAllCartsByUserId/${userId}`)

      return request.data
    },
    async addCardProduct({ state, dispatch }, { userId, productId, quantity }) {
      const request = await axios.post('/api/Carts/add', { userId, productId, quantity })

      return request.data
    },

    async increaseProduct({ state, dispatch }, { userId, productId }) {
      const request = await axios.post(`/api/Carts/increaseQuantity/${userId}/${productId}`)
      
      return request.data
    },

    async decraseProduct({ state, dispatch }, { userId, productId }) {
      const request = await axios.post(`/api/Carts/decreaseQuantity/${userId}/${productId}`)
     
      return request.data
    },



    // async degis({ state, dispatch }, {key, value }) {

    //   const request = await axiosInstance().post('/api/MainPages/add', { key, value })

    //   return request.data
    // },

    // async degis2({ state, dispatch }, { id }) {

    //   const request = await axiosInstance().post(`/api/MainPages/delete/${id}`)
    //   console.log('ciakrildi');

    //   return request.data
    // },

  },
  getters: {  // cikis yap butonunu kaybetmek icin getters kullanacagiz
    isAuthenticated(state) {
      return state.role !== false
    },
    isTeknik(state) {
      return state.teknikrole !== false
    },
    showclass(state) {
      return state.token !== ""
    },
  },


});
