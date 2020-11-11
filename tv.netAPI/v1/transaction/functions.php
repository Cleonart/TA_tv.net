<?php

	include '../functions.php';

	function getBillingAll($dale){
		$customer = $dale -> kueri("SELECT accounts_id FROM `accounts`");
		$data = json_decode($customer);
		$billing;

		for($i=0; $i < sizeof($data) - 1;$i++){
			$billing[$i] = getBillingById($dale, $data[$i] -> accounts_id);
		}

		return json_encode($billing);	
	}

	function getBillingById($dale, $id){
		$customer = $dale -> kueri(getCustomerDataKueri($id));
		$data = json_decode($customer);

		$month_last = $data[0] -> transaction_month;
		$year_last  = $data[0] -> transaction_year;

		$per = calculateMonth($month_last, $year_last, 11,2020);
		$total = json_decode($per) -> num_of_month * $data[0] -> service_nominal;
 			
 		$month_text = "";
 		$months_data = json_decode($per) -> months;
 		for($i = 0; $i < sizeof($months_data);$i++){
 			if($i == sizeof($months_data) - 1){
 				$month_text .= $months_data[$i] -> month . " " . $months_data[$i] -> year;
 			}
 			else{
 				$month_text .= $months_data[$i] -> month . " " . $months_data[$i] -> year . ", ";
 			}
 		}

 		$color = "";
 		if(json_decode($per) -> num_of_month == 0){  $color = "#2ecc71"; }
 		else if($data[0] -> accounts_status == 400){ $color = "#f1c40f"; }
 		else{ $color = "#e74c3c"; }

		$billing = array(
			"customer_id"   => $data[0] -> accounts_id,
			"customer_name" => $data[0] -> accounts_name,
			"customer_loc"  => [$data[0] -> accounts_long, $data[0] -> accounts_lat],
			"customer_ser"  => $data[0] -> service_name,
			"billing"       => json_decode($per),
			"billing_price" => $total,
			"months_text"   => $month_text,
			"customer_color" => $color
		);

		return $billing;
	}
	
	function getCustomerDataKueri($accounts_id){
		$kueri  = "";
		$kueri .= "SELECT * FROM `accounts` as a ";
		$kueri .= "INNER JOIN `transaction` as b ";
		$kueri .= "ON a.accounts_id = b.transaction_customer_id ";
		$kueri .= "INNER JOIN `service` as c ";
		$kueri .= "ON a.accounts_service = c.service_id ";
		$kueri .= "WHERE `accounts_id` = '".$accounts_id."' ";
		$kueri .= "ORDER BY `transaction_month` DESC, `transaction_year` DESC";
		return $kueri;
	}

?>