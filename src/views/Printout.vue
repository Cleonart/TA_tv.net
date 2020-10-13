<template>
	<div>
		<p>Printout</p>
		<p>TEs</p>
	</div>
</template>

<script>
	
	const axios = require('axios');

	import {baseURL} from "../functions/universal.js";
	import {print} from '../functions/pdf_data_model.js';

	export default {

		created(){			
			let printout_type = this.$route.params.printout_type;
			let printout_id   = this.$route.params.id;
			let url = baseURL + "/furniture_api/api/v1/printout/" + printout_type + ".php?id=" + printout_id;
			
			axios.get(url)

				.then(function(response){
					print(printout_type, printout_id, response.data);
				})

				.catch(function(error){
					console.log(error);
					alert("Gagal melakukan generate file print\nKesalahan : Server tidak dapat dijangkau");
					print(printout_type, printout_id, error);
				})		
		}
	};
</script>