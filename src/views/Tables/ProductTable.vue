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
        <div class="col-md-2">
          <base-checkbox class="mb-3" style="padding-top:13px;" v-model="showActive">
            <b style="margin-left:-15px;font-size:12px">Tampilkan Arsip</b>
          </base-checkbox>
        </div>
        <div class="col-lg-5 text-right p-0 pr-3 row" style="height:43px">
          <div class="col-md-8 pr-1">
            <base-input v-model="search" placeholder="Cari produk disini..." addon-left-icon="ni ni-zoom-split-in"></base-input>
          </div>
          <div class="col-md-4 pl-1">
            <router-link to="/product/tambah">
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
                  :data="filteredProduct"
                  :pagination="pagination"
                  :perPage="perPage">

        <template slot="columns">
          <th>Nama Produk</th>
          <th>Dimensi</th>
          <th>Status Produk</th>
          <th>Jenis Produk</th>
          <th></th>
        </template>

        <template slot-scope="{row}">

          <th scope="row">
            <div class="media align-items-center">
              <span @click="showImage(baseURL + row.product_img)" class="avatar rounded-circle mr-3">
                <div :style="'width:100%;height:100%;border-radius:100%;background:url(' + baseURL + row.product_img + ';background-size:cover;background-position:center'">
                </div>
              </span>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.product_name}}</span>
              </div>
            </div>
          </th>

          <td>
            <span class="name mb-0 text-sm">{{row.product_dimension_length}} cm x {{row.product_dimension_wide}} cm x {{row.product_dimension_height}} cm</span>
          </td>

          <td>
            <badge pill type="success" v-if="row.active == 1" style="font-size:11px">Aktif</badge>
            <badge pill type="danger" v-if="row.active == 0" style="font-size:11px">Diarsipkan</badge>
          </td>
          
          <td>
            <span class="name mb-0 text-sm">{{row.product_type}}</span>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
                <a slot="title" 
                   class="btn btn-sm btn-icon-only text-light" 
                   role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="ni ni-bullet-list-67" style="color:#000000"></i>
                </a>
              <template >
                <a class="dropdown-item" :href="'#/product/detail/' + row.product_id" >Buka produk</a>
                <span v-if="row.active == 1" class="dropdown-item" style="cursor: pointer" @click="archive(row.product_id)">Arsipkan</span>
                <span v-if="row.active == 0" class="dropdown-item" style="cursor: pointer" @click="restore(row.product_id)">Pulihkan Arsip</span>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>

    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination  :total="filteredProduct.length" 
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
        showActive: 0,
        tableData: [],
        search: "",
        pagination : 1,
        perPage: 10
      }
    },
    methods: {
      getProduct : function(){
        var app = this;
        let url = baseURL + "/furniture_api/api/v1/product/get.php";
        axios.get(url)
             .then(function(response){
                app.tableData = response.data.product; 
                console.log(response);
             })
             .catch(function(error){
                console.log(error);
             })
      },

      showImage : function(image){
        this.$swal({
          imageUrl: image,
          imageWidth: 400,
          imageHeight: 400,
        });
      },

      archive : function(id){
        var app = this;
        this.$swal({
          title : 'Arsipkan Data?',
          text  : "Anda yakin ingin mengarchive data ini?",
          icon  : "question",
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'Arsipkan',
          cancelButtonText : 'Batal',
          showCancelButton: true
        })
        .then((result) => {
          if(result.value){
            app.archiveProduct(id);
          }
        });
      },

      restore : function(id){
        var app = this;
        this.$swal({
          title : 'Pulihkan Data?',
          text  : "Anda yakin ingin memulihkan data ini dari arsip?",
          icon  : "question",
          confirmButtonColor: '#2ecc71',
          confirmButtonText: 'Pulihkan',
          cancelButtonText : 'Batal',
          showCancelButton: true
        })
        .then((result) => {
          if(result.value){
            app.restoreProduct(id);
          }
        });
      },

      archiveProduct : function(id){
        var app = this;
        console.log(id);
        let url = baseURL + "/furniture_api/api/v1/product/archive.php?id=" + id;
        axios.get(url)
            .then(function(response){
              app.tableData = response.data;
              app.$swal("Arsip Berhasil", "Data berhasil di archive", "success");
              console.log(response.data);
            })
            .catch(function(error){
              app.$swal("Arsip Gagal", "Data gagal di archive", "error");
              console.log(error);
            })
      },

      restoreProduct : function(id){
        var app = this;
        console.log(id);
        let url = baseURL + "/furniture_api/api/v1/product/restore.php?id=" + id;
        axios.get(url)
            .then(function(response){
              app.tableData = response.data.product;
              app.$swal("Pemulihan Berhasil", "Data berhasil dipulihkan", "success");
              console.log(response.data);
            })
            .catch(function(error){
              app.$swal("Pemulihan Gagal", "Data gagal dipulihkan", "error");
              console.log(error);
            })
      }
    },

    computed: {
      filteredProduct() {
        return this.tableData.filter(tableData => {

          if(this.showActive == 0){
            if(tableData.active == 1){
              return tableData.product_name.toLowerCase().includes(this.search.toLowerCase());
            }
          }
          else{
            if(tableData.active == 1 || tableData.active == 0){
              return tableData.product_name.toLowerCase().includes(this.search.toLowerCase());
            }
          }
        })
      }
    },
    created(){
      this.getProduct();
    }
  }
</script>
<style>
</style>
