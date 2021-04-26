<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>

<script type="text/javascript">
	export default{
		created(){
			let local_credential = localStorage.getItem("login_credential"); 

			if (local_credential == null || local_credential == "null"){
				this.$router.replace("/login");
				return;
            }
            this.$swal("Anda telah login", "Mengarahkan ke halaman utama", "success");
            this.$router.replace("/dashboard");
		}
	}
</script>
