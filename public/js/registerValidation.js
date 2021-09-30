window.addEventListener('load', function () {
    console.log("sadggdafkjghalf h aksdjfh dhsdlfkjkdhalkje1");

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

        let band1, band2, band3, band4, band5
        band1, band2, band3, band4, band5 = false;

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

        if (Object.keys(errores).length >= 1) {

            if (band1) {
                inputName.style.borderColor = "red";
                inputName.style.backgroundColor = "rgba(220,0,26,0.1";
            } else {
                inputName.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band2) {
                inputLN1.style.borderColor = "red";
                inputLN1.style.backgroundColor = "rgba(220,0,26,0.1";
            } else {
                inputLN1.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band3) {
                inputLN2.style.borderColor = "red";
                inputLN2.style.backgroundColor = "rgba(220,0,26,0.1";
            } else {
                inputLN2.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band4) {
                inputEmail.style.borderColor = "red";
                inputEmail.style.backgroundColor = "rgba(220,0,26,0.1";
            } else {
                inputEmail.style.backgroundColor = "rgba(30,215,96,0.1";
            }

            if (band5) {
                inputPass.style.borderColor = "red";
                inputPass.style.backgroundColor = "rgba(220,0,26,0.1";
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

    var res_field = document.myform.elements["filefield"].value;
    var extension = res_field.substr(res_field.lastIndexOf('.') + 1).toLowerCase();
    var allowedExtensions = ['doc', 'docx', 'txt', 'pdf', 'rtf'];
    if (res_field.length > 0) {
        if (allowedExtensions.indexOf(extension) === -1) {
            alert('Invalid file Format. Only ' + allowedExtensions.join(', ') + ' are allowed.');
            return false;
        }
    }

})