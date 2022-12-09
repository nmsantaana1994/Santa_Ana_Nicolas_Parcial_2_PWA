//API KEY (https://www.omdbapi.com/)
const APIKEY = "8b5a8ed8";

//Elementos dentro de la seccion del buscador
const inputTitulo = document.getElementById("inputTitulo");
const buttonSearch = document.getElementById("buscar");


const view = document.getElementById("view");
const peliculaInvalida = document.getElementById("peliculaInvalida");

//Elementos dentro de la seccion view
const buttonFavoritos = document.getElementById("favoritos");

window.addEventListener('offline', event =>{
  console.log("El usuario esta desconectado", event);
});

window.addEventListener('online', event =>{
  console.log("El usuario esta conectado", event);
});

if( !navigator.onLine ){
  console.log("Estoy sin conexión durante la carga");
}

//Evento para revisar si hay datos en el localStorage
addEventListener("DOMContentLoaded", () => {
  view.style.display = "none";
  let dataBusqueda = localStorage.getItem("busqueda");
  if (dataBusqueda) {
    cargarDatos(JSON.parse(dataBusqueda));
  }
});

//Evento para buscar en caso de hacer click en el boton
buttonSearch.addEventListener("click", (e) => {
  e.preventDefault();
  view.innerHTML = "";
  Ejecucion();
});

//Evento para buscar cuando se aprieta la tecla enter
inputTitulo.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.code === "Enter") {
    view.innerHTML = "";
    Ejecucion();
  }
});

//Funcion con la lógica del programa
function Ejecucion() {
  peliculaInvalida.style.display = "none";
  view.style.display = "none";

  fetch(
    `http://www.omdbapi.com/?apikey=${APIKEY}&s=${inputTitulo.value}`
  )
    .then((resp) => {
      //Retorno la respuesta como JSON
      return resp.json(); //
    })

    .then((data) => {
      console.log(`JSON crudo: `, data);

      if (data) {
        localStorage.setItem("busqueda", JSON.stringify(data));
        cargarDatos(data);
      }
    }
  );
}

//Funcion para agregar las peliculas a favortios
function AgregarAFavoritos(movie){
  console.log("Apretaste");

  if (localStorage.getItem("favorito") == null){
    localStorage.setItem("favorito", JSON.stringify([]));
  }
  const listaFavoritos = JSON.parse(localStorage.getItem("favorito"));
  const movieFav = listaFavoritos.find(m => {
    return m.imdbID == movie.imdbID;
  })

  if (!movieFav) {
    listaFavoritos.push(movie);
  }
  localStorage.setItem("favorito", JSON.stringify(listaFavoritos));
}

//Función que carga los datos
function cargarDatos(data) {
  if (data.Response == "False") {
    //En caso de devolverme un error se muestra y se pide cargar nuevamente
    peliculaInvalida.style.display = "block";
  } else {
    //console.log(data.Search);
    let arrayMovies = data.Search;

    arrayMovies.forEach(movie => {
      console.log(movie);      
      let card = `
      <div class="col-6 col-md-4">
        <div class="card cardPelicula">
          <img src="${movie.Poster}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-title h5 text-white">${movie.Title}</p>
            <p class="card-text"><span class="fw-bold">Año de estreno:</span> ${movie.Year}</p>
            <a href="#" class="btn btn-primary"  id="favoritos_${movie.imdbID}" style="width: 100%;">Agregar a favoritos</a>
          </div>
        </div>
      </div>
      `;

      view.innerHTML +=card;
    });

    arrayMovies.forEach(movie => {
      document.getElementById(`favoritos_${movie.imdbID}`).addEventListener("click", e => {
        AgregarAFavoritos(movie);
      })
    })
    
    view.style.display = "block"; 
  }
}