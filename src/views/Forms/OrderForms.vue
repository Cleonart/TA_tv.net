<template>
	<div>
		<base-header	class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
						style="'min-height: 400px; background-image: url(img/order.jpg); background-size: cover; background-position: center -150px;'">
            <span class="mask bg-gradient-primary opacity-8"></span>
            <div class="container-fluid d-flex align-items-center" style="margin-top:-30px">
              <div class="row mb-4">
                <div class="col-lg-12 col-md-10">
                  <h1 class="display-2 text-white">Data Order</h1>
                  <p class="text-white mt-0 mb-3">Kelola setiap order dan spk di laman ini</p>
                  <router-link to="/order"><base-button type="info" class="mr-3 mb-3">Daftar Order</base-button></router-link>
                </div>
              </div>
            </div>
        </base-header>

		<div class="container-fluid mt--8">
			<form @submit.prevent class="container row">
				<card class="card col-md-12 pt-1 pb-2 pl-4 pr-4">
					<div slot="header" class="bg-white border-0">
						<div class="row align-items-center">
							<div class="col-8">
								<h3 class="mb-0">Detail Data Order</h3>
							</div>
						</div>
                    </div>

					<div class="row">

						<!-- id order -->
						<div class="col-12 mb--2">
							<base-input disabled 
										:value="'Kode Order : ' + order.order_id"
										required></base-input>
						</div>

						<!-- nama order -->
						<div class="col-6 mb--2">
							<h5>Nama Order <span class="text-red">*</span></h5>
							<base-input placeholder="Nama Order" 
										v-model="order.order_name" 
										required
										:valid="forms_class.valid_name"></base-input>
						</div>

						<!-- lokasi order  -->
						<div class="col-6 mb--2">
							<h5>Lokasi Order <span class="text-red">*</span></h5>
							<base-input placeholder="Lokasi Order" 
										v-model="order.order_location" 
										required
										:valid="forms_class.valid_location"></base-input>
						</div>

						<div class="col-md-12">
							<h5>Catatan Order</h5>
							<base-input v-model="order.order_note"
										:valid="forms_class.valid_note"
										alternative="">
										<textarea   rows="4" 
													class="form-control" 
													placeholder="Catatan order..."></textarea>
							</base-input>
						</div>

					</div>
				</card>

				<!-- form tambah spk -->
				<div class="card shadow col-md-12 mt-3 pt-4 pb-1 pl-4 pr-4"> 
					<h3 @click="toggleSpkForms()" style="cursor: pointer" class="col mb-4">Tambah SPK Baru</h3>
					<i @click="toggleSpkForms()" :class="'arrow_forms_toggle ' + spk_arrow_class"></i>
					<div class="row" v-if="spk_forms_view == 1">
						<div class="col">
							<div class="col-12">
								<h5>Nama SPK <span class="text-red">*</span></h5>
								<base-input placeholder="Nama SPK" 
											v-model="spk_forms.spk_name"
											required
											:valid="forms_class.valid_location"></base-input>
							</div>

							<div class="col-12">
								<h5>Pilih Produk <span class="text-red">*</span></h5>
								<select v-model="spk_forms.spk_product_id">
									<option default disabled selected>Pilih Produk</option>
									<option v-for="product in products"
											:key="product.product_id">{{product.product_id}} - {{product.product_name}}</option>
								</select>
							</div>

							<div class="col-12 mt-4">
								<div class="row">
									<div class="col-7 pr-0">
										<h5>Warna Produk <span class="text-red">*</span></h5>
										<select v-model="spk_forms.spk_color">
											<option default disabled selected>Pilih Warna</option>
											<option v-for="item in colors" v-bind:key="item.settings_item">{{item.settings_item}}</option>
										</select>
									</div>
									<div class="col-5">
										<h5>Jumlah Produk <span class="text-red">*</span></h5>
										<base-input placeholder="Jumlah Produk" 
											v-model="spk_forms.spk_qty"
											type="number"
											required
											:valid="forms_class.valid_location"></base-input>
									</div>
								</div>
							</div>

							<div class="col-12">
								<h5>Catatan SPK</h5>
								<base-input	alternative="">
											<textarea 	rows="2" 
														class="form-control" 
														placeholder="Catatan SPK..."
														v-model="spk_forms.spk_note"
														style="height:70px"></textarea>
								</base-input>
							</div>

							<div class="col-12">
								<base-button @click="addSPK()" style="width:150px" class="mb-4" type="primary">Tambah SPK</base-button>
							</div>
						</div>

						<div class="col">
							<div class="col-12">
								<div class="row">
									<div class="col-4 pr-0">
										<h5>Deadline Tim 1 <span class="text-red">*</span></h5>
										<base-input addon-left-icon="ni ni-calendar-grid-58">
											<flat-picker 	slot-scope="{focus, blur}"
															@on-open="focus"
															@on-close="blur"
															:config="{allowInput: true}"
															class="form-control datepicker"
															v-model="spk_forms.spk_deadline_team_1">
											</flat-picker>
										</base-input>
									</div>
									<div class="col-8">
										<h5>Proses Kerja Tim 1 <span class="text-red">*</span></h5>
										<select v-model="spk_forms.spk_process_team_1">
											<option selected=true disabled>Pilih Proses</option>
											<option v-for="item in process" v-bind:key="item.settings_item">{{item.settings_item}}</option>
										</select>
									</div>
								</div>
							</div>

							<div class="col-12">
								<div class="row">
									<div class="col-4 pr-0">
										<h5>Deadline Tim 2 <span class="text-red">*</span></h5>
										<base-input addon-left-icon="ni ni-calendar-grid-58">
											<flat-picker 	slot-scope="{focus, blur}"
															@on-open="focus"
															@on-close="blur"
															:config="{allowInput: true}"
															class="form-control datepicker"
															v-model="spk_forms.spk_deadline_team_2">
											</flat-picker>
										</base-input>
									</div>
									<div class="col-8">
										<h5>Proses Kerja Tim 2 <span class="text-red">*</span></h5>
										<select v-model="spk_forms.spk_process_team_2">
											<option selected=true disabled>Pilih Proses</option>
											<option v-for="item in process" v-bind:key="item.settings_item">{{item.settings_item}}</option>
										</select>
									</div>
								</div>
							</div>

							<div class="col-12">
								<div class="row">
									<div class="col-4 pr-0">
										<h5>Deadline Tim 3 <span class="text-red">*</span></h5>
										<base-input addon-left-icon="ni ni-calendar-grid-58">
											<flat-picker 	slot-scope="{focus, blur}"
															@on-open="focus"
															@on-close="blur"
															:config="{allowInput: true}"
															class="form-control datepicker"
															v-model="spk_forms.spk_deadline_team_3">
											</flat-picker>
										</base-input>
									</div>
									<div class="col-8">
										<h5>Proses Kerja Tim 3 <span class="text-red">*</span></h5>
										<select v-model="spk_forms.spk_process_team_3">
											<option selected=true disabled>Pilih Proses</option>
											<option v-for="item in process" v-bind:key="item.settings_item">{{item.settings_item}}</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- tabel detail spk -->
				<div class="card shadow col-md-12 mt-3 pb-4">
					<div class="card-header border-0 bg-transparent">
						<div class="row align-items-center"> 
							<div class="col">
								<h3 class="mb-0" :class="'type' === 'dark' ? 'text-white': ''">
									Detail SPK
								</h3>
							</div>
						</div>
					</div>
					
					<div class="table-responsive">
						<base-table class="table align-items-center table-flush"
									thead-classes="thead-light"
									tbody-classes="list"
									:data="spk">
									
							<template slot="columns">
								<th>Nama SPK</th>
								<th>Nama Produk</th>
								<th>Warna Produk</th>
								<th>Jumlah</th>
								<th>Deadline Tim 1</th>
								<th>Deadline Tim 2</th>
								<th>Deadline Tim 3</th>
								<th>Proses Kerja Tim 1</th>
								<th>Proses Kerja Tim 2</th>
								<th>Proses Kerja Tim 3</th>
								<th></th>
							</template>

							<template slot-scope="{row}">
								<td>
									<span class="name mb-0 text-sm">{{row.spk_id}} | {{row.spk_name}}</span>
								</td>

								<th scope="row">
									<div class="media align-items-center">
										<a :href="'#/product/detail/' + row.product_id"  class="avatar rounded-circle mr-3">
											<div :style="'width:100%;height:100%;border-radius:100%;background:url(' + baseURL + row.product_img + ';background-size:cover;background-position:center'">
											</div>
										</a>
										<div class="media-body">
											<span class="name mb-0 text-sm">{{row.product_name}}</span>
										</div>
									</div>
								</th>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_color}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_qty}} PCS</span>
								</td>
								
								<td>
									<span class="name mb-0 text-sm">{{row.spk_deadline_team_1}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_deadline_team_2}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_deadline_team_3}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_process_team_1}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_process_team_2}}</span>
								</td>

								<td>
									<span class="name mb-0 text-sm">{{row.spk_process_team_3}}</span>
								</td>

								<td class="text-right">
									<base-dropdown 	class="dropdown"
													position="right">
										<a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<i class="fas fa-ellipsis-v"></i>
										</a>
										<template>
											<span v-on:click="deleteSPK(row.spk_id)" style="cursor:pointer" class="dropdown-item">Hapus SPK</span>
										</template>
									</base-dropdown>
								</td>
							</template>
						</base-table>
					</div>
					<h4 v-if="spk.length == 0" class="mt-4 text-gray" style="text-align:center;width:100%">Tidak ada SPK</h4>
				</div>
				
				<div class="card shadow col-md-12 mt-3 pt-3 pb-3">
					<div class="col-5 row">
						<div class="col">
							<base-button class="w-100" v-on:click="uploadSpkToServer()" type="primary">Selesai</base-button>
						</div>
						<div class="col">
							<a href="#/order" class="w-100"><base-button class="w-100" type="danger">Kembali</base-button></a>
						</div>
					</div>
					
				</div>

			</form>
        </div>
	</div>
