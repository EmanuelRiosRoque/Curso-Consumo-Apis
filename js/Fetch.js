// Fetch
(() => {
    const $fetch = document.getElementById('fetch'),
          $fragment = document.createDocumentFragment();
    //
    fetch('https://jsonplaceholder.typicode.com/users')
    // .then(res => {
    //     // console.log(res);  // Esta respuesta por si sola es body ReadableStream
    //     // Hacemos validacion ternaria VALIDAR UN ERROR esto tomara el error
    //     return res.ok ? res.json() : Promise.reject(res);
    // })
    .then((res) => res.ok ? res.json() : Promise.reject(res)) // Validacion en una sola linea // El promise.reject hace un envio a el catch
    .then(json => {
        console.log(json);
        // $fetch.innerHTML = json;
        json.forEach(element => {
            const $li = document.createElement('li');
            $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
            $fragment.appendChild($li); 
        });
        $fetch.appendChild($fragment);
    })
    .catch(err => {
        console.log(err);
         // Este else nos servira para identificar los errores con el estatus
            /*
            Respuestas informativas (100–199),
            Respuestas satisfactorias (200–299),
            Redirecciones (300–399),
            Errores de los clientes (400–499),
            y errores de los servidores (500–599).
            */
            let msj = err.statusText || '-Ocurrio un error';
            $fetch.innerHTML = `Error ${err.status}:${msj}`; // Esto mostrara un mensaje de error 404 cuando el consumo no se haga con exito
    })
    .finally(() =>
        console.log('Este se ejecuta independientemente de la promesa del FETCH')
    );
})();