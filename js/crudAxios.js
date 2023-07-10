const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();
//    


const getAll = async () => {
  try {
    let res = await axios.get("http://localhost:3000/usuarios"),
      json = await res.data;
    console.log(json);

    // Mostrar todos los elementos
    json.forEach((element) => {
      $template.querySelector(".name").textContent = element.nombre;
      $template.querySelector(".apellido").textContent = element.apelliodo;
      $template.querySelector(".edit").dataset.id = element.id;
      $template.querySelector(".edit").dataset.name = element.nombre;
      $template.querySelector(".edit").dataset.apellido = element.apelliodo;
      $template.querySelector(".delete").dataset.id = element.id;
      $template.querySelector(".delete").dataset.name = element.nombre;
      $template.querySelector(".delete").dataset.apellido = element.apelliodo;

      let $clon = d.importNode($template, true);
      $fragment.appendChild($clon);
    });
    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    let msj = err.statusTex || "Ocurrio un Error";
    $table.insertAdjacentHTML("afterend",`<p><b>${err.status}: ${msj}</b></p>`);
  }
};

d.addEventListener("DOMContentLoaded", getAll);


d.addEventListener("submit", async e => {
    if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            try {
                let opt = {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json; charset=utf-8", //r Checar el content type, puede que exista un error con esto
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        apelliodo: e.target.apellido.value,
                    })
                },
                res = await axios('http://localhost:3000/usuarios', opt),
                json = await res.data;
                location.reload();
            } catch(err) {
                let msj = err.statusText || "Ocurrio un error";
                $form.insertAdjacentHTML("afterend", `<p><b>${err.status}: ${msj}</b></p>`)
            }
        } else {
            // Update PUT

        }   
    }
});

d.addEventListener('click', async e => {
    if (e.target.matches('.edit')) {
        $title.textContent = "Editar Usuario";
        $form.nombre.value = e.target.dataset.name;
        $form.apellido.value = e.target.dataset.apellido;
        $form.id.value = e.target.dataset.id;
    }

    if (e.target.matches('.edit')) {
        
    }
});
