import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

export default async function apiCallMenorAMayor() {
    const response = await getProperties(1, 10, 0, 1, 1);
    const data = response.data;

}