import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf, validationUF} from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
import apiCallMap from "../propiedad/apiMapProp.js"; 

export default async function renderCall() {
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    } 
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        console.log('max-page: ',maxPage);
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if
    console.log('response in render.js',response)

    //* Guardamos el data del response en una variable data 
    let data = response.data;
    console.log('data in render.js',data)

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        console.log('=========== handleFilterChange ===========')
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;
        console.log(selectedValue);
        console.log(data);
        console.log(response);
      
        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        console.log('dataOrdenadaResponse: ',response);
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas</span>`;

    //todo: creacion de la funcion ShowItems
    function showItems() {
        data = data.map(item => {
            // Reemplazar "\\" por "//" en la propiedad "image"
            item.image = item.image.replace(/\\/g, "//");
            return item;
        });
        //* si container-propiedad es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerGrid = document.getElementById('container-propiedad');
        if (containerGrid !== null) {
            document.getElementById("container-propiedad").innerHTML = data.map(data =>`
            <div class="col-sm-4 property mb-3">
            <div class="property-item rounded overflow-hidden">
              <div class="position-relative overflow-hidden" style="height:200px">
                <a href="detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">
                        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="" class="img-fluid">`}
                </a>
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
                    href="detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">
                    ${data.title}</a>
                  <span>Cod: ${data.id}</span>
      
                  <p class="text-center">
                    <i class="bi bi-pin-map"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile
                  </p>
                </div>
                <div class="d-flex">
                  <small class="flex-fill text-center py-2"
                    >UF ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</small
                  >
                  <small class="flex-fill text-center py-2"
                    >CLP ${parseToCLPCurrency(data?.price)}</small
                  >
                </div>
                <div class="p-4 pb-0">
                  <div class="d-flex justify-content-between">
                    <h6><b> ${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"} M²</b></h6>
                    <span><i class='bx bx-bed fs-4'></i>${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms: "0"}</span>
                    <span><i class='bx bx-bath fs-4'></i>${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"}</span>
                    <span><i class='bx bxs-car-garage fs-4'></i>${data.covered_parking_lots != undefined && data.covered_parking_lots != "" && data.covered_parking_lots != "null" && data.covered_parking_lots != null ? data.covered_parking_lots : "0" }</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
             
            `).join("");   
        };

        //* si container-propiedad-list es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerList = document.getElementById('container-propiedad-list');
        if (containerList !== null) {
            document.getElementById("container-propiedad-list").innerHTML = data.map(data =>`
            <div class="col-sm-4 property col-lg-12 mb-3">
            <div class="property-item rounded overflow-hidden flex-row align-items-center">
              <div class="position-relative overflow-hidden"  style="max-width: 50%;>
                <a href="detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">
                ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid ">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid ">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="" class="img-fluid">`}
                </a>
                <div class="bg-dark rounded text-white position-absolute end-0 top-0 m-4 py-1 px-3">
                  ${data.operation}
                </div>
              </div>
              <div class="item-info w-75">
                <div class="p-4 pb-0 card-props">
                  <a class="d-block h6 mb-2 text-uppercase text-center" href="detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">${data.title}</a>
                  <p class="text-center">
                    <i class="bi bi-pin-map"></i> ${data.address != undefined && data.address != "" && data.address != null ? data.address: "No registra dirección"}, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune: "No registra comuna"} , ${data.city != undefined && data.city != "" && data.city != null ? data.city: "No registra ciudad"}, Chile
                  </p>
                </div>
                <div class="d-flex">
                  <small class="flex-fill text-center py-2">UF ${validationUF(data.currency.isoCode) ? data.price : clpToUf(data.price, ufValueAsNumber)}</small>
                  <small class="flex-fill text-center py-2">CLP ${parseToCLPCurrency(data?.price)}</small>
                </div>
                <div class="p-4 pb-0">
                  <div class="d-flex justify-content-between">
                    <h6><b>${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != "null" && data.surface_m2 != null ? data.surface_m2 : "0"}  M²</b></h6>
                    <span><i class="bx bx-bed fs-4"></i> ${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != "null" && data.bedrooms != null ? data.bedrooms : "0"} </span>
                    <span><i class="bx bx-bath fs-4"></i> ${data.bathrooms != undefined && data.bathrooms != "" && data.bathrooms != "null" && data.bathrooms != null ? data.bathrooms : "0"} </span>
                    <span><i class="bx bxs-car-garage fs-4"></i> ${data.covered_parking_lots != undefined && data.covered_parking_lots != "" && data.covered_parking_lots != "null" && data.covered_parking_lots != null ? data.covered_parking_lots : "0"} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `).join("");
        };

      /*   let containerMap = document.getElementById('div-map-section');
        if (containerMap !== null) {
            apiCallMap()
        }; */
    };
}
