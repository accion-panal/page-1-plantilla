import { ContactInformation } from "./userId.js";

const loadInformation = () => {
    localStorage.removeItem('globalQuery');

    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let address = document.getElementById('address-ContactInfo');
    if (address !== null) {
        address.innerHTML = `
            <p class="text-black-50">
                ${ContactInformation.address}
            </p>
            `;
    }

    let phone = document.getElementById('phone-ContactInfo');
    if (phone !== null) {
        phone.innerHTML = `
            <p class="text-black-50">
                ${ContactInformation.phone}
            </p>
            `;
    }

    let email = document.getElementById('email-ContactInfo');
    if (email !== null) {
        email.innerHTML = `
            <p class="text-black-50">
                ${ContactInformation.email}
            </p>
            `;
    }

    let horarioSemana = document.getElementById('horarioSemana-ContactInfo');
    if (horarioSemana !== null) {
        horarioSemana.innerHTML = `
            <p class="text-black-50">
                ${ContactInformation.horarioSemana}
            </p>
            `;
    }

    let horarioFinSemana = document.getElementById('horarioFinSemana-ContactInfo');
    if (horarioFinSemana !== null) {
        horarioFinSemana.innerHTML = `
        <p class="text-black-50">
            ${ContactInformation.horarioFinSemana}
        </p>
        `;
    }
}

loadInformation();