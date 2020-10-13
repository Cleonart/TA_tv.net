import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {generatePdfFilename} from './universal.js';

export function model_pdf_spk(pdf){
	
	let data = {
		startY: pdf.lastAutoTable.finalY + 5,
		columnStyles: { 
			spk_image: { 
				minCellWidth: 40, 
				minCellHeight:20 
			} 
		},
		bodyStyles:{
			minCellHeight:12,
			fontSize: 9.8,
			valign: 'middle'
		},
		body: [
			[{ content: 'Text', rowSpan: 3, }, 'Nagarey II', 'Tim 1 : Finishing Top', '05/10/2020'],
			{ spk_detail: 'Porto Side Table', process: 'Tim 2 : Finishing Bottom', deadline: '05/10/2020' },
			{ spk_detail: 'Natural Gray - 1PCS', process: 'Tim 3 : Finishing Metal', deadline: '05/10/2020' },
		],
		columns: [
			{ header: 'Gambar SPK', dataKey: 'spk_image'},
			{ header: 'Detail SPK', dataKey: 'spk_detail' },
			{ header: 'Proses', dataKey: 'process' },
			{ header: 'Deadline', dataKey: 'deadline' },
		],

		didDrawCell: function(data) {
			if (data.column.index === 0 && data.cell.section === 'body') {
				var image = new Image();
				image.src = "img/order.jpg";
				var textPos = data.cell;
				let x = textPos.x;
				let y = textPos.y;
				pdf.addImage(image, 'jpg', x, y, data.cell.width, data.cell.height);
			}
		}
	}
	return data;
}

export function model_pdf_order(pdf){
	
	let data = { 

		order : {
			startY:30,
			rowPageBreak: 'auto',
			columnStyles:{
				notes:{
					cellWidth:80
				}
			},
			bodyStyles:{
				minCellHeight:12,
				fontSize: 9.8,
				valign: 'middle',
			},
			body: [
				["1221212", "Nagarey", "Manado"],
			],
			columns: [
				{ header: 'ID'},
				{ header: 'Nama'},
				{ header: 'Lokasi'}
			]
		},

		order_notes : {
			startY: pdf.lastAutoTable.finalY + 5,
			bodyStyles:{
				minCellHeight:12,
				fontSize: 9.8,
				valign: 'middle',
			},
			body: [
				["1221212"],
			],
			columns: [
				{ header: 'Catatan Order'}
			]
		}
	}

	return data;

}

// masalah multiple spk belum di handle
export function print(type, id, data) {
	console.log(data);

	// header pdf and pdf name
	let doc     = new jsPDF();
	let pdfName = generatePdfFilename("order", id);

	// pdf's content
	if(type == "order"){
		doc.setFontSize(18);
		doc.text('Data Order', 14, 22);
		autoTable(doc, model_pdf_order(doc).order);
		autoTable(doc, model_pdf_order(doc).order_notes);

		// multiple spk handling
		/*
		for(var i =0; i < sizeof(spk_data); i++){
			autoTable(doc, model_pdf_spk(doc));
		}*/
	}

	else if(type == "spk"){
		doc.setFontSize(18);
		doc.text('Data Spk', 14, 22);
		autoTable(doc, model_pdf_spk(doc));
	}

	else if(type == "spk_invoice"){
		doc = new jsPDF('p', 'mm', [297, 210]);
	}		

	// save the docs
	doc.save(pdfName);
}

