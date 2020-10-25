<template>
	<div>
		<div class="col-xl-12 order-xl-1 p-3">
			<card shadow type="secondary">
				<div slot="header" class="bg-white border-0">
					<div class="row align-items-center">
						<div class="col-8">
							<h3 class="mb-0">Instalasi Baru</h3>
						</div>
					</div>
				</div>

				<template>
					<form @submit.prevent>

						<!-- nama pelanggan -->
						<label style="font-size:13px;margin-top:10px"> Nama Pelanggan<span style="color: red"> *</span> </label>
						<base-input type="text" v-model="data.accounts_name" required="true" placeholder="Nama Pelanggan" style="margin-bottom:10px"></base-input>

						<!-- pilih layanan -->
						<label style="font-size:13px;margin-top:10px"> Pilih Layanan<span style="color: red"> *</span> </label>
						<select v-model="data.accounts_service" 
								class="form-control" 
								style="margin-bottom:10px">
								<option selected disabled>-PILIH-</option>
								<option v-for="option in services" v-bind:key="option">{{option}}</option>
						</select>

						<!-- calender selector -->
						<label style="font-size:13px;margin-top:10px"> Tanggal<span style="color: red"> *</span> </label>
						<base-input addon-left-icon="ni ni-calendar-grid-58" style="margin-bottom:20	px">
							<flat-picker    slot-scope="{focus, blur}"
											style="background-color:#fff;margin-bottom:10px"
											:config="{dateFormat:'d-m-Y'}"
											@on-open="focus"
											@on-close="blur"
											class="form-control datepicker"
											v-model="data.accounts_join_date">
							</flat-picker>
						</base-input>

						<!-- lokasi -->
						<label style="font-size:13px;margin-top:0px"> Pilih Lokasi Pemasangan<span style="color: red"> *</span> </label>
						<div style="width:100%;height:100px;">
							<MglMap
								style="height:350px;position:relative"
								accessToken="pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g"
								:mapStyle.sync="mapStyle"
								:center="coordinates"
								:zoom="13"
								:minZoom="minZoom"
								:maxZoom="maxZoom">
								<MglMarker 	ref="marker1"
											:coordinates.sync="markerCoordinates" 
											color="blue"
											v-model="data.accounts_lat"
											draggable=true
											@dragend="getLotAndLong()">
													
								</MglMarker>
							</MglMap>
						</div>
						
					
						<p style="margin-bottom:270px;"></p>
					
						<hr class="mb-3" />

						<span style="font-size:13.5px">
							<div class="row mb-1 mt-0">
								<div class="col-6">Biaya Paket</div>
								<div class="col-6 text-right">{{formatRupiah(price.packet)}}</div>
							</div>

							<div class="row mb-1 mt-3">
								<div class="col-6">Pemasangan</div>
								<div class="col-6 text-right">{{formatRupiah(price.admin)}}</div>
							</div>

							<div class="row mb-1 mt-3 mb-4">
								<div class="col-6" style="font-size:17px;font-weight:bold">Biaya Total</div>
								<div class="col-6 text-right" style="font-size:17px;margin-top:3px;">{{formatRupiah(price.total)}}</div>
							</div>
						</span>
						<base-button type="primary" @click="validateData()" class="w-100">Pemasangan Baru</base-button>
						<p class="mt-4 mb-1 text-danger" style="font-size:12px;font-weight:bold;text-align:center">* Pemasangan sudah termasuk dengan pembayaran bulan pertama</p>
					</form>

				</template>
			</card>
		</div>
	</div>
</template>

<script>

	import { MglMap, MglMarker } from "vue-mapbox";
	import { baseURL, formatRupiah } from '../../functions/universal.js';
	import flatPicker from "vue-flatpickr-component";
	const axios = require('axios');

	export default{
		
		components: {
			MglMap,
			MglMarker,
			flatPicker
		},

		data(){
			return{
				markerCoordinates : [124.317687, 1.047018],
				mapStyle: "mapbox://styles/mapbox/streets-v11",
				coordinates: [124.317687, 1.047018],
				minZoom : 8,
				maxZoom : 17,
				mapboxAccessToken : 'pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g',

				data : {
					accounts_name : "",
					accounts_service : "-PILIH-",
					accounts_join_date : "",
					accounts_lat : "",
					accounts_long : "",
					officer_id : "",
				},
				price : {
					packet : 0,
					admin : 50000,
					total : 0,
				},
				services : []
			}
		},

		watch : {

			"data.accounts_service" : function (val) {
				var service = val.split("-");
				this.price.packet = service[2];
				this.price.total = parseInt(this.price.admin) + parseInt(this.price.packet);
			}

		},

		methods : {

			formatRupiah : function (value) {
				return formatRupiah(value.toString(), "Rp. ");
			},

			getServiceData : function () {

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
				axios.get(baseURL + "/tv.netAPI/v1/services/get.php")
					.then(function(response){
						console.log(response);
						app.$swal.close();
						var i = 0;
						var service_temp = [];
						for(i; i < response.data.raw_data.length;i++){
							var temp_services = response.data.raw_data[i][0].data + "-" + response.data.raw_data[i][1].data + "-" + response.data.raw_data[i][2].data; 
							service_temp[i] = temp_services;
						}
						app.services = service_temp;
					})
					.catch(function(error){
						console.log(error);
					});
			},

			getLotAndLong : function () {
				this.data.accounts_lat = this.markerCoordinates[1];
				this.data.accounts_long = this.markerCoordinates[0];
			},

			validateData : function(){

				if( this.data.accounts_name != "" && 
					this.data.accounts_service != "-PILIH-" && 
					this.data.accounts_join_date != "" && 
					this.data.accounts_lat != "" && 
					this.data.accounts_long != ""){

					// getting service id
					var service = this.data.accounts_service.split("-");
					this.data.accounts_service = service[0] + "." + service[1];

					var getData = "?accounts_name=" + this.data.accounts_name;
					getData    += "&accounts_service=" + service[0];
					getData    += "&accounts_join_date=" + this.data.accounts_join_date;
					getData    += "&accounts_lat=" + this.data.accounts_lat;
					getData    += "&accounts_long=" + this.data.accounts_long;
					getData    += "&price_packet=" + this.price.packet;
					getData    += "&price_admin="  + this.price.admin;
					getData    += "&price_total=" + this.price.total; 

					this.$swal({
						icon: 'warning',
						title: 'Mohon tunggu',
						text: 'Sedang Mengirim data...',
						allowOutsideClick: false,
						showConfirmButton: false,
						timerProgressBar: true,
						onBeforeOpen: () => {
							this.$swal.showLoading()
						},
					});

					var app = this;

					// sending data to server
					axios.get(baseURL + "/tv.netAPI/v1/services/new_instalation.php" + getData)
						.then(function(response){
							console.log(response);
							app.$swal({
								icon: 'success',
								title: 'Penambahan Data Berhasil',
								confirmButtonText: 'Lanjut',
								text: 'Data berhasil ditambahkan',
							});
						})
						.catch(function(error){
							console.log(error);
						})
				}

				else{
					alert("Harap mengisi semua kotak yang tersedia");
				}
			}
		},

		created(){
			this.getServiceData();
			this.data.officer_id = this.$route.params.officer_id;
			this.price.total = parseInt(this.price.admin) + parseInt(this.price.packet);
		}
	}

</script>