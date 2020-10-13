
/*
	CODE
	STF : Staff
	PAT : Patients
	SER : Service
	PRD : Product
*/

export function masterData(){

	let master = {
		Staff    : mastereditStaff(),
		Services  : mastereditService(),
		Patients : mastereditPatients(),
		Product  : mastereditProducts()
	}
	return master;
}

function mastereditStaff(){
	let inputData = {
		title : "Edit Staff",
		code  : "STF",
		inputs : [
			{
				label : "Nama Staf",
				required : true,
				text : "",
				placeholder : "Masukan Nama Staf",
				type : "text"
			},
			{
				label : "Username",
				required : true,
				text : "",
				placeholder : "Masukan Username",
				type : "text"
			},
			{
				label : "Password",
				required : true,
				text : "",
				placeholder : "Masukan Password",
				type : "text"
			},
			{
				label : "Posisi",
				required : true,
				text : "-PILIH-",
				type : "select_box",
				option : ["Administrator", "Kasir", "Clinician", "Stylist", "Hair Washer"]
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
			}
		],
		urlToGet  : '/lumeraAPI/master_data/getAllStaff.php',
		urlToPost : '/lumeraAPI/master_data/insertEditStaff.php' 
	}
	return inputData;
}

function mastereditService(){
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
			label : "Harga",
			required : true,
			text : "",
			placeholder : "Masukan Harga",
			type : "currency"
		},
		{
			label : "Kategori",
			required : true,
			text : "-PILIH-",
			type : "select_box",
			option : ["Klinik", "Salon"]
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
		urlToGet  : '/lumeraAPI/master_data/getAllServices.php',
		urlToPost : '/lumeraAPI/master_data/insertEditServices.php'
	}
	return inputData;
}

function mastereditPatients(){
	let inputData = {
		title : "Edit Pasien",
		code : "PAT",
		inputs : [
		{
			label : "Nama Pasien",
			required : true,
			text : "",
			placeholder : "Masukan Nama Pasien",
			type : "text"
		},
		{
			label : "Alamat",
			required : true,
			text : "",
			placeholder : "Masukan Alamat",
			type : "textarea"
		},
		{
			label : "No. HP",
			required : true,
			text : "",
			type : "number"
		},
		{
			label : "Tanggal Lahir",
			required : true,
			text : "",
			type : "date"
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
		urlToGet  : '/lumeraAPI/master_data/getAllPatients.php',
		urlToPost : '/lumeraAPI/master_data/insertEditPatients.php'
	}
	return inputData;
}

function mastereditProducts(){
	let inputData = {
		title : "Edit Produk",
		code : "PRD",
		inputs : [
		{
			label : "Nama Produk",
			required : true,
			text : "",
			placeholder : "Masukan Nama Produk",
			type : "text"
		},
		{
			label : "Harga",
			required : true,
			text : "",
			placeholder : "Masukan Harga",
			type : "currency"
		},
		{
			label : "Stok",
			required : false,
			text : "0",
			type : "text",
			disabled : true
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
		urlToGet  : '/lumeraAPI/master_data/getAllProduct.php',
		urlToPost : '/lumeraAPI/master_data/insertEditProduct.php'
	}
	return inputData;
}