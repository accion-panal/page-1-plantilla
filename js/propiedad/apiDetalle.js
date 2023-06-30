import { getPropertiesForId } from "../services/PropertiesServices.js";

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf, validationUF, validationCLP, ufToClp} from "../utils/getExchangeRate.js"

export default async function apiDetalleCall(id, realtorId, statusId, companyId){
    let {data} = await getPropertiesForId(id, realtorId, statusId, companyId );

const response = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

let indicator;

let realtorInfo = data.realtor;

//! transformar valor del uf a int
const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);
//!--
// console.log(id); // Imprimirá "134" si ese es el valor actual del parámetro "id"

let updatedImages = data.images.map(function (image) {
    return image.replace(/\\/g, "//");
});


 //! Imagenes en splide */
 let img = '';
 updatedImages.forEach((image, index) => {
     img += `
         <li class="splide__slide ${index === 0 ? 'active' : ''}">
             <img src="${image || 'img/Sin.png'}" style="height: 600px; width: 100%;" />
         </li>
     `;
 });
 document.getElementById('carrucel-img').innerHTML = img;

 let splide = new Splide('.splide', {
     type: 'fade',
     padding: '5rem',
     rewind: true,
     autoplay: 'play',
 });

 splide.mount();



document.getElementById('datos-prop').innerHTML = 
`<p>${data.operation}</p>
    <p>${data.id}</p>
  `;

 document.getElementById('title-prop').innerHTML = 
`<h4><b>${data?.title || "No registra titulo"}</b></h4> `;

document.getElementById('extra-prop').innerHTML = 
`<h4>UF ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)} / CLP ${validationCLP(data.currency.isoCode) ? parseToCLPCurrency(data?.price): parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</h4>
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
                <span><i class="bx bx-bed fs-4"></i> ${data.bedrooms != null && data.bedrooms != undefined && data.bedrooms != "" ? data.bedrooms : "0"}</span>
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

document.getElementById('realtor-info').innerHTML = `
<div class="position-relative text-center" style="margin-top:96px">
    <img
    src="${data?.realtor.img || "assets/img/Sin.png"}"
    class="rounded-circle w-50"
    alt="Cinque Terre"
    />
</div>
<div class="py-2 d-flex flex-column justify-content-center" id="realtor">
    <div style="color:#fff;" class="text-center" >
        <p><b>Nombre:</b> ${data?.realtor.name} ${data.realtor.lastName} </p>
        <p><b>E-mail:</b> ${data?.realtor.mail || "No registra email"} </p>
        <p><b>Número:</b> ${data.realtor.contactPhone != null && data.realtor.contactPhone != undefined ? data.realtor.contactPhone : "No registra número celular" }</p>

    </div>
</div>
`;

}


document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});

/* apiDetalleCall() */