// VARIABLES
// let canciones = document.getElementById("canciones");
// let divLista = document.getElementById("myPlaylist");
// let divFavoritos = document.getElementById("favoritos");
// let cover = document.getElementById("cover");

class Song {
    constructor (id, nombre, autor, album, año, genero, duracion, cover, urlSong){
        this.id = id
        this.nombre = nombre
        this.autor = autor       
        this.album = album
        this.año = año
        this.genero = genero
        this.duracion = duracion
        this.cover = cover
        this.urlSong = urlSong
    };
    
    getSongNombre() { 
        return this.nombre
    }

    getSongAutor() { 
        return this.autor
    }

    getSongAlbum() { 
        return this.album
    }

    getSongYear() { 
        return this.año
    }

    getSongGenero() { 
        return this.genero
    }

    getSongDuracion() { 
        return this.duracion
    }

    getSongCover() { 
        return this.cover
    }

    getSongUrl(){
        return this.urlSong
    }
}

// class Playlist{
//     listaCanciones;

//     constructor(nombre, listaCanciones, ordenEscucha){
//         this.nombre = nombre
//         this.listaCanciones = listaCanciones       
//         this.ordenEscucha = ordenEscucha
//     }

//     addSongToPlaylist(song){
//         this.listaCanciones.push(song)
//         this.dibujarCanciones();
//     }
    
//     dibujarCanciones(){
//         let canciones = document.getElementById(this.nombre);
//         let icon = "";
//         let icon2 = "";
//         switch (this.nombre){
//             case "divFavoritos":
//                 icon = "fa-plus";
//                 icon2 = "fa-regular fa-heart";
//                 break;
            
//             case "divLista":
//                 icon = "fa-trash";
//                 icon2 = "fa-heart";
//                 break;
//         }
//         canciones.innerHTML = "";
//         this.listaCanciones.forEach(song => {
//             canciones.innerHTML += `
//             <li id="res_${song.id}" class="cancion">${song.nombre}
//             <button class="playSong" data-idCancion="${song.id}> <i class="fa-solid fa-play"></i>
//             </button>
//             <button class="addPlaylist" data-idCancion="${song.id}> <i class="fa-solid ${icon}"></i>
//             </button>
//             <button class="favoritos" data-idCancion="${song.id}> <i class="fa ${icon2}"></i>
//             </button>
            
//         </li>`;
//         } )

//         this.onPlay();
//     }    
    
//     onPlay(){
//         let playSongs = document.getElementsByClassName("playSong");
//         for (let i = 0; i < playSongs.length; i++){
            
//             playSongs[i].addEventListener("click", ()=>{
//                 let id = playSongs[i].getAttribute("data-idCancion");
//                 let cancion = this.listaCanciones.find(song => song.id == id);
//                 let event = new CustomEvent("playSong", {
//                     detail: {
//                         song:cancion,
//                         actual: this.nombre
//                     }
                    
//                 })
//                 document.dispatchEvent(event);
//             })
//         }
//     }


//     // nextSong (id){}
// }

class Reproductor{
    catalogoCanciones;
    currentSong;
    // audio;
    // filtroCanciones;
    // currentPlaylist = "canciones";
    // favoritos;
    // myPlaylist;
    // isPaused;

