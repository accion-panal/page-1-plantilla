import { servicesInformation } from "./userId.js";

const loadInformation =()=>{
    localStorage.removeItem('globalQuery');
    const { cards } = servicesInformation;

    /* LLENAR INFORMACION DE Cards*/
    let card = document.getElementById('card-info');
    if (card !== null) {
        card.innerHTML = cards.map((data)=>`
            <div
            class="col-lg-3 col-md-6 collapsed service-card"
            data-aos="fade-up"
            data-aos-delay="100"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#content"
            aria-expanded="false"
            aria-controls="collapse"
            >
                <div class="service-item position-relative">
                    <div class="icon">
                        ${data.icon}
                    </div>
                    <h3 style="text-align: center;">${data.title}</h3>
                </div>
            </div>
        `).join('');
    };

    /* LLENAR INFORMACION DE Form publica con nosotros */
/*     let leftForm = document.getElementById('left-form');
    if (leftForm !== null) {
        leftForm.innerHTML = `
            <img src=${servicesInformation.bgImage} alt="lemurs" class="bg-imagex" />
            <div class="contact-info  ctb p-2 ">
                <div class="row pb-5 pt-5 " style="margin-left: 5%;margin-right: 5%;" >
                    <div class="col-12  p-2">
                        <h1 class="p-2"style="border-left: 2px solid black;">${servicesInformation.formTitle}</h1>
                    </div>
                </div>
            </div>
        `;
    }
    let descForm = document.getElementById('desc-form');
    if (descForm !== null) {
        descForm.innerHTML = `${servicesInformation.formDesc}`;
    } */

    /* LLENAR INFORMACION DE Asesoria bancaria */
/*     let leftAsesoria = document.getElementById('left-asesoria');
    if (leftAsesoria !== null) {
        leftAsesoria.innerHTML = `
            <img src=${servicesInformation.bgImage} alt="lemurs" class="bg-imagex" />
            <div class="contact-info  ctb p-2 ">
                <div class="row pb-5 pt-5 " style="margin-left: 5%;margin-right: 5%;" >
                    <div class="col-12  p-2" style="width: 200px;">
                        <h1 class="p-2"style="border-left: 2px solid black;">${servicesInformation.titleInfo}</h1>
                    </div>
                </div>
            </div>
        `;
    } */
/*     let descAsesoria = document.getElementById('desc-asesoria');
    if (descAsesoria !== null) {
        descAsesoria.innerHTML = `${servicesInformation.descInfo}
        `;
    }
 */

};
loadInformation();