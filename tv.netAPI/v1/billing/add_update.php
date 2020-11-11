<?php
	
	require '../api_conf.php';
	
	$data = "";
	$json_data = [];

	if(isset($_GET['id'])){
		$data = $dale->kueri("SELECT * FROM `service` WHERE `service_id` = '".$_GET['id']."'");
		
		$data = json_decode($data);

		for($i = 0; $i < sizeof($data); $i++){

			$json_data[$i][0]['data']  = $data[$i] -> service_id;
			$json_data[$i][0]['type']  = "id";

			// nama layanan
			$json_data[$i][1]['data']  = $data[$i] -> service_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";

			// harga layanan
			$json_data[$i][2]['data']  = $data[$i] -> service_nominal;
			$json_data[$i][2]['type']  = "currency";
			$json_data[$i][2]['class'] = "";
		}
	}
	else{
		$data = $dale->kueri("SELECT * FROM `service` ORDER BY `service_id` ASC");
	
		$data = json_decode($data);

		for($i = 0; $i < sizeof($data); $i++){

			$json_data[$i][0]['data']  = $data[$i] -> service_id;
			$json_data[$i][0]['type']  = "id";

			// nama layanan
			$json_data[$i][1]['data']  = $data[$i] -> service_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";

			// harga layanan
			$json_data[$i][2]['data']  = $data[$i] -> service_nominal;
			$json_data[$i][2]['type']  = "currency";
			$json_data[$i][2]['class'] = "";
		}
	}

	if(isset($_GET['id'])){
		echo json_encode($json_data);
	}

	else{
		// table header
		$json_header = [];
		$json_header[0] = "ID";
		$json_header[1] = "Nama Layanan";
		$json_header[2] = "Harga Layanan";
		$json_settings = array('search_index' => 1);

		$output = array('raw_data'     => $json_data, 
						'table_header' => $json_header,
						'settings'     => $json_settings);
		echo json_encode($output);
	}

?>