import { getProperties} from "../services/PropertiesServices.js";



export default async function apiCallMap() {


    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
    const map = new mapboxgl.Map({

        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.680628,-33.469970],
        // projection: 'globe',
        zoom:5,

    });

    let {data} = await getProperties(1, 10, 0, 1, 1);
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {

                if(data.LngLat === null )return;

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');


                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <span>${data.title}</span>
                <br>
                <br>
                <a href="/detalle_propiedad.html?${data.id}&realtorId=${0}&statusId=${1}&companyId=${1}" name="VerDetalle"  class="more d-flex align-items-center float-start">
                <span class="label" >Ver Detalle</span>
                <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>`)

                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';


                new mapboxgl.Marker({
                    color: '#04B0C3',
                    scale: .8
                })

           


                    .setLngLat(propiedad)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
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


