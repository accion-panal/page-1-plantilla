import { getProperties } from "../services/PropertiesServices.js"

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData } from "../Data/userId.js";


export default async function apiDestCall() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let {data} = await getProperties(1, 10, CodigoUsuarioMaestro, 1, companyId, realtorId);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted  != false );
    console.log(filtrado);

    filtrado = filtrado.map(item => {
      // Reemplazar "\" por "//" en la propiedad "image"
      item.image = item.image.replace(/\\/g, "//");
      return item;
    });

    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

      document.getElementById('container-prop-destacada').innerHTML = filtrado.map(data => 
          `<li class="splide__slide">
           <div style="display:flex;justify-content:center">
            <div class="col-sm-4 property mb-3" style="width:390px;height:620px !important;margin: 0 1px 0 0">
              <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden" style="height:285px">
                  <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" target="_blank">
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
                      href="detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${1}" target="_blank"
                      >${data?.title || "No cuenta con titulo"}</a>
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
                      <span><i class='bx bx-bed fs-4'></i>${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms : "0"}</span>
                      <span><i class='bx bx-bath fs-4'></i>${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</span>
                      <span><i class='bx bxs-car-garage fs-4'></i>${data.covered_parking_lots != undefined && data.covered_parking_lots != "" && data.covered_parking_lots != "null" && data.covered_parking_lots != null ? data.covered_parking_lots : "0" }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </li>`
          ).join('');

          let splide = new Splide(".splide", {
            type: "loop",
            drag :"free",
            autoplay: "play",
            perPage: 3,
            breakpoints: {
              1399: {
                perPage: 2,
              },
              991: {
                perPage: 1,
              }
            }
        });
        splide.mount();
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	// let splideList = new Splide(".splide");
	// splideList.mount();
	splide.mount();
});