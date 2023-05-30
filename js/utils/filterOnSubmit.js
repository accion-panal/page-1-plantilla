import { getPropertiesOnForm } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "./getExchangeRate.js";
 

const onFormSubmit = (
    statusId,
    companyId,
    operationType,
    typeOfProperty,
    region,
    commune,
    min_price,
    max_price,
    bathrooms,
    bedrooms,
    covered_parking_lots
  ) => {
    return getPropertiesOnForm(
      statusId,
      companyId,
      operationType,
      typeOfProperty,
      region,
      commune,
      min_price,
      max_price,
      bathrooms,
      bedrooms,
      covered_parking_lots 
    );
  };

  let query = {
    page:1,
    limit:10,
    realtorId: 0,
    statusId:1,
    companyId:1,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    covered_parking_lots: "",
  }

  let aux = new URLSearchParams(window.location.search);

  for (let p of aux) {
    query[`${p[0]}`] = p[1];
  }



  
document.getElementById('operationType').addEventListener('change',(element) =>{
    console.log(element.target.value)
    query.operationType = element.target.value;
    // const _operationType = operationType.length > 0 ? operationType : false;
    // return element.target.value;
    
 })
 document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
    // return element.target.value;
})
document.getElementById("region").addEventListener( "change", (element) => {
 query.region = parseInt(element.target.value);  
 console.log(element.target.value)
//  console.log(typeof query.region)
// return element.target.value;
})
document.getElementById("commune").addEventListener( "change", (element) => {
    query.commune =  element.target.value;
    console.log(element.target.value)
  
    // return element.target.value;

  })

 document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
     query.min_price = element.target.value;
})
  
 document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})
  
 document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
     query.bedrooms =  element.target.value;
  
  })
  
// document.getElementById("surface_m2").addEventListener( "change", (element) => {
//      query.surface_m2= element.target.value;
  
//})

document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})


document.getElementById("buscar")?.addEventListener("click", async () => {
	window.open(
		window.location.origin +
			`/propiedad.html?page=${query.page}&limit=${query.limit}&realtorId=${query.realtorId}&statusId=${query.statusId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&bedrooms=${query.bedrooms}`
	);
});




 document.getElementById('buscar2')?.addEventListener('click', async() => {
  console.log('buscando');
  document.getElementById(
		"buscar2"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;
	// let  response  = await getProperties(0,1,1);
  // const data = response.data;
  let filtred = await onFormSubmit(
    1,
    1,
    query?.operationType,
    query?.typeOfProperty,
    query?.region,
    query?.commune,
    query?.min_price,
    query?.max_price,
    query?.bathrooms,
    query?.bedrooms,
    query?.covered_parking_lots
    )    

  
  const response2= await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor


  const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));
  console.log(filtred);
	document.getElementById("total-prop").innerHTML = `<div>${filtred.meta.totalItems} Propiedades encontradas
	</div>`;
	setTimeout(() => {
		document.getElementById("buscar2").innerHTML = `Buscar`;
		window.scroll({
			top: 500,
			behavior: "smooth",
		});
   

  document.getElementById("container-propiedad").innerHTML = filtred.data.map((data) => 
        `<div class="col-sm-4 property mb-3" style="max-height:500px !important;">
            <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden" style="height:200px">
                    <a href="detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">
                        <img
                        class="img-fluid"
                        src="${data.image != undefined && data.image != "" && data.image != null ? data.image : "assets/img/Sin.png"}"
                        alt=""
                    /></a>
                <div
                    class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3"
                >
                    ${data.operation}
                </div>
                </div>
                <div class="item-info">
                <div class="p-4 pb-0 card-props">
                    <a
                    class="d-block h6 mb-2 text-uppercase text-center textLimitClass"
                    href="detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"
                    >${data.title}</a>
                    <span>Cod: ${data.id}</span>

                    <p class="text-center">
                    <i class="bi bi-pin-map"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile
                    </p>
                </div>
                <div class="d-flex">
                    <small class="flex-fill text-center py-2"
                    >UF ${clpToUf(data.price, ufValueAsNumber)}</small
                    >
                    <small class="flex-fill text-center py-2"
                    >CLP ${parseToCLPCurrency(data?.price)}</small
                    >
                </div>
                <div class="p-4 pb-0">
                    <div class="d-flex justify-content-between">
                    <h6><b> ${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"} M²</b></h6>
                    <span><i class='bx bx-bed fs-4'></i>${data.bedroom != undefined && data.bedroom != "" && data.bedroom != "null" && data.bedroom != null ? data.bedroom : "0"}</span>
                    <span><i class='bx bx-bath fs-4'></i>${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</span>
                    <span><i class='bx bxs-car-garage fs-4'></i>${data.covered_parking_lots != undefined && data.covered_parking_lots != "" && data.covered_parking_lots != "null" && data.covered_parking_lots != null ? data.covered_parking_lots : "0" }</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `).join("");
	}, 3000);
  
})
