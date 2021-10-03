
window.addEventListener('load', function () {
    
    let productForm = document.querySelector('form.productForm');
    
    productForm.addEventListener('submit', function (e) {
        let errores = [];
       
        let inputTitle = document.querySelector('input.title');
        if (inputTitle.value == "") {
            errores.push("El titulo es obligatorio");
        } else if (inputTitle.value.length < 2) {
            errores.push( "El titulo debe tener al menos dos caracteres" );
        }

        let inputAuthor = document.querySelector('input.author');
        if (inputAuthor.value == "") {
            errores.push( "Debes escribir el nombre del autor");
        } else if (inputAuthor.value.length < 2) {
            errores.push("El nombre del autor debe tener al menos dos caracteres");
        }

        let inputEditorial = document.querySelector('input.editorial');
        if (inputEditorial.value == "") {
            errores.push('El libro debe pertenecer a una editorial');
        }

        let inputCategory = document.querySelector('input.category');
        if (inputCategory.value == "") {
            errores.push("Debes seleccionar una categoria para el libro");
        }

        let inputPrice = document.querySelector('input.priceLib');
        if (inputPrice.value < 50) {
            errores.push( "Ingresa un monto válido para el producto");
        }

        let inputPages = document.querySelector('input.pages');
        if (inputPages.value == "") {
            errores.push("Ingresa las páginas del libro");
        } else if (inputPages.value < 30) {
            errores.push("Ingresa una cantidad de páginas correcta");
        }

        let inputIdioma = document.querySelector('input.idioma');
        if (inputIdioma.value == "") {
            errores.push("Ingresa el idioma correcto al que pertenece el libro");
        }

        let textareaSummary = document.querySelector('textarea.summary');
        if (textareaSummary.value == "") {
            errores.push("La reseña del libro es obligatoria");
        } else if (textareaSummary.value.length < 7) {
            errores.push("Ingresa una reseña correcta de al menos 20 caracteres");
        }

        if (errores.length > 0) {
            e.preventDefault();
            console.log("-----------entra a errores-------------");
            let ulErrores = document.querySelector("div.errorT ul");

            for(let i=0; i<errores.length; i++){
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
            }
        }
    })

})