
// ------------------------------------------------------------------------------------------------
let arquero = [];
let defensores = [];
let delanteros = [];
let players = [];
let equipo = [];
let usuarios =[];



document.addEventListener("DOMContentLoaded", () => {
  const equipoStorage = JSON.parse(localStorage.getItem("equipo"));
  equipo = equipoStorage || [];
  const arqueroStorage = JSON.parse(localStorage.getItem("arquero"));
  arquero = arqueroStorage || [];
  const defensoresStorage = JSON.parse(localStorage.getItem("defensores"));
  defensores = defensoresStorage || [];
  const delanterosStorage = JSON.parse(localStorage.getItem("delanteros"));
  delanteros = delanterosStorage || [];

  actualizarEquipoHTML();

  renderArquero(arquero);
  renderDefensor(defensores);
  renderDelantero(delanteros);
  $.ajax({
      method: 'GET',
      dataType : 'JSON',
      url: 'app/jugadores.json',
      success: function (playerJSON, textStatus, xhr) {
          players = playerJSON;
          renderPlayers(players)
      },
      error: function (xhr, textStatus, error){
          console.log(error)
      }
  });
});

$.ajax({
    url: 'https://randomuser.me/api/?results=5',
    dataType: 'json',
    success: function(data) {
        usuarios = data.results;
        mostrarUsuarios(usuarios);
    },
    error: function (xhr, status, error){
        console.log(error);
    }
  });
        

const formBuscador = document.querySelector("#formulario");
const tableEquipo = document.querySelector("#listaJugadores tbody");
const btnVaciarEquipo = document.querySelector("#vaciarEquipo");
const playerArquero = document.querySelector(".adentroArquero");
const playerDefensor = document.querySelector(`.adentroDefensor`);
const playerDelantero = document.querySelector(".adentroDelantero");
playerArquero.addEventListener("click", agregarArquero);
playerDefensor.addEventListener("click", agregarDefensor);
playerDelantero.addEventListener("click", agregarDelantero);
tableEquipo.addEventListener("click", eliminarJugador);
btnVaciarEquipo.addEventListener("click", vaciarEquipo);
formBuscador.addEventListener("submit", buscarJugadores);


$(".submenu").click(function (e) {
  e.preventDefault();

  if (e.target.id == "img-equipo") {
    $("#equipo").fadeIn();
  } else if (e.target.classList.contains("cerrar")) {
    $("#equipo").fadeOut();
  }
});

$(".mostrarCancha").click(function (e) {
  actualizarEquipoHTML(equipo);
  $("#imagenEspera").append(
    `<img class="logoFutbol" src="../img/sedinho-gif-supercampeons.gif">`
  );
  $(".logoFutbol").fadeOut(2000);
});

let jugadorEliminado;
let id;
function eliminarCanchaArquero() {
  let arqueroArray = arquero.filter((arquero) => arquero.id != id);
  arquero = [...arqueroArray];
  actualizarStorage();
  renderArquero(arquero);
}
function eliminarCanchaDefensor() {
  let defensoresArray = defensores.filter((defensor) => defensor.id != id);
  defensores = [...defensoresArray];
  actualizarStorage();
  renderDefensor(defensores);
}
function eliminarCanchaDelantero() {
  let delanterosArray = delanteros.filter((delantero) => delantero.id != id);
  delanteros = [...delanterosArray];
  actualizarStorage();
  renderDelantero(delanteros);
}
function eliminarJugador(e) {
  e.preventDefault();
  if (e.target.classList.contains("eliminarJugador")) {
    id = e.target.closest("a").dataset.id;
    const equipoFiltrado = equipo.filter((jugador) => jugador.id != id);
    equipo = [...equipoFiltrado];
    actualizarEquipoHTML();
    actualizarStorage();
    jugadorEliminado = equipo.filter((jugador) => jugador.id == id);
    eliminarCanchaArquero();
    eliminarCanchaDefensor();
    // eliminarCanchaMediocampista();
    eliminarCanchaDelantero();
    return jugadorEliminado & id;
  }
}

