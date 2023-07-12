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


};
loadInformation();