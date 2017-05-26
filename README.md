# Taller de desarrollo de proyectos 1 - Server microservices

Pequenio modulo de autenticacion utilizando microservicios.

Es conveniente ver este video antes, es el tutorial en el que me base:

https://www.youtube.com/playlist?list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ

Adaptandolo para usar:

* Promises.
* Estructura propuesta

## Como instalarlo

Hay que instalar mongodb:
https://www.mongodb.com/download-center?jmp=nav#community

Node JS:
https://nodejs.org/es/

Una vez que tenemos esto instalado, nos paramos en el directorio raiz y utilizamos el siguiente comando:

> $ npm install

Esto instala las dependencias (bibliotecas externas que utiliza el proyecto que estan definidas en el package.json).

## Como correr el servidor y las pruebas

Una de las precondiciones que existen para que funcione el servidor es que el demonio de mongodb este corriendo. Para esto yo utilizo:

> $ sudo mongod

Para correr el servidor:

> $ npm start

o si queremos correr los tests de la API:

> $ npm t

o si queremos escribir mas

> $ npm test
