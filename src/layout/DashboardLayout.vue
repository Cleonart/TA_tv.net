<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Argon" title="Furniture App">
      <template slot="links">

        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-blue', path: '/dashboard'}"/>
        <sidebar-item :link="{name: 'Pemasangan Baru', icon: 'ni ni-money-coins text-blue', path: '/my_id/new-instalation'}"/>

        <h6 class="navbar-heading text-muted ml-4 mb-0 mt-3">Master Data <i class="ni ni-bold-down"></i></h6>
        <span>
          <sidebar-item :link="{name: 'Daftar Pelanggan', icon: 'ni ni-single-02 text-blue', path: '/master/Pelanggan'}"/>
          <sidebar-item :link="{name: 'Tagihan dan Transaksi', icon: 'ni ni-tag text-orange', path: '/master/Transaksi'}"/>
          <sidebar-item :link="{name: 'Layanan', icon: 'ni ni-tag text-orange', path: '/master/Services'}"/>
          <base-button type="danger" @click="logout()" class="ml-4 mt-3">Log Out</base-button>
        </span>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      logout : function(){
        const app = this;
        this.$swal({
          title: 'Log Out?',
          text: "Anda yakin ingin keluar dari akun anda?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e74c3c',
          confirmButtonText: 'Ya, Keluar'
        }).then((result) => {
          if(result.isConfirmed){
            localStorage.setItem("login_credential", null);
            app.$router.replace("/login");
        }});
      }
    }
  };
</script>
<style lang="scss">
</style>
