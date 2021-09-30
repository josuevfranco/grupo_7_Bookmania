window.addEventListener('load', function () {
    console.log("sadggdafkjghalf h aksdjfh dhsdlfkjkdhalkje1");

    //Buscamos los elementos a los que vamos a darle funcionaliad 
    //let btnSubmit = document.getElementById('btnSubmit');
    let inputName = document.querySelector('input.controlName');

    let registerForm = document.querySelector('form.formulario');



    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let errores = {}
        if (inputName.value.length < 2) {
            errores.name = 'Debe tener al menos dos caracteres'
        }
        if (Object.keys(errores).length >= 1) {
            inputName.style.borderColor = "red";
            inputName.style.backgroundColor = "rgba(220,0,26,0.1";
        } else {
            registerForm.submit();
        }
    })

})