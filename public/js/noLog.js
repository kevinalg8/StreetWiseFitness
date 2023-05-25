const enviarFormulario = () =>{
  dato = document.getElementById('Email');
  pass = document.getElementById('Pass');
  event.preventDefault();
/*
Expresion regular para validar un Email
https://www.coderbox.net/blog/validar-email-usando-javascript-y-expresiones-regulares/
Expresion regular para validar una contraseñaa
https://www.techiedelight.com/es/validate-password-java/
*/

  let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
      validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  if (validEmail.test(dato.value) && validPass.test(pass.value)) {
    Swal.fire({
      text:"Bienvenido"
    })
  } else {
    Swal.fire({
      text:"Campos Invalidos"
    })
  }
}
enviarFormulario()


