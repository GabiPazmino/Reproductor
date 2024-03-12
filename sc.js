if(!localStorage.getItem("isLogged")){
    window.location.href = "index.html";
}

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
    
    // TENER DISPONIBLE LOS DATOS DE LA CANCION
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

class Playlist{
    listaCanciones;
    currentIndex;

    constructor(nombre){
        this.nombre = nombre
        this.listaCanciones = [];       
        this.currentIndex = 0;   
       
    }

    // RECIBE LA CANCIÓN QUE DI CLICK Y LA EMPUJA E IMPRIME EN EL DIV DE LA LISTA
    addSongToPlaylist(song){
        this.listaCanciones.push(song)
        this.dibujarCanciones();
        // IMPRIME DATOS DE LA CANCION
        console.log(song);
    }
    
    // IMPRIME LAS CANCIONES EN LAS LISTAS
    dibujarCanciones(){
        let canciones = document.getElementById(this.nombre);
        // IMPRIME EL NOMBRE DE LA PLAYLIST
        console.log(this.nombre);
        let icon = "";
        let icon2 = "";
        switch (this.nombre){
            case "favoritos":
                icon = "fa-plus";
                icon2 = "fa-trash";
                                    
                break;
            
            case "myPlaylist":
                icon = "fa-heart";
                icon2 = "fa-trash";
                break;
            
        }
        canciones.innerHTML = "";
        this.listaCanciones.forEach(song => {
            canciones.innerHTML += `
            <li id="res_${song.id}">${song.nombre}
            <span class="playSong fa-solid fa-play" data-idCancion="${song.id}"></span>
            <span class="favoritos fa ${icon}" data-idCancion="${song.id}"></span >  
            <span class="myPlaylist fa-solid ${icon2}" data-idCancion="${song.id}"></span>                      
        </li>`;
        } )

        // escucha para reproducir
        this.onPlay();
    }    
    
    // ESCUCHA AL PLAYSONG
    onPlay(){
        let playSongs = document.getElementsByClassName("playSong");
        for (let i = 0; i < playSongs.length; i++){
            
            playSongs[i].addEventListener("click", ()=>{
                let id = playSongs[i].getAttribute("data-idCancion");
                let cancion = this.listaCanciones.find(song => song.id == id);
                this.currentIndex = i;
                let event = new CustomEvent("playSong", {
                    detail: {
                        song: cancion,
                        actual: this.nombre,
                        id: this.currentIndex
                    },               
                });
                document.dispatchEvent(event);
            })
        }
    }

    // removeSongFromPlaylist (id){
    //     this.listaCanciones = this.listaCanciones.find(song => song.id == id);
    //     this.listaCanciones.splice(id, 1);
    //     this.dibujarCanciones();
    // //    IMPRIME DATOS DE LA CANCION
    //     console.log(id);
    // }


    nextSong (id){
        let index = this.listaCanciones.findIndex(song => song.id == id);
        
        return this.listaCanciones[index +1];
        
    }

    prevSong (id){        
        let index = this.listaCanciones.findIndex(song => song.id == id);
        return this.listaCanciones[index -1];
    }
}

class Reproductor{
    catalogoCanciones;
    currentSong;
    audio;
    filtroCanciones;
    currentPlaylist;
    favoritos;
    myPlaylist;
    isPaused;
    currentIndex;
    
   

