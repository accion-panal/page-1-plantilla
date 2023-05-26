import { getPropertiesForId } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id, statusId, companyId){
    let {data} = await getPropertiesForId(id, statusId, companyId );

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

let indicator;
let img;


// console.log(id); // Imprimirá "134" si ese es el valor actual del parámetro "id"

data.images.forEach((images, index) => {img +=
    ` <li class="splide__slide ${ index == 0 ? "active" : ""}"> 
        <img src="${images != null && images != "" && images != undefined  ? images : "img/Sin.png"}" style="height:600px;width:100%;"/>
      </li>	
    `
    // indicator += `
    // <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="${index}" ${index == 0 ? "class = active": ""} aria-current="true" aria-label="${index + 1}"></button>
    // `
    })




document.getElementById('carrucel-img').innerHTML = 
`
<li class="splide__slide">${img}</li>
`;

let splide = new Splide(".splide", {
    type: "fade",
    padding: '5rem',
    rewind:true,
    autoplay: "play",
    
});
splide.mount();



document.getElementById('datos-prop').innerHTML = 
`<p>${data.operation}</p>
    <p>${data.id}</p>
  `;

 document.getElementById('title-prop').innerHTML = 
`<h4><b>${data?.title || "No registra titulo"}</b></h4> `;

document.getElementById('extra-prop').innerHTML = 
`<h4>UF ${clpToUf(data.price, ufValueAsNumber)} / CLP ${parseToCLPCurrency(data?.price)}</h4>
<p>${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.region != null && data.region != undefined && data.region != "" ? data.region : "No registra región"}, Chile</p> `;

document.getElementById('caracteristica-prop').innerHTML = 
`<h4>Caracteristicas</h4>
    <thead>
        <tr>
            <th scope="col">Tipo de Propiedad</th>
            <th scope="col">${data.types}</th>
        </tr>
        <tr>
        <th scope="col">Código de propiedad</th>
        <th scope="col">${data.id}</th>
    </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">M²</th>
            <td><b> ${data.surface_m2 != null && data.surface_m2 != undefined && data.surface_m2 != "" ? data.surface_m2 : "0"}</b></td>
        </tr>
        <tr>
            <th scope="row">Habitaciones</th>
            <td>
                <span><i class="bx bx-bed fs-4"></i> ${data.bedroom != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}</span>
            </td>
        </tr>
        <tr>
            <th scope="row">Baños</th>
            <td>
                <span><i class='bx bx-bath fs-4'></i> ${data.bathrooms != null && data.bathrooms != undefined && data.bathrooms != "" ? data.bathrooms : "0"}</span>

             </td>
       </tr>
        <tr>
            <th scope="row">Estacionamiento(s)</th>
            <td>
                <span><i class='bx bxs-car-garage fs-4'></i> ${data.covered_parking_lots != null && data.covered_parking_lots != undefined && data.covered_parking_lots != "" ? data.covered_parking_lots : "0"}</span>
            </td>
        </tr>
    </tbody>`;

document.getElementById('descrip-prop').innerHTML = 
`<h5>Descripción</h5>
<p>
${data.description != null && data.description != undefined && data.description != "" ? data.description : "No registra descripción" }
</p> `;

}


document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});

apiDetalleCall()