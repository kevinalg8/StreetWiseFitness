const enviarRegistro = () =>{
    Name = document.getElementById('Name')
    lasName = document.getElementById('lastName')
    numberPhone = document.getElementById('NumberPhone')
    age = document.getElementById('Age')
    dato = document.getElementById('Email');
    pass = document.getElementById('Pass');
    event.preventDefault()
  
    let validName = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]{2,}\s?[a-zA-ZáéíóúñÁÉÍÓÚÑ]{0,}$/u,
        validlasName = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ]{2,}([ ]?[a-zA-ZáéíóúñÁÉÍÓÚÑ]{1,})*$/u,
        validNumber = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/u,
        validAge = /^[1-9][0-9]?$|^100$/u,
        validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
        validPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  
    if (validName.test(Name.value) && validlasName.test(lasName.value) && validNumber.test(numberPhone.value) && validAge.test(age.value) && validEmail.test(dato.value) && validPass.test(pass.value)){
      Swal.fire({
        text:"Registro con exito"
      })
    } else {
      Swal.fire({
        text:"Registro sin exito"
      })
    }
  }
enviarRegistro()
