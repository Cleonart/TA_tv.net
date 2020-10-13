<template>
	<div>
		<base-header class="header pb-4 pt-4 pt-lg-8 d-flex align-items-center" style="height: 70px; background-image: url(img/order.jpg); background-size: cover;background-position: center;margin-bottom:-70px;">
			<span class="mask bg-gradient-success opacity-8"></span>
		</base-header>
		
		<div class="container mt-3 pl-5 pr-5">
			
			<div class="row">

				<!-- settings color -->
				<div class="col card pl-4 pr-4 pt-4 pb-1">
					<h4 class="mb-3">Pengaturan Warna</h4>
					<div class="card pt-2 pl-4 pb-2 mb-1 bg-danger text-white" 
						v-if="colors.length == 0">Belum ada data</div>
					<div class="card pt-2 pl-4 pb-2 mb-1 bg-primary text-white" 
						v-for="item in colors" 
						:key="item.settings_item">
						<span v-if="colors.length > 0">{{item.settings_item}}</span>
						<span style="position:absolute;right:10px" 
							@click="archiveItem(item.settings_id)"><i style="color:white;font-size:19px;cursor: pointer" class="ni ni-fat-remove"></i></span>
					</div>	
					<div>
						<base-input v-model="color_input" 
									class="mt-2" 
									placeholder="Nama Warna" 
									required></base-input>
						<base-button @click="addNewItem(200, color_input)" 
									style="width:150px;margin-top:-12px" 
									class="mb-4"
									type="primary">Tambah Warna</base-button>
					</div>
				</div>

				<!-- settings components -->
				<div class="col card pl-4 pr-4 pt-4 pb-1 mr-2 ml-2">
					<h4 class="mb-3">Pengaturan Komponen</h4>
					<div class="card pt-2 pl-4 pb-2 mb-1 bg-danger text-white" 
						v-if="components.length == 0">Belum ada data</div>
					<div class="card pt-2 pl-4 pb-2 mb-1 bg-info text-white" v-for="item in components" :key="item.settings_item">{{item.settings_item}}<span style="position:absolute;right:10px" @click="archiveItem(item.settings_id)"><i style="color:white;font-size:19px;cursor: pointer" class="ni ni-fat-remove"></i></span></div>	
					<div>
						<base-input v-model="components_input" class="mt-2" placeholder="Nama Komponen" required></base-input>
						<base-button @click="addNewItem(100, components_input)" style="width:190px;margin-top:-12px" class="mb-4" type="primary">Tambah Komponen</base-button>
					</div>
				</div>

				<!-- settings color -->
				<div class="col card pl-4 pr-4 pt-4 pb-1">
					<h4 class="mb-3">Pengaturan Proses</h4>
					<div class="card pt-2 pl-4 pb-2 mb-1 bg-danger text-white" 
						v-if="process.length == 0">Belum ada data</div>
					<div class="card pt-2 pl-4 pb-2 mb-1 bg-warning text-white" v-for="item in process" :key="item.settings_item">{{item.settings_item}}<span style="position:absolute;right:10px" @click="archiveItem(item.settings_id)"><i style="color:white;font-size:19px;cursor: pointer" class="ni ni-fat-remove"></i></span></div>	
					<div>
						<base-input v-model="process_input" class="mt-2" placeholder="Nama Proses" required></base-input>
						<base-button @click="addNewItem(300, process_input)" style="width:170px;margin-top:-12px" class="mb-4" type="primary">Tambah Proses</base-button>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>

	import {baseURL} from "../functions/universal.js";
	const axios = require('axios');

	export default {
		data(){
			return{
				color_input : "",
				process_input : "",
				components_input :"",
				colors     : [],
				components : [],
				process    : [],
			}
		},

		methods: {

			showLoading: function(data){
				this.$swal({
					icon: 'warning',
					title: 'Mohon tunggu',
					text: data,
					showConfirmButton: false,
					timerProgressBar: true,
					onBeforeOpen: () => {
						this.$swal.showLoading()
					},
				});
			},

			addNewItem: function(settings_category, input_data){
				var app = this;
				let category = "";
				if(settings_category == 100){
					category = "Komponen";
				}
				else if(settings_category == 200){
					category = "Warna";
				}
				else if(settings_category == 300){
					category = "Proses";
				}

				this.$swal({
					title : 'Kirim data',
					text  : "Anda yakin ingin menambahkan data " + input_data + " ke kategori " + category,
					icon  : "question",
					confirmButtonColor: '#2ecc71',
					confirmButtonText: 'Tambahkan',
					cancelButtonText : 'Batal',
					showCancelButton: true
				})
				.then((result) => {
					if(result.value){
						app.addNewItemFunc(settings_category, input_data);
					}
				});
			},

			archiveItem: function(id){
				var app = this;

				this.$swal({
					title : 'Arsipkan?',
					text  : "Anda yakin ingin mengarsipkan data ini?",
					icon  : "question",
					confirmButtonColor: '#2ecc71',
					confirmButtonText: 'Arsipkan',
					cancelButtonText : 'Batal',
					showCancelButton: true
				})
				.then((result) => {
					if(result.value){
						app.archiveItemFunc(id);
					}
				});
			},

			addNewItemFunc: function(settings_category, input_data){
				var app = this;
				
				this.showLoading("Sedang mengirim data...");
				if(input_data == ""){
					app.$swal({
						icon: 'error',
						title: 'Penambahan Gagal',
						text: 'Anda harus mengisi kotak yang tersedia'
					});
					return false;
				}

				let url = baseURL + "/furniture_api/api/v1/settings/add.php?settings_category=" + settings_category+"&settings_item=" + input_data;

				axios.get(url)
					.then(function(response){
						app.color_input = "";
						app.process_input = "";
						app.components_input = "";
						app.colors     = response.data.colors;
						app.components = response.data.components;
						app.process    = response.data.process;
						console.log(response.data);
						app.$swal({
							icon: 'success',
							title: 'Penambahan berhasil',
							text: 'Berhasil menambahkan data ke dalam pengaturan'
						});
					})
					.catch(function(error){
						this.$swal("Proses Gagal", "Gagal mengambil data dari server", "error");
						console.log(error);
					})
				return true;
			},

			getSettingsItem : function(){
				var app = this;
				this.showLoading("Sedang mengambil data...");
				let url = baseURL + "/furniture_api/api/v1/settings/get.php";
				axios.get(url)
					.then(function(response){
						app.colors     = response.data.colors;
						app.components = response.data.components;
						app.process    = response.data.process;
						app.$swal.close();
						console.log(response.data);
					})
					.catch(function(error){
						this.$swal("Proses Gagal", "Gagal mengambil data dari server", "error");
						console.log(error);
					})
			},

			archiveItemFunc: function(id){
				var app = this;
				this.showLoading("Sedang mengarpsipkan data...");
				let url = baseURL + "/furniture_api/api/v1/settings/archive.php?id=" + id;
				axios.get(url)
					.then(function(response){
						app.colors     = response.data.colors;
						app.components = response.data.components;
						app.process    = response.data.process;
						app.$swal({
							icon: 'success',
							title: 'Pengarsipan berhasil',
							text: 'Data berhasil diarsipkan'
						});
						console.log(response.data);
					})
					.catch(function(error){
						this.$swal("Proses Gagal", "Gagal mengambil data dari server", "error");
						console.log(error);
					})
			}

		},

		created(){
			this.getSettingsItem();
		}
	};
</script>