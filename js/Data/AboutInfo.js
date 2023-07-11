import { AboutInformation } from "./userId.js";
import { AboutHead } from "./userId.js";

const loadInformation = () => {
    localStorage.removeItem('globalQuery');
    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let mision = document.getElementById('mision-info');
    if (mision !== null) {
        mision.innerHTML = `
            <h2 style="font-size: 1.5em;"><b>MISIÓN</b></h2>
            <p>
                ${AboutInformation.mision}
            </p>
            `;
    }

    /* LLENAR INFORMACION DE VISION */
    /* REGION: rescatar value por su id */
    let vision = document.getElementById('vision-info');
    if (vision !== null) {
        vision.innerHTML = `
            <h2 style="font-size: 1.5em;"><b>VISIÓN</b></h2>
            <p>
                ${AboutInformation.vision}
            </p>
            `;
    }



    /* IMAGEN DE VISION Y MISION*/
    let imageVisionMision = document.getElementById('ImageVisionMision');
    if (imageVisionMision !==null){
        imageVisionMision.innerHTML = `
        <img src='${AboutInformation.imageVisionMision}' style='width:100%; max-width:max-content;'/>
        `;
    }




    /* IMAGEN DE QUIENES SOMOS */
    let HeadAbout = document.getElementById('About-head');
    if (HeadAbout !==null){
        HeadAbout.innerHTML = `
        <img src='${AboutHead.imageHead}' style='width:100%; max-width:max-content;'/>
        `;
    }

    
   /* Parrafos del head de quienes somos*/
    let Text1 = document.getElementById('Text1');
    if (Text1 !==null){
        Text1.innerHTML = `
        <p>
        ${AboutHead.text1}
        </p>
        `;
    }

    let Text2 = document.getElementById('Text2');
    if (Text2 !==null){
        Text2.innerHTML = `
        <p>
        ${AboutHead.text2}
        </p>
        `;
    }

    let Text3 = document.getElementById('Text3');
    if (Text3 !==null){
        Text3.innerHTML = `
        <p>
        ${AboutHead.text3}
        </p>
        `;
    }

}

loadInformation();