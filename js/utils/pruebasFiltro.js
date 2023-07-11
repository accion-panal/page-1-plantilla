/* import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency } from "./getExchangeRate.js";*/
import { PropertyData } from "../Data/userId.js";


localStorage.removeItem('globalQuery');

let query = {
    page: 1,
    limit: 10,
    CodigoUsuarioMaestro:PropertyData.CodigoUsuarioMaestro,
    realtorId: PropertyData.realtorId,
    statusId: 1,
    companyId: PropertyData.companyId,
    operationType: null,
    typeOfProperty: null,
    region: null,
    commune: null,
    min_price: null,
    max_price: null,
    bathrooms: null,
    bedrooms: null,
    covered_parking_lots: null,
    typePrice: null
}


let aux = new URLSearchParams(window.location.search);

for (let p of aux){
    query[`${p[0]}`] = p[1];
}
//!Operacion
document.getElementById("operationType").addEventListener('change', (element) => {
    query.operationType = element.target.value;
    console.log('tipo de operación: ',element.target.value)
})

//! tipo de propiedad
document.getElementById('typeOfProperty').addEventListener('change', (element) => {
    query.typeOfProperty = element.target.value;
    console.log('tipo de propiedad: ',element.target.value)
})
  

//! region
document.getElementById("region").addEventListener("change", (element) => {
    query.region = element.target.value;
    console.log('region: ',element.target.value)
  
    if(element.target.value == 0){
      query.commune = null;
      console.log('commune:', query.commune)
    }
})
  
//! comuna
document.getElementById("commune").addEventListener("change", (element) => {
    query.commune = element.target.value;
    console.log('commune: ',element.target.value)
})
  
//! habitaciones
document.getElementById("bedrooms").addEventListener("change", (element) => {
    query.bedrooms = element.target.value;
    console.log('bedrooms: ',element.target.value)
  
})
  
//! Estacionamientos
document.getElementById("covered_parking_lots").addEventListener("change", (element) => {
    query.covered_parking_lots = element.target.value;
    console.log('covered_parking_lots: ',element.target.value)
  
})
  
//! baños
  document.getElementById("bathrooms").addEventListener("change", (element) => {
    query.bathrooms = element.target.value;
    console.log('bathrooms: ',element.target.value)
})
  
//! tipo de precio
  document.getElementById('inlineRadio1').addEventListener('change', mostrarValorTypePrice);
  document.getElementById('inlineRadio2').addEventListener('change', mostrarValorTypePrice);
  function mostrarValorTypePrice(event) {
    query.typePrice = event.target.value;
    console.log(query.typePrice);
}
  
//! precio minimo
document.getElementById("min_price").addEventListener("change", (element) => {
    // return element.target.value;
    query.min_price = element.target.value;
    console.log('min_price: ',element.target.value)
})
  
//! precio maximo
document.getElementById("max_price").addEventListener("change", (element) => {
    query.max_price = element.target.value;
    console.log('max_price: ',element.target.value)
})


document.getElementById("buscar")?.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log(query);
    /* window.open(
      window.location.origin +
      `/properties.html?page=${query.page}&limit=${query.limit}&CodigoUsuarioMaestro=${query.CodigoUsuarioMaestro}&realtorId=${query.realtorId}&statusId=${query.statusId}&operationType=${query.operationType}&typeOfProperty=${query.typeOfProperty}&region=${query.region}&commune=${query.commune}&min_price=${query.min_price}&max_price=${query.max_price}&covered_parking_lots=${query.covered_parking_lots}&bathrooms=${query.bathrooms}&surface_m2=${query.surface_m2}&bedrooms=${query.bedrooms}`
    ); */
    //* Guardar el response en el globalResponse
    localStorage.setItem('globalQuery', JSON.stringify(query));
    window.open(
      window.location.origin +
      `/propiedad.html`
    );
    /* localStorage.removeItem('globalQuery'); */
});
  