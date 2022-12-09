const contenedorFavoritos = document.getElementById("viewFav");

const cargarFavoritos = (movies) => {
    let listaFavoritos = [];
    if (movies) {
        listaFavoritos = movies;
    } else {
        listaFavoritos = JSON.parse(localStorage.getItem("favorito"));
    }

    contenedorFavoritos.innerHTML = "";
    console.log(listaFavoritos);

    for(movie of listaFavoritos){
        let card = `
        <div class="col-6 col-md-4">
            <div class="card cardPelicula">
            <img src="${movie.Poster}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-title h5 text-white">${movie.Title}</p>
                <p class="card-text"><span class="fw-bold">Año de estreno:</span> ${movie.Year}</p>
                <a href="#" class="btn btn-primary"  id="favoritos_${movie.imdbID}" style="width: 100%;">Quitar de favoritos</a>
            </div>
            </div>
        </div>
        `;
        contenedorFavoritos.innerHTML += card;
    }

    listaFavoritos.forEach(movie => {
        document.getElementById(`favoritos_${movie.imdbID}`).addEventListener("click", () => {
            borrarMovie(movie);
        })
    });

    const borrarMovie = (movie) => {
        const listaFavoritos = JSON.parse(localStorage.getItem("favorito"));
        const listaActualizada = listaFavoritos.filter(m => {
            return m.imdbID !== movie.imdbID;
        })

        localStorage.setItem("favorito", JSON.stringify(listaActualizada));
        cargarFavoritos(listaActualizada);
    }
}

cargarFavoritos();