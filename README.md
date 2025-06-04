# Trabajo en equipo DDJW

*Itroduccion*

Este projecto conciste en un videojuego web, basado en lo que habiamos disseñado anteriormente en la assignatura de conceptual, desenvolupado con *Phaser 3*. La tematica de este juego conciste en una experiencia interactiva por corea del norte.

El juego contiene 5 minijuegos, pero en esta demo el unico jugable es el primero. Este sucede en un restaurante tradicional de Corea del Norte, donde el jugador tiene que elegir un plato entre 4 opciones que le dan. El objetivo es elegir el plato corecto, el plato nortcoreano.

**Estetica**: 

  -**Menu Inici**: Este tiene un estilo inspirado en un periodico antiguo, con un menu tipo "Newpaper Layout".
  
  -**Minijoc**: Te un estil pixel art, en el cual aparecen los platos que puedes elegir y el camarero que te trae los platos.
  

*Mecanicas* 

  -Seleccionar el plat oque el jugador crea conveniente.
 
  -El juego te assigna una puntuacion dependiendo del plato elegido.
  
  -Dependiendo de la puntuacion te aparece un texto deferente al terminar el minijuego.
  
  -Al pulsar la tecla de escape, el menu pausa donde puedes quitar la musica, continuar jugando o volver al menu principal.

*Implementació tècnica*

- **Lenguaje y motor**: HTML5, JavaScript, CSS y [Phaser 3](https://phaser.io).
- **Estructura**:
  - `index.html`: menu principal en formato de diario.
  - `game.js`: escena del juego principal.
  - `pause.js`: escena alternativa amb menú de pausa.
  - `assets/`: imagenes, sprites.
- **Funciones implementadas**:
  - Menu de pausa (`ESC`) con botones para continuar, reiniciar y silenciar música.
  - Animaciones del camarero.
  - Navegacion con control de puntuació.

*Problemas encontrados*:

  -Para poder abrir el codigo y se pueda jugar al juego se tiene que hacer desde el Visual Studio Code con la extencion de Live Server o con la aplicacion de   Phaser

  Enlace GitHub Pages: https://trabajoequipojw.github.io/TrabajoEquipo-DDJW/
