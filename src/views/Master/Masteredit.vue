<template>
	<div>
		<div class="col-xl-12 order-xl-1 p-5">
			<card shadow type="secondary">
				<div slot="header" class="bg-white border-0">
					<div class="row align-items-center">
						<div class="col-8">
							<h3 class="mb-0">Master Data</h3>
						</div>
					</div>
				</div>

				<template>
					<form @submit.prevent>
						<div v-for="form in forms" v-bind:key="form.label">
							
							<!-- label -->
							<label style="font-size:13px;margin-top:10px">
								{{form.label}}<span style="color: red">*</span>
							</label>

							<!-- text field -->
							<base-input v-if="form.type == 'text'" 
										type="text"
										v-model="form.text" 
										:required="form.required"
										:placeholder="form.placeholder"
										style="margin-bottom:10px"></base-input>

							<!-- currency field -->
							<base-input v-if="form.type == 'currency'" 
										type="number"
										v-model="form.text" 
										:required="form.required"
										:placeholder="form.placeholder"
										style="margin-bottom:10px"></base-input>

							<base-input v-if="form.type == 'currency'" 
										type="text"
										:value="formatRupiah(form.text)"
										disabled
										style="margin-bottom:10px"></base-input>

							<!-- select box -->
							<select v-if="form.type == 'select_box'" 
									v-model="form.text" 
									class="form-control" 
									style="margin-bottom:10px">
								<option selected disabled>-PILIH-</option>
								<option v-for="option in form.option" v-bind:key="option">{{option}}</option>
							</select>

							<!-- calender selector -->
							<base-input v-if="form.type == 'date'"  
										addon-left-icon="ni ni-calendar-grid-58">
								<flat-picker slot-scope="{focus, blur}"
												style="background-color:#fff;margin-bottom:10px"
												:config="{dateFormat:'d-m-Y'}"
												@on-open="focus"
												@on-close="blur"
												class="form-control datepicker"
												v-model="form.text">
								</flat-picker>
							</base-input>

							<!-- radio button -->
							<span 	v-if="form.type == 'radio'" 
									style="margin-bottom:10px">
								<base-radio :name="option.value"
											v-for="option in form.option"
											v-bind:key="option.value" 
											class="mb-3" 
											value="1"
											v-model="form.text">
									{{option.label}}
								</base-radio>
							</span>
						</div>

						<hr class="my-4" />
						<base-button type="primary" @click="validateData()">{{mode}} Data</base-button>
						<base-button outline type="danger" @click="goBack()">Batal</base-button>
					
					</form>
				</template>
			</card>
		</div>
	</div>
</template>

<script>

	import flatPicker from "vue-flatpickr-component";
	import "flatpickr/dist/flatpickr.css";
	import {masterData} from "../../functions/masteredit.js"; 
	import {baseURL, generateId, formatRupiah} from "../../functions/universal.js"; 
	const axios = require('axios');
	
	export default{
		
		name: 'masteredit',
		
		data(){
			return{
				forms : [],
				masteredit_mode : 'add',
				selector : '',
				urlToGet  : '',
				urlToPost : '',
				code : 'STF',
				mode : 'Tambah',
			}
		},
		
		methods : {

			// validate data
			validateData : function(){
				let validation = 0;
				let temporary_get_gate="?"; 

				for(let i = 0; i < this.forms.length; i++){
					if(this.forms[i].required == true){
						if(	this.forms[i].text == "" || 
							this.forms[i].text == undefined ||
							this.forms[i].text == "undefined" ||
							this.forms[i].text == "-PILIH-"){
								validation = 0;
								this.$swal({
									icon: 'error',
									title: 'Validasi Gagal',
									text: 'Lengkapi semua data yang bertanda *',
								});
								break;
							}
						else{
							validation = 1;
						}
					}

					else{
						validation = 1;
					}

					if(validation == 1){
						temporary_get_gate = temporary_get_gate + "data_" + i + "=" + this.forms[i].text + "&";
					}
				}

				if(validation == 1){
					let confirm_changes = confirm("Anda yakin akan menyimpan perubahan ini?");
					if (confirm_changes == true) {
						let api_url = this.urlToPost + temporary_get_gate + "data_id=" + this.masteredit_mode;
						this.sendDataToServer(api_url);
					}
				}
			},

			// send data to the server
			sendDataToServer : function(api_url) {
				var app = this;

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

				axios.get(api_url)
					.then(function(response) {
						console.log(response);
						app.$swal({
							icon: 'success',
							title: 'Proses Berhasil',
							confirmButtonText: 'Lanjut',
							text: 'Data berhasil dirubah',
							preConfirm: () => {
								window.history.go(-1);
							}
						});
					})
					.catch(function(error) {
						console.log(error);
						app.$swal({
							icon: 'error',
							title: 'Proses Gagal',
							confirmButtonText: 'Coba Lagi',
							text: 'Gagal mengambil data, server anda mungkin sedang bermasalah',
							preConfirm: () => {
								app.validateData();
							}
						});
					})
			},

			// get specify data from server
			getSpecificData : function() {
				var app = this;
				if(this.masteredit_mode != 'add'){
					axios.get(this.urlToGet)
						.then(function(response) {
							console.log(response);
							var j = 0;
							for(var i =0; i < response.data[0].length ; i++){
								if(response.data[0][i].type == 'id'){
									continue;
								}
								app.forms[j].text = response.data[0][i].data;
								j++;
							}
							app.mode = "Ubah";
						})
						.catch(function(error) {
							console.log(error);
						})
				}
				else{
					this.masteredit_mode = generateId(this.code);
				}

			},

			goBack : function () {
				window.history.go(-1);
			},

			formatRupiah : function (value) {
				return formatRupiah(value, "Rp. ");
			}

		},

		created(){

			// get the paramater from router
			this.masteredit_mode = this.$route.params.masteredit_mode;
			this.selector        = this.$route.params.selector;   

			// on start
			this.forms     = masterData()[this.selector].inputs;
			console.log(masterData());
			this.urlToGet  = baseURL + masterData()[this.selector].urlToGet + "?id=" + this.masteredit_mode;
			this.urlToPost = baseURL + masterData()[this.selector].urlToPost;
			this.code      = masterData()[this.selector].code;

			// get the data
			this.getSpecificData();

			// scroll to top function
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		},

		components: {flatPicker}
	}

</script>