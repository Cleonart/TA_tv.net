<template>
	<div>
		<base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="min-height: 400px; background-image: url(img/order.jpg); background-size: cover; background-position: center -100px;">
      <span class="mask bg-gradient-success opacity-8"></span>
      <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
        <div class="row mb-4">
          <div class="col-lg-12 col-md-10">
            <h1 class="display-2 text-white mt-4" style="line-height:55px">Daftar {{title}}</h1>
            <p class="text-white mt-0 mb-4">Kelola setiap {{title}} dari laman ini</p>
            <router-link to="/order/tambah">
              <base-button type="info" class="mr-3">Tambah {{title}} Baru</base-button>
            </router-link>
            <base-button type="primary" @click="refresh()" class="mr-3 mt-2">Segarkan</base-button>
          </div>
        </div>
      </div>
    </base-header>
		<div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <Mastertable ref="table" :title = title 
                                             :url   = url></Mastertable>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

  // Tables
  import Mastertable from '../Components/Mastertable.vue';

  export default {
    components: {
      Mastertable
    },
    data(){
      return{
        title : "",
        url   : "",
        pageData : {
          
          "Pelanggan" : {
            url : 'v1/customer/get.php'
          },

          "Services" : {
            url : 'v1/services/get.php'
          },

          "Transaksi" : {
            url : 'v1/billing/get.php'
          }

        }
      }
    },

    methods : {

      refresh : function() {
        this.$refs.table.getMasterData(this.url);
      }

    },

    watch:{

      '$route.params.selector': function (val) {
        this.url   = this.pageData[val].url;
        this.title = val;
        this.$refs.table.getMasterData(this.url);
      }

    },
    created(){
      this.title = this.$route.params.selector;
      this.url   = this.pageData[this.title].url
    }

  };
</script>