    constructor() {
        this.catalogoCanciones = [
            new Song (1, "Morir en tu piel", "9 Púrpura", "9 Púrpura", "2009", "Rock", "4:23", "cover/1.jpeg", "mp3/1.mp3" ),
            new Song (2, "An Ornament", "Negative", "Karma Killer", "2009", "Rock", "5:59", "cover/2.jpeg", "mp3/2.mp3"),
            new Song (3, "Como tú", "Jaguares", "Cuando la sangre galopa", "2001", "Rock", "4:15", "cover/3.jpeg", "mp3/3.mp3"),
            new Song (4, "Aún", "Coda", "Veinte Para las Doce", "1995", "Rock", "4:53", "cover/4.jpeg", "mp3/4.mp3"),
            new Song (5, "Because of you", "Skunk Anansie", "Smashes & Trashes", "2009", "Rock", "4:28", "cover/5.jpeg", "mp3/5.mp3"),
            new Song (6, "Black", "Pearl Jam", "Ten", "1991", "Alternative", "5:44", "cover/6.jpeg", "mp3/6.mp3"),
            new Song (7, "Born from fire", "Amorphis", "Eclipse", "2006", "Alternative", "4:09", "cover/7.jpeg", "mp3/7.mp3"),
            new Song (8, "Cadaver exquisito", "Fito Paez", "Euforia", "1997", "Pop", "5:37", "cover/8.jpeg", "mp3/8.mp3"),
            new Song (9, "Crawling", "Linkin Park", "Hibris Theory", "2002", "Alternative", "3:29", "cover/9.jpeg", "mp3/9.mp3"),
            new Song (10, "Day and then the shade", "Katatonia", "Night is The New Day", "2009", "Alternative", "4:26", "cover/10.jpeg", "mp3/10.mp3"),
            new Song (11, "Demonios", "Estopa", "Mas Destrangis", "2002", "Pop_folk", "3:44", "cover/11.jpeg", "mp3/11.mp3"),
            new Song (12, "Flying", "Anathema", "A Natural Disaster", "2004", "Metal", "5:56", "cover/12.jpeg", "mp3/12.mp3"),
            new Song (13, "Ghost of love", "The Rasmus", "Black Roses", "2008", "Rock", "3:17", "cover/13.jpeg", "mp3/13.mp3"),
            new Song (14, "In joy and sorrow", "HIM", "Deep Shadows and Brilliant Highlights", "2001", "Gótico", "4:00", "cover/14.jpeg", "mp3/14.mp3"),
            new Song (15, "Incendialo todo", "Mama Vudu", "Luna Lombriz", "2001", "Rock", "1:33", "cover/15.jpeg", "mp3/15.mp3"),
            new Song (16, "Je veux", "Zaz", "Zaz", "2010", "Blues", "3:37", "cover/16.jpeg", "mp3/16.mp3"),
            new Song (17, "Join me in death", "HIM", "Razorble Romance", "2000", "Gótico", "3:36", "cover/17.jpeg", "mp3/17.mp3"),
            new Song (18, "Justify", "The Rasmus", "Black Roses", "2008", "Rock", "4:26", "cover/13.jpeg", "mp3/13.mp3"),
            new Song (19, "Lose you tonight", "HIM", "Deep Shadows and Brilliant Highlights", "2001", "Gótico", "3:41", "cover/14.jpeg", "mp3/14.mp3"),
            new Song (20, "Maldito corazón", "Saratoga", "El Clan de la Lucha", "2004", "Heavy Metal", "5:56", "cover/20.jpeg", "mp3/20.mp3"),
            new Song (21, "New dawn", "Entwine", "Gone", "2001", "Gótico", "3:57", "cover/21.jpeg", "mp3/21.mp3"),
            new Song (22, "One last time", "Dream Theater", "Scenes from a Memory", "1999", "Progressive", "3:46", "cover/22.jpeg", "mp3/22.mp3"),
            new Song (23, "Pull me under", "Dream Theater", "Images and Words", "1992", "Progressive", "8:14", "cover/23.jpeg", "mp3/23.mp3"),
            new Song (24, "Rain", "Mika", "The Boy who Knew too Much", "2009", "Pop", "3:43", "cover/24.jpeg", "mp3/24.mp3"),
            new Song (25, "Set fire to the rain", "Adele", "21", "2011", "Pop", "4:01", "cover/25.jpeg", "mp3/25.mp3"),
            new Song (26, "Tears of the dragon", "Bruce Dickinson", "Balls to Picasso", "1994", "Rock", "6:20", "cover/26.jpeg", "mp3/26.mp3"),
            new Song (27, "The kill", "30 Seconds to Mars", "A Beautiful Lie", "2005", "Rock", "3:51", "cover/27.jpeg", "mp3/27.mp3"),
            new Song (28, "Twisted", "Skunk Anansie", "Smashes & Trashes", "2009", "Rock", "4:14", "cover/5.jpeg", "mp3/5.mp3"),
            new Song (29, "Wicked game", "HIM", "Razorble Romance", "2000", "Gótico", "4:05", "cover/17.jpeg", "mp3/17.mp3"),
            new Song (30, "하루만", "정준영", "Teenager", "2014", "Pop", "4:54", "cover/30.jpeg", "mp3/30.mp3")
        ];
        // carga toda la lista al iniciar
        this.mostrarCanciones();
        this.currentSong = this.catalogoCanciones[0];
        // this.audio = new Audio();
        // this.currentPlaylist = "canciones";
        // this.favoritos = new Playlist("divFavoritos");
        // this.myPlaylist = new Playlist ("divLista");  
        
        // document.addEventListener("playSong", (e) => {
        //     this.currentSong = e.detail.song;
        //     this.currentPlaylist = e.detail.actual;
        //     this.play();
        // } )

        // this.isPaused = false;
        // this.iniciaControles();
    }

    // iniciaControles(){
    //     let buscar = document.getElementById("searchButton");
    //     let inputBuscar = document.getElementById("inputBuscar");
    //     buscar.addEventListener("click", ()=> {
    //         this.buscarCancion(inputBuscar.value);
    //     })

        // let play = document.getElementById("play");
        // play.addEventListener("click", ()=> {
        //     this.audio.play();
        // })

    //     let stop = document.getElementById("stop");
    //     stop.addEventListener("click", ()=> {
    //         this.audio.pause();
    //         this.audio.currentTime = 0;
    //     })

    //     let pause = document.getElementById("pause");
    //     pause.addEventListener("click", ()=> {
    //         this.isPaused = true;
    //         this.audio.pause();            
    //     })

    //     this.audio.addEventListener("ended", ()=> {
    //         console.log("La reproducción ha finalizado.");
    //     })
    // }

