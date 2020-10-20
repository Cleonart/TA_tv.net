<?php
	
	require '../api_conf.php';
	
	$data = "";
	$json_data = [];

	if(isset($_GET['id'])){
		$data = $dale->kueri("SELECT * FROM `accounts` WHERE `accounts_id` = '".$_GET['id']."'");
		
		$data = json_decode($data);

		for($i = 0; $i < sizeof($data); $i++){

			$json_data[$i][0]['data']  = $data[$i] -> accounts_id;
			$json_data[$i][0]['type']  = "id";

			// nama akun
			$json_data[$i][1]['data']  = $data[$i] -> accounts_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";

			// username
			$json_data[$i][2]['data']  = $data[$i] -> accounts_username;
			$json_data[$i][2]['type']  = "text";
			$json_data[$i][2]['class'] = "";

			// password
			$json_data[$i][3]['data']  = $data[$i] -> accounts_password;
			$json_data[$i][3]['type']  = "text";
			$json_data[$i][3]['class'] = "";

			// selected service
			$json_data[$i][4]['data']  = $data[$i] -> accounts_service;
			$json_data[$i][4]['type']  = "text";
			$json_data[$i][4]['class'] = "";

			// lat
			$json_data[$i][5]['data']  = $data[$i] -> accounts_lat;
			$json_data[$i][5]['type']  = "text";
			$json_data[$i][5]['class'] = "";

			// long
			$json_data[$i][6]['data']  = $data[$i] -> accounts_long;
			$json_data[$i][6]['type']  = "text";
			$json_data[$i][6]['class'] = "";

		}
	}
	else{
		$data = $dale->kueri("SELECT * FROM `accounts` ORDER BY `accounts_name` ASC");
	
		$data = json_decode($data);

		for($i = 0; $i < sizeof($data); $i++){

			$json_data[$i][0]['data']  = $data[$i] -> accounts_id;
			$json_data[$i][0]['type']  = "id";

			// nama akun
			$json_data[$i][1]['data']  = $data[$i] -> accounts_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";

			// selected service
			$json_data[$i][4]['data']  = $data[$i] -> accounts_service;
			$json_data[$i][4]['type']  = "text";
			$json_data[$i][4]['class'] = "";

			// tanggal bergabung
			$json_data[$i][4]['data']  = $data[$i] -> join_date;
			$json_data[$i][4]['type']  = "text";
			$json_data[$i][4]['class'] = "";
		}
	}

	if(isset($_GET['id'])){
		echo json_encode($json_data);
	}

	else{
		// table header
		$json_header = [];
		$json_header[0] = "ID";
		$json_header[1] = "Nama Pelanggan";
		$json_header[2] = "Layanan";
		$json_header[3] = "Tanggal Bergabung";
		$json_settings = array('search_index' => 1);

		$output = array('raw_data'     => $json_data, 
						'table_header' => $json_header,
						'settings'     => $json_settings);
		echo json_encode($output);
	}

?>