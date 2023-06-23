import { getPagination } from "../services/PropertiesServices.js";
import renderCall from "../propiedad/render.js";
import { limitDataApi } from "../Data/userId.js";

export default async function paginationCall() {
    /* Paginado */

    //* Inicializar variable
    let countPage = 1;
    let response;
    let data;

    let prefixUrl = 'https://aulen.partnersadvisers.info/properties?';

    let storedCountPage = localStorage.getItem('countPage');
    let maxPage;


    //* Conseguir la pagina maxima
    let storedLimitPages = localStorage.getItem('LimitPages');
    if (storedLimitPages) {
        maxPage = JSON.parse(storedLimitPages);
    }

     

    console.log('storedCountPage: ',storedCountPage)
    if(storedCountPage && storedCountPage > 1){
        countPage = storedCountPage;
    };

    function removeUrlPrefix(url, prefix) {
        return url.replace(prefix, '');
    }
    function removeUrlRepeat(url,countPages) {
        /* return url.replace(/&page=1&limit=2/, ''); */
        let regex = new RegExp(`&page=${countPages}&limit=${limitDataApi.limit}`);
        return url.replace(regex, '');
    }
    function removeUrlRepeat2(url,countPages) {
        /* return url.replace(/&page=1&limit=2/, ''); */
        let regex = new RegExp(`&limit=${limitDataApi.limit}&page=${countPages}`);
        return url.replace(regex, '');
    }
    function disabledButton(){
        let nextButton = document.getElementById('nextButton');
        nextButton.disabled = true;
        let prevButton = document.getElementById('prevButton');
        prevButton.disabled = true;
    }
    function activeButton(){
        let nextButton = document.getElementById('nextButton');
        nextButton.disabled = false;
        let prevButton = document.getElementById('prevButton');
        prevButton.disabled = false;
    }
    
    //todo: Ejecucion si se presiona el boton Next
    async function handleNextPage() {
        document.getElementById("current-pagination").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
        disabledButton();

        let currentPage = countPage;
        console.log('storedCountPage: ',storedCountPage)
        

        //* rescatar la informacion del localStorage
        let storedGlobalResponse = localStorage.getItem('globalResponse');
        if (storedGlobalResponse) {
            response = JSON.parse(storedGlobalResponse);
        }

        console.log('response Pagination: ',response);

        data = response.data;
        
        console.log('data Pagination: ',data);
        console.log('meta Pagination: ',response.meta);



        //! rescatar nextPageUrl y validar que no sea null
        let nextUrl = response.meta.nextPageUrl;
        console.log(nextUrl)
        if(nextUrl === null){
            console.log('nextUrl es null')
            activeButton();
            document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
            return;
        }

        countPage = parseInt(countPage, 10);
        countPage += 1;
        console.log('currentPage',currentPage);
        nextUrl = removeUrlRepeat(nextUrl,currentPage);
        nextUrl = removeUrlRepeat2(nextUrl,currentPage);
        console.log(nextUrl)

        nextUrl = removeUrlPrefix(nextUrl, prefixUrl);
        console.log(nextUrl) //limit=2&page=2&CodigoUsuarioMaestro=0&realtorId=0&statusId=1&companyId=1

        //* peticion al propertiesServices
        let response2 = await getPagination(nextUrl);
        console.log('newResponse: ',response2);

        //* guardar nuevo response y la pagina actual al localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response2));
        localStorage.setItem('countPage', JSON.stringify(countPage));
        //* llamar al render
        renderCall();

        //* Actualizar el numero de la pagina actual
        document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
        activeButton();
        /* document.getElementById("nextPageId").innerHTML = `<button id='nextButton' class="page-link" href="#">Next</button>`; */
    }

    //todo: Ejecucion si se presiona el boton Previus
    async function handlePrevPage() {
        document.getElementById("current-pagination").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
        disabledButton();
        let currentPage = countPage;
        console.log('storedCountPage: ',storedCountPage)
        if (countPage === 1) {
            console.log('pagina minima 1');
            activeButton();
            document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
            return;
        }

        countPage = parseInt(countPage, 10);
        countPage -= 1;

        //* rescatar la informacion del localStorage
        let storedGlobalResponse = localStorage.getItem('globalResponse');
        if (storedGlobalResponse) {
            response = JSON.parse(storedGlobalResponse);
        }

        console.log('response Pagination: ',response);
        data = response.data;

        console.log('data Pagination: ',data);
        console.log('meta Pagination: ',response.meta);

        console.log(data.length)

        //! rescatar nextPageUrl y validar que no sea null
        let previousUrl = response.meta.previousPageUrl;
        console.log(previousUrl)
        if(previousUrl === null){
            console.log('previousUrl es null')
            activeButton();
            document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
            return;
        }


        console.log('currentPage',currentPage);
        previousUrl = removeUrlRepeat(previousUrl,currentPage);
        previousUrl = removeUrlRepeat2(previousUrl,currentPage);
        console.log(previousUrl)

        previousUrl = removeUrlPrefix(previousUrl, prefixUrl);
        console.log(previousUrl) //limit=2&page=2&CodigoUsuarioMaestro=0&realtorId=0&statusId=1&companyId=



        //* peticion al propertiesServices
        let response2 = await getPagination(previousUrl);
        console.log('newResponse: ',response2);

        //* guardar nuevo response al localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response2));
        localStorage.setItem('countPage', JSON.stringify(countPage));
        //* llamar al render
        renderCall();

        document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
        activeButton();
    }
    console.log(countPage);

    let pagination = document.getElementById('pagination-col');
    if (pagination !== null) {
        pagination.innerHTML = `
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center pagination-style">
                    <li class="page-item" id="prevPageId">
                        <button id='prevButton' class="page-link" href="#">⮜</button>
                    </li>
                    <li class="page-item disabled"><a id='current-pagination' class="page-link" href="#">1</a></li>
                    <li class="page-item" id="nextPageId">
                        <button id='nextButton' class="page-link" href="#">⮞</button>
                    </li>
                </ul>
            </nav>
    `};


    let currentPaginations = document.getElementById("current-pagination");
    if(currentPaginations !== null){
        document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
    }
    
    if(storedCountPage && storedCountPage > 1){
        document.getElementById("current-pagination").innerHTML = countPage+' / '+maxPage;
    };

    const nextButton = document.getElementById('nextButton');
    if(nextButton !== null){
        nextButton.addEventListener('click', handleNextPage);
    }
    const prevButton = document.getElementById('prevButton');
    if(prevButton !== null){
        prevButton.addEventListener('click', handlePrevPage);
    }
    
    

};