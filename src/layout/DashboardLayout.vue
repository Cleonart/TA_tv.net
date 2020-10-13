<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Argon" title="Furniture App">
      <template slot="links">

        <sidebar-item :link="{name: 'Dashboard', icon: 'ni ni-tv-2 text-blue', path: '/dashboard'}"/>
        <sidebar-item :link="{name: 'Transaksi Baru', icon: 'ni ni-money-coins text-blue', path: '/pos/transaction/new'}"/>

        <h6 class="navbar-heading text-muted ml-4 mb-0 mt-3">Master Data <i class="ni ni-bold-down"></i></h6>
        <span>
          <sidebar-item :link="{name: 'Staff', icon: 'ni ni-single-02 text-blue', path: '/master/Staff'}"/>
          <sidebar-item :link="{name: 'Pasien', icon: 'ni ni-badge text-red', path: '/master/Patients'}"/>
          <sidebar-item :link="{name: 'Produk', icon: 'ni ni-tag text-orange', path: '/master/Product'}"/>
          <sidebar-item :link="{name: 'Layanan', icon: 'ni ni-glasses-2 text-yellow', path: '/master/Services'}"/>
        </span>
        
        <h6 class="navbar-heading text-muted ml-4 mb-0 mt-3">POS <i class="ni ni-bold-down"></i></h6>
        <span>
          <sidebar-item :link="{name: 'Inventaris', icon: 'ni ni-box-2 text-blue', path: '/admin/Inventaris'}"/>
          <sidebar-item :link="{name: 'Kasir', icon: 'ni ni-credit-card text-blue', path: '/admin/Cashier'}"/>
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
      }
    }
  };
</script>
<style lang="scss">
</style>
