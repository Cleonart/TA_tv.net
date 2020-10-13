<template>
	<div>
		<div class="card shadow bg-default" style="height:600">
			<div class="card-header border-0 bg-transparent">
				<div class="row align-items-center">
					<div class="col">
						<h3 class="mb-0 text-white">
							Checkout
						</h3>
					</div>
				</div>
			</div>
			<div class="table-responsive pb-2" style="height:320px;">
				<base-table class="table align-items-center table-flush table-dark"
							thead-classes="thead-dark text-white"
							tbody-classes="list"
							:data="tableData">
					<template slot="columns">
						<th>Aksi</th>
						<th>Nama PRD/SER</th>
						<th>Jumlah</th>
						<th>Sub Total</th>
						<th>Total</th>
					</template>
					<template slot-scope="{row}">
						<td>
							<base-button @click="removeItem(row.item_id)" type="danger" icon="ni ni-fat-remove" style="height:37px;width:37px;padding-left:10px"></base-button>
						</td>
						<td>{{row.item_name}}<br/>
							<span   v-if="row.item_category != 'Produk'"
									style="opacity:0.5;font-size:12px">oleh {{row.item_handler}}</span>
						</td>
						<td>
							<input  class="pt-1 pb-1 pr-0" 
									style="width:50px;text-align:center;border-radius:5px;border:none;background-color:#1c345d;color:#fff"
									type="number"
									v-model="row.item_qty"
									max="10"/>
						</td>
						<td>{{formatRupiah(row.item_price)}}</td>
						<td>{{formatRupiah(row.item_price * row.item_qty)}}</td>
					</template>
				</base-table>
				<p v-if="tableData.length == 0"
							style="font-weight:bold;text-align:center;"
							class="mt-4 mb-3">Checkout kosong :(</p>
			</div>

			<div style="color:#fff;opacity:0.97;-webkit-font-smoothing: antialiased;font-size:14.5px;">

				<div class="row pl-4 pr-4 mb-1 mt-3">
					<div class="col-sm-6">Sub Total</div>
					<div class="col-sm-6 text-right">{{formatRupiah(subTotal)}}</div>
				</div>

				<div class="row pl-4 pr-4 mb-1">
					<div class="col-sm-6">Diskon</div>
					<div class="col-sm-6 text-right text-success">- {{formatRupiah(disc)}}</div>
				</div>

				<div class="row pl-4 pr-4 mb-1">
					<div class="col-sm-6">Pajak</div>
					<div class="col-sm-6 text-right text-danger">+ {{formatRupiah(tax)}}</div>
				</div>

				<div class="row pl-4 pr-4 mt-3 mb-4">
					<div class="col-sm-6" style="font-size:23px;"><b>Total</b>({{tableData.length}})</div>
					<div class="col-sm-6 text-right" style="font-size:23px;">{{formatRupiah(total)}}</div>
				</div>
			</div>
			<div class="container" style="margin-top:0px;padding-left:35px;padding-right:35px;margin-bottom:20px;margin-top:-10px">
				<div class="row">
					<base-button class="col" type="primary mt-2">Selesai</base-button>
					<base-button class="col" type="success mt-2" @click="save()">Simpan</base-button>
					<base-button class="col" type="danger mt-2">Batal</base-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script> 

	import {formatRupiah} from '../../../functions/universal.js';

	export default{
		name : 'posCheckout',
		data(){
			return{
				tableData : [],
				subTotal : 0,
				total    : 0,
				tax      : 0,
				disc     : 0
			}
		},

		watch : {
			tableData : {
				handler:function (value) {
					this.total = 0;
					this.subTotal = 0;
					for(var i = 0; i < this.tableData.length;i++){
						console.log(value);
						this.subTotal += this.tableData[i].item_price * this.tableData[i].item_qty;
					}
					this.total = this.subTotal + this.tax - this.disc;
				},
				deep:true
			}

		},

		methods : {

			checkout : function () {
				
			},

			save : function () {
				
				// validate checkout items
				if(this.tableData.length == 0){
					this.$swal.fire("Checkout kosong", 
									"Tidak bisa menyimpan transaksi karena tidak ada item yang dipilih", 
									"error");
					return 0;
				}

			},

			cancel : function () {
				
			},

			addToCheckout : function (value) {

				for(var i = 0; i < this.tableData.length; i++){
					if(value.item_id == this.tableData[i].item_id){

						if(value.item_category == 'Produk'){
							this.tableData[i].item_qty = parseInt(this.tableData[i].item_qty) + 1;
							return "SAME_ID";
						}

						else{
							if(value.item_handler == this.tableData[i].item_handler){
								this.tableData[i].item_qty = parseInt(this.tableData[i].item_qty) + 1;
								return "SAME_ID_AND_HANDLER";
							}
							else{
								break;
							}
						}
						
					}
				}

				this.tableData.push({
					item_id    : value.item_id,
					item_name  : value.item_name,
					item_qty   : 1,
					item_price : value.item_price,
					item_category : value.item_category,
					item_handler : value.item_handler
				});

				return "SUCCESS";
			},

			removeItem : function(id) {
				var app = this;

				this.$swal.fire({
					title: 'Hapus item?',
					text: "Anda yakin akan menghapus item dari checkout?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#5e72e4',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Ya, Hapus'
				}).then((result) => {
					if (result.isConfirmed) {
						app.$swal.fire('Berhasil Dihapus','Item berhasil dihapus dari checkout','success');
						for(var i = 0; i < this.tableData.length; i++){
							if(id == this.tableData[i].item_id){
								this.tableData.splice(i, 1);
								break;
							}
						}
					}
				})
				
			},

			formatRupiah :function (value) {
				return formatRupiah(String(value), "Rp.");
			},
		}
	}
</script>