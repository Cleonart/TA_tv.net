<template>
  <div>

    <!-- legend -->
    <div class="legend">
      <p @click="$refs.tes[6].remove()"><i class="ni ni-pin-3" style="color:#e74c3c"></i> BELUM MEMBAYAR</p>
      <p><i class="ni ni-pin-3" style="color:#2ecc71"></i> LUNAS</p>
      <p style="margin-bottom:10px"><i class="ni ni-pin-3" style="color:#f1c40f"></i> PELANGGAN BARU</p>
    </div>

    <div class="settings">

      <p>Pengaturan</p>

      <select class="form-control" v-model="month_select">
        <option>Januari</option>
        <option>Februari</option>
        <option>Maret</option>
        <option>April</option>
        <option>Mei</option>
        <option>Juni</option>
        <option>Juli</option>
        <option>Agustus</option>
        <option>September</option>
        <option>Oktober</option>
        <option>November</option>
        <option>Desember</option>
      </select>

      <select class="form-control" v-model="year_select">
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
        <option>2026</option>
        <option>2027</option>
        <option>2028</option>
        <option>2029</option>
        <option>2030</option>
      </select>

      <p>Visualisasi</p>
      <select class="form-control" v-model="legend_select">
        <option value="1">Tampilkan Semua</option>
        <option value="2">Belum Membayar</option>
        <option value="3">Sudah Membayar</option>
      </select>
    </div>

    <MglMap accessToken="pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g"
            :mapStyle.sync="mapStyle"
            :center="coordinates"
            :zoom="13"
            :minZoom="minZoom"
            :maxZoom="maxZoom"
            ref="mapbox">
            <span>
              <MglMarker  ref="tes" 
                          v-for="(customer) in data" 
                          :coordinates="customer.customer_loc" 
                          :color="check_color(customer)" 
                          v-bind:key="customer.customer_id" >
                  <span slot="marker" style="font-size:30px;">
                    
                    <i v-if="customer.billing.num_of_month > 0 && (legend_select == 1 || legend_select == 2)" 
                       class="ni ni-pin-3" style="color:#e74c3c"></i>
                    
                    <i v-if="customer.billing.num_of_month == 0 && (legend_select == 1 || legend_select == 3)" 
                       class="ni ni-pin-3" style="color:#2ecc71"></i>
                  </span>
                  
                  <MglPopup :coordinates="customer.customer_loc" anchor="top">
                      <VCard>
                          <div style="margin-left:20px;margin-right:20px;">
                              <!-- badge -->
                              <div style="margin-left:-3px;margin-top: 15px;margin-bottom: 10px;font-size:16px;">
                                <span v-if="customer.billing.num_of_month == 0" class="badge badge-pill badge-success">Tidak Ada Tagihan</span>
                                <span v-else class="badge badge-pill badge-danger">Tagihan Belum Dibayar</span>
                              </div>

                              <!-- nama customer, bulan menunggak -->
                              <p style="margin-bottom: 5px;font-size: 12px;font-weight: bold;margin-top: 10px;">{{customer.customer_id}}</p>
                              <p style="margin-bottom: 1px;">{{customer.customer_name}}</p>
                              
                              <p class="mt-0" v-if="customer.billing.num_of_month > 0">[{{customer.billing.num_of_month}}] Bulan Tagihan</p>
                              <p v-else>Tidak ada tagihan bulan ini</p>

                              <h4 class="mb-0">Layanan {{customer.customer_ser}}</h4>
                              <p>{{formatRupiah(customer.billing_price)}}</p>
                              
                              <!-- [REDIRECT] to Detail Pelanggan -->
                              <router-link :to="'/master/pelanggan/' + customer.customer_id">
                                <base-button type="primary" class="mb-2">Data Pelanggan</base-button>
                              </router-link>

                              <!-- [REDIRECT] to Bill -->
                              <router-link :to="'/bill/' + customer.customer_id + '-' + month_select_numeric + '-' + year_select">
                                  <base-button v-if="customer.billing.num_of_month > 0" type="success">Bill</base-button>
                              </router-link>
                          </div> 
                      </VCard>
                  </MglPopup>
              </MglMarker>
          </span>
      </MglMap>
  </div>
</template>

<script>
import { MglMap, MglMarker, MglPopup , VCard } from "vue-mapbox";
import {baseURL, formatRupiah} from "../functions/universal.js";
const axios = require('axios');

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    VCard
  },
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [124.317687, 1.047018],
      minZoom : 3,
      maxZoom : 17,
      mapboxAccessToken : 'pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g',
      data : [],
      month_select : "April",
      month_select_numeric : 4,
      year_select : "2021",
      legend_select : 1,
   };
  },
  watch : {

    month_select : function(val){
      this.month_select_numeric = this.reconfigureMonth(val);
      this.getData(this.reconfigureMonth(val), this.year_select);
      console.log(this.$refs.tes);
    },

    year_select : function(){
      this.getData(this.reconfigureMonth(this.month_select), this.year_select);
    }

  },
  methods : {

    getData : function(local_month_select, local_year_select){

      this.$swal({
        icon: 'warning',
        title: 'Mohon tunggu',
        text: 'Sedang Mengirim data...',
        allowOutsideClick: false,
        showConfirmButton: false,
        timerProgressBar: true,
        onBeforeOpen: () => {
          this.$swal.showLoading()
        },
      });

      let url = baseURL + "/tv.netAPI/v1/transaction/get.php?month_select=" + local_month_select + "&year_select=" + local_year_select;
      var app = this;
      axios.get(url)
          .then(function(response){
            console.log(response);
            app.$swal.close();
            app.data = response.data;
          })
          .catch(function(error){
            console.log(error);
          }) 
    },

    check_color : function(customer){
      if(customer.billing.num_of_month > 0){
        return "red";
      }
      return "green";
    },

    reconfigureMonth : function (val) {
      let month_select_numeric = 11;
      switch(val){
        case "Januari"   : month_select_numeric = 1; break;
        case "Februari"  : month_select_numeric = 2; break; 
        case "Maret"     : month_select_numeric = 3; break;
        case "April"     : month_select_numeric = 4; break;
        case "Mei"       : month_select_numeric = 5; break; 
        case "Juni"      : month_select_numeric = 6; break;
        case "Juli"      : month_select_numeric = 7; break;
        case "Agustus"   : month_select_numeric = 8; break; 
        case "September" : month_select_numeric = 9; break;
        case "Oktober"   : month_select_numeric = 10; break;
        case "November"  : month_select_numeric = 11; break; 
        case "Desember"  : month_select_numeric = 12; break;
      }
      return month_select_numeric;
    },

    formatRupiah : function(value){
      return formatRupiah(String(value), "Rp. ");
    }
  },
  
  created(){
    this.getData(this.reconfigureMonth(this.month_select), this.year_select);
    
  }
};
</script>

<style type="text/css">
  
  .legend, .settings{
    position: absolute;
    top: 0;
    z-index: 100;
    margin-left: 15px;
    margin-top:15px;
    background-color:#fff;
    border-radius: 5px;
    padding-top:10px;
    padding-left:10px;
    padding-right: 20px;
  }

  .settings{
    right: 0;
    margin-left: 0px;
    margin-right: 15px;
    padding-bottom: 6 px;
  }

  .legend p, .settings p{
    font-size:11px;
    font-weight:bold;
    margin-top:0px;
    margin-bottom:5px;
  }

  .settings select{
    font-size: 12px;
    margin-bottom: 10px;
  }

  .mgl-map-wrapper{
    width:100%;
    height: 100vh;
    position: absolute;
    z-index: 99;
  }

</style>
