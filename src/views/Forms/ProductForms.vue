<template>
	<div>
		<base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
					:style="'min-height: 400px; background-image: url(' + product.product_img + '); background-size: cover; background-position: center -150px;'">
            <span class="mask bg-gradient-primary opacity-8"></span>
            <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
              <div class="row mb-4">
                <div class="col-lg-12 col-md-10">
                  <h1 class="display-2 text-white">Data Produk</h1>
                  <p class="text-white mt-0 mb-3">Kelola setiap produk dari laman ini</p>
                  <router-link to="/product"><base-button type="info" class="mr-3 mb-3">Daftar Produk</base-button>
                  </router-link>
                </div>
              </div>
            </div>
        </base-header>

		<div class="container-fluid mt--8">
			<form @submit.prevent class="container row">
				<card class="card col-md-6 pt-1 pb-4 pl-4 pr-4">
					<div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Info Dasar Produk</h3>
                                </div>
                            </div>
                        </div>
					<div class="row">

						<!-- id produk -->
						<div class="col-md-12 mb--2">
							<base-input disabled 
										:value="'Kode Produk : ' + product.product_id"
										required></base-input>
						</div>

						<!-- nama produk -->
						<div class="col-md-12 mb--2">
							<base-input placeholder="Nama Produk" 
										v-model="product.product_name" 
										required
										:valid="forms_class.valid_name"></base-input>
						</div>

						<!-- jenis produk -->
						<div class="col-md-12 mb-3">
							<select v-model="product.product_type"
									:valid="forms_class.valid_type">
								<option selected=true disabled>Tipe Produk</option>
								<option>Meja</option>
								<option>Lemari</option>
							</select>
						</div>

						<div class="col-md-12 mb-3">
							<b style="font-size:13px;padding-bottom:10px">Komponen</b>
							<div class="card pl-4 pr-3 pt-3 pb-3 mb-2 mt-2" v-if="product.product_components.length > 0" >
								<p style="position:relative;width:100%;margin-bottom:0px;margin-top:5px" v-for="product_component in product.product_components" v-bind:key="product_component">{{product_component}} 
									<span style="position:absolute;right:0" @click="deleteProductComponent(product_component)"><i style="color:red;font-size:19px;cursor: pointer" class="ni ni-fat-remove"></i></span></p>
							</div>
							<p class="card pt-2 pb-2 pl-3 mt-2" v-if="product.product_components.length == 0">Belum ada komponen</p>
							<base-button @click="addProductComponent()" outline class="col-md-12" type="success">Tambah Komponen</base-button>
						</div>

						<!-- dimensi -->
						<div class="col-md-12">

							<div class="mb-2">
								<h5>Dimensi (cm)</h5>
							</div>

							<div class="row">
								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Panjang(cm)" 
												:valid="forms_class.valid_length"
												v-model="product.product_dimension_length"></base-input>
								</div>

								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Lebar(cm)" 
												:valid="forms_class.valid_wide"
												v-model="product.product_dimension_wide"></base-input>
								</div>

								<div class="col-md-4">
									<base-input type="number" 
												placeholder="Tinggi(cm)" 
												:valid="forms_class.valid_height"
												v-model="product.product_dimension_height"></base-input>
								</div>
							</div>

						</div>

						<div class="col-md-12">
							<base-button v-on:click="formsCheck()" type="primary">{{buttonText}}</base-button>
						</div>

					</div>

				</card>

				<div class="col-md-6">
					<div class="card pl-4 pr-4 pt-4">
						
						<!-- nama produk -->
						<div class="col-md-12 mb-3">
							<h4>Info Gambar Produk</h4>
						</div>

						<file-pond
							:server="baseURL + '/furniture_api/api/v1/pond/'"
							ref="file" 
							instantUpload="false"
							label-idle="Masukan Gambar Disini... <span class='filepond--label-action'>Pilih File</span>" 
							:files="myFiles"/>

					</div>
				</div>
			</form>
        </div>
	</div>
</template>

