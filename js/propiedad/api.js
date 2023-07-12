import renderCall from "./render.js";
import { PropertyData, limitDataApi } from "../Data/userId.js";
import { getRegiones, getCommune, getPropertiesForCustomUrl } from "../services/PropertiesServices.js";

export default async function apiCall() {
  const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
  let { data } = await getRegiones();

  let response;
  let storedGlobalQuery = localStorage.getItem('globalQuery');
  if (storedGlobalQuery) {
    response = JSON.parse(storedGlobalQuery);
    console.log('api :',response)
  }

  console.log('response api: ',response);

  if(response != undefined){
      // hacer consulta a la api
      let operation = (response.operationType !== undefined && response.operationType !== null && response.operationType !== '') ? '&operationType=' + response.operationType : '';

      let typeOfProperty = (response.typeOfProperty !== undefined && response.typeOfProperty !== null && response.typeOfProperty !== '') ? '&typeOfProperty=' + response.typeOfProperty : '';
      // let nameRegion = (nameRegion !== undefined && nameRegion !== '') ? '&region=' + nameRegion : '';
      // let commune = (commune !== undefined && commune !== '') ? '&commune=' + commune : '';
      let bedrooms = (response.bedrooms !== undefined && response.bedrooms !== null && response.bedrooms !== '') ? '&bedrooms=' + response.bedrooms : '';
      let bathrooms = (response.bathrooms !== undefined && response.bathrooms !== null && response.bathrooms !== '') ? '&bathrooms=' + response.bathrooms : '';
      let parkingLots = (response.covered_parking_lots !== undefined && response.covered_parking_lots !== null && response.covered_parking_lots !== '') ? '&covered_parking_lots=' + response.covered_parking_lots : '';
      let minPrice = (response.min_price !== undefined && response.min_price !== null && response.min_price !== '') ? '&min_price=' + response.min_price : '';
      let maxPrice = (response.max_price !== undefined && response.max_price !== null && response.max_price !== '') ? '&max_price=' + response.max_price : '';


      let regionData = '';
      let nameRegion = '';
      let commune = '';

      if(response.region !== undefined && response.region !== null && response.region !== ''){
        regionData = data.regions.find(region => region.id == response.region);
        nameRegion = `&region=`+regionData.name;
        if(response.commune !== undefined && response.commune !== null && response.commune !== ''){
          let aux = await getCommune(response.region);
          const communeData = aux.data.find(commune => commune.id == response.commune);
          commune = `&commune=`+communeData.name;
        }
      }
      


      let urlFilters = operation+typeOfProperty+bedrooms+bathrooms+parkingLots+minPrice+maxPrice+nameRegion+commune;
      console.log('urlFilters: ',urlFilters)
      let response2 = await getPropertiesForCustomUrl(1,limitDataApi.limit,CodigoUsuarioMaestro,1,companyId,realtorId,urlFilters);
      localStorage.setItem('globalResponse', JSON.stringify(response2));

  }else{
    localStorage.removeItem('globalResponse');
  }

  renderCall();
}
  