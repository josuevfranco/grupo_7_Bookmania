window.addEventListener('load', function () {


    //Buscamos los campos a los cuales les vamos a aplicar el texto del error
    let errorMail = document.querySelector('.textErrorMail');
    let errorPass  = document.querySelector('.textErrorPass');


    //Buscamos los elementos a los que vamos a darle funcionaliad 
    let inputEmail = document.querySelector('input.controlEmail');
    let inputPass = document.querySelector('input.controlPass');

    let registerForm = document.querySelector('form.formulario');



    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let errores = {}

        //Volvemos a dejar textos en blanco
        errorPass.innerText = ""
        errorMail.innerText = ""

        //Regresamos valores por defecto
        inputEmail.style.borderColor = "black";
        inputPass.style.borderColor = "black";


        let band1, band2
        band1, band2 = false;

        if (ValidateEmail(inputEmail)) {
            errores.email = 'Formato de e-mail incorrecto'
            band1 = true;
        }
        if (inputPass.value.length < 8) {
            errores.pasword = 'La contraseña debe tener al menos 8 caracteres'
            band2 = true;
        }

        if (Object.keys(errores).length >= 1) {

            if (band1) {
                inputEmail.style.borderColor = "red";
                inputEmail.style.backgroundColor = "rgba(220,0,26,0.1";
                errorMail.innerText = errores.email;
            } else {
                inputEmail.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band2) {
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

})