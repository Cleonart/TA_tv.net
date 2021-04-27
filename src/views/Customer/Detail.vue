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
							disabled required="true" 
							placeholder="ID Pelanggan" 
							style="margin-bottom:10px"></base-input>

				<!-- Nama PELANGGAN -->
				<label style="font-size:13px;">Nama Pelanggan
					<span style="color: red"> *</span></label>
				<base-input type="text" 
							required="true" 
							placeholder="Nama Pelanggan" 
							style="margin-bottom:10px"></base-input>
			</card>

			<div class="mt-4">
				<h2>Riwayat Pembayaran</h2>
			</div>
			
		</div>
	</div>
</template>

<script type="text/javascript">
	
	import {apiEndpoint, startLoading} from '@/functions/universal.js';
	const axios = require('axios');

	export default{
		data(){
			return{
				pelanggan_detail : {
					pelanggan_id : ''
				}
			}
		},
		methods : {
			getData : function(){
				axios.get(apiEndpoint)
				.then(result => {
					console.log(result.data);
				})
			}
		},
		created(){
			startLoading(this.$swal);
			this.getData();
			this.$swal.close();
		}
	}
</script>