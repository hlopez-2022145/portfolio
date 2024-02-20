const ahorcadoPalabras = ['hormiga', 'ardilla', 'cordero', 'caballo', 'ambulancia', 'argumento', 'aerodinamico', 'avergonzado',
    "silla", "mesa", "comida", "gato", "perro", "computadora", "bicicleta", "escritorio", "telefono", "bocinas", "paisaje",
    "sol","luna","teclado"];
    
    let palabras;
    let cantidadDeErrores = 0;
    let numAcietos = 0;

    const btn = id('buscaPalabra');
    //representa una letra del abecedario
    const btnTeclas = document.querySelectorAll( "#teclas button" );
    //agrego un escuchador de enventos, cuando se hacew click se iniciara el juego
    btn.addEventListener('click', comenzar);

    //devuelve un elemento con el id seleccionado
    function id( str ){
        return document.getElementById( str );
    }
    
    function palabrasAleatorias( numeroMin, numeroMax ){
        const amplitudDePalabras = numeroMax - numeroMin;
        const palabraAleatoria = Math.floor( Math.random( ) * amplitudDePalabras ) + numeroMin;
        return palabraAleatoria;
    }

    function comenzar(event){
        btn.disabled = true;
        //cada que iniciamos el juego empezaran desde cero
        cantidadDeErrores = 0;
        numAcietos = 0; 

        const parrafo = id( 'palabraClave' );
        parrafo.innerHTML = ''; 
    
        const cantidadDePalabras = ahorcadoPalabras.length;
        const palabraAleatoria = palabrasAleatorias( 0, cantidadDePalabras );
    
        palabras = ahorcadoPalabras[ palabraAleatoria ];
        console.log( palabras );
        const cantidadDeLetras = palabras.length;
    
        for( let i = 0; i < cantidadDeLetras; i++ ){
            //creamos un elemento para que la palabra que salga subrrallada por cada letra 
            const elemento = document.createElement( 'span' );
            //agregamos al parrafo el elemento que creamos
            parrafo.appendChild( elemento );
        }  

        for( let i = 0; i < btnTeclas.length ; i++ ){
            btnTeclas[ i ].disabled = false;
        }
    }

    // click de adivinar letra 
    for( let i = 0; i < btnTeclas.length ; i++ ){
        btnTeclas[ i ].addEventListener( 'click', botonesPresionados );
    }
//se ejecuta cuando se hace click y verifica si la letra seleccionada esta en la palabra
function botonesPresionados(event){
    const contenido = document.querySelectorAll( '#palabraClave span' );
    const button = event.target; //aca vemos a cuál de todas las letras llama a la función.
    button.disabled = true;//con esto desactivamos la tecla que presionamos

    const letra = button.innerHTML.toLowerCase( );//.toLowerCase() esto nos ayudara a que no haya problema si es mayúscula
    const palabra = palabras.toLowerCase( ); 
    let acerto = true;
    for( let i = 0; i < palabra.length;  i++ ){
        if( letra == palabra[i] ){
            //la variable i es la posición de la letra en la palabra.
            //que coincide con el span al que tenemos que mostarle esta letra
            contenido[i].innerHTML = letra;
            numAcietos++;
            acerto = false;
        }
    }
  
    //Este hara que cuando presione el boton de buscar otra palabra se limpiara el texto acertaste o perdiste
    let respuesta = document.getElementById('resultado');
    let limpiar = document.getElementById('buscaPalabra');

    limpiar.addEventListener('click', function(){
        respuesta.textContent = " ";
        canva.clearRect(200, 98, 150,250);
    });

    if( numAcietos == palabras.length ){
        document.getElementById('resultado').innerHTML = "Acertaste!!!!";
        document.getElementById('buscaPalabra').innerHTML = 'jugar otra vez';
        finDelJuego( );
    }
    // aca evaluamos cuantas vidas tendra cada jugada.
    if(acerto){
        cantidadDeErrores++;
        if (cantidadDeErrores == 7){
            document.getElementById('resultado').innerHTML = "¡Perdiste! La palabra correcta era: " + palabra;
            document.getElementById('buscaPalabra').innerHTML = 'jugar otra vez';
            muerto();
            finDelJuego();
            console.log("muerto");
        }else if(cantidadDeErrores == 6){
            dibujaPiernaDerecha();
            console.log("pierna izquierda");
        }else if(cantidadDeErrores == 5){
            dibujaPiernaIzquierda();
            console.log("piern|a derecha");
        }else if(cantidadDeErrores == 4){
            dibujaBrazoDerecho();
            console.log("brazo derecho");
        }else if(cantidadDeErrores == 3){
            dibujaBrazoIzquierdo();
            console.log("brazo izquierdo");    
        }else if(cantidadDeErrores == 2){
            dibujaCuerpo();
            console.log("cuerpo");
        }else if(cantidadDeErrores == 1){
            dibujaCabeza();
            console.log("cabeza");
        }
    }
}

//desactiva todos los botones cuando el juego termina
function finDelJuego( ){
    for( let i = 0; i < btnTeclas.length ; i++ ){
        btnTeclas[ i ].disabled = true;
    }
    btn.disabled = false;
}

let canvas = document.getElementById('canvas');
let canva = canvas.getContext("2d");

function dibujaPoste(){ 
    canva.beginPath();
    canva.moveTo(150,350);
    canva.lineTo(150,50);
    canva.lineTo(300,50);
    canva.lineTo(300,100);
    canva.moveTo(200,340);
    canva.lineTo(100,340);
    canva.lineWidth = 20;
    canva.strokeStyle = "#000";
    canva.stroke();
    canva.closePath();
}

dibujaPoste();

function dibujaCabeza(){
//cabeza
canva.beginPath();
canva.arc(300, 140, 40, 0, Math.PI * 2, false);
canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}

function dibujaCuerpo(){ 
//cuerpo
canva.beginPath();
canva.moveTo(300,180);
canva.lineTo(300,250);
canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}

function dibujaBrazoIzquierdo(){
//brazo Izquierdo
canva.beginPath();
canva.moveTo(300,190);
canva.lineTo(270,220);
canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}

function dibujaBrazoDerecho(){ 
//brazo derecho
canva.beginPath();
canva.lineTo(300,190);
canva.lineTo(330,220);
canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}

function dibujaPiernaIzquierda(){ 
//pierna izquierda
canva.beginPath();
canva.moveTo(300,250);
canva.lineTo(270,290);
canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}

function dibujaPiernaDerecha(){
//pierna derecha
canva.beginPath();
canva.lineTo(300,250);
canva.lineTo(330,290);
canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}

function muerto(){ 
//muerto 
canva.moveTo(310,120);
canva.lineTo(325,145);
canva.moveTo(325,120);
canva.lineTo(310,145)

canva.moveTo(275,120);
canva.lineTo(290,145);
canva.moveTo(290,120);
canva.lineTo(275,145);

canva.strokeStyle = "#000000";
canva.lineWidth = 5;
canva.stroke();
canva.closePath();
}