    constructor() {
        this.catalogoCanciones = [
            new Song (1, "Morir en tu piel", "9 Pürpura", "9 Pürpura", "2009", "Rock", "4:23", "1.jpg", "1.mp3" ),
            new Song (2, "An Ornament", "Negative", "Karma Killer", "2009", "Rock", "5:59", "2.jpeg", "2.mp3"),
            new Song (3, "Como tú", "Jaguares", "Cuando la sangre galopa", "2001", "Rock", "4:15", "3.jpeg", "3.mp3"),
            new Song (4, "Aún", "Coda", "Veinte Para las Doce", "1995", "Rock", "4:53", "4.jpeg", "4.mp3"),
            new Song (5, "Because of you", "Skunk Anansie", "Smashes & Trashes", "2009", "Rock", "4:28", "5.jpeg", "5.mp3"),
            new Song (6, "Black", "Pearl Jam", "Ten", "1991", "Alternative", "5:44", "6.jpeg", "6.mp3"),
            new Song (7, "Born from fire", "Amorphis", "Eclipse", "2006", "Alternative", "4:09", "7.jpeg", "7.mp3"),
            new Song (8, "Cadaver exquisito", "Fito Paez", "Euforia", "1997", "Pop", "5:37", "8.jpeg", "8.mp3"),
            new Song (9, "Crawling", "Linkin Park", "Hibris Theory", "2002", "Alternative", "3:29", "9.jpeg", "9.mp3"),
            new Song (10, "Day and then the shade", "Katatonia", "Night is The New Day", "2009", "Alternative", "4:26", "10.jpeg", "10.mp3"),
            new Song (11, "Demonios", "Estopa", "Mas Destrangis", "2002", "Pop_folk", "3:44", "11.jpeg", "11.mp3"),
            new Song (12, "Flying", "Anathema", "A Natural Disaster", "2004", "Metal", "5:56", "12.jpeg", "12.mp3"),
            new Song (13, "Ghost of love", "The Rasmus", "Black Roses", "2008", "Rock", "3:17", "13.jpeg", "13.mp3"),
            new Song (14, "In joy and sorrow", "HIM", "Deep Shadows and Brilliant Highlights", "2001", "Gótico", "4:00", "14.jpeg", "14.mp3"),
            new Song (15, "Incendialo todo", "Mama Vudu", "Luna Lombriz", "2001", "Rock", "1:33", "15.jpeg", "15.mp3"),
            new Song (16, "Je veux", "Zaz", "Zaz", "2010", "Blues", "3:37", "16.jpeg", "16.mp3"),
            new Song (17, "Join me in death", "HIM", "Razorble Romance", "2000", "Gótico", "3:36", "17.jpeg", "17.mp3"),
            new Song (18, "Justify", "The Rasmus", "Black Roses", "2008", "Rock", "4:26", "13.jpeg", "18.mp3"),
            new Song (19, "Lose you tonight", "HIM", "Deep Shadows and Brilliant Highlights", "2001", "Gótico", "3:41", "14.jpeg", "19.mp3"),
            new Song (20, "Maldito corazón", "Saratoga", "El Clan de la Lucha", "2004", "Heavy Metal", "5:56", "20.jpeg", "20.mp3"),
            new Song (21, "New dawn", "Entwine", "Gone", "2001", "Gótico", "3:57", "21.jpeg", "21.mp3"),
            new Song (22, "One last time", "Dream Theater", "Scenes from a Memory", "1999", "Progressive", "3:46", "22.jpeg", "22.mp3"),
            new Song (23, "Pull me under", "Dream Theater", "Images and Words", "1992", "Progressive", "8:14", "23.jpeg", "23.mp3"),
            new Song (24, "Rain", "Mika", "The Boy who Knew too Much", "2009", "Pop", "3:43", "24.jpeg", "24.mp3"),
            new Song (25, "Set fire to the rain", "Adele", "21", "2011", "Pop", "4:01", "25.jpeg", "25.mp3"),
            new Song (26, "Tears of the dragon", "Bruce Dickinson", "Balls to Picasso", "1994", "Rock", "6:20", "26.jpeg", "26.mp3"),
            new Song (27, "The kill", "30 Seconds to Mars", "A Beautiful Lie", "2005", "Rock", "3:51", "27.jpeg", "27.mp3"),
            new Song (28, "Twisted", "Skunk Anansie", "Smashes & Trashes", "2009", "Rock", "4:14", "5.jpeg", "28.mp3"),
            new Song (29, "Wicked game", "HIM", "Razorble Romance", "2000", "Gótico", "4:05", "17.jpeg", "29.mp3"),
            new Song (30, "하루만", "정준영", "Teenager", "2014", "Pop", "4:54", "30.jpeg", "30.mp3")
        ];
        // carga toda la lista al iniciar
        this.mostrarCanciones();
        // si solo doy play se inicia en la cancion 1
        this.currentSong = this.catalogoCanciones[0];
        // inicializo el objeto audio
        this.audio = new Audio();
        // si solo doy play empieza por el div busqueda
        this.currentPlaylist = "canciones";
        this.favoritos = new Playlist ("favoritos");
        this.myPlaylist = new Playlist ("myPlaylist");  
        
        // ESCUCHA CUANDO DA CLICK EN ALGUNA LISTA Y LE AVISA AL REPRODUCTOR
        document.addEventListener("playSong", (e) => {
            // canción que debe reproducir
            this.currentSong = e.detail.song;
            // id de la canci+on que reproducir
            this.currentIndex = e.detail.id;
            // de que playlist es la canción
            this.currentPlaylist = e.detail.actual;
            this.play();
        } )

        // inicia en pausa 
        this.isPaused = false;
        this.iniciaControles();
    }

