import { ContactFooter } from "./userId.js";

const loadFooterInformation = () => {

    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let address = document.getElementById('address-ContactFooter');
    if (address !== null) {
        address.innerHTML = `${ContactFooter.address}`;
    }

    let phone = document.getElementById('phone-ContactFooter');
    if (phone !== null) {
        phone.innerHTML = `${ContactFooter.phone}`;
    }

    let email = document.getElementById('email-ContactFooter');
    if (email !== null) {
        email.innerHTML = `${ContactFooter.email}`;
    }


    let horarioSemana = document.getElementById('horarioSemana-ContactFooter');
    if (horarioSemana !== null) {
        horarioSemana.innerHTML = `${ContactFooter.horarioSemana}`;
    }

    let horarioFinSemana = document.getElementById('horarioFinSemana-ContactFooter');
    if (horarioFinSemana !== null) {
        horarioFinSemana.innerHTML = `${ContactFooter.horarioFinSemana}`;
    }

}

loadFooterInformation();