</template>

<script>

	import {generateId, searchForProduct, baseURL} from "../../functions/universal.js";
	import flatPicker from "vue-flatpickr-component";
	import "flatpickr/dist/flatpickr.css";

	const axios = require('axios');

	export default {
		data(){
			return{

				spk_forms_view : 0,
				spk_arrow_class : "ni ni-bold-down",

				order:{
					order_id:"",
					order_name:"",
					order_location:"",
					order_note: ""
				},

				spk_forms : {
					spk_id: "",
					spk_name : "",
					spk_product_id : "Pilih Produk",
					spk_color: "Pilih Warna",
					spk_qty: '',
					spk_note : "",
					spk_deadline_team_1 : "",
					spk_deadline_team_2 : "",
					spk_deadline_team_3 : "",
					spk_process_team_1 : "Pilih Proses",
					spk_process_team_2 : "Pilih Proses",
					spk_process_team_3 : "Pilih Proses"
				},

				spk: [],
				products: [],
				colors:[],
				process:[],

				forms_class: {
					valid_name : 0,
					valid_location : 0,
					valid_note : 0
				},

				buttonText : "Tambahkan"
			}
		},
		methods: {

			/** 
			 * Start Product Functions 
			 */
			
			// mengambil data order dan produk
			// order   : response.data.data[index].order
			// spk     : response.data.data[index].spk
			// product : response.data.product 
			getProduct : function(id){
				var app = this;
				let url = baseURL + "/furniture_api/api/v1/order/get.php?order_id=" + id;
				axios.get(url)
					.then(function(response){
						app.products = response.data.product;
						app.colors   = response.data.colors;
						app.process  = response.data.process;
						if(response.data.data.length > 0){
							app.order = response.data.data[0].order;
							app.spk   = response.data.data[0].spk;
						}
						console.log(response.data);
					})
					.catch(function(error){
						this.$swal("Proses Gagal", "Gagal mengambil data dari server", "error");
						console.log(error);
					})
			},

			/** 
			 * End Product Functions 
			 */	

			/** 
			 * Start SPK Functions 
			 */
			addSPK: function(){
				let spk_id = generateId();
				let spk_name = this.spk_forms.spk_name;
				let spk_color = this.spk_forms.spk_color;
				let spk_qty  = this.spk_forms.spk_qty;
				let spk_deadline_team_1 = this.spk_forms.spk_deadline_team_1;
				let spk_deadline_team_2 = this.spk_forms.spk_deadline_team_2;
				let spk_deadline_team_3 = this.spk_forms.spk_deadline_team_3;
				let spk_process_team_1  = this.spk_forms.spk_process_team_1;
				let spk_process_team_2  = this.spk_forms.spk_process_team_2;
				let spk_process_team_3  = this.spk_forms.spk_process_team_3;

				if(	this.spk_forms.spk_name != "" &&
					this.spk_forms.spk_product_id != "Pilih Produk" &&
					this.spk_forms.spk_color != "Pilih Warna" &&
					this.spk_forms.spk_qty != "" &&
					this.spk_forms.spk_deadline_team_1 != "" &&
					this.spk_forms.spk_deadline_team_2 != "" &&
					this.spk_forms.spk_deadline_team_3 != "" &&
					this.spk_forms.spk_process_team_1  != "Pilih Proses" && 
					this.spk_forms.spk_process_team_2  != "Pilih Proses" &&
					this.spk_forms.spk_process_team_3  != "Pilih Proses"){
					let i = searchForProduct(this.spk_forms.spk_product_id, this.products);
					let product_id   = this.products[i].product_id;
					let product_name = this.products[i].product_name;
					let product_img  = this.products[i].product_img;
					this.spk.push({spk_id, spk_name,product_id, spk_color, spk_qty, product_name,product_img, spk_deadline_team_1, spk_deadline_team_2, spk_deadline_team_3, spk_process_team_1, spk_process_team_2, spk_process_team_3});
					this.$swal("Penambahan SPK Berhasil", "Penambahan data berhasil", "success");
					this.resetForms("spk");
				}

				else{
					this.$swal('Penambahan SPK Gagal', "Anda harus melengkapi semua kotak yang tersedia", "error");
				}
			},
			
			deleteSPK: function(spk_id){
				for(let i=0;i < this.spk.length;i++){
					if(spk_id == this.spk[i].spk_id){
						this.spk.splice(i,1);
						this.$swal("Update Berhasil", "SPK berhasil dihapus", "success");
					}
				}
			},

			resetForms: function(id){

				if(id == "spk"){
					this.spk_forms.spk_id= "";
					this.spk_forms.spk_name = "";
					this.spk_forms.spk_product_id = "Pilih Produk";
					this.spk_forms.spk_note = "";
					this.spk_forms.spk_deadline_team_1 = "";
					this.spk_forms.spk_deadline_team_2 = "";
					this.spk_forms.spk_deadline_team_3 = "";
					this.spk_forms.spk_process_team_1 = "Pilih Proses";
					this.spk_forms.spk_process_team_2 = "Pilih Proses";
					this.spk_forms.spk_process_team_3 = "Pilih Proses";
				}
				else if(id == "order"){
					this.order.order_name = "";
					this.order.order_location = "";
				}
			},

			/** 
			 * End SPK Functions 
			 */	
			
			uploadSpkToServer: function(){
				var app = this;
				if(this.checkOrderForms()){
					
					let url = baseURL + "/furniture_api/api/v1/order/add.php";
					let server_data = {
						orders : app.order,
						spk    : app.spk 
					};

					this.$swal({
						icon: 'warning',
						title: 'Mohon tunggu',
						text: 'Mengupload data anda...',
						allowOutsideClick: false,
						showConfirmButton: false,
						timerProgressBar: true,
						onBeforeOpen: () => {
							this.$swal.showLoading()
						},
					});
					
					axios({
						method: 'POST',
						url: url,
						data: server_data,
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
						}
					})
					.then(response => {
						app.$swal("Update Berhasil", "Perubahan berhasil disimpan", "success");
						console.log(response);
					})
					.catch(error => {
						app.$swal("Update Gagal", "Terjadi masalah dengan server", "error");
						console.log(error);
					})
				}
			},

			checkOrderForms: function(){

				// melakukan cek nama dari order
				this.forms_class.valid_name = this.order.order_name == "" ? false : true;

				// melakukan cek lokasi valid
				this.forms_class.valid_location = this.order.order_location == "" ? false : true;

				// melakukan cek catatan order
				this.forms_class.valid_note = this.order.order_note == "" ? false : true;

				if( this.order.order_name 	  != "" &&
					this.order.order_location != ""){
					if(this.spk.length == 0){
						this.$swal("Data Gagal Disimpan", "Tabel spk tidak boleh kosong", "error");
						return false;
					}
					else{
						return true;	
					}
				}

				window.scrollTo(0,0);
				this.$swal("Data Gagal Disimpan", "Mohon lengkapi semua data", "error");
				return false;
			},

			toggleSpkForms: function(){

				if(this.spk_forms_view == 1){
					this.spk_forms_view = 0;
					this.spk_arrow_class = "ni ni-bold-down";
				}

				else{
					this.spk_forms_view = 1;
					this.spk_arrow_class = "ni ni-bold-up";
				}
			}

		},

		created(){
			window.scrollTo(0,0);
			if(this.$route.params.order_id == undefined){
				this.order.order_id = generateId();
			}
			this.getProduct(this.$route.params.order_id);
		},
		components: {flatPicker}
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

	.arrow_forms_toggle{
		position:absolute;
		right: 35px;
		top:33px;
		cursor:pointer;
		transition:0.2s ease;
	}

	.arrow_forms_toggle:hover{
		transform:scale(1.1);
	}

	/* width */
	::-webkit-scrollbar {
		width: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1; 
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888; 
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555; 
	}

</style>