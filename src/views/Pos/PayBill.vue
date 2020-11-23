<template>
	
	<div>
		<div class="col-xl-12 order-xl-1 p-3">
			<card shadow type="secondary">
				<div slot="header" class="bg-white border-0">
					<div class="row align-items-center">
						<div class="col-8">
							<h3 class="mb-0">Tagihan</h3>
							<p class="mt-1 mb-0" style="font-size:12px;">#{{data.customer_id}}</p>
						</div>
					</div>
				</div>

				<template>
					
					<!-- nama pelanggan -->
					<label style="font-size:13px;"> Nama Pelanggan<span style="color: red"> *</span></label>
					<base-input type="text" v-model="data.customer_name" disabled required="true" placeholder="Nama Pelanggan" style="margin-bottom:10px"></base-input>

					<!-- jumlah bulan -->
					<label style="font-size:13px;margin-top:10px"> Bulan Tagihan (Bln)<span style="color: red"> *</span></label>
					<base-input type="text" v-model="data.billing.num_of_month" disabled required="true" placeholder="Nama Pelanggan" style="margin-bottom:10px"></base-input>

					<!-- text 
					<label style="font-size:13px;margin-top:10px"> Bulan <span style="color: red"> *</span></label>
					<p>{{(data.months_text)}}</p>-->
					
					<label style="font-size:13px;margin-top:10px">Total Tagihan<span style="color: red"> *</span></label>
					<h2>{{formatRupiah(data.billing_price)}}</h2>

					<base-button @click="pay(data.billing_price)" type="success" class="w-100 mt-2">Bayar Tagihan</base-button>
					<base-button @click="$router.go(-1)" type="danger" class="w-100 mt-2">Batal</base-button>
				</template>

			</card>
		</div>
	</div>

</template>

<script>
	
	import { baseURL , formatRupiah} from '../../functions/universal.js';
	const axios = require('axios');

	export default{
		data(){
			return{
				data  : "",
				id    : "",
				month : "",
				year  : ""
			}
		},

		methods : {
			
			getData : function(id, month, year){

				this.$swal({
					icon: 'warning',
					title: 'Mohon tunggu',
					text: 'Sedang Mengambil data...',
					allowOutsideClick: false,
					showConfirmButton: false,
					timerProgressBar: true,
					onBeforeOpen: () => {
						this.$swal.showLoading()
					},
				});

				var app = this;
				let url = baseURL + "/tv.netAPI/v1/transaction/get.php?id=" + id + "&month_select=" + month + "&year_select=" + year;

				axios.get(url)
					.then(function(response){
						app.$swal.close();
						app.data = response.data;
						console.log(response);
					})
					.catch(function(error){
						app.$swal('Gagal mengambil data', "Terjadi kesalahan mengambil data", "error");
						console.log(error);
					});
			},

			pay : function(nominal){

				this.$swal({
					icon: 'warning',
					title: 'Mohon tunggu',
					text: 'Sedang mengirim data...',
					allowOutsideClick: false,
					showConfirmButton: false,
					timerProgressBar: true,
					onBeforeOpen: () => {
						this.$swal.showLoading()
					},
				});

				let raw_data = "?id=" + this.id + "&month_select=" + this.month + "&year_select=" + this.year + "&nominal= " + nominal;

				var app = this;
				let url = baseURL + "/tv.netAPI/v1/transaction/pay.php" + raw_data;

				axios.get(url)
					.then(function(response){
						app.$swal("Pembayaran berhasil", "Berhasil melakukan pembayaran", "success");
						console.log(response);
						app.$router.go(-1)
						
					})
					.catch(function(error){
						app.$swal('Gagal mengirim data', "Terjadi kesalahan mengirim data", "error");
						console.log(error);
					});

			},

			formatRupiah : function(val){
				return formatRupiah(val.toString(), "Rp. ");
			}

		},

		created(){
			let raw_data = this.$route.params.customer_id.split("-");
			this.id = raw_data[0];
			this.month = raw_data[1];
			this.year  = raw_data[2];
			this.getData(this.id, this.month, this.year);
		}
	}	

</script>