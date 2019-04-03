<h1>SLOT MACHINE</h1>
<h2>Prueba técnica</h2>
<h3>Pruebalo en: <a href="https://slot-machine-test.herokuapp.com/">https://slot-machine-test.herokuapp.com/</a><h3>

El proyecto se ha realizado para la prueba técnica en la que hay que hacer un juego de slots simplificado:
- html canvas
- css
- javascript
- ajax
- node
- express
- mongo

_______________________________________________________________________

Funcionalidad:
La aplicación tiene las siguientes secciones:

<h2>- Login / Signup</h2>

Para poder acceder al resto de funcionalidades es necesario esta logado.
Si no se tiene usuario se puede crear uno nuevo pusando en signup

Los datos de usuario se almacenarán en una Base de datos (MongoDB) con el nombre, la contraseña cifrada y un credito inicial = 1000


<h2>- Slot Machine</h2>

Juego de slot realizado en html5 canvas
Pulsa el botón jugar para iniciar una tirada.
Si en la linea central coinciden 3 o más elementos la jugada será premiada (3 elem = 2, 4 elem = 5, 5 elem = 10)

Cuando se lanza la jugada, se carga una animación que simula la rotación de los rodillos.
A su vez, mediante una llamada ajax se llama a un servicio que calcula 3 elementos random para cada rodillo.
Este servicio creado en Nodejs también se encarga de calcular los premios, así evitaremos que se puedan modificar los premios en la parte front.

Todos los datos se guardan en una Base de datos (MongoDB) que consta de 2 Modelos.
Uno para el usuario, como hemos comentado antes, en el que se irá actualizando el credito cada tirada, 
y otro para el registro de tiradas en el que se almacenan la fecha, el id y nombre de usuario, la combinación y el premio.

Una vez hechos los cálculos y registros en la BBDD se mostrará el resultado al usuario por pantalla
y una pequeña animación se mostrará si la jugada ha sido premiada.

<h2>- Play List</h2>
Aqui se mostrará una lista de todas las jugadas que se han guardado en la BBDD