    iniciaControles(){
        let buscar = document.getElementById("searchButton");
        let inputBuscar = document.getElementById("inputBuscar");
        // let inputValue = inputBuscar.value;
        buscar.addEventListener("click", ()=> {
            this.buscarCancion(inputBuscar.value);
        })

        let play = document.getElementById("play");
        play.addEventListener("click", ()=> {            
            this.play();
            console.log("play")
        })

        let stop = document.getElementById("stop");
        stop.addEventListener("click", ()=> {
            this.audio.pause();
            this.audio.currentTime = 0;
            console.log("stop")
        })

        let mute = document.getElementById("mute");
        mute.addEventListener("click", () =>{
            this.toggleMute();
        })

        let forward = document.getElementById("adelanta");
        forward.addEventListener("click", () => {   
            
            if(this.currentIndex === this.currentPlaylist.length-1){
                this.currentIndex = 0;
                this.play();
            }else{
                // this.currentIndex++;
                this.next();
            };
            // this.next();
            console.log("estoy adelantando")
        })

        let backward = document.getElementById("retrocede");
        backward.addEventListener("click", () => {   
                    
            if(this.currentIndex === this.currentPlaylist.length-1){
                this.currentIndex = 0;
                this.play();
            }else{
                this.prev();
            };
            // this.prev();
            console.log("estoy retrocediendo")
        })
        
     
        // para cambiar de canción
       this.audio.addEventListener("ended", ()=> {
            this.next();     
           
           console.log("La reproducción ha finalizado.");
        })
    }

    mostrarCanciones = function(playlist){
        let canciones = document.getElementById("canciones");
        this.catalogoCanciones.forEach(song => {
            canciones.innerHTML += 
            `<li data-idCancion = "${song.id}">${song.nombre} 
            <span class="playSong fa-solid fa-play" data-idCancion = "${song.id}">
            </span>
            <span class="favoritos fa-solid fa-heart" data-idCancion = "${song.id}">
            </span>
            <span class="myPlaylist fa-solid fa-plus" data-idCancion = "${song.id}">
            </span>
            </li>`;        
        });  

        // DAR FUNCION AL BOTON PLAY DE LISTAS 
        // defino la variable con las clases de los botones play
        let playSongs = document.getElementsByClassName("playSong");
        for (let i = 0; i < playSongs.length; i++){
            playSongs[i].addEventListener("click", ()=>{
                // defino la última lista con la que interactúo
                this.currentPlaylist = "canciones";
                this.currentIndex = i;
                // guardo el id de cada canción al dar click sobre ella (el atributo "data-" da la info de la canción, en este caso el id)
                let id = playSongs[i].getAttribute("data-idCancion");                
                // encuentro mi la cancion por el id en el catálogo de canciones
                this.currentSong = this.catalogoCanciones.find(song => song.id == id);
                // reproduzco
                this.play();
                console.log (id)
            })
        }
     
        // AGREGAR CANCIONES A FAVORITOS
        let favoritos = document.getElementsByClassName("favoritos");
        for (let i = 0; i < favoritos.length; i++){
            favoritos[i].addEventListener("click", ()=>{
                let id = favoritos[i].getAttribute("data-idCancion");
                // método que agrega la canción a una playlist, recibe el id y el nombre de la playlist
                this.addPlaylist(id, "favoritos");      
                console.log(id)          
            })
        }

        // AGREGA CANCIONES A MI LISTA
        let myPlaylist = document.getElementsByClassName("myPlaylist");
        for (let i = 0; i < myPlaylist.length; i++){
            myPlaylist[i].addEventListener("click", ()=>{
                let id = myPlaylist[i].getAttribute("data-idCancion");
                this.addPlaylist(id, "myPlaylist");  
                console.log(id)                 
            })
        }       
        

    }

