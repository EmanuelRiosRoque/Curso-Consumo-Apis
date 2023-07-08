//HTTP request
(() => {
    const xhr = new XMLHttpRequest(), // Instanciamos el HttpRequest
        $xhr = document.querySelector('#xhr'), // Obtenemos la lista no ordenada con el id "ol"
        $fragment = document.createDocumentFragment(); // Creamos un fragment para solo se haga una iteracion por elemento.
    //
    xhr.addEventListener('readystatechange',(e) => { // Eventos
        if (xhr.readyState !== 4) return; // Retornamos una vez que el state sea =4 esto indica que el consumo fue exitoso
        console.log(xhr); // Mostramos en la consola

        if (xhr.status >= 200 && xhr.status < 300) { // Si el estatus es >= 200 indicativo que la conexion a la api fue exitosa 
            console.log('Exito'); // Mostramos mensaje de exito 
            let json =JSON.parse(xhr.responseText); // Hacemos una varible con la conversionde reponseTetxt a una respuesta JSON
            console.log(json); // Mostramos el JSON en consola

            json.forEach(element => {
                const $li = document.createElement('li'); // Hacemos una variable para crear una lista no ordenada 
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                //Fragment agrupar elementos sin introducir elementos extra a nivel de DOM. En este sentido, es un componente hueco que no te romperá estilos ni semántica.
                $fragment.appendChild($li);
            });
            $xhr.appendChild($fragment); // Mostramos al DOM
        }else {
            // Este else nos servira para identificar los errores con el estatus
            /*
            Respuestas informativas (100–199),
            Respuestas satisfactorias (200–299),
            Redirecciones (300–399),
            Errores de los clientes (400–499),
            y errores de los servidores (500–599).
            */
            console.log('error');  // Mensaje en cosola de error
            let msj = xhr.statusText || 'Ocurrio un error';
            $xhr.innerHTML = `Error ${xhr.status}:${msj}`; // Esto mostrara un mensaje de error 404 cuando el consumo no se haga con exito
        }

        console.log("Este mensaje cargara de cualquier forma");
    });

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users'); // Abrimos la api
    xhr.send(); // La enviamos

})();