    mostrarCanciones = function(playlist){
        let canciones = document.getElementById("canciones");
        this.catalogoCanciones.forEach(song => {
            canciones.innerHTML += 
            `<li id = "res_${song.id}">${song.nombre} 
            <span class="playSong fa-solid fa-play">
            </span>
            <span class="favoritos fa-solid fa-heart">
            </span>
            <span class="addPlaylist fa-solid fa-plus">
            </span>
            </li>`;        
        });  

        // // poner play a canciones 
        // let playSongs = document.getElementsByClassName("playSong");
        // for (let i = 0; i < playSongs.length; i++){
        //     playSongs[i].addEventListener("click", ()=>{
        //         this.currentPlaylist = "canciones";
        //         let id = playSongs[i].parentElement.getAttribute("data-idCancion");
        //         this.currentSong = this.catalogoCanciones.find(song => song.id == id);
        //         this.play();
        //     })
        // }

        // // poner canciones a favoritos
        // let favoritos = document.getElementsByClassName("favoritos");
        // for (let i = 0; i < favoritos.length; i++){
        //     favoritos[i].addEventListener("click", ()=>{
        //         let id = favoritos[i].getAttribute("data-idCancion");
        //         this.addPlaylist(is, "favoritos");                
        //     })
        // }

        // // poner canciones a mi lista
        // let addPlaylist = document.getElementsByClassName("addPlaylist");
        // for (let i = 0; i < addPlaylist.length; i++){
        //     addPlaylist[i].addEventListener("click", ()=>{
        //         let id = addPlaylist[i].getAttribute("data-idCancion");
        //         this.addPlaylist(is, "myPlaylist");                
        //     })
        // }

    }

    // addPlaylist = function(id, playlist){
    //     let cancion = this.catalogoCanciones.find(song => song.id == id);

    //     switch (playlist){
    //         case favoritos:
    //             this.favoritos.addSongToPlaylist(cancion);
    //             break;
    //         case myPlaylist:
    //             this.addPlaylist.addSongToPlaylist(cancion);
    //             break;
    //     }
    // }

// // MÉTODO MOSTRAR BÚSQUEDA DE CANCIONES
//     mostrarBusqueda(filtroCanciones){
//         let canciones = document.getElementById("canciones");
//         filtroCanciones.forEach(song => {
//             canciones.innerHTML += 
//             `<li id= "res_${song.id}" class = "cancion">${song.nombre} <button class="boton-play">
//             <i class="fa-solid fa-play"></i>
//             </button>
//             <button class="boton-agregarFav">
//             <i class="fa-solid fa-heart"></i>
//             </button>
//             <button class="boton-agregarLista">
//             <i class="fa-solid fa-plus"></i>
//             </button>
//         </li>`;
//         })   
//     }

// MÉTODO PARA BUSCAR CANCIONES
    buscarCancion = function(inputUser){
        // QUITO ESPACIOS
        inputUser = inputUser.trim(inputUser);
        // CAMBIO A MINÚSCULAS
        inputUser = inputUser.toLowerCase();
        // LIMPIO EL DIV
        canciones.innerHTML = "";
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
  
// // MÉTODO CAMBIAR PORTADA
//     cambiarPortada = function(){
//         const cover = document.getElementById("cover");
//         // cover.src = "/cover/"+ this.currentSong.cover;
//         cover.src = "/cover/"+ this.currentSong.id + ".jpeg";
//     }

// // MÉTODO PARA REPRODUCIR CANCIÓN
//     play = function(){
//         if(this.currentSong !== undefined && this.isPaused == false){
//             this.audio.src = "/mp3/"+this.currentSong.urlSong;
//             this.audio.play();
//             this.cambiarPortada();
//         }else{
//             this.audio.play();
//             this.isPaused = true;
//         }        
//     }

//     pause = function(){        
//         this.audio.pause();                     
//     }

//     stop = function(){
//         this.isPaused = false;
//         this.audio.pause();
//         this.audio.currentTime = 0;                
//     }

//     next = function(){
//         let id = this.currentSong.id;
//         switch(this.currentPlaylist){
//             case "busqueda":
//                 this.currentSong = this.catalogoCanciones.id;
//                 this.play();
//                 break;
//             case "favoritos":
//                 this.currentSong = this.favoritos.nextSong(id);
//                 this.play();
//                 break;
//             case "myPlaylist":
//                 this.currentSong = this.myPlaylist.nextSong(id);
//                 this.play();
//                 break;
//         }

//         this.currentSong = this.currentPlaylist.getCurrentSong(0);
//         this.play();
          
//     }
    
    
   
}


let reproductor = new Reproductor();





// mostrar canciones`<li class= "cancion" data-idCancion="${song.id}">${song.nombre} 
// <button class="playSong boton-play" data-idCancion="${song.id}>
// <i class="fa-solid fa-play playSong"></i>
// </button>
// <button class="favoritos boton-agregarFav" data-idCancion="${song.id}>
// <i class="fa-solid fa-heart"></i>
// </button>
// <button class="addPlaylist boton-agregarLista" data-idCancion="${song.id}>
// <i class="fa-solid fa-plus"></i>
// </button>
// </li>`;
