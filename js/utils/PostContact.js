import { PropertyData } from "../Data/userId.js";

const form = document.getElementById('form-contact');

let userCompanyId = PropertyData.companyId;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let firstName = document.getElementById('nombre');
  let email = document.getElementById('email');
  let subject = document.getElementById('sujeto');
  let phone = document.getElementById('phone');
  let message = document.getElementById('mensaje');

  let alertElement = document.querySelector('.alert');
  /* console.log('company id ',userCompanyId) */
  if(firstName.value==='' || email.value==='' || phone.value==='' || subject.value==='' || message.value===''){
    /* console.log('campos vacios') */
    alertElement.textContent = 'Todos los campos son obligatorios';
    alertElement.classList.add('alert-danger');
    alertElement.classList.remove('visually-hidden');
    return;
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
 
  let raw = JSON.stringify({
    "companyId":userCompanyId,
    "name": firstName.value,
    "lastName":"",
    "email": email.value,
    "phone": phone.value,
    "subject": subject.value,
    "message": message.value,
    "termsAndConditions": true,
    "action": "vender",
    "meetingDate":""
  });
 
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  //   redirect: 'follow'
  };
 

  fetch("https://aulen.partnersadvisers.info/contact/", requestOptions)
  .then(response => response.text())
  .then((result) => {
      //Vaciar Inputs
      firstName.value = '';
      email.value = '';
      phone.value = '';
      subject.value = '';
      message.value = '';
      //Mensaje de Alerta : Success
      let alertElement = document.querySelector('.alert');
      alertElement.textContent = 'El mensaje fue enviado con éxito.';
      alertElement.classList.add('alert-success');
      alertElement.classList.remove('visually-hidden');
      setTimeout(function () {
          // Ocultar alerta despues de 5seg
          alertElement.classList.add('visually-hidden');
          alertElement.classList.remove('alert-success');
      }, 5000);
  })
  .catch((error) => {
      //Mensaje de Alerta : Error
      let alertElement = document.querySelector('.alert');
      alertElement.textContent = 'Ocurrio un error al enviar correo.';
      console.log('Error: ', error);
      alertElement.classList.add('alert-danger');
      alertElement.classList.remove('visually-hidden');
      setTimeout(function () {
          // Ocultar alerta despues de 5seg
          alertElement.classList.add('visually-hidden');
          alertElement.classList.remove('alert-danger');
      }, 5000);
  })
})

