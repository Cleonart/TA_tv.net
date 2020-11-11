===================================<template>
  <div>
    <!-- legend -->
    <div class="legend">
      <p><i class="ni ni-pin-3" style="color:#e74c3c"></i> BELUM MEMBAYAR</p>
      <p><i class="ni ni-pin-3" style="color:#2ecc71"></i> LUNAS</p>
      <p style="margin-bottom:10px"><i class="ni ni-pin-3" style="color:#f1c40f"></i> PELANGGAN BARU</p>
    </div>
    <div class="settings">
      <p>Pengaturan</p>
      <select class="form-control">
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
      <select class="form-control">
        <option>2020</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
        <option>2026</option>
      </select>
    </div>
    <MglMap
      accessToken="pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g"
      :mapStyle.sync="mapStyle"
      :center="coordinates"
      :zoom="13"
      :minZoom="minZoom"
      :maxZoom="maxZoom">
      <span>
        <MglMarker v-for="customer in data" :coordinates="customer.customer_loc" :color="customer.customer_color" v-bind:key="customer.customer_id" >
          <MglPopup :coordinates="customer.customer_loc" anchor="top">
            <VCard>
              <!-- dont forget to making card -->
              <div style="margin-left:20px;margin-right:20px">
                <!-- nama customer, bulan menunggak -->
                <p>CU1212</p>
                <p>Chrisdityra Lengkey</p>
                <p>2 Bulan Tagihan</p>
                <p>Tidak ada tagihan bulan ini</p>
                <base-button type="primary">Data Pelanggan</base-button>
                <base-button type="success">Bill</base-button>
              </div> 
            </VCard>
          </MglPopup>
        </MglMarker>
      </span>
    </MglMap>
  </div>
</template>

<script>
import { MglMap, MglMarker, MglPopup  } from "vue-mapbox";
import {baseURL} from "../functions/universal.js";
const axios = require('axios');

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [124.317687, 1.047018],
      minZoom : 8,
      maxZoom : 17,
      mapboxAccessToken : 'pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g',
      data : [
        {
          customer_id    : "CST12112",
          customer_name  : "Chrisdityra",
          customer_loc   : [124.316936, 1.046514],
          customer_paid  : "SUDAH",
          customer_color : "#2ecc71"
        },
        {
          customer_id    : "CST12132",
          customer_name  : "Jimmy",
          customer_loc   : [124.317687, 1.047018],
          customer_paid  : "BELUM",
          customer_color : "#e74c3c"
        }
      ]
   };
  },
  methods : {
    getData : function(){
      let url = baseURL + "/tv.netAPI/v1/transaction/";
      var app = this;
      axios.get()
          .then(function(response){
            console.log(response);
            app.data = response.data;
          })
          .catch(error){
            console.log(error);
          }
    }
  },
  
  created(){
    this.getData();
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