<script>

	import {generateId, baseURL} from "../../functions/universal.js";
	const axios = require('axios');

	// Import Vue FilePond
	import vueFilePond, { setOptions } from 'vue-filepond';

	// Import FilePond styles
	import 'filepond/dist/filepond.min.css';

	// IMPORT FILEPOND PLUGINS
	import FilePondPluginFileRename from 'filepond-plugin-file-rename/dist/filepond-plugin-file-rename.esm.js';
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
	import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

	const FilePond = vueFilePond(FilePondPluginImagePreview,FilePondPluginFileRename);

	setOptions({
		fileRenameFunction: (file) => {
			// MAKE NEW DATA -- FORMAT FILE RENAME -- YEAR.DATE.MONTH.HOURS.MINUTES.SECONDS -- EG. 2019201142040.extension
			var date     = new Date();
			var dateTime = date.getFullYear() + "" + date.getDate() + "" + date.getMonth() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
			return dateTime + `${file.extension}`;
		}
	})

	export default {
		data(){
			return{
				product:{
					product_id:"",
					product_name:"",
					product_type:"Tipe Produk",
					product_img: 'img/products.jpg',
					product_dimension_length:'',
					product_dimension_wide:'',
					product_components: [],
					product_dimension_height:''
				},

				forms_class: {
					valid_name : 0,
					valid_type : 0,
					valid_length : 0,
					valid_wide : 0,
					valid_height: 0
				},
				
				component_from_server : ["Tes", "Wooden"],
				buttonText : "Tambahkan",
				myFiles : []
			}
		},
		methods: {

			resetForms: function(){
				this.product.product_id = generateId();
				this.product.product_name = "";
				this.product.product_type = "Tipe Produk";
				this.product.product_img = "";
				this.product.product_dimension_length = "";
				this.product.product_dimension_wide = "";
				this.product.product_dimension_height = "";
			},

			getProduct : function(id){
				var app = this;
				let url = baseURL + "/furniture_api/api/v1/product/get.php?product_id=" + id;
				axios.get(url)
					.then(function(response){
						app.component_from_server = response.data.components;
						if(response.data.product.length > 0){
							app.product = response.data.product[0];
							console.log(response.data.components);
							let filepath = response.data.product[0].product_img;

							// mengambil gambar dan meletakannya di file uploader
							if(filepath != ""){
								filepath = baseURL + filepath;
								app.$refs.file.addFile(filepath, { index: 0 });
								app.product.product_img = filepath;
							}
							console.log(app.product);
						}
					})
					.catch(function(error){
						console.log(error);
					})
				},

			checkFile: function(){

				this.$swal({
					icon: 'warning',
					title: 'Mohon tunggu',
					text: 'Mengupload data anda...',
					showConfirmButton: false,
					timerProgressBar: true,
					onBeforeOpen: () => {
						this.$swal.showLoading()
					},
				});
				
				this.$refs.file.processFile()
					.then(response => {
						console.log(response);
						let server_id = this.$refs.file.getFile().serverId;
						let filename  = this.$refs.file.getFile().filename;
						this.product.product_img = "/furniture_api/img/" + server_id + "/" + filename;	
						this.addOrUpdateData();
					})	
					.catch(error => {
						alert("Gagal menyimpan data");
						console.log(error);
					});
			},

			addProductComponent: async function(){
				var app = this;
				const { value: component } = await this.$swal({
					title: 'Tambahkan komponen produk',
					input: 'select',
					inputOptions: app.component_from_server,
					inputPlaceholder: 'Pilih Komponen',
					showCancelButton: true,
					inputValidator: (value) => {
						return new Promise((resolve) => {
							console.log(value);
							resolve();
						})
					}
				})

				if (component) {
					let component_selected = this.component_from_server[component];
					let component_added    = false;
					for(var i = 0; i < this.product.product_components.length; i++){
						if(component_selected == this.product.product_components[i]){
							this.$swal("Penambahan Gagal", "Komponen sudah ditambahkan sebelumnya", "error");
							component_added = true;
							break;
						}
					}
					if(!component_added){
						this.product.product_components.push(this.component_from_server[component]);
					}
				}
			},

			deleteProductComponent: function(id){
				for(var i = 0; i < this.product.product_components.length; i++){
					if(id == this.product.product_components[i]){
						this.product.product_components.splice(i, i+1);
						this.$swal("Komponen dihapus", "Penghapusan komponen berhasil", "success");
						break;
					}
				}
			},

			formsCheck: function(){
				
				var app = this;

				// melakukan cek nama dari produk
				this.forms_class.valid_name = this.product.product_name == "" ? false : true;

				// melakukan cek tipe dari produk
				this.forms_class.valid_type = this.product.product_type == "Tipe Produk" ? false : true;

				// melakukan cek dimensi panjang dari produk
				this.forms_class.valid_length = this.product.product_dimension_length == "" ? false : true;

				// melakukan cek dimensi lebar dari produk
				this.forms_class.valid_wide = this.product.product_dimension_wide == "" ? false : true;

				// melakukan cek dimensi tinggi dari produk
				this.forms_class.valid_height = this.product.product_dimension_height == "" ? false : true;

				// melakukan cek jika gambar sudah dimasukan
				let imgExist = this.$refs.file.getFile();

				// melakukan cek jika semua form sudah terisi
				if(	this.forms_class.valid_name && 
					this.forms_class.valid_type &&
					this.forms_class.valid_length &&
					this.forms_class.valid_wide &&
					this.forms_class.valid_height){

					if(imgExist != null){

						if(this.product.product_components.length > 0){
							this.$swal({
								title : 'Kirim data',
								text  : "Anda yakin ingin mengirim data ini",
								icon  : "question",
								confirmButtonColor: '#2ecc71',
								confirmButtonText: 'Kirim',
								cancelButtonText : 'Batal',
								showCancelButton: true
							})
							.then((result) => {
								if(result.value){
									app.checkFile();
								}
							});
						}

						else{
							this.$swal('Komponen tidak ditemukan','Komponen kosong anda harus mengisi komponen terlebih dahulu','error');
						}
					}

					else{
						this.$swal('Gambar tidak ditemukan','Anda harus melengkapi gambar','error');
					}
					
				}

				// jika form tidak terisi
				else{
					this.$swal('Data tidak lengkap','Anda harus melengkapi semua data','error');
				}
				
			},

			addOrUpdateData: function(){
				var app = this;
				let url = baseURL + "/furniture_api/api/v1/product/add.php";
				axios({
					method: 'POST',
					url: url,
					data: app.product,
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				})
				.then(function (response) {
					app.$swal('Berhasil','Data berhasil tersimpan di database','success');
					console.log(response);
					window.history.back();
				})
				.catch(function (error) {
					console.log(error);
				});
			},

		},

		components: {
			FilePond
		},

		created(){

			if(this.$route.params.product_id == undefined){
				this.product.product_id = generateId();
				this.resetForms();
				this.product.product_img = 'img/products.jpg';
			}

			else{
				this.buttonText = "Perbarui";
			}
	
			this.getProduct(this.$route.params.product_id);

		}
	};
</script>

<style>

	select{
		display: block;
		width: 100%;
		height: calc(1.5em + 1.25rem + 2px);
		padding: 0.625rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		color: #8898aa;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #cad1d7;
		border-radius: 0.375rem;
		-webkit-box-shadow: none;
		box-shadow: none;
		-webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

</style>