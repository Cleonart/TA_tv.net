<template>
	<div class="container p-5">
		<div class="row">
			<div class="col-lg-7">
				<h2>Buat Transaksi Baru</h2>
				<badge type="warning mr-2">Transaksi Baru</badge>
				<badge type="primary">{{id}}</badge>

				<div class="card shadow mt-4">

					<div class="card-header border-0">
						<div class="row align-items-center">
							<div class="col">
								<h3 class="mb-0">
									Daftar PRD/SER
								</h3>
							</div>
							<div class="col text-right">
								<select class="form-control" v-model="selectBar">
									<option selected disabled>-PILIH-</option>
									<option>Layanan Klinik</option>
									<option>Layanan Salon</option>
									<option>Produk</option>
								</select> 
							</div>
						</div>
						<hr class="mt-3 mb-3">
						<base-input v-model="searchBar" 
									placeholder="Cari disini.."
									addon-left-icon="ni ni-zoom-split-in"
									class="mb-0"></base-input>
					</div>

					<div class="table-responsive pb-2">
						<base-table class="table align-items-center table-flush"
									thead-classes="thead-light"
									tbody-classes="list"
									:data="filteredData">
							<template slot="columns">
								<th>Nama PRD/SER</th>
								<th>Harga</th>
								<th v-if="selectBar == 'Produk'">Stok</th>
								<th>Aksi</th>
							</template>
							<template slot-scope="{row}">
								<td><b>{{row.item_name}}</b></td>
								<td>{{formatRupiah(row.item_price)}}</td>
								<td v-if="selectBar == 'Produk'">{{row.item_stock}}</td>
								<td>
									<base-button type="primary" icon="ni ni-fat-add" style="height:37px;width:37px;padding-left:10px"
									@click="addToCheckout(row)"></base-button>
								</td>
							</template>
						</base-table>
						<p v-if="filteredData.length == 0"
							style="font-weight:bold;text-align:center;opacity:0.7"
							class="mt-4 mb-3">Item tidak ditemukan :(</p>
					</div>

				</div>

			</div>
			
			<div class="col-lg-5">
				<posCheckout ref="posCheckout"></posCheckout>
			</div>
		</div>
	</div>
</template>

<script>
	
	import {generateId, baseURL, formatRupiah} from '../../functions/universal.js';
	import posCheckout from './Components/posCheckout';
	const axios = require('axios');
	
	export default {
		name: 'projects-table',
		data(){
			return{
				id : '',
				selectBar : 'Layanan Salon',
				searchBar : '',
				itemData : [],
				staffData : []
			}
		},

		methods : {
			
			addToCheckout : function (value) {

				var app = this;

				if(value.item_category == "Produk"){
					this.$swal.fire({
						title: 'Tambahkan ke Checkout?',
						text: "Tambahkan item " + value.item_name + " ke Checkout",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#5e72e4',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Ya, Tambahkan'
					}).then((result) => {
						if (result.isConfirmed) {
							app.$swal.fire('Berhasil Ditambahkan','Item berhasil ditambahkan ke dalam checkout',
								'success'
								);
							app.$refs.posCheckout.addToCheckout(value);
						}
					})
				}

				else{
					var staff = [];
					for(var i = 0; i < this.staffData.length; i++){
						staff[i] = this.staffData[i].staff_name;
					} 	

					this.$swal.fire({
						title: 'Pilih Sytlist/Clinician',
						input: "select",
						inputOptions: staff,
						inputPlaceholder: 'Silahkan pilih disini',
						showCancelButton: true,
					}).then(function (result) {
						if(result.value != undefined && result.value != ""){
							value.item_handler = staff[result.value];
							app.$refs.posCheckout.addToCheckout(value);
							app.$swal.fire('Berhasil Ditambahkan','Item berhasil ditambahkan ke dalam checkout','success');
						}
						
					})
				}
			},

			getProductServicesData : function () {
				var app = this;
				axios.get(baseURL + "/lumeraAPI/pos_purchase/getAllProductServiceData.php")
					.then(function(response) {
						app.itemData = response.data.embed_item;
						app.staffData = response.data.embed_staff;
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					})
			},

			formatRupiah : function (value) {
				return formatRupiah(value, "Rp. ");
			}

		},

		created(){
			this.id = generateId("LMR");
			this.getProductServicesData();
		},

		computed: {
			filteredData() {
				return this.itemData.filter(itemData => {
					if(this.selectBar == itemData.item_category){
						let data = itemData.item_name.toLowerCase().includes(this.searchBar.toLowerCase()); 
						return data;
					}
				})
			}
		},

		components: {
			posCheckout
		}
	}

</script>