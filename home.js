if(!localStorage.getItem("isLogged")){
    window.location.href = "index.html";
}

// Selecciono los contenedores del DOM para usarlos posteriormente
const favoritosContainer = document.getElementById("favoritos");
const myPlaylistContainer = document.getElementById("myPlaylist");
const cancionesContainer = document.getElementById("canciones");
const audioPlayer = document.getElementById("audioPlayer");
const muteButton = document.getElementById("mute").querySelector("i");

// Definir el estado inicial del reproductor
let cancionActualIndex = 8;


class Cancion {
    // Es el molde de los datos que deben tener las canciones en mi catalogo
    constructor(id, name, artist, album, year, genre, duration, cover, urlSong, enFavoritos = false, enMiLista = false) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.year = year;
        this.genre = genre;
        this.duration = duration;
        this.cover = cover;
        this.urlSong = urlSong;
        this.enFavoritos = enFavoritos;
        this.enMiLista = enMiLista;
    }
}

// Catálogo de canciones con la lista de todas las canciones ocupadas
const catalogoCanciones = [
    new Cancion(1, "Morir en tu piel", "9 Pürpura", "9 Pürpura", "2009", "Rock", "4:23", "cover/1.jpg", "mp3/1.mp3"),
    new Cancion(2, "An Ornament", "Negative", "Karma Killer", "2009", "Rock", "5:59", "cover/2.jpeg", "mp3/2.mp3"),
    new Cancion(3, "Como tú", "Jaguares", "Cuando la sangre galopa", "2001", "Rock", "4:15", "cover/3.jpeg", "mp3/3.mp3"),
    new Cancion(4, "Aún", "Coda", "Veinte Para las Doce", "1995", "Rock", "4:53", "cover/4.jpeg", "mp3/4.mp3"),
    new Cancion(5, "Because of you", "Skunk Anansie", "Smashes & Trashes", "2009", "Rock", "4:28", "cover/5.jpeg", "mp3/5.mp3"),
    new Cancion(6, "Black", "Pearl Jam", "Ten", "1991", "Alternative", "5:44", "cover/6.jpeg", "mp3/6.mp3"),
    new Cancion(7, "Born from fire", "Amorphis", "Eclipse", "2006", "Alternative", "4:09", "cover/7.jpeg", "mp3/7.mp3"),
    new Cancion(8, "Cadaver exquisito", "Fito Paez", "Euforia", "1997", "Pop", "5:37", "cover/8.jpeg", "mp3/8.mp3"),
    new Cancion(9, "Crawling", "Linkin Park", "Hibrid Theory", "2002", "Alternative", "3:29", "cover/9.jpeg", "mp3/9.mp3"),
    new Cancion(10, "Day and then the shade", "Katatonia", "Night is The New Day", "2009", "Alternative", "4:26", "cover/10.jpeg", "mp3/10.mp3"),
    new Cancion(11, "Demonios", "Estopa", "Más Destrangis", "2002", "Pop_folk", "3:44", "cover/11.jpeg", "mp3/11.mp3"),
    new Cancion(12, "Flying", "Anathema", "A Natural Disaster", "2004", "Metal", "5:56", "cover/12.jpeg", "mp3/12.mp3"),
    new Cancion(13, "Ghost of love", "The Rasmus", "Black Roses", "2008", "Rock", "3:17", "cover/13.jpeg", "mp3/13.mp3"),
    new Cancion(14, "In joy and sorrow", "HIM", "Deep Shadows and Brilliant Highlights", "2001", "Gótico", "4:00", "cover/14.jpeg", "mp3/14.mp3"),
    new Cancion(15, "Incendialo todo", "Mama Vudú", "Luna Lombriz", "2001", "Rock", "1:33", "cover/15.jpeg", "mp3/15.mp3"),
    new Cancion(16, "Je veux", "Zaz", "Zaz", "2010", "Blues", "3:37", "cover/16.jpeg", "mp3/16.mp3"),
    new Cancion(17, "Join me in death", "HIM", "Razorble Romance", "2000", "Gótico", "3:36", "cover/17.jpeg", "mp3/17.mp3"),
    new Cancion(18, "Justify", "The Rasmus", "Black Roses", "2008", "Rock", "4:26", "cover/13.jpeg", "mp3/18.mp3"),
    new Cancion(19, "Lose you tonight", "HIM", "Deep Shadows and Brilliant Highlights", "2001", "Gótico", "3:41", "cover/14.jpeg", "mp3/19.mp3"),
    new Cancion(20, "Maldito corazón", "Saratoga", "El Clan de la Lucha", "2004", "Heavy Metal", "5:56", "cover/20.jpeg", "mp3/20.mp3"),
    new Cancion(21, "New dawn", "Entwine", "Gone", "2001", "Gótico", "3:57", "cover/21.jpeg", "mp3/21.mp3"),
    new Cancion(22, "One last time", "Dream Theater", "Scenes from a Memory", "1999", "Progressive", "3:46", "cover/22.jpeg", "mp3/22.mp3"),
    new Cancion(23, "Pull me under", "Dream Theater", "Images and Words", "1992", "Progressive", "8:14", "cover/23.jpeg", "mp3/23.mp3"),
    new Cancion(24, "Rain", "Mika", "The Boy who Knew too Much", "2009", "Pop", "3:43", "cover/24.jpeg", "mp3/24.mp3"),
    new Cancion(25, "Set fire to the rain", "Adele", "21", "2011", "Pop", "4:01", "cover/25.jpeg", "mp3/25.mp3"),
    new Cancion(26, "Tears of the dragon", "Bruce Dickinson", "Balls to Picasso", "1994", "Rock", "6:20", "cover/26.jpeg", "mp3/26.mp3"),
    new Cancion(27, "The kill", "30 Seconds to Mars", "A Beautiful Lie", "2005", "Rock", "3:51", "cover/27.jpeg", "mp3/27.mp3"),
    new Cancion(28, "Twisted", "Skunk Anansie", "Smashes & Trashes", "2009", "Rock", "4:14", "cover/5.jpeg", "mp3/28.mp3"),
    new Cancion(29, "Wicked game", "HIM", "Razorble Romance", "2000", "Gótico", "4:05", "cover/17.jpeg", "mp3/29.mp3"),
    new Cancion(30, "하루만", "정준영", "Teenager", "2014", "Pop", "4:54", "cover/30.jpeg", "mp3/30.mp3")
];

