<template>
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
            <div style="margin-left:20px;margin-right:20px">
              <p>{{customer.customer_id}} - {{customer.customer_name}}</p>
              <p>{{customer.customer_paid}} MEMBAYAR</p>
              <base-button type="primary">Data Lengkap</base-button>
            </div> 
          </VCard>
        </MglPopup>
      </MglMarker>
    </span>
  </MglMap>
</template>

<script>
import { MglMap, MglMarker, MglPopup  } from "vue-mapbox";

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
  }
};
</script>

<style type="text/css">
  
  .mgl-map-wrapper{
    width:100%;
    height: 100vh;
    position: absolute;
    z-index: 99;
  }

</style>