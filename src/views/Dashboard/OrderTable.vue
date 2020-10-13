<template>
  <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col-lg-5 text-right p-0 pr-3 row" style="height:43px">
          <div class="col-md-8 pr-1">
            <base-input v-model="search" 
                        placeholder="Cari order disini..." 
                        addon-left-icon="ni ni-zoom-split-in"></base-input>
          </div>
          <div class="col-md-4 pl-1">
            <router-link to="/order/tambah">
              <base-button class="w-100" type="primary" icon="ni ni-fat-add">Baru</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="filteredOrder">
        <template slot="columns">
          <th>ID Order</th>
          <th>Nama Order</th>
          <th>Status</th>
          <th>Lokasi</th>
          <th>Produk</th>
          <th></th>
        </template>
        <template slot-scope="{row}">

           <!-- order id -->
          <td>
            <span class="name mb-0 text-sm">{{row.order.order_id}}</span>
          </td>

          <td scope="row">
            <span class="name mb-0 text-sm"><strong>{{row.order.order_name}}</strong></span>
          </td>

          <!-- status -->
          <td>
            <badge class="badge-dot mr-4" :type="row.order.order_status">
              <span class="status">{{row.order.order_status}}</span>
            </badge>
          </td>

          <td scope="row">
            <span class="name mb-0 text-sm">{{row.order.order_location}}</span>
          </td>

          <!-- produk spk -->
          <td>
            <div class="avatar-group">
              <a v-for="data in row.spk" :key="data" href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip">
                <div :style="'width:100%;height:100%;border-radius:100%;background:url(' + baseURL + data.product_img + ';background-size:cover;background-position:center'">
                </div>
              </a>
            </div>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bullet-list-67" style="color:#000"></i>
              </a>
              <template>
                <a class="dropdown-item" :href="'#/order/detail/' + row.order.order_id">Buka order</a>
                <a class="dropdown-item" href="#">Printout</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination  :total="filteredOrder.length" 
                        :perPage="perPage" 
                        v-model="pagination"></base-pagination>
    </div>

  </div>
</template>
<script>
  
  import {baseURL} from "../../functions/universal.js";
  const axios = require('axios');

  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        tableData: [],
        search: "",
        pagination : 1,
        perPage: 10
      }
    },
    methods: {
      
      getOrderData : function(){
        var app = this;
        let url = baseURL + "/furniture_api/api/v1/order/get.php";

        axios.get(url)
          .then(function(response){
            //app.products = response.data.product;
            console.log(response.data);
            app.tableData = response.data.data;
            //app.dismissLoading();
          })
          .catch(function(error){
            console.log(error);
          })
      }

    },
    computed: {
      filteredOrder() {
        return this.tableData.filter(tableData => {
          let data = tableData.order.order_name.toLowerCase().includes(this.search.toLowerCase()); 
          return data;
        })
      }
    },
    created(){
      this.getOrderData();
    }
  }
</script>
<style>
</style>