function vaciarEquipo(e) {
  e.preventDefault();
  equipo = [];
  delanteros = [];
  mediocampistas = [];
  arquero = [];
  defensores = [];

  actualizarEquipoHTML();
  renderArquero(arquero);
  renderDefensor(defensores);
  //   renderMediocampista(mediocampistas);
  renderDelantero(delanteros);
  actualizarStorage();
}

function agregarArquero(e) {
  e.preventDefault();
  if (arquero.length < 1) {
    if (e.target.classList.contains("adentroArquero")) {
      const jugadorCard = e.target.parentElement.parentElement.parentElement;
      const jugadorAdentro = {
        nombre: jugadorCard.querySelector("input.datoNombre").value,
        posicion: jugadorCard.querySelector("h3.posicionCancha").textContent,
        id: equipo.length,
        cantidad: 1,
      };
      document.getElementById("nombreJugadorArquero").reset();
      arquero = [...arquero, jugadorAdentro];
      equipo = [...equipo, jugadorAdentro];
      renderArquero(arquero);
      actualizarStorage();
    }
  } else {
    swal("Ya tenes todos los jugadores de tu equipo, Mira tu Equipo Armado!");
  }
}

function agregarDelantero(e) {
  e.preventDefault();
  if (equipo.length < 5) {
    if (delanteros.length < 2) {
      if (e.target.classList.contains("adentroDelantero")) {
        const jugadorCard = e.target.parentElement.parentElement.parentElement;
        const jugadorAdentro = {
          nombre: jugadorCard.querySelector("input.datoNombre").value,
          posicion: jugadorCard.querySelector("h3.posicionCancha").textContent,
          id: equipo.length,
          cantidad: delanteros.length,
        };
        jugadorAdentro.cantidad++;
        document.getElementById("nombreJugadorDelantero").reset();
        delanteros = [...delanteros, jugadorAdentro];
        equipo = [...equipo, jugadorAdentro];
        renderDelantero(delanteros);
        actualizarStorage();
      }
    } else {
      swal(
        "Llegaste al limite de Delanteros",
        "avanza con el resto del equipo!"
      );
    }
  } else {
    swal("Ya tenes todos los jugadores de tu equipo, Mira tu Equipo Armado!");
  }
}

function agregarDefensor(e) {
  e.preventDefault();
  if (equipo.length < 5) {
    if (defensores.length < 2) {
      if (e.target.classList.contains("adentroDefensor")) {
        const jugadorCard = e.target.parentElement.parentElement.parentElement;
        const jugadorAdentro = {
          nombre: jugadorCard.querySelector("input.datoNombre").value,
          posicion: jugadorCard.querySelector("h3.posicionCancha").textContent,
          id: equipo.length,
          cantidad: defensores.length,
        };
        jugadorAdentro.cantidad++;
        document.getElementById("nombreJugadorDefensor").reset();
        defensores = [...defensores, jugadorAdentro];
        equipo = [...equipo, jugadorAdentro];
        renderDefensor(defensores);
        actualizarStorage();
      }
    } else {
      swal(
        "Llegaste al limite de Defensores",
        "avanza con el resto del equipo!"
      );
    }
  } else {
    swal("Ya tenes todos los jugadores de tu equipo, Mira tu Equipo Armado!");
  }
}

let canchaArquero = document.querySelector("#posicionArquero");
function renderArquero(jugadorCancha) {
  canchaArquero.innerHTML = "";

  jugadorCancha.forEach((jugadorCancha) => {
    const html = `<div class="cartaImpresa " ">
        <img src="img/${jugadorCancha.posicion}${jugadorCancha.cantidad}.jfif" class="imagenCartaImpresa" alt="..."></img>
        <div class="card-body">
        <h2 class="card-title">${jugadorCancha.nombre}</h2>
        <h4 class="card-text">${jugadorCancha.posicion}</h4>
        </div>
      </div>`;

    canchaArquero.innerHTML += html;
  });
}

