<template>
    <div>
        <div style="position:absolute;z-index:99">
          <base-button type="primary" icon="ni ni-world">Refresh</base-button>
        </div>
        <mapbox
          ref="maps"
          access-token="pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g"
          :map-options="{
            style: 'mapbox://styles/mapbox/light-v9',
            center: [124.317687, 1.047018],
            zoom: 13,}"/>
    </div>
</template>
<script>

  import Mapbox from 'mapbox-gl-vue'

  export default {
    components: {Mapbox},
    data() {
      return {
        
      }
    },
    created(){
      console.log(this.$refs.map);
    },
  };
</script>
<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
