import { PropertyData } from "../Data/userId.js";
import apiDetalleCall from "../Propiedades/apiDetalle.js";
const url = window.location.search; 
const value = url.match(/\d+/)[0];
const {companyId,realtorId
} = PropertyData;



apiDetalleCall(value ,realtorId, 1, companyId);