let canchaDefensor = document.querySelector(`#posicionDefensor`);
function renderDefensor(jugadorCancha) {
  canchaDefensor.innerHTML = "";

  jugadorCancha.forEach((jugadorCancha) => {
    const html = `<div class="cartaImpresa ">
        <img src="img/${jugadorCancha.posicion}${jugadorCancha.cantidad}.jfif" class="imagenCartaImpresa" alt="..."></img>
        <div class="card-body">
        <h2 class="card-title">${jugadorCancha.nombre}</h2>
        <h4 class="card-text">${jugadorCancha.posicion}</h4>
        </div>
        </div>`;

    canchaDefensor.innerHTML += html;
  });
}

let canchaDelantero = document.querySelector(`#posicionDelantero`);
function renderDelantero(jugadorCancha) {
  canchaDelantero.innerHTML = "";

  jugadorCancha.forEach((jugadorCancha) => {
    const html = `<div class="cartaImpresa ">
        <img src="img/${jugadorCancha.posicion}${jugadorCancha.cantidad}.jfif" class="imagenCartaImpresa" alt="..."></img>
        <div class="card-body">
        <h2 class="card-title">${jugadorCancha.nombre}</h2>
        <h4 class="card-text">${jugadorCancha.posicion}</h4>
        </div>
        </div>`;

    canchaDelantero.innerHTML += html;
  });
}

const tableEquipoBuscar = document.querySelector("#listaJugadoresBuscar tbody");
function renderJugadores(listadoJugadores) {
  tableEquipoBuscar.innerHTML = "";

  listadoJugadores.forEach((jugador) => {
    const { imagen, nombre, posicion, cantidad, id } = jugador;
    const row = document.createElement("tr");
    row.innerHTML = `
          <td colspan="1">
          <img src="img/${posicion}${cantidad}.jfif" class="imagenTabla"">
        </td>
        <td>
          ${nombre}
        </td>
        <td colspan="1">
          ${posicion}
        </td>
        `;
    tableEquipoBuscar.appendChild(row);
  });
}

const imagenesPlayers = document.querySelector(".imagenesPlayers");
function renderPlayers(players) {
  imagenesPlayers.innerHTML = "";
  players.forEach((player)=> {
    const html = `
    <div class="col">
            <div class="card">
              <img src="${player.imagen}" class="imagenCartaDos card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${player.nombre}</h5>
                <p class="card-text">${player.mensaje}</p>
              </div>
            </div>
          </div>`;
    imagenesPlayers.innerHTML += html;
  })

}

const imagenesUsuarios = document.querySelector(".imagenesUsuarios");
function mostrarUsuarios(usuarios) {
    imagenesUsuarios.innerHTML = "";
    usuarios.forEach((usuario)=> {
        const html = `   
        <div class="card">
        <img src="${usuario.picture.large}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${usuario.name.first}</h5>
          <p class="card-text">Que bueno poder armar mi equipo aca!</p>
          <p class="card-text"><small class="text-muted">${usuario.gender}</small></p>
        </div>
        </div>`;
        imagenesUsuarios.innerHTML += html;
    })

}



function actualizarEquipoHTML() {
  tableEquipo.innerHTML = "";

  equipo.forEach((jugador) => {
    const { nombre, posicion, cantidad, id } = jugador;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="1">
        <img src="img/${posicion}${cantidad}.jfif" class="imagenTabla"">
      </td>
      <td>
        ${nombre}
      </td>
      <td colspan="1">
        ${posicion}
      </td>
      <td colspan="1">
        <a href="#" class ="eliminarJugador" data-id="${id}"><i class="fas fa-trash eliminarJugador"></i>
      </td>
      `;
    tableEquipo.appendChild(row);
  });
}
function buscarJugadores(e) {
  e.preventDefault();
  const inputBuscador = document.querySelector("#buscador").value;
  const inputFiltrado = inputBuscador.toLowerCase().trim();
  const resultado = equipo.filter((jugador) =>
    jugador.nombre.toLowerCase().includes(inputFiltrado)
  );

  renderJugadores(resultado);
  formBuscador.reset();
}
function actualizarStorage() {
  localStorage.setItem("equipo", JSON.stringify(equipo));
  localStorage.setItem("defensores", JSON.stringify(defensores));
  //   localStorage.setItem("mediocampistas", JSON.stringify(mediocampistas));
  localStorage.setItem("delanteros", JSON.stringify(delanteros));
  localStorage.setItem("arquero", JSON.stringify(arquero));
}