    // UBICA LA CANCION QUE DI CLICK Y LA BUSCA EN EL CATÁLOGO PAR AGREGARLA A ALGUNA LISTA
    addPlaylist = function(id, playlist){
        let cancion = this.catalogoCanciones.find(song => song.id == id);          

        switch (playlist){
            case "favoritos":
                this.favoritos.addSongToPlaylist(cancion);
                let myPlaylist = document.getElementsByClassName("myPlaylist");
                // agrega de favoritos a myplaylist                
                // for (let i = 0; i < myPlaylist.length; i++){
                //     myPlaylist[i].addEventListener("click", ()=>{
                //         let id = myPlaylist[i].getAttribute("data-idCancion");
                //          // método que agrega la canción a una playlist, recibe el id y el nombre de la playlist
                //         this.addPlaylist(id, "myPlaylist");
                //         console.log(id)                 
                //     })
                // }
                break;
            case "myPlaylist":
                this.myPlaylist.addSongToPlaylist(cancion);
                let favoritos = document.getElementsByClassName("favoritos");                
                // agrega de  myplaylist a favoritos
                // for (let i = 0; i < favoritos.length; i++){
                //     favoritos[i].addEventListener("click", ()=>{
                //         let id = favoritos[i].getAttribute("data-idCancion");
                //         // método que agrega la canción a una playlist, recibe el id y el nombre de la playlist
                //         this.addPlaylist(id, "favoritos");                            
                //         console.log(id)          
                //     })
                // }
                break;
        }         
    }

        // UBICA LA CANCION QUE DI CLICK Y LA BUSCA PAR eliminarLA DE ALGUNA LISTA
    // removePlaylist = function(id, playlist){
    //     // let cancion = this.catalogoCanciones.find(song => song.id == id);

    //     switch (playlist){
    //         case "favoritos":
    //             this.favoritos.removeSongFromPlaylist(id);
    //             let myPlaylist = document.getElementsByClassName("myPlaylist");
    //             // quita de favoritos a myplaylist                
    //             for (let i = 0; i < myPlaylist.length; i++){
    //                 myPlaylist[i].addEventListener("click", ()=>{
    //                     let id = myPlaylist[i].getAttribute("data-idCancion");
    //                      // método que quita la canción a una playlist, recibe el id y el nombre de la playlist
    //                     this.removePlaylist(id, "myPlaylist");
    //                     console.log(id)                 
    //                 })
    //             }
    //             break;
        
    //         case "myPlaylist":
    //             this.myPlaylist.removeSongFromPlaylist(id);
    //             let favoritos = document.getElementsByClassName("favoritos");                
    //             // quita de  myplaylist a favoritos
    //             for (let i = 0; i < favoritos.length; i++){
    //                 favoritos[i].addEventListener("click", ()=>{
    //                     let id = favoritos[i].getAttribute("data-idCancion");
    //                     // método que quita la canción a una playlist, recibe el id y el nombre de la playlist
    //                     this.removePlaylist(id, "favoritos");                            
    //                     console.log(id)          
    //                 })
    //             }
    //             break;
    //     }
    // };

      // MÉTODO MOSTRAR BÚSQUEDA DE CANCIONES
    mostrarBusqueda(filtroCanciones){
        let canciones = document.getElementById("canciones");
        filtroCanciones.forEach(song => {
            canciones.innerHTML += 
            `<li id = "res_${song.id}">${song.nombre} 
            <span class="playSong fa-solid fa-play">
            </span>
            <span class="favoritos fa-solid fa-heart">
            </span>
            <span class="myPlaylist fa-solid fa-plus">
            </span>
            </li>`; 
        })   
    }
    
