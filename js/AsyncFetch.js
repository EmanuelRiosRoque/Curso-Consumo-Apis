// Mejorar la legibilidad del codigo con async
(() => {
    const $fetchAsync = document.getElementById('fetch-async'),
          $fragment = document.createDocumentFragment();
    //
    async function getData() { // Creamos una funcion asincrona 
        // Inicializamos un try(intenta)
        try {
            // Invocamos una variable a la peticion con una await(esperar a que se consuma o a la "respuesta")
            let res = await fetch('https://jsonplaceholder.typicode.com/users'), 
                json = await res.json();
            //
            // Validacion
            if (!res.ok) throw {status: res.status, statusText: res.statusText}
            // Cargamos datos al DOM
            json.forEach(element => {
                const $li = document.createElement('li');
                $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
                $fragment.appendChild($li);
            });

            $fetchAsync.appendChild($fragment);
        
        } catch(err) { // Invocamos el catch para resivir el error
            console.log(err);
            let msj = err.statusText || 'Ocusrrio un error';
            $fetchAsync.innerHTML = `Error ${err.status}: ${msj}`

        } finally {
            console.log('Ejecucion independientemente del resultado');
        }
        
        
    }

    getData()
    
})();