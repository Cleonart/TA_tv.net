<?php
	
	require '../api_conf.php';

	// generate new customer id
	$customer_id = "CUS" . rand(10000000, 99999999);
	
	$data = $dale->kueri("INSERT INTO `accounts` 
						SET accounts_id        = '".$customer_id."',
							accounts_name      = '".$_GET['accounts_name']."',
							accounts_service   = '".$_GET['accounts_service']."',
							accounts_join_date = '".$_GET['accounts_join_date']."',
							accounts_lat       = '".$_GET['accounts_lat']."',
							accounts_long      = '".$_GET['accounts_long']."',
							accounts_status    = 400
						ON DUPLICATE KEY UPDATE 
							accounts_name      = '".$_GET['accounts_name']."',
							accounts_service   = '".$_GET['accounts_service']."',
							accounts_join_date = '".$_GET['accounts_join_date']."',
							accounts_lat       = '".$_GET['accounts_lat']."',
							accounts_long      = '".$_GET['accounts_long']."',
							accounts_status    = 400");
	
	$transaction_id = "TRC" . rand(10000000, 99999999);
	$data = $dale->kueri("INSERT INTO `transaction` 
						SET transaction_id          = '".$transaction_id."',
							transaction_customer_id = '".$customer_id."',
							transaction_nominal     = '".(int)$_GET['price_packet']."',
							transaction_admin       = '".(int)$_GET['price_admin']."',
							transaction_notes       = 'PEMASANGAN BARU',
							transaction_status      = 400
						ON DUPLICATE KEY UPDATE
							transaction_customer_id = '".$customer_id."',
							transaction_nominal     = '".(int)$_GET['price_packet']."',
							transaction_admin       = '".(int)$_GET['price_admin']."',
							transaction_notes       = 'PEMASANGAN BARU',
							transaction_status      = 400");

	echo $data;

?>