<template>
	<div>
		<base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="min-height: 400px; background-image: url(img/order.jpg); background-size: cover; background-position: center -100px;">
      <span class="mask bg-gradient-success opacity-8"></span>
      <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
        <div class="row mb-4">
          <div class="col-lg-12 col-md-10">
            <h1 class="display-2 text-white">Daftar Order</h1>
            <p class="text-white mt-0 mb-4">Kelola setiap order dan SPK dari laman ini</p>
            <router-link to="/order/tambah">
              <base-button type="info" class="mr-3">Tambah Order Baru</base-button>
            </router-link>
            <router-link to="/order">
              <base-button type="primary" icon="ni ni-app">Segarkan</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </base-header>
		<div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <OrderTable title="Daftar Order Furniture"></OrderTable>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

  // Tables
  import OrderTable from './Dashboard/OrderTable.vue';

  export default {
    components: {
      OrderTable,
    }
  };
</script>