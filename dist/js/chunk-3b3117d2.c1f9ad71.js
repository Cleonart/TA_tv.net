(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b3117d2"],{"129f":function(t,a){t.exports=Object.is||function(t,a){return t===a?0!==t||1/t===1/a:t!=t&&a!=a}},"247c":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"col-xl-12 order-xl-1 p-3"},[e("card",{attrs:{shadow:"",type:"secondary"}},[e("div",{staticClass:"bg-white border-0",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"col-8"},[e("h3",{staticClass:"mb-0"},[t._v("Detail Pelanggan")])])])]),e("label",{staticStyle:{"font-size":"13px"}},[t._v("ID Pelanggan "),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("base-input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"text",disabled:"",required:"true",placeholder:"ID Pelanggan"},model:{value:t.pelanggan_detail[0].data,callback:function(a){t.$set(t.pelanggan_detail[0],"data",a)},expression:"pelanggan_detail[0].data"}}),e("label",{staticStyle:{"font-size":"13px"}},[t._v("Nama Pelanggan "),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("base-input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"text",required:"true",placeholder:"Nama Pelanggan"},model:{value:t.pelanggan_detail[1].data,callback:function(a){t.$set(t.pelanggan_detail[1],"data",a)},expression:"pelanggan_detail[1].data"}}),e("label",{staticStyle:{"font-size":"13px"}},[t._v("Layanan "),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.pelanggan_detail[2].data,expression:"pelanggan_detail[2].data"}],staticClass:"form-control",staticStyle:{"margin-bottom":"10px"},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.pelanggan_detail[2],"data",a.target.multiple?e:e[0])}}},[e("option",{attrs:{selected:"",disabled:""}},[t._v("-PILIH-")]),t._l(t.service,(function(a){return e("option",{key:a,domProps:{value:a.service_id}},[t._v(t._s(a.service_name))])}))],2),e("label",{staticStyle:{"font-size":"13px","margin-top":"0px"}},[t._v(" Pilih Lokasi Pemasangan"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("div",{staticStyle:{width:"100%",height:"200px"}},[e("MglMap",{staticStyle:{height:"200px",position:"relative"},attrs:{accessToken:"pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g",mapStyle:t.mapStyle,center:t.coordinates,zoom:13,minZoom:t.minZoom,maxZoom:t.maxZoom},on:{"update:mapStyle":function(a){t.mapStyle=a},"update:map-style":function(a){t.mapStyle=a}}},[e("MglMarker",{ref:"marker1",attrs:{coordinates:t.markerCoordinates,color:"blue",draggable:"true"},on:{"update:coordinates":function(a){t.markerCoordinates=a},dragend:function(a){return t.getLotAndLong()}}}),t._v("--\x3e ")],1)],1)],1),e("div",{staticClass:"mt-4"},[e("h2",[t._v("Riwayat Pembayaran")]),e("table",{staticClass:"table table-flush"},[t._m(0),e("tbody",t._l(t.transactions,(function(a){return e("tr",{key:a.transaction_id,staticStyle:{"border-bottom":"0.5px solid gray"}},[e("td",[t._v(t._s(a.transaction_id))]),e("td",[t._v(t._s(a.transaction_year))]),e("td",[t._v(t._s(a.transaction_month))]),e("td",[t._v("Rp."+t._s(t.formatRupiah(a.transaction_nominal)))])])})),0)])])],1)])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{staticClass:"thead-light",staticStyle:{"border-bottom":"1px solid gray"}},[e("td",[e("b",[t._v("ID INVOICE")])]),e("td",[e("b",[t._v("TAHUN")])]),e("td",[e("b",[t._v("BULAN")])]),e("td",[e("b",[t._v("NOMINAL PEMBAYARAN")])])])}],i=(e("d3b7"),e("25f0"),e("3f3d")),r=e("0bfe"),l=e("bc3a"),o={components:{MglMap:i["a"],MglMarker:i["b"]},data:function(){return{markerCoordinates:[124.317687,1.047018],mapStyle:"mapbox://styles/mapbox/streets-v11",coordinates:[124.317687,1.047018],minZoom:8,maxZoom:17,mapboxAccessToken:"pk.eyJ1IjoienJlZGhhcmQiLCJhIjoiY2s4dGI0bzhxMDJjdzNsbGtmOXVtNDNvciJ9.kLnTWH6orAW2JwEn44b73g",pelanggan_detail:{pelanggan_id:""},transactions:[],service:[]}},methods:{getData:function(){var t=this;l.get(r["a"]+"customer/get.php?id="+t.$route.params.id).then((function(a){t.pelanggan_detail=a.data.data,t.markerCoordinates[0]=a.data.data[4].data,t.markerCoordinates[1]=a.data.data[3].data,t.coordinates=[t.markerCoordinates[0],t.markerCoordinates[1]],t.transactions=a.data.invoice,t.service=a.data.services,console.log(a.data)}))},updateData:function(){var t="";t="?accounts_id="+this.accounts_id,t+="&accounts_name=",t+="&accounts_service=",t+="&accounts_join_date=",t+="&accounts_lat=",t+="&accounts_long=",l.get(r["a"]+"customer/update.php"+t)},formatRupiah:function(t){return Object(r["c"])(t.toString())}},created:function(){Object(r["f"])(this.$swal),this.getData(),this.$swal.close()}},c=o,d=e("2877"),u=Object(d["a"])(c,s,n,!1,null,null,null);a["default"]=u.exports},"841c":function(t,a,e){"use strict";var s=e("d784"),n=e("825a"),i=e("1d80"),r=e("129f"),l=e("14c3");s("search",1,(function(t,a,e){return[function(a){var e=i(this),s=void 0==a?void 0:a[t];return void 0!==s?s.call(a,e):new RegExp(a)[t](String(e))},function(t){var s=e(a,t,this);if(s.done)return s.value;var i=n(t),o=String(this),c=i.lastIndex;r(c,0)||(i.lastIndex=0);var d=l(i,o);return r(i.lastIndex,c)||(i.lastIndex=c),null===d?-1:d.index}]}))},"9dcf":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"col-xl-12 order-xl-1 p-3"},[e("card",{attrs:{shadow:"",type:"secondary"}},[e("div",{staticClass:"bg-white border-0",attrs:{slot:"header"},slot:"header"},[e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"col-8"},[e("h3",{staticClass:"mb-0"},[t._v("Tagihan")]),e("p",{staticClass:"mt-1 mb-0",staticStyle:{"font-size":"12px"}},[t._v("#"+t._s(t.data.customer_id))])])])]),[e("label",{staticStyle:{"font-size":"13px"}},[t._v(" Nama Pelanggan"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("base-input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"text",disabled:"",required:"true",placeholder:"Nama Pelanggan"},model:{value:t.data.customer_name,callback:function(a){t.$set(t.data,"customer_name",a)},expression:"data.customer_name"}}),e("label",{staticStyle:{"font-size":"13px","margin-top":"10px"}},[t._v(" Bulan Tagihan (Bln)"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("base-input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"text",disabled:"",required:"true",placeholder:"Nama Pelanggan"},model:{value:t.data.billing.num_of_month,callback:function(a){t.$set(t.data.billing,"num_of_month",a)},expression:"data.billing.num_of_month"}}),e("label",{staticStyle:{"font-size":"13px","margin-top":"10px"}},[t._v("Total Tagihan"),e("span",{staticStyle:{color:"red"}},[t._v(" *")])]),e("h2",[t._v(t._s(t.formatRupiah(t.data.billing_price)))]),e("base-button",{staticClass:"w-100 mt-2",attrs:{type:"success"},on:{click:function(a){return t.pay(t.data.billing_price)}}},[t._v("Bayar Tagihan")]),e("base-button",{staticClass:"w-100 mt-2",attrs:{type:"danger"},on:{click:function(a){return t.$router.go(-1)}}},[t._v("Batal")])]],2)],1)])},n=[],i=(e("d3b7"),e("ac1f"),e("25f0"),e("1276"),e("0bfe")),r=e("bc3a"),l={data:function(){return{data:"",id:"",month:"",year:""}},methods:{getData:function(t,a,e){var s=this;this.$swal({icon:"warning",title:"Mohon tunggu",text:"Sedang Mengambil data...",allowOutsideClick:!1,showConfirmButton:!1,timerProgressBar:!0,onBeforeOpen:function(){s.$swal.showLoading()}});var n=this,l=i["b"]+"/tv.netAPI/v1/transaction/get.php?id="+t+"&month_select="+a+"&year_select="+e;r.get(l).then((function(t){n.$swal.close(),n.data=t.data,console.log(t)})).catch((function(t){n.$swal("Gagal mengambil data","Terjadi kesalahan mengambil data","error"),console.log(t)}))},pay:function(t){var a=this;this.$swal({icon:"warning",title:"Mohon tunggu",text:"Sedang mengirim data...",allowOutsideClick:!1,showConfirmButton:!1,timerProgressBar:!0,onBeforeOpen:function(){a.$swal.showLoading()}});var e="?id="+this.id+"&month_select="+this.month+"&year_select="+this.year+"&nominal= "+t,s=this,n=i["b"]+"/tv.netAPI/v1/transaction/pay.php"+e;r.get(n).then((function(t){s.$swal("Pembayaran berhasil","Berhasil melakukan pembayaran","success"),console.log(t),s.$router.go(-1)})).catch((function(t){s.$swal("Gagal mengirim data","Terjadi kesalahan mengirim data","error"),console.log(t)}))},formatRupiah:function(t){return Object(i["c"])(t.toString(),"Rp. ")}},created:function(){var t=this.$route.params.customer_id.split("-");this.id=t[0],this.month=t[1],this.year=t[2],this.getData(this.id,this.month,this.year)}},o=l,c=e("2877"),d=Object(c["a"])(o,s,n,!1,null,null,null);a["default"]=d.exports},ec03:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("base-header",{staticClass:"header pb-8 pt-5 pt-lg-8 d-flex align-items-center",staticStyle:{"min-height":"400px","background-image":"url(img/order.jpg)","background-size":"cover","background-position":"center -100px"}},[e("span",{staticClass:"mask bg-gradient-success opacity-8"}),e("div",{staticClass:"container-fluid d-flex align-items-center",staticStyle:{"margin-top":"-30px"}},[e("div",{staticClass:"row mb-4"},[e("div",{staticClass:"col-lg-12 col-md-10"},[e("h1",{staticClass:"display-2 text-white mt-4",staticStyle:{"line-height":"55px"}},[t._v("Daftar "+t._s(t.title))]),e("p",{staticClass:"text-white mt-0 mb-4"},[t._v("Kelola setiap "+t._s(t.title)+" dari laman ini")]),e("router-link",{attrs:{to:t.title+"/add"}},[e("base-button",{staticClass:"mr-3",attrs:{type:"info"}},[t._v("Tambah "+t._s(t.title)+" Baru")])],1),e("base-button",{staticClass:"mr-3 mt-2",attrs:{type:"primary"},on:{click:function(a){return t.refresh()}}},[t._v("Segarkan")])],1)])])]),e("div",{staticClass:"container-fluid mt--7"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("Mastertable",{ref:"table",attrs:{title:t.title,url:t.url}})],1)])])],1)},n=[],i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card shadow",class:"dark"===t.type?"bg-default":""},[e("div",{staticClass:"card-header border-0",class:"dark"===t.type?"bg-transparent":""},[e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"col-lg-12 col-md-12 col-sm-12"},[e("h3",{staticClass:"mb-0",class:"dark"===t.type?"text-white":""},[t._v(" "+t._s(t.title)+" ")])]),e("div",{staticClass:"col-lg-12 col-sm-12 text-right p-0 row",staticStyle:{height:"43px"}},[e("div",{staticClass:"col-md-12 ml-3 mt-2 pb-3"},[e("base-input",{attrs:{placeholder:"Cari "+t.title+" disini...","addon-left-icon":"ni ni-zoom-split-in"},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1)])])]),t.Masterdata!=[]?e("div",{staticClass:"table-responsive"},[e("base-table",{staticClass:"table align-items-center table-flush",class:"dark"===t.type?"table-dark":"",attrs:{"thead-classes":"dark"===t.type?"thead-dark":"thead-light","tbody-classes":"list",perPage:t.perPage,pagination:t.pagination,data:t.filteredData},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.row;return[t._l(s,(function(a){return e("td",{key:a.data},["id"==a.type?e("span",[t._v(" "+t._s(a.data)+" ")]):t._e(),"text"==a.type?e("span",[t._v(" "+t._s(a.data)+" ")]):t._e(),"currency"==a.type?e("span",[t._v(" Rp."+t._s(t.formatRupiah(a.data))+" ")]):t._e(),"date"==a.type?e("span",[t._v(" "+t._s(t.formatTanggal(a.data))+" ")]):t._e(),"badge"==a.type?e("span",[e("span",{class:a.class+" badge-lg",staticStyle:{"font-size":"11px"}},[t._v(t._s(a.data))])]):"badge_radio"==a.type?e("span",[e("badge",{staticClass:"badge-dot mr-4",attrs:{type:a.class}},[e("i",{class:"bg-"+a.class}),e("span",{staticClass:"status"},[t._v(t._s(a.value))])])],1):t._e()])})),e("td",{staticClass:"text-right"},[e("base-dropdown",{staticClass:"dropdown",attrs:{position:"right"}},[e("a",{staticClass:"btn btn-sm btn-icon-only text-light",attrs:{slot:"title",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},slot:"title"},[e("i",{staticClass:"ni ni-bullet-list-67",staticStyle:{color:"#000"}})]),[e("router-link",{attrs:{to:"/master/"+t.title+"/"+s[0].data}},[e("a",{staticClass:"dropdown-item",staticStyle:{color:"#000"}},[t._v("Buka Data")])])]],2)],1)]}}],null,!1,1681063586)},[e("template",{slot:"columns"},[t._l(t.Masterdata.table_header,(function(a){return e("th",{key:a},[t._v(t._s(a))])})),e("th")],2)],2),0==t.filteredData.length?e("p",{staticClass:"mt-4 mb-3",staticStyle:{"font-weight":"bold","text-align":"center"}},[t._v("Data kosong :(")]):t._e()],1):t._e(),e("div",{staticClass:"card-footer d-flex justify-content-end",class:"dark"===t.type?"bg-transparent":""},[e("base-pagination",{attrs:{total:t.filteredData.length,perPage:t.perPage},model:{value:t.pagination,callback:function(a){t.pagination=a},expression:"pagination"}})],1)])},r=[],l=(e("4de4"),e("caad"),e("ac1f"),e("2532"),e("841c"),e("0bfe")),o=e("bc3a"),c={name:"projects-table",props:["type","title","url"],data:function(){return{search:"",pagination:1,perPage:10,Masterdata:[],settings:[]}},methods:{formatRupiah:function(t){return Object(l["c"])(t)},formatTanggal:function(t){return Object(l["d"])(t)},getMasterData:function(t){var a=this,e=this,s=l["b"]+"/tv.netAPI/"+t;this.$swal({icon:"warning",title:"Mohon tunggu",text:"Sedang mengambil data...",allowOutsideClick:!1,showConfirmButton:!1,timerProgressBar:!0,onBeforeOpen:function(){a.$swal.showLoading()}}),o.get(s).then((function(t){console.log(t.data),e.Masterdata=t.data,e.settings=e.Masterdata.settings,e.$swal.close()})).catch((function(t){console.log(t),e.$swal({icon:"error",title:"Proses Gagal",confirmButtonText:"Coba Lagi",text:"Gagal mengambil data, server anda mungkin sedang bermasalah",preConfirm:function(){e.getMasterData(e.url)}})}))}},computed:{filteredData:function(){var t=this;return this.Masterdata.raw_data.filter((function(a){var e=a[t.settings.search_index].data.toLowerCase().includes(t.search.toLowerCase());return e}))}},created:function(){this.getMasterData(this.url)}},d=c,u=e("2877"),p=Object(u["a"])(d,i,r,!1,null,null,null),g=p.exports,m={components:{Mastertable:g},data:function(){return{title:"",url:"",pageData:{Pelanggan:{url:"v1/customer/get.php"},Services:{url:"v1/services/get.php"},Transaksi:{url:"v1/billing/get.php"},User:{url:"v1/user/get.php"}}}},methods:{refresh:function(){this.$refs.table.getMasterData(this.url)}},watch:{"$route.params.selector":function(t){this.url=this.pageData[t].url,this.title=t,this.$refs.table.getMasterData(this.url)}},created:function(){this.title=this.$route.params.selector,this.url=this.pageData[this.title].url}},h=m,b=Object(u["a"])(h,s,n,!1,null,null,null);a["default"]=b.exports}}]);
//# sourceMappingURL=chunk-3b3117d2.c1f9ad71.js.map