class ListaReproduccion {
    // Es el molde de los datos que deben tener las listas de reproducción que vamos a tener en el reproductor
    constructor({ nombreLista, listaCanciones = [], container }) {
        this.nombreLista = nombreLista;
        this.listaCanciones = listaCanciones;
        this.container = container;
    }

    // Método que renderiza (visualizar) las canciones en mi página
    renderizarLista() {
        if (this.listaCanciones.length === 0) {
            this.container.innerHTML = "No hay canciones en esta lista";
        } else {
            this.container.innerHTML = this.listaCanciones.map(cancion =>
                // se vizualizan las canciones con los botones de play, favoritos y add a mi lista. Se muestra el ícono de trash si la cancion ya fue anadida a favoritos o a mi lista
                `<li>
                    <span class="fa-solid fa-play play" onclick="cambiarCancionActual(${cancion.id}, '${this.nombreLista}')"></span>

                    ${cancion.enFavoritos ?
                    `<span class="fa-solid fa-trash" onclick="toggleFavoritos(${cancion.id})"></span>` :
                    `<span class="fa-solid fa-heart" onclick="toggleFavoritos(${cancion.id})"></span>`}

                    ${cancion.enMiLista ?
                    `<span class="fa-solid fa-trash" onclick="toggleMiLista(${cancion.id})"></span>` :
                    `<span class="fa-solid fa-plus" onclick="toggleMiLista(${cancion.id})"></span>`}

                    ${cancion.name}
                </li>`
            );

            reproducirCancion();
        }
    }

