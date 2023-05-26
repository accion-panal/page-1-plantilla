import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

export default async function apiCall() {
  const response = await getProperties(1, 10, 0, 1, 1);
  const data = response.data;

  const buttons = document.getElementById("buttons");

  let btnNext;
  let btnPrev;

  console.log(data);

  const response2 = await ExchangeRateServices.getExchangeRateUF();
  const ufValue = response2?.UFs[0]?.Valor;
  const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

  const filtroSelect = document.getElementById('FilterPrice');
  filtroSelect.addEventListener('change', handleFilterChange);
  showItems();

  function handleFilterChange() {
    const selectedValue = filtroSelect.value;
    console.log(selectedValue);
    console.log(data);
  
    let dataOrdenada;
  
    if (selectedValue === 'MayorMenor') {
      /* console.log('La opción seleccionada es MayorMenor'); */
      dataOrdenada = data.sort((a, b) => b.price - a.price);
    } else {
      /* console.log('La opción seleccionada es Menor mayor'); */
      dataOrdenada = data.sort((a, b) => a.price - b.price);
    }
    console.log(dataOrdenada);
    showItems();
  }

  document.getElementById(
    "total-prop"
  ).innerHTML = `<div>${response.meta.totalItems} Propiedades encontradas
	</div>`;

  function showItems() {
    document.getElementById("container-propiedad").innerHTML = data.map(
    (data) =>
      `<div class="col-sm-4 property mb-3">
      <div class="property-item rounded overflow-hidden">
        <div class="position-relative overflow-hidden">
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
              class="d-block h6 mb-2 text-uppercase text-center"
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
        `
  ).join("");
 
  

  document.getElementById("container-propiedad-list").innerHTML = data
    .map(
      (data) => `
      <div class="col-sm-4 property col-lg-12 mb-3">
      <div class="property-item rounded overflow-hidden flex-row align-items-center">
        <div class="position-relative overflow-hidden">
          <a href="detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}"><img class="img-fluid" src="./assets/img/properties/property-1.jpg" alt=""></a>
          <div class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3">
            ${data.operation}
          </div>
        </div>
        <div class="item-info w-75">
          <div class="p-4 pb-0 card-props">
            <a class="d-block h6 mb-2 text-uppercase text-center" href="detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}">${data.title}</a>
            <p class="text-center">
              <i class="bi bi-pin-map"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile
            </p>
          </div>
          <div class="d-flex">
            <small class="flex-fill text-center py-2">UF ${clpToUf(data.price, ufValueAsNumber)}</small>
            <small class="flex-fill text-center py-2">CLP ${parseToCLPCurrency(data?.price)}</small>
          </div>
          <div class="p-4 pb-0">
            <div class="d-flex justify-content-between">
              <h6><b>${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"}  M²</b></h6>
              <span><i class="bx bx-bed fs-4"></i> ${data.bedroom != undefined && data.bedroom != "" && data.bedroom != "null" && data.bedroom != null ? data.bedroom : "0"} </span>
              <span><i class="bx bx-bath fs-4"></i> ${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"} </span>
              <span><i class="bx bxs-car-garage fs-4"></i> ${data.covered_parking_lots != undefined && data.covered_parking_lots != "" && data.covered_parking_lots != "null" && data.covered_parking_lots != null ? data.covered_parking_lots : "0"} </span>
            </div>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("");
  }
  
}


