<?php

function calculateMonth($last_month, $last_year, $month_now, $year_now){

	$detail = array(
		"num_of_month" => 0,
		"months" => []
	); 

	$k = 0;

	// hanya bulan
	if($year_now == $last_year){
		for($i = $last_month; $i < $month_now; $i++){
			$detail['months'][$k] = array(
				"month" => selectMonth($i),
				"year"  => $year_now
			);
			$k++;
		}
	}

	// dengan tahun
	else{
		
		$i = $last_month + 1;
		while(true){
			if($last_year == $year_now){
				if($i < $month_now){
					$detail['months'][$k] = array(
						"month" => selectMonth($i),
						"year"  => $last_year
					);
					$i++;
					$k++;
				}
				else{
					break;
				}
			}
			else{

				if($i == 13){
					$i = 1;
					$last_year += 1;
				}

				$detail['months'][$k] = array(
					"month" => selectMonth($i),
					"year"  => $last_year
				);

				$i++;
				$k++;
			}
		}
	}

	$detail['num_of_month'] = $k;
	return json_encode($detail);
}

function selectMonth($month){
	switch ($month) {
		case 1:
			return "Januari";
			break;
		case 2:
			return "Februari";
			break;
		case 3:
			return "Maret";
			break;
		case 4:
			return "April";
			break;
		case 5:
			return "Mei";
			break;
		case 6:
			return "Juni";
			break;
		case 7:
			return "Juli";
			break;
		case 8:
			return "Agustus";
			break;
		case 9:
			return "September";
			break;
		case 10:
			return "Oktober";
			break;
		case 11:
			return "November";
			break;
		case 12:
			return "Desember";
			break;
	}
}

?>