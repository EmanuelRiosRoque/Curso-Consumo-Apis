(() => {
    const $axios = document.getElementById('axios'),
        $fragment = document.createDocumentFragment();
    //
    axios
    .get('https://jsonplaceholder.typicode.com/users')

    .then((res) => {
        console.log(res);
        let json = res.data;

        json.forEach(element => {
            const $li = document.createElement('li');
            $li.innerHTML = `${element.name} -- ${element.email} -- ${element.phone}`;
            $fragment.appendChild($li);
        });

        $axios.appendChild($fragment);
    })
    .catch((err) => {
        console.log(err);
        let msj = err.response.statusText || 'Ocusrrio un error';
            $axios.innerHTML = `Error ${err.response.status}: ${msj}`
    })
    .finally(() =>{
        console.log('Esto se ejecutara independientemente del resultado de axios');
    });
})();