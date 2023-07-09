(() => {
  const $axiosAsync = document.getElementById("axiosAsync"),
    $fragment = document.createDocumentFragment();
  //

  async function getData() {
    try {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
        json = await res.data;
      //

      console.log(res, json);

      json.forEach((element) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
        $fragment.appendChild($li);
      });

      $axiosAsync.appendChild($fragment);
    } catch (err) {

      let msj = err.response.statusText || "Ocusrrio un error";
      $axiosAsync.innerHTML = `Error ${err.response.status}: ${msj}`;
    } finally {
        
      console.log(
        "Este fragmento se ejecuta independientemente del AxiosAsync"
      );
    }
  }

  getData();
})();
