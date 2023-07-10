const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await fetch("http://localhost:3000/usuarios");
    json = await res.json();
    // Validacion
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    console.log(json);

    json.forEach((element) => {
      $template.querySelector(".name").textContent = element.nombre;
      $template.querySelector(".apellido").textContent = element.apelliodo;
      $template.querySelector(".edit").dataset.id = element.id;
      $template.querySelector(".edit").dataset.name = element.nombre;
      $template.querySelector(".edit").dataset.apellido = element.apelliodo;
      $template.querySelector(".delete").dataset.id = element.id;
      $template.querySelector(".delete").dataset.name = element.nombre;
      $template.querySelector(".delete").dataset.apellido = element.apelliodo;
      // Creamos una varable a la que se le llamara "CLON" PARA importar un nodo de la etiqueta template con el segundo valor en tru para qur copie la estructura del contenido
      let $clon = d.importNode($template, true);
      $fragment.appendChild($clon);
    });

    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    let msj = err.statusText || `Ocurrio un error`;
    $table.insertAdjacentHTML("afterend", `<p><b>${err.status}:${msj}</b></p>`);
  }
};

d.addEventListener("DOMContentLoaded", getAll);
d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      // Create POST request
      try {
        let opt = {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              apelliodo: e.target.apellido.value,
            }),
          },
          res = await fetch("http://localhost:3000/usuarios", opt),
          json = await res.json();
        location.reload();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
      } catch (err) {
        let msj = err.statusText || `Ocurrio un error`;
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>${err.status}:${msj}</b></p>`
        );
      }
    } else {
      // Update PUT request
      try {
        let opt = {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              apelliodo: e.target.apellido.value,
            }),
          },
          res = await fetch(
            `http://localhost:3000/usuarios/${e.target.id.value}`,
            opt
          ),
          json = await res.json();
        location.reload();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
      } catch (err) {
        let msj = err.statusText || `Ocurrio un error`;
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>${err.status}:${msj}</b></p>`
        );
      }
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Usuario";
    $form.nombre.value = e.target.dataset.name;
    $form.apellido.value = e.target.dataset.apellido;
    $form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let name = e.target.dataset.name;
    let apelliodo = e.target.dataset.apellido;
    let isDelete = confirm(
      `¿Estas seguro de eliminar el usuario: ${name} ${apelliodo} ?`
    );
    if (isDelete) {
      try {
        let opt = {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
          },
          res = await fetch(
            `http://localhost:3000/usuarios/${e.target.dataset.id}`,
            opt
          ),
          json = await res.json();
        location.reload();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
      } catch (err) {
        let msj = err.statusText || `Ocurrio un error`;
        alert(`Error ${err.status}:${msj}`);
      }
      ls;
    }
  }
});
