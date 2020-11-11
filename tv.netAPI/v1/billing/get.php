<?php
	
	require '../api_conf.php';
	
	$data = "";
	$json_data = [];

	if(isset($_GET['id'])){
		$data = $dale->kueri("SELECT * FROM `transaction` as a INNER JOIN `accounts` as b 
							  ON a.accounts_id = b.transaction_customer_id 
							  WHERE `transaction_id` = '".$_GET['id']."'");
		$data = json_decode($data);

		for($i = 0; $i < sizeof($data); $i++){

			$json_data[$i][0]['data']  = $data[$i] -> transaction_id;
			$json_data[$i][0]['type']  = "id";

			// nama layanan
			$json_data[$i][1]['data']  = $data[$i] -> accounts_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";

			// bulan menunggak
			$json_data[$i][1]['data']  = $data[$i] -> accounts_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";
		}
	}
	else{
		$data = $dale->kueri("SELECT * FROM `transaction` as a INNER JOIN `accounts` as b 
							  ON a.transaction_customer_id = b.accounts_id 
							  ORDER BY `accounts_name` ASC");
	
		$data = json_decode($data);

		for($i = 0; $i < sizeof($data); $i++){

			$json_data[$i][0]['data']  = $data[$i] -> transaction_id;
			$json_data[$i][0]['type']  = "id";

			// nama layanan
			$json_data[$i][1]['data']  = $data[$i] -> accounts_name;
			$json_data[$i][1]['type']  = "text";
			$json_data[$i][1]['class'] = "";
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
		$json_settings = array('search_index' => 1);

		$output = array('raw_data'     => $json_data, 
						'table_header' => $json_header,
						'settings'     => $json_settings);
		echo json_encode($output);
	}

?>