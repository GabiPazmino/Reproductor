// VARIABLES
let divCanciones = document.getElementById("canciones");
let inputBuscar = document.querySelector("#inputBuscar");
let botonBuscar = document.getElementById("searchButton");
let playButton = document.querySelector("#play");
let stopButton = document.querySelector("#stop");

class Cancion {
    constructor (nombre, autor, album, año, genero, duracion, cover, urlSong){
        this.nombre = nombre
        this.autor = autor       
        this.album = album
        this.año = año
        this.genero = genero
        this.duracion = duracion
        this.cover = cover
        this.urlSong = urlSong
    };
    
    getSongAlbum() { 
        return `${this.nombre} - ${this.album}`
    }

    getSongUrl(){
        return this.urlSong
    }
}

class Playlist{
    constructor(nombre, listaCanciones, ordenEscucha){
        this.nombre = nombre
        this.listaCanciones = listaCanciones       
        this.ordenEscucha = ordenEscucha
    }
    
    getPlaylistName(){
        return this.nombre   
    }

    getPlaylistSongs(){
        return this.listaCanciones     
    }

    getPlaylistListeningOrder(){
        return this.ordenEscucha      
    }

    addSongToPlaylist(song){
        this.listaCanciones.push(song)
    }

    removeSongFromPlaylist(song){
        this.listaCanciones = this.listaCanciones.filter(s => s !== song)
    }

    playPlaylist(){
        this.listaCanciones.forEach(song => {
            console.log(`Playing: ${song.nombre}`)
        })
    }

    getCurrentSong(){
        return this.listaCanciones[i]
    }

    nextSong(){
        this.listaCanciones.shift()
    }
}

class Reproductor{
    catalogoCanciones;
    currentSong;
    audio;
    filtroCanciones;
    currentPlaylist;

    constructor() {
        this.catalogoCanciones = [
            new Cancion ("Morir en tu piel", "9 Púrpura", "9 Púrpura", 2009, "Rock", 4.23, 3, "mp3/Morir en tu piel.mp3" ),
            new Cancion ("An Ornament", "Negative", "Karma Killer", 2009, "Rock", 5.59, "cover/1.jpeg", "mp3/An Ornament.mp3"),
            new Cancion ("Así como tú", "Jaguares", "Cuando la sangre galopa", 2001, "Rock", 4.15, "cover/2.jpeg", "mp3/Como tu.mp3")
        ];

        this.mostrarCanciones()
        this.currentSong = this.catalogoCanciones[0]
        this.audio = new Audio()
        this.currentPlaylist = "divCanciones"      
    }

    mostrarCanciones = function(){
        this.catalogoCanciones.forEach(song => {
            divCanciones.innerHTML += `<li>${song.nombre} <button class="boton-play">
            <i class="fa-solid fa-play"></i>
            </button>
            <button class="boton-agregarFav">
            <i class="fa-solid fa-heart"></i>
            </button>
            <button class="boton-agregarLista">
            <i class="fa-solid fa-plus"></i>
            </button>
        </li>`
        })   
    }

    botonBuscar.addEventListener("click", () => {
        this.buscarCancion(inputBuscar.value);   
    })   

// MÉTODO MOSTRAR BÚSQUEDA DE CANCIONES
    mostrarBusqueda(filtroCanciones){
        filtroCanciones.forEach(song => {
            divCanciones.innerHTML += `<li>${song.nombre} <button class="boton-play">
            <i class="fa-solid fa-play"></i>
            </button>
            <button class="boton-agregarFav">
            <i class="fa-solid fa-heart"></i>
            </button>
            <button class="boton-agregarLista">
            <i class="fa-solid fa-plus"></i>
            </button>
        </li>`;
        })   
    }

// MÉTODO PARA BUSCAR CANCIONES
    buscarCancion = function(inputUser){
        // QUITO ESPACIOS
        inputUser = inputUser.trim(inputUser);
        // CAMBIO A MINÚSCULAS
        inputUser = inputUser.toLowerCase();
        // LIMPIO EL DIV
        divCanciones.innerHTML = "";
        // RESULTADO BUSQUEDA POR NOMBRE, ALBÚM Y AUTOR
        let resNombre = this.catalogoCanciones.filter(song => song.nombre.match(inputUser));
        let resAlbum = this.catalogoCanciones.filter(song => song.album.match(inputUser));
        let resAutor = this.catalogoCanciones.filter(song => song.autor.match(inputUser));
        // UNO LOS RESULTADOS EN UN SOLO ARREGLO, UTILIZO ... PARA PASAR CADA UNO DE LOS VALORES DEL ARREGLO
        let filtroCanciones = [...resNombre, ...resAlbum, ...resAutor];
        // LIMPIO DUPLICADOS DEL ARREGLO
        filtroCanciones = [...new Set(filtroCanciones)];
        this.mostrarBusqueda(filtroCanciones);
    }



   

    play = function(){
        let audio = new Audio(this.currentSong.urlSong);

        audio.play();
    }

    stop = function(){
            stopButton.addEventListener("click", ()=> {
            let currentSong = this.getCurrentSong();
            let audio = new Audio(this.currentSong.urlSong);
        })
        
        audio.pause();
        audio.currentTime = 0;
        // audio.stop();
    }
}

let reproductor = new Reproductor();
console.log(reproductor.buscarCancion("cancion"));


 // bucarCancion = function(songName){
    //     return this.catalogoCanciones.find(song => song.nombre === songName);
    // }

    // bucarAlbum = function(songAlbum){
    //     return this.catalogoCanciones.find(song => song.album === songAlbum);
    // }

    // bucarAutor = function(songAutor){
    //     return this.catalogoCanciones.find(song => song.autor === songAutor);
    // }


    // // DIV LISTA DE REPRODUCCIÓN
// function actualizarLista(params) {
//     // LIMPIAR LA LISTA ACTUAL
//     divCanciones.innerHTML = ""; 

//     listaCanciones.forEach(song => {
//     divCanciones.innerHTML +=  `
//     <li>${song} <button class="boton-play">
//         <i class="fa-solid fa-play"></i>
//         </button>
//         <button class="boton-agregarFav">
//         <i class="fa-solid fa-heart"></i>
//         </button>
//         <button class="boton-agregarLista">
//         <i class="fa-solid fa-plus"></i>
//         </button>
//     </li>`;
// });
// }
//PARA QUE APAREZCA UNA LISTA PREVIA CARGADA
// actualizarLista(); 

// AGREGA AL DIV LISTA DE REPRODUCCIÓN, LA CANCIÓN QUE SE BUSCA 
// botonBuscar.addEventListener("click", function(){
//     // CREA UN ARREGLO CON LO QUE SE INGRESA EN INPUT BÚSQUEDA
//     let cancionBuscada = inputBuscar.value;
//     // CREA UNA EXPRESIÓN REGULAR
//     let expresion = new RegExp(cancionBuscada, "i")
//     // FILTRAR QUE NO ESTÉN REPERIDAS Y QUE COINCIDAN CON LAS QUE ESTÁN EN EL DIV ORIGINAL
//     let cancionFiltrada = listaCanciones.filter(
//         song => expresion.test(song)
//     )
//     console.log(cancionFiltrada)
//     // listaCanciones.push(inputBuscar.value);
//     // actualizarLista();
// })