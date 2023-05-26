// import { getProperties } from "../services/PropertiesServices.js";

let query = {
    page:1,
    limit:10,
    realtorId:0,
    statusId: 1,
    companyId : 1,
    price_min: 0,
    price_max: 999999999,
    price:"",

};

    const priceMaximo = 999999999;

    function filtrarDeMayorAMenor(maxValor) {
        const response = query.filter(query => query.price <= maxValor)
        // const elementosFildatrados2 = elementos.filter(elemento => elemento.valor <= maxValor);
        response.sort((a, b) => b.price_max - a.price_min );
        return response;
        
    }

    function mayorAmenor(){
        const response = filtrarDeMayorAMenor(priceMaximo);
        return console.log(response);
        }

        