    // MÉTODO PARA BUSCAR CANCIONES
    buscarCancion = function(inputUser){
        // QUITO ESPACIOS
        inputUser = inputUser.trim();
        // CAMBIO A MINÚSCULAS
        inputUser = inputUser.toLowerCase();
        // LIMPIO EL DIV
        let canciones = document.getElementById("canciones");
        canciones.innerHTML = "";
        // RESULTADO BUSQUEDA POR NOMBRE, ALBÚM Y AUTOR
        let resNombre = this.catalogoCanciones.filter(song => song.nombre.toLowerCase().match(inputUser));
        let resAlbum = this.catalogoCanciones.filter(song => song.album.toLowerCase().match(inputUser));
        let resAutor = this.catalogoCanciones.filter(song => song.autor.toLowerCase().match(inputUser));
        // UNO LOS RESULTADOS EN UN SOLO ARREGLO, UTILIZO ... PARA PASAR CADA UNO DE LOS VALORES DEL ARREGLO
        let filtroCanciones = [...resNombre, ...resAlbum, ...resAutor];
        // LIMPIO DUPLICADOS DEL ARREGLO
        filtroCanciones = [...new Set(filtroCanciones)];
        // muestro mi busqueda en el div lista busqueda
        console.log(filtroCanciones);
        console.log("esto se ingresó: " + inputUser);
        if (filtroCanciones.length === 0) {
            canciones.innerHTML = "<p>No se encontraron resultados.</p>";
        } else {
            this.mostrarBusqueda(filtroCanciones);
        }
    }
  
    // MÉTODO CAMBIAR PORTADA
    cambiarPortada = function(){
        let cover = document.getElementById("cover");
        cover.src = "cover/"+ this.currentSong.cover;
    }

    // MÉTODO CAMBIAR Datos de canciones al reproductor
    cambiarDatos = function(){
        let albumSee = document.getElementById("albumSee");
        let nombreSee = document.getElementById("nombreSee");
        let autorSee = document.getElementById("autorSee");
        let duracionSee = document.getElementById("duracionSee");
        let generoSee = document.getElementById("generoSee");
        albumSee.innerHTML = this.currentSong.album;
        nombreSee.innerHTML = this.currentSong.nombre;
        autorSee.innerHTML = this.currentSong.autor;
        duracionSee.innerHTML = this.currentSong.duracion;
        generoSee.innerHTML = this.currentSong.genero;        
    }

// MÉTODO PARA REPRODUCIR CANCIÓN
    play = function(){
        if(this.currentSong !== undefined && this.isPaused == false){
            this.audio.src = "mp3/" + this.currentSong.urlSong;
            this.audio.play();
            this.cambiarPortada();
            this.cambiarDatos();
        }else{
            this.audio.play();
            this.isPaused = true;
        }        
    }

    toggleMute() {
        this.audio.muted = !this.audio.muted;
        console.log(`Modo de silencio: ${this.audio.muted ? 'activado' : 'desactivado'}`);
    }

    next = function(){        
        let id = this.currentSong.id;
        switch(this.currentPlaylist){
            case "canciones":                
                this.currentSong = this.catalogoCanciones.find(song => song.id == id+1);
                this.play();
                break;
            case "favoritos":
                this.currentSong = this.favoritos.nextSong(id);
                this.play();
                break;
            case "myPlaylist":
                this.currentSong = this.myPlaylist.nextSong(id);
                this.play();
                break;
    }}


    prev = function(){
        let id = this.currentSong.id;
        switch(this.currentPlaylist){
            case "canciones":                
                this.currentSong = this.catalogoCanciones.find(song => song.id == id-1);     
                this.play();
                break;
            case "favoritos":
                this.currentSong = this.favoritos.prevSong(id);
                this.play();
                break;
            case "myPlaylist":
                this.currentSong = this.myPlaylist.prevSong(id);
                this.play();
                break;
        }

              
    }   
}


let reproductor = new Reproductor();