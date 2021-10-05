window.addEventListener('load', function () {


    //Buscamos los campos a los cuales les vamos a aplicar el texto del error
    let errorName  = document.querySelector('.textErrorName');
    let errorApe1  = document.querySelector('.textErrorApe1');
    let errorApe2  = document.querySelector('.textErrorApe2');
    let errorMail  = document.querySelector('.textErrorMail');
    let errorPass  = document.querySelector('.textErrorPass');
    let errorImg   = document.querySelector('.textErrorImg');


    let e = document.getElementById("opciones");


    //Buscamos los elementos a los que vamos a darle funcionaliad 
    //let btnSubmit = document.getElementById('btnSubmit');
    let inputName = document.querySelector('input.controlName');
    let inputLN1 = document.querySelector('input.controlLN1');
    let inputLN2 = document.querySelector('input.controlLN2');
    let inputEmail = document.querySelector('input.controlEmail');
    let inputPass = document.querySelector('input.controlPass');

    let registerForm = document.querySelector('form.formulario');



    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let errores = {}

        //Volvemos a dejar textos en blanco
        errorPass.innerText = ""
        errorMail.innerText = ""
        errorApe2.innerText = ""
        errorApe1.innerText = ""
        errorName.innerText = ""
        errorImg.innerText  = ""

        //Regresamos valores por defecto
        inputName.style.borderColor = "black";
        inputLN1.style.borderColor = "black";
        inputLN2.style.borderColor = "black";
        inputEmail.style.borderColor = "black";
        inputPass.style.borderColor = "black";


        let band1, band2, band3, band4, band5, band6, band7
        band1, band2, band3, band4, band5, band6, band7 = false;

        if (inputName.value.length < 2) {
            errores.name = 'Debe tener al menos dos caracteres'
            band1 = true;
        }
        if (inputLN1.value.length < 2) {
            errores.lastName1 = 'Debe tener al menos dos caracteres'
            band2 = true;
        }
        if (inputLN2.value.length < 2) {
            errores.lastName2 = 'Debe tener al menos dos caracteres'
            band3 = true;
        }
        if (ValidateEmail(inputEmail)) {
            errores.email = 'Formato de e-mail incorrecto'
            band4 = true;
        }
        if (inputPass.value.length < 8) {
            errores.pasword = 'La contraseña debe tener al menos 8 caracteres'
            band5 = true;
        }

        /*
        var strOp = document.getElementById("opciones").value;
        console.log(strOp)
        if(strOp != "Administrador" || strOp != "Cliente"){
            errores.opcion = "Debes de elegir un rol para el usuario";
            band6 = true;
        }*/

        //Validar que suba un formato de imagen correcto
        let verifica = false
        verifica = fileValidation()
        if(verifica){
            errores.file = "Sube un archivo con las siguientes extensiones: .jpeg/.jpg/.png/.gif "
            band7 = true;
        }

        if (Object.keys(errores).length >= 1) {

            if (band1) {
                inputName.style.borderColor = "red";
                inputName.style.backgroundColor = "rgba(220,0,26,0.1";
                errorName.innerText = errores.name;

            } else {
                inputName.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band2) {
                inputLN1.style.borderColor = "red";
                inputLN1.style.backgroundColor = "rgba(220,0,26,0.1";
                errorApe1.innerText = errores.lastName1;
            } else {
                inputLN1.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band3) {
                inputLN2.style.borderColor = "red";
                inputLN2.style.backgroundColor = "rgba(220,0,26,0.1";
                errorApe2.innerText = errores.lastName2;
            } else {
                inputLN2.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band4) {
                inputEmail.style.borderColor = "red";
                inputEmail.style.backgroundColor = "rgba(220,0,26,0.1";
                errorMail.innerText = errores.email;
            } else {
                inputEmail.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band5) {
                inputPass.style.borderColor = "red";
                inputPass.style.backgroundColor = "rgba(220,0,26,0.1";
                errorPass.innerText = errores.pasword;
            } else {
                inputPass.style.backgroundColor = "rgba(30,215,96,0.1";
            }

        } else {
            registerForm.submit();
        }
    })

    //Validar que un email es válido
    function ValidateEmail(input) {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (input.value.match(validRegex)) {
            return false;
        } else {
            return true;
        }

    }

    function fileValidation() {
        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        if(fileInput.files.length == 0 ){
            return false
        }else{
            if (!allowedExtensions.exec(filePath)) {
                fileInput.value = '';
                return true;
            } else {
                return false;
            }
        }
    }
      


})