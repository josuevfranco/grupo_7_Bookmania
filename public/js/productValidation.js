window.addEventListener('load', function () {

    console.log("ENTRO A ADDEVENTLISTENER");
        let inputTitle = document.querySelector('input.title');
        let inputAuthor = document.querySelector('input.author');
        let inputEditorial = document.querySelector('input.editorial');
        let inputPrice = document.querySelector('input.priceLib');
        let inputPages = document.querySelector('input.pages');
        let inputIdioma = document.querySelector('input.idioma');
        
    let productForm = document.querySelector('form.productForm');
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let errores = {}

        let titulo, autor, editorial, paginas, precio, idioma, imagen = false;

        if (inputTitle.value.length < 2) {
            errores.name = 'El titulo del libro debe tener al menos dos caracteres';
            titulo = true;
        }
        if (inputAuthor.value.length < 2) {
            errores.author = 'El autor debe tener al menos dos caracteres';
            autor = true;
        }
        if(inputEditorial.value == ""){
            errores.editorial = 'El libro debe pertenecer a una editorial';
            editorial=true;
        }
        if(inputIdioma.value == "") {
            errores.idioma = "Ingresa el idioma correcto al que pertenece el libro";
            idioma=true;
        }
        if (inputPrice.value < 2) {
            errores.priceLib = 'Debe de ser un precio valido';
            price = true;
        }
        if (inputPages.value < 20) {
            errores.pages = 'Ingresa la cantidad de páginas correcta';
            paginas = true;
        }

        let imagenLib = false
        imagenLib = fileValidation()
        if(imagenLib){
            errores.file = "Sube un archivo con las siguientes extensiones: .jpeg/.jpg/.png/.gif "
            imagen = true;
        }
        
        if (Object.keys(errores).length >= 1) {

            if (titulo) {
                inputTitle.style.borderColor = "red";
                inputTitle.style.backgroundColor = "rgba(220,0,26,0.1";
                let error = document.querySelector('div.errorT p');
                error.innerHTML += "<p>" + errores.name + "</p>";
            
            } 

            if (autor) {
                inputAuthor.style.borderColor = "red";
                inputAuthor.style.backgroundColor = "rgba(220,0,26,0.1";
                let error = document.querySelector('div.errorA p');
                error.innerHTML += "<p>" + errores.author + "</p>";
            }

            if (precio) {
                let error = document.querySelector('div.errorP p');
                error.innerHTML += "<p>" + errores.priceLib + "</p>";
                inputPrice.style.borderColor = "red";
                inputPrice.style.backgroundColor = "rgba(220,0,26,0.1)";
            } 
            if (editorial) {
                let error = document.querySelector('div.errorE p');
                error.innerHTML += "<p>" + errores.editorial + "</p>";
                inputEditorial.style.borderColor = "red";
                inputEditorial.style.backgroundColor = "rgba(220,0,26,0.1)";
            } 
            if (paginas) {
                let error = document.querySelector('div.errorPages p');
                error.innerHTML += "<p>" + errores.pages + "</p>";
                inputEditorial.style.borderColor = "red";
                inputEditorial.style.backgroundColor = "rgba(220,0,26,0.1)";
            } 
            if(imagen){
                let error = document.querySelector('div.errorImage p');
                error.innerHTML += "<p>" + errores.file + "</p>";    
            }
        } else {
            productForm.submit();
        }
    })
    function fileValidation() {
        const fileInput = document.getElementById('imagenLibro');
        const filePath = fileInput.value;
        const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        if(fileInput.files.length == 0 ){
            return false;
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

/*window.addEventListener('load', function () {
    
    let productForm = document.querySelector('form.productForm');
    
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
       
        console.log("ENTRO A ADDEVENTLISTENER");
        let inputTitle = document.querySelector('input.title');
        let inputAuthor = document.querySelector('input.author');
        let inputEditorial = document.querySelector('input.editorial');
        let inputCategory = document.querySelector('input.category');
        let inputPrice = document.querySelector('input.priceLib');
        let inputPages = document.querySelector('input.pages');
        let inputIdioma = document.querySelector('input.idioma');
        let textareaSummary = document.querySelector('textarea.summary');

        if(inputTitle.value == "") {
            let error = document.querySelector('div.errorT p');
            error.innerHTML += "<p>" + "El titulo es obligatorio" + "</p>";
            inputTitle.style.borderColor = "red";
            inputTitle.style.backgroundColor = "rgba(220,0,26,0.1";
        }else if(inputTitle.value.length < 2) {
            let error = document.querySelector('div.errorT p');
            error.innerHTML += "<p>" + "El titulo debe tener al menos dos caracteres" + "</p>";
        }else if(inputAuthor.value == "") {
            errores.push( "Debes escribir el nombre del autor");
        } else if(inputAuthor.value.length < 2) {
            errores.push("El nombre del autor debe tener al menos dos caracteres");
        }else if(inputEditorial.value == "") {
            errores.push('El libro debe pertenecer a una editorial');
        }else if(inputCategory.value == "") {
            errores.push("Debes seleccionar una categoria para el libro");
        }else if(inputPrice.value < 50) {
            errores.push( "Ingresa un monto válido para el producto");
        }else if(inputPages.value == "") {
            errores.push("Ingresa las páginas del libro");
        }else if(inputPages.value < 30) {
            errores.push("Ingresa una cantidad de páginas correcta");
        }else if(inputIdioma.value == "") {
            errores.push("Ingresa el idioma correcto al que pertenece el libro");
        }else if(textareaSummary.value == "") {
            errores.push("La reseña del libro es obligatoria");
        } else if(textareaSummary.value.length < 7) {
            errores.push("Ingresa una reseña correcta de al menos 20 caracteres");
        }else{
            console.log("DEBE HACER SUBMIT")
            productForm.submit();
            console.log("YA HIZO SUBMIT")
        }
    })

})*/

