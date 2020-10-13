
export let baseURL = "http://127.0.0.1";

// generate random number id
// return INT - Random Number between 1000000 to 9999999
export function generateId(prefix=""){
	let min    = 1000000; 
	let max    = 9999999;
	let random = prefix + Math.floor(Math.random() * (+max + 1 - +min)) + +min; 
	return random;
}

// search for product name inside an array
// FORAMT TO SEARCH : PRODUCT_ID - PRODUCT_NAME
// return INT : i - product index
export function searchForProduct(data, products){
	let split_data = data.split("-");
	let i = 0;

	for(i; i < products.length; i++){
		console.log(products[i].product_id);
		if(split_data[0] == products[i].product_id + " "){
			break;
		}
	}
	
	return i;
}

export function getTodayDate(prefix="none") {
	var calender = new Date();
	var date = calender.getDate();
	var month = calender.getMonth();
	var year = calender.getFullYear();

	if(prefix == "none"){
		return date + "." + month + "." + year;
	}

	return date + prefix + month + prefix + year;
}

export function generatePdfFilename(type, id){
	return type + "_" + id + "_" + getTodayDate() + ".pdf"; 
}

export function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString();
	var split       = number_string.split(',');
	var sisa        = split[0].length % 3;
	var rupiah      = split[0].substr(0, sisa);
	var ribuan      = split[0].substr(sisa).match(/\d{3}/gi);
	var separator;

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

export function formatTanggal(formattedtanggal){
    var format = formattedtanggal.toString()
    format = format.split("-");
    console.log(format);
    var bulan = 0;
    // mapping bulan
    switch(format[1]){
      case "01" : bulan = "Januari"; break;
      case "02" : bulan = "Februari"; break; 
      case "03" : bulan = "Maret"; break;
      case "04" : bulan = "April"; break;
      case "05" : bulan = "Mei"; break; 
      case "06" : bulan = "Juni"; break;
      case "07" : bulan = "Juli"; break;
      case "08" : bulan = "Agustus"; break; 
      case "09" : bulan = "September"; break;
      case "10" : bulan = "Oktober"; break;
      case "11" : bulan = "November"; break; 
      case "12" : bulan = "Desember"; break;
    }
    
    return format[2] + " " + bulan + " " + format[0];
  }
