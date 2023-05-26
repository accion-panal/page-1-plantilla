import	{ getRegiones } from  "../services/PropertiesServices.js";
import	{ getCommune } from  "../services/PropertiesServices.js";

const filterSelects = async()=> {
    let {data} = await getRegiones();
    console.log(data);
    let region = document.getElementById('region');

    region.innerHTML = data.regions.map((data, i) => {

        // let regInt =  getRegiones(data.target.value);
        if(i == 0){
            return `
            <option value="0" selected >Región</option>
            <option value="${data.id}">${data.name}</option>
            `;
   
        }else{
            return `
            <option value="${data.id}">${data.name}</option>`;
            
        }
    }).join("");
        region.addEventListener("change", async (data) => {
            let aux = await getCommune(data.target.value);
            document.getElementById("commune").innerHTML = aux.data.map((data) => 
            `<option value="${data.id}">${data.name}</option>`
            );
        });
    
}
filterSelects();