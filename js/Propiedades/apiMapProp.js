import { getProperties, getPropertiesForCustomUrl} from "../services/PropertiesServices.js";
import { PropertyData, limitDataApi } from "../Data/userId.js";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ';
const map = new mapboxgl.Map({
        
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.680628,-33.469970],
    // projection: 'globe',
    zoom: 9,
    
});

const markers = [];

function limpiarMarcadores(dataMarket) {
    dataMarket.forEach(marker => {
        marker.remove();
    });

    // Vaciar el array
    dataMarket.length = 0;
}


export default async function apiCallMap() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;

    console.log('MAP MAP MAP: ');
    if(markers.length > 0){
        limpiarMarcadores(markers);
    }

    let data;
    let response;
    let filtersUrl = '';

    let storedFiltersUrl = localStorage.getItem('globalFiltersUrl');
    if(storedFiltersUrl){
        filtersUrl = storedFiltersUrl;
    }

    //* el segundo digito es el limit
    response = await getPropertiesForCustomUrl(1, limitDataApi.limitMap, CodigoUsuarioMaestro, 1, companyId, realtorId, filtersUrl);
    //* Guardar el response en el localStorage
    localStorage.setItem('globalResponse', JSON.stringify(response));

    data = response.data;
    


    console.log('data en map: ',data);
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {    
            
                if(data.LngLat === null )return; 

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');
            

                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <span>${data?.title || "No cuenta con titulo"}</span>
                <br>
                <br>
                <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" name="VerDetalle"  class="more d-flex align-items-center float-start" target="_blank">
                <span class="label" >Ver Detalle</span>
                <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>`)

                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';
                // el.style.backgroundImage = `${data.img != null && data.img != '' && data.img != undefined ? data.img : "images/Sin.png"}`;
                // el.style.width = `${50}px`;
                // el.style.height = `${50}px`;
                // el.style.backgroundSize = "100%";
            
                const marker = new mapboxgl.Marker({
                    color: '#000',
                    scale: .8
                })
            
                // create the marker
                // new mapboxgl.Marker(el)
                
                    
                marker.setLngLat(propiedad)
                      .setPopup(popup) // sets a popup on this marker
                      .addTo(map);

                markers.push(marker); // push de marcadores al array markers
                    

            //         map.on('click', (event) => {
            //             // If the user clicked on one of your markers, get its information.
            //             const features = map.queryRenderedFeatures(event.point, {
            //               layers: ['YOUR_LAYER_NAME'] // replace with your layer name
            //             });
            //             if (!features.length) {
            //               return;
            //             }
            //             const feature = features[0];
                      
            //             // Code from the next step will go here.
            //           });
            })
            resolve()
        }
    ) 
    promiseMap.then(()=>{
          
        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })
     

}

