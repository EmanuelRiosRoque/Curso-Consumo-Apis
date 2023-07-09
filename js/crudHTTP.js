// Definicion de varaibles para el DOM
const d = document,
    $table = d.querySelector('.crud-table'),
    $form = d.querySelector('.crud-form'),
    $title = d.querySelector('.crud-title'),
    $template = d.getElementById('crud-template').content,
    $fragment = d.createDocumentFragment();

const ajax = (opt) => { // Creamos una funcion con parametro
    let{url,method,success,error,data} = opt;  // Este parametro debe obtener en su dado caso estas caracteriticas
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e =>{
        if(xhr.readyState !== 4 ) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json)
        } else {
            let msj = xhr.statusText || 'Ocurrio un error';
            error(`Error ${xhr.status}:${msj}`)
        }

    });
    xhr.open(method || "GET", url)
    xhr.setRequestHeader("Content-type","application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
}

const getAllUsuario = () => {
    ajax({
        //method: "GET", // Esto se puede omitir ya que por defecto toma el method GET
        url: "http://localhost:3000/usuarios",
        success: (res) => {
            console.log(res);

            res.forEach(Element => {
                $template.querySelector('.name').textContent       = Element.nombre,
                $template.querySelector('.apellido').textContent   = Element.apelliodo;
                $template.querySelector('.edit').dataset.id        = Element.id;
                $template.querySelector('.edit').dataset.name      = Element.nombre;
                $template.querySelector('.edit').dataset.apelliodo = Element.apelliodo;
                $template.querySelector('.delete').dataset.id      = Element.id;
                $template.querySelector('.delete').dataset.name      = Element.nombre;
                $template.querySelector('.delete').dataset.apelliodo      = Element.apelliodo;

                let $clone = d.importNode($template, true)
                $fragment.appendChild($clone)
            });
            
            $table.querySelector('tbody').appendChild($fragment)
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`)
        }
       // data: null // De igual manera se puede omitir ya que en la funcion no es necesario una data 
    });
}

d.addEventListener('DOMContentLoaded',getAllUsuario);
d.addEventListener('submit', e => {
    if(e.target === $form) {
        e.preventDefault();
        // Si no existe el valor en el form

        console.log($form);
        if (!e.target.id.value) {
            //POST Hacer peticion
            ajax({
                url: 'http://localhost:3000/usuarios',
                method: 'POST',
                success: (res) => location.reload(),
                error: () => $form.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`),
                data: {
                    nombre: e.target.nombre.value,
                    apelliodo: e.target.apelliodo.value,
                }
            });
        } else {
            //PUT Hacer peticion - ACTUALIZACION
            ajax({
                url: `http://localhost:3000/usuarios/${e.target.id.value}`,
                method: 'PUT',
                success: (res) => location.reload(),
                error: () => $form.insertAdjacentHTML('afterend', `<p><b>${err}</b></p>`),
                data: {
                    nombre: e.target.nombre.value,
                    apelliodo: e.target.apelliodo.value,
                }
            });
        }
    }
}); 

d.addEventListener("click", e => {
    if (e.target.matches('.edit')) {
        $title.textContent = 'Editar Usuario';
        $form.nombre.value = e.target.dataset.name;
        $form.apelliodo.value = e.target.dataset.apelliodo;
        $form.id.value = e.target.dataset.id;
    }

    if (e.target.matches('.delete')) {
        let name = e.target.dataset.name;
        let apelliodo = e.target.dataset.apelliodo;
        let isDelete = confirm(`¿Estas seguro de eliminar el usuario: ${name} ${apelliodo} ?`);
        if (isDelete) {
            ajax({
                url: `http://localhost:3000/usuarios/${e.target.dataset.id}`,
                method: 'DELETE',
                success: (res) => location.reload(),
                error: () => alert(err),
            });
        }
    }
});

