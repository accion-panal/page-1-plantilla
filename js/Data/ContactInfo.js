import { ContactInformation } from "./userId.js";

const loadInformation = () => {
    const dataHorario = ContactInformation.horario;
    console.log(dataHorario)

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

    let horario = document.getElementById('horario-ContactInfo');
    if (horario !== null) {
        horario.innerHTML = dataHorario.map(dataHorario => `
            <div class="row">
                <div class="col-1">
                    <i class="fa fa-clock-o fa-lg text-black-50"p-1"></i>
                </div>
                <div class="col-11">
                    <p class="text-black-50"">
                        ${dataHorario.title}
                    </p>
                </div>
            </div>
        `).join('');
    }
}

loadInformation();