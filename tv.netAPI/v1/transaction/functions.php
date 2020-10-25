<?php
	require '../api_conf.php';
	include '../functions.php';

	function getBillingAll($dale){
		$customer = $dale -> kueri("SELECT accounts_id FROM `accounts`");
		$data = json_decode($customer);
		$billing;

		for($i=0; $i < sizeof($data);$i++){
			$billing[$i] = getBillingById($dale, $data[$i] -> accounts_id);
		}
		print_r($billing);
		return json_encode($billing);	
	}

	function getBillingById($dale, $id){
		$customer = $dale -> kueri(getCustomerDataKueri($id));
		$data = json_decode($customer);

		$month_last = $data[0] -> transaction_month;
		$year_last  = $data[0] -> transaction_year;

		$per = calculateMonth($month_last, $year_last, 10,2020);
		$total = json_decode($per) -> num_of_month * $data[0] -> service_nominal;
 
		$billing = array(
			"accounts_id"   => $data[0] -> accounts_id,
			"accounts_name" => $data[0] -> accounts_name,
			"accounts_loc"  => array($data[0] -> accounts_lat, 
						 $data[0] -> accounts_long),
			"service"       => $data[0] -> service_name,
			"billing"       => json_decode($per),
			"billing_price" => $total
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

	getBillingAll($dale);

?>
