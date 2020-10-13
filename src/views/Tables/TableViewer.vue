<template>

	<div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">

		<!-- header -->
		<div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
			<div class="row align-items-center">
				<div class="col">
					<h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
						{{title}}
					</h3>
				</div>

				<div class="col-lg-5 text-right p-0 pr-3 row" style="height:43px">
					<div class="col-md-8 pr-1">
						<base-input :placeholder="'Cari ' + name + ' disini...'" addon-left-icon="ni ni-zoom-split-in"></base-input>
					</div>
					<div class="col-md-4 pl-1">
						<router-link :to="'/' + name + '/tambah'">
							<base-button class="w-100" type="primary" icon="ni ni-fat-add">Baru</base-button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		
		<!-- table -->
		<div class="table-responsive">
		
		</div>

	</div>

</template>

<script>
	const axios = require('axios');
	export default {
		name : 'table-viewer',
		props: {
			type: {
        		type: String
      		},
      		title: String,
    		url: String,
    		search_by : String,
    		name : String,
    	},
    	data(){
    		return {

    		}
    	}
	}
</script>