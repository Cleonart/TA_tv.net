
/*
	CODE
	STF : Staff
	PAT : Patients
	SER : Service
	PRD : Product
*/

export function masterData(){

	let master = {
		Services  : services()
	}
	return master;
}

function services(){
	let inputData = {
		title : "Edit Service",
		code  : "SER",
		inputs : [
		{
			label : "Nama Layanan",
			required : true,
			text : "",
			placeholder : "Masukan Nama Layanan",
			type : "text"
		},
		{
			label : "Harga/bulan",
			required : true,
			text : "",
			placeholder : "Masukan Harga",
			type : "currency"
		},
		{
			label : "Status",
			required : true,
			text : "1",
			type : "radio",
			option : [
				{
					label : "Aktif",
					value : "1"
				},
				{
					label : "Tidak Aktif",
					value : "0"
				}
			]
		},
		],
		urlToGet  : '/tv.netAPI/v1/services/get.php',
		urlToPost : '/tv.netAPI/v1/services/insert_edit.php'
	}
	return inputData;
}
