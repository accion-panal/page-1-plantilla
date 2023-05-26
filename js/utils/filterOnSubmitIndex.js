import { getProperties } from "../services/PropertiesServices.js"


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

document.getElementById("operationType").value = query.operationType;
document.getElementById("typeOfProperty").value = query.typeOfProperty;
document.getElementById("region").value = query.region;
document.getElementById("commune").value = query.commune;
document.getElementById("min_price").value = query.min_price;
document.getElementById("max_price").value = query.max_price;
document.getElementById("bathrooms").value = query.bathrooms;
document.getElementById("bedrooms").value = query.bedrooms;
document.getElementById("covered_parking_lots").value = query.covered_parking_lots;

if (document.getElementById('buscar2') !== null ){
  document.getElementById('buscar2').click();

}else{
    console.log("Error en filtros index")
}