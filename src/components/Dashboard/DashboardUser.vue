<template>
  <div class="b">
    <div class="container-fluid">
      <div class="row d-flex justify-content-around">
        <div class="col-12">
            <input class="mb-2 ms-4" v-model="search" type="text" placeholder="Arama Yap..." />
        </div>
        <div class="col-md-8 p-2 tabloCustom">
            
          <div class="table-responsive Datatable">
            <table id="deneme" class="table table-sm align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">İsim Soyisim</th>
                  <th scope="col">E-Posta</th>
                  <th scope="col">Roller</th>

                  <th>Aksiyonlar</th>
                </tr>
              </thead>
              <tbody class="table-group-divider" v-if="users.data">
                <tr v-for="user in filteredItems" :key="user.id">
                  <th class="p-2" scope="row">{{ user.id }}</th>
                  <td class="p-2">{{ user.firstName }} {{ user.lastName }}</td>
                  <td class="p-2 tableFont">{{ user.email }}</td>
                  <td class="p-2">
                    <ul
                      class="list-unstyled"
                      v-for="a in user.roleDtos"
                      :key="a.id"
                    >
                      <li>
                        {{ a.name }}
                        <button
                          v-if="a.name != 'ROLE_USER'"
                          @click="deleteUserRole(user.id, a.id)"
                          class="btn btn-outline-danger py-0 border-0"
                        >
                          -
                        </button>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <button
                      class="btn btn-outline-success me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      @click.prevent="al(user.id)"
                    >
                      Rol Ekle
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-12 col-md-3 p-0 tabloCustom">
          <div class="table-responsive">
            <table class="table align-middle">
              <thead class="tableThead">
                <tr>
                  <th scope="col">#Id</th>
                  <th scope="col">
                    Roller
                  
                  </th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-for="brand in roles.data" :key="brand.id">
                  <th scope="row">{{ brand.id }}</th>
                  <td>{{ brand.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Durum Değiştir</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <select v-model="stat">
              <option
                v-for="item in roles.data"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <button @click="addUserRole()" class="btn btn-outline-danger ms-2">
              Ekle
            </button>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      users: {},
      status: {},
      stat: "",
      orderDetail: {},
      id: "",
      role: "",
      roles: {},
      search:""
    };
  },
  computed: {
    
    filteredItems() {
      return this.users.data.filter((item) => {
        
        return item.firstName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
       
      });
    },
  },
  methods: {
    ...mapActions([
      "deleteRole",
      "fetchUser",
      "fetchStatus",
      "changeStatus",
      "addRole",
      "fetchRole",
      "addRoleUser",
    ]),
    async al(product) {
      this.id = product;
    },
    async deleteUserRole(userId, roleId) {
      this.id = userId;
      this.role = roleId;

      await this.deleteRole({ userId: this.id, roleId: this.role });
      this.users = await this.fetchUser();
    },
   async addUserRole() {
      let userId = this.id;
      let roleId = this.stat;
    await  this.addRoleUser({ userId, roleId });
    this.users = await this.fetchUser();
    },
  },
  async mounted() {
    this.users = await this.fetchUser();
    this.roles = await this.fetchRole();
  },
};
</script>

<style  scoped>
.b {
  margin-top: 150px;
}
span {
  font-size: 14px;
  color: #b4b7bd;
  font-weight: 500;
  margin: 0;
}
h3 {
  color: #d0d2d6;
}
.productData {
  color: #7367f0;
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
input[type="text"] {
  
  border: 0;
  border-bottom: solid 1px #b4b7bd;
  padding: 5px;
  color: white;
  
  background: transparent;
   transition: 0.5s;
}
input:focus{
 border-color:  #555;
 background-color: #b4b7bd;
}
</style>