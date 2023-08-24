import { PropertyData } from '../Data/userId.js';

localStorage.removeItem('globalQuery');
localStorage.removeItem('LimitProp');

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
  typePrice: null,
  surface_m2:null
}

//! Operation type
document.getElementById('operationType').addEventListener('change', (element) => {
  query.operationType = element.target.value;
  console.log('operation Type: ',element.target.value)
})

//! tipo de propiedad
document.getElementById('typeOfProperty').addEventListener('change', (element) => {
  query.typeOfProperty = element.target.value;
  console.log('tipo de propiedad: ',element.target.value)
})

//! region
document.getElementById("regionTextId").addEventListener("change", (element) => {
  query.region = element.target.value;
  console.log('regionTextId: ',element.target.value)

  query.commune = null;
  console.log('communeTextId:', query.commune)
})

//! comuna
document.getElementById("communeTextId").addEventListener("change", (element) => {
  query.commune = element.target.value;
  console.log('communeTextId: ',element.target.value)
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
  console.log('%c==================','color:yellow');
  console.log('%cFilterIndex-Button FilterIndex-Button FilterIndex-Button','color:yellow')
  console.log('Query: ',query);

  //* Guardar el response en el globalResponse
  localStorage.setItem('globalQuery', JSON.stringify(query));

  //* Abrir nueva pestania (propiedad.html)
  window.open(window.location.origin +`/propiedad.html`);

  console.log('%c==================','color:yellow');

});
