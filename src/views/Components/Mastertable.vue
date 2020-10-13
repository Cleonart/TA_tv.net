<template>
  <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col-lg-7 col-md-12 col-sm-12">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col-lg-5 text-right p-0 pr-3 row" style="height:43px">
          <div class="col-md-8 pr-1">
            <base-input v-model="search" 
                        :placeholder="'Cari ' + title + ' disini...'" 
                        addon-left-icon="ni ni-zoom-split-in"></base-input>
          </div>
          <div class="col-md-4 pl-1">
            <router-link :to="'/master/' + title + '/add'">
              <base-button class="w-100" type="primary" icon="ni ni-fat-add">Baru</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive" v-if="Masterdata != []">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :perPage="perPage"
                  :pagination="pagination"
                  :data="filteredData">
        <template slot="columns">
          <th v-for="headerValue in Masterdata.table_header" v-bind:key="headerValue">{{headerValue}}</th>
          <th></th>
        </template>
        <template slot-scope="{row}">

          <td v-for="tableData in row" v-bind:key="tableData.data">
            
            <!-- id -->
            <span v-if="tableData.type == 'id'">
              {{tableData.data}}
            </span>

            <!-- text -->
            <span v-if="tableData.type == 'text'">
              {{tableData.data}}
            </span>

            <!-- text -->
            <span v-if="tableData.type == 'price'">
              Rp.{{formatRupiah(tableData.data)}}
            </span>

            <!-- text -->
            <span v-if="tableData.type == 'date'">
                {{formatTanggal(tableData.data)}}
            </span>

             <!-- badge -->
            <span v-if="tableData.type == 'badge'">
              <span :class="tableData.class + ' badge-lg'" style="font-size:11px">{{tableData.data}}</span>
            </span>

            <!-- badge radio -->
            <span v-else-if="tableData.type == 'badge_radio'">
              <badge class="badge-dot mr-4" :type="tableData.class">
                <i :class="`bg-${tableData.class}`"></i>
              <span class="status">{{tableData.value}}</span>
              </badge>
            </span>
          </td>
          
          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ni ni-bullet-list-67" style="color:#000"></i>
              </a>
              <template>
                <router-link :to="'/master/' + title + '/' + row[0].data">
                  <a class="dropdown-item" style="color:#000">Buka Data</a>
                </router-link>
                <!--<a class="dropdown-item" href="#">Printout</a>-->
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination  :total="filteredData.length" 
                        :perPage="perPage" 
                        v-model="pagination"></base-pagination>
    </div>

  </div>
</template>
<script>

  import {baseURL, formatRupiah, formatTanggal} from "../../functions/universal.js";
  const axios = require('axios');

  export default {
    name: 'projects-table',
    props: ['type', 'title', 'url']
    ,
    data() {
      return {
        search: "",
        pagination : 1,
        perPage: 10,
        Masterdata : [],

        // setting
        settings : [],
      }
    },
    methods: {

      formatRupiah :function (value) {
        return formatRupiah(value);
      },

      formatTanggal :function (value) {
        return formatTanggal(value);
      },

      getMasterData : function(url_local){
        var app = this;
        let url = baseURL + "/lumeraAPI" + url_local;
        
        this.$swal({
            icon: 'warning',
            title: 'Mohon tunggu',
            text: 'Sedang mengambil data...',
            allowOutsideClick: false,
            showConfirmButton: false,
            timerProgressBar: true,
            onBeforeOpen: () => {
              this.$swal.showLoading()
            },
        });

        axios.get(url)
          .then(function(response){
            app.Masterdata = response.data;
            app.settings   = app.Masterdata.settings;
            app.$swal.close();
          })
          .catch(function(error){
            console.log(error);
            app.$swal({
              icon: 'error',
              title: 'Proses Gagal',
              confirmButtonText: 'Coba Lagi',
              text: 'Gagal mengambil data, server anda mungkin sedang bermasalah',
              preConfirm: () => {
                app.getMasterData(app.url);
              }
            });
          })
      }

    },

    computed: {
      filteredData() {
        return this.Masterdata.raw_data.filter(tableData => {
          let data = tableData[this.settings.search_index].data.toLowerCase().includes(this.search.toLowerCase()); 
          return data;
        })
      }
    },
    created(){
      this.getMasterData(this.url);
    }
  }
</script>
<style>
</style>
