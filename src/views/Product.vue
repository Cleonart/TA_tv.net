<template>
	<div>
		<base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="min-height: 400px; background-image: url(img/products.jpg); background-size: cover; background-position: center -100px;">
      <span class="mask bg-gradient-success opacity-8"></span>
      <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
        <div class="row mb-4">
          <div class="col-lg-12 col-md-10">
            <h1 class="display-2 text-white">Produk Furniture</h1>
            <p class="text-white mt-0 mb-4">Kelola berbagai macam produk furniture anda disini..</p>
            <router-link to="/product/tambah">
              <base-button type="info" class="mr-3">Tambah Produk Baru</base-button>
            </router-link>
            <router-link to="/product">
              <base-button type="primary" icon="ni ni-app">Segarkan</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </base-header>
		<div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <Products title="Daftar Produk"></Products>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import Products from './Tables/ProductTable.vue';
  
  export default {
    data(){
      return{
       
      }
    },
    components: {
      Products,
    },
  };
</script>