    // Buscamos la cancion ingresada en la barra de busqueda en la lista de canciones
    searchCancion(query) {        
        const resultado = this.listaCanciones.filter(cancion =>
            cancion.name.toLowerCase().includes(query.toLowerCase())
        );

        if (resultado.length === 0) {
            this.container.innerHTML = "No hay canciones que coincidan con tu búsqueda";
        } else {
            this.container.innerHTML = resultado.map(cancion =>
                `<li>
                    <span class="fa-solid fa-play play" onclick="cambiarCancionActual(${cancion.id}, '${this.nombreLista}')"></span>
                    <span class="fa-solid fa-heart " onclick="toggleFavoritos(${cancion.id})"></span>
                    <span class="fa-solid fa-plus" onclick="toggleMiLista(${cancion.id})"></span>
                    ${cancion.name}
                </li>`
            );
            reproducirCancion();
        }
    }

    // Agregamos canciones a las listas de reproducción utilizando el id de la cancion
    addCancion(cancionId) {
        const cancion = catalogoCanciones.find(c => c.id === cancionId);
        if (!cancion) return;

        if (this.nombreLista === "Favoritos") {
            cancion.enFavoritos = true;
        } else if (this.nombreLista === "My Playlist") {
            cancion.enMiLista = true;
        }

        this.listaCanciones.push(cancion);
        this.renderizarLista();
    }

    // Quitamos canciones a las listas de reproducción utilizando el id de la cancion
    removeCancion(cancionId) {
        const cancion = this.listaCanciones.find(c => c.id === cancionId);
        if (!cancion) return;

        if (this.nombreLista === "Favoritos") {
            cancion.enFavoritos = false;
        } else if (this.nombreLista === "My Playlist") {
            cancion.enMiLista = false;
        }

        this.listaCanciones = this.listaCanciones.filter(c => c.id !== cancionId);
        this.renderizarLista();
    }
}

// Se agrega o se quita la cancion de favoritos
function toggleFavoritos(cancionId) {
    const cancion = catalogoCanciones.find(c => c.id === cancionId);
    if (!cancion) return;

    if (cancion.enFavoritos) {
        cancion.enFavoritos = false;
        misFavoritos.removeCancion(cancionId);
       
    } else {
        cancion.enFavoritos = true;
        misFavoritos.addCancion(cancionId);
    }

    todasLascanciones.renderizarLista();
    misFavoritos.renderizarLista();

}

// Se agrega o se quita la cancion de mi lista
function toggleMiLista(cancionId) {
    const cancion = catalogoCanciones.find(c => c.id === cancionId);
    if (!cancion) return;

    if (cancion.enMiLista) {
        cancion.enMiLista = false;
        myPlaylist.removeCancion(cancionId);
    } else {
        cancion.enMiLista = true;
        myPlaylist.addCancion(cancionId);
    }

    todasLascanciones.renderizarLista();
    myPlaylist.renderizarLista();
}

// Listas de reproducción
const todasLascanciones = new ListaReproduccion({
    nombreLista: "Lista de Canciones",
    listaCanciones: catalogoCanciones,
    container: cancionesContainer
});

const myPlaylist = new ListaReproduccion({
    nombreLista: "My Playlist",
    container: myPlaylistContainer
});

const misFavoritos = new ListaReproduccion({
    nombreLista: "Favoritos",
    container: favoritosContainer
});


// seleccionamos el contenedor del reproductor para usarlo posteriormente
const contenedorReproductor = document.getElementById("reproductor");
let listaActual = todasLascanciones; // Lista de canciones por defecto

// Se cambia la cancion actual en el espacio reproductor
function cambiarCancionActual(cancionId, listaNombre) {
    // let listaReproduccion = todasLascanciones; // Por defecto, usa la lista de todas las canciones
        audioPlayer.pause();
    if (listaNombre === "My Playlist") {
        listaActual = myPlaylist;
    } else if (listaNombre === "Favoritos") {
        listaActual = misFavoritos;
    } else if (listaNombre === "Lista de Canciones") {
        listaActual = todasLascanciones;
    }

    const cancion = listaActual.listaCanciones.find(c => c.id == cancionId);
   
    if (!cancion) return;

    contenedorReproductor.innerHTML = `
    <h2 class="fw-bolder encabezado">Reproduciendo desde el álbum</h2>
    <ul>
        <li><span id="albumSee">${cancion.album}</span></li>
    </ul>
    <div id="coverDiv">
        <img id="cover" src="${cancion.cover}" alt="portada del álbum">
    </div>
    <br>
    <div id="datosReproduccion">
        <ul id="ulDatos">
            <li>Nombre: <span id="nombreSee">${cancion.name}</span></li>
            <li>Artista: <span id="autorSee">${cancion.artist}</span></li>
            <li>Duración: <span id="duracionSee">${cancion.duration}</span></li>
            <li>Género: <span id="generoSee">${cancion.genre}</span></li>
        </ul>
    </div>
    <br>
    `;

    audioPlayer.src = cancion.urlSong;
    // inicia sonando la cancion
    // audioPlayer.play();
}

// Inicializar la primera canción
cambiarCancionActual(todasLascanciones.listaCanciones[cancionActualIndex].id, todasLascanciones.nombreLista);


// Se renderizan las listas de reproducción al abrir la página
function onStart() {
    todasLascanciones.renderizarLista();
    myPlaylist.renderizarLista();
    misFavoritos.renderizarLista();
}

onStart();

// Selecciono el input de búsqueda para usarlo posteriormente
const inputBuscar = document.getElementById("inputBuscar");

// Evento para que al presionar enter se ejecute la búsqueda
inputBuscar.addEventListener("keypress", () => {    
    todasLascanciones.searchCancion(inputBuscar.value);    
});


// Selecciono los botones de control de reproducción

const stop = document.getElementById("stop");
const adelanta = document.getElementById("adelanta");
const retrocede = document.getElementById("retrocede");
const mute = document.getElementById("mute");

function eventoPlay() {
    
    // Añadir eventos a los botones de control de reproducción
   
        console.log("play");
        if (audioPlayer.paused) {
            audioPlayer.play();
            play.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Cambiar ícono a pausa
        } else {
            audioPlayer.pause();
            play.innerHTML = '<i class="fa-solid fa-play"></i>'; // Cambiar ícono a play
        }
    
}

function reproducirCancion(){
    const play = document.querySelectorAll(".play");
    
// Añadir eventos a los botones de control de reproducción
    play.forEach(button=>button.removeEventListener("click", eventoPlay));

    play.forEach(button=>button.addEventListener("click", eventoPlay));
}

reproducirCancion();

stop.addEventListener("click", () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
});

adelanta.addEventListener("click", () => {
    // Avanza a la siguiente canción en la lista actual
    cancionActualIndex = (cancionActualIndex + 1) % listaActual.listaCanciones.length;
    cambiarCancionActual(listaActual.listaCanciones[cancionActualIndex].id, listaActual.nombreLista);
    audioPlayer.play();
});

retrocede.addEventListener("click", () => {
    // Retrocede a la canción anterior en la lista actual
    cancionActualIndex = (cancionActualIndex - 1 + listaActual.listaCanciones.length) % listaActual.listaCanciones.length;
    cambiarCancionActual(listaActual.listaCanciones[cancionActualIndex].id, listaActual.nombreLista);
    audioPlayer.play();
});

mute.addEventListener("click", () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteButton.className = audioPlayer.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
});