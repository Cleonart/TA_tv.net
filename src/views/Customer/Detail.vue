<template>
	<div>
		<div class="col-xl-12 order-xl-1 p-3">
			<card shadow type="secondary">
				
				<div slot="header" class="bg-white border-0">
					<div class="row align-items-center">
						<div class="col-8">
							<h3 class="mb-0">Detail Pelanggan</h3>
						</div>
					</div>
				</div>
				
				<!-- ID PELANGGAN -->
				<label style="font-size:13px;">ID Pelanggan
					<span style="color: red"> *</span></label>
				<base-input type="text"
							v-model="pelanggan_detail[0].data" 
							disabled required="true" 
							placeholder="ID Pelanggan" 
							style="margin-bottom:10px"></base-input>

				<!-- Nama Pelanggan -->
				<label style="font-size:13px;">Nama Pelanggan
					<span style="color: red"> *</span></label>
				<base-input type="text"
							v-model="pelanggan_detail[1].data" 
							required="true" 
							placeholder="Nama Pelanggan" 
							style="margin-bottom:10px"></base-input>

				<!-- Service Pelanggan -->
				<label style="font-size:13px;">Layanan
					<span style="color: red"> *</span></label>
				<select v-model="pelanggan_detail[2].data" 
						class="form-control" 
						style="margin-bottom:10px">
						<option selected disabled>-PILIH-</option>
						<option v-for="option in service" v-bind:key="option" :value="option.service_id">{{option.service_name}}</option>
				</select>

				<!-- lokasi -->
				<label style="font-size:13px;margin-top:0px"> Pilih Lokasi Pemasangan<span style="color: red"> *</span> </label>
				<div style="width:100%;height:200px;">
					<MglMap
						style="height:200px;position:relative"
						accessToken="pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g"
						:mapStyle.sync="mapStyle"
						:center="coordinates"
						:zoom="13"
						:minZoom="minZoom"
						:maxZoom="maxZoom">
						
						<MglMarker 	ref="marker1"
									:coordinates.sync="markerCoordinates" 
									color="blue"
									
									draggable=true
								@dragend="getLotAndLong()">
						</MglMarker>-->
					</MglMap>
				</div>
			</card>

			<div class="mt-4">
				<h2>Riwayat Pembayaran</h2>
				<table class="table table-flush">
					<thead class="thead-light" style="border-bottom:1px solid gray">
						<td><b>ID INVOICE</b></td>
						<td><b>TAHUN</b></td>
						<td><b>BULAN</b></td>
						<td><b>NOMINAL PEMBAYARAN</b></td>
					</thead>
					<tbody>
						<tr v-for="transaction in transactions" :key="transaction" style="border-bottom:0.5px solid gray">
							<td>{{transaction.transaction_id}}</td>
							<td>{{transaction.transaction_year}}</td>
							<td>{{transaction.transaction_month}}</td>
							<td>Rp.{{formatRupiah(transaction.transaction_nominal)}}</td>
						</tr>
					</tbody>
				</table>
				<!--<base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :perPage="perPage"
                  :pagination="pagination"
                  :data="filteredData">
                </base-table>-->
			</div>

		</div>
	</div>
</template>

<script type="text/javascript">
	import { MglMap , MglMarker} from "vue-mapbox";
	import {apiEndpoint, startLoading, formatRupiah} from '@/functions/universal.js';
	const axios = require('axios');

	export default{
		components : {
			MglMap,
			MglMarker
		},
		data(){
			return{
				markerCoordinates : [124.317687, 1.047018],
				mapStyle: "mapbox://styles/mapbox/streets-v11",
				coordinates: [124.317687, 1.047018],
				minZoom : 8,
				maxZoom : 17,
				mapboxAccessToken : 'pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g',

				pelanggan_detail : {
					pelanggan_id : ''
				},
				transactions : [],
				service : []
			}
		},
		methods : {
			getData : function(){
				const app = this;
				axios.get(apiEndpoint + "customer/get.php?id=" + app.$route.params.id)
				.then(result => {
					app.pelanggan_detail = result.data.data;
					app.markerCoordinates[0] = result.data.data[4].data;
					app.markerCoordinates[1] = result.data.data[3].data;
					app.coordinates          = [app.markerCoordinates[0], app.markerCoordinates[1]];
					app.transactions = result.data.invoice;
					app.service = result.data.services;
					console.log(result.data);
				})
			},
			updateData : function(){
				//const app = this;
				let sql_rec = "";
				sql_rec  = "?accounts_id=" + this.accounts_id;
				sql_rec += "&accounts_name=" + "";
				sql_rec += "&accounts_service=" + "";
				sql_rec += "&accounts_join_date=" + "";
				sql_rec += "&accounts_lat=" + "";
				sql_rec += "&accounts_long=" + "";
				axios.get(apiEndpoint + "customer/update.php" + sql_rec)
			},
			formatRupiah : function(val){
				return formatRupiah(val.toString());
			}
		},
		created(){
			startLoading(this.$swal);
			this.getData();
			this.$swal.close();
		}
	}
</script>