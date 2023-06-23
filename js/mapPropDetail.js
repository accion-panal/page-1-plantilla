import { PropertyData } from "./Data/userId.js";
import apiCallMapDetail from "./propiedad/apiMapDetalle.js";

const url = window.location.search; 
const value = url.match(/\d+/)[0];
const {companyId,realtorId
} = PropertyData;

apiCallMapDetail(value,realtorId, 1, companyId);