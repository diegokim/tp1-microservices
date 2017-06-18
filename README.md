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

# API publica

## Registro
Tipo y URI

    POST /users
Mensaje:

    body: {
		nombreUsuario: "lucas", 
        email: "lucas@gmail",
		sexo: "masculino", // masculino, femenimo
		tipo: "premium", // free, premium, premiumAPI, premium
		contraseña: "lucas",
		nacimiento: "13/08/93"
	}
Respuesta:

	respuesta --> 201 Y 
	body: {
		token: "token"
	}


## Crear actividad 
Tipo de mensaje y URI:

    POST /activities
Headers

	HEADER: AUTHORIZATION, Bearer + token
Mensaje:	

	body: {
		nombre: "futbol",
		descripcion: "partido de futbol",
		fechaInicio: "10/7/2017",
		horaInicio: "12:00",
		fechaFin: "10/7/2017",
		horaFin: "13:00",
		categorias: ["futbol", "pelota", "racing"],
		prioridad: "alta",
		participantes: ["diego", "juanma", "lautaro", "hugo"],
		recordatorio: "9/7/2017",
		periodicidad: 0,
		estimacion: 0,
		objetivo: "5 partidos",
		tipo: "",
		beneficios: [{
			precio: 0,
			descuento: 0,
			descripcion: ""
		}]
	}
Respuesta

	respuesta --> 201, con la actividad incluyendo el id de la misma: "_id"


## Obtener lista de actividades
Tipo de mensaje y URI:

     GET /activities 
Headers
 
	HEADER: AUTHORIZATION, Bearer + token
Respuesta

	respuesta --> 200 // + LISTA DE ACTIVIDADES
	body: [{
		_id: "",
		username: "",
		nombre: "",
		descripcion: "",
		fechaInicio: "",
		horaInicio: "",
		fechaFin: "",
		horaFin: "",
		categorias: ["categoria", "categoria"],
		prioridad: "",
		participantes: ["username", "username"],
		recordatorio: "fecha",
		periodicidad: int,
		estimacion: int,
		objetivo: "",
		tipo: ""
	}]


## Editar una actividad
Tipo y URI:

    PUT /activities/{id} 
Headers:
	
	HEADER: AUTHORIZATION, Bearer + token
Mensaje:
	
	body: {
		nombre: "",
		descripcion: "",
		fechaInicio: "",
		horaInicio: "",
		fechaFin: "",
		horaFin: "",
		categorias: ["categoria", "categoria"],
		prioridad: "",
		participantes: ["username", "username"],
		recordatorio: "fecha",
		periodicidad: int,
		estimacion: int,
		objetivo: "",
		tipo: "",
		beneficios: [{
			precio: int,
			descuento: int,
			descripcions
		}]
	}
Respuesta

	respuesta --> 204


## Elegir en actividad
Tipo y URI:

    PUT /activities/{id}/register 
Headers:

	HEADER: AUTHORIZATION, Bearer + token
Respuesta

	respuesta --> 204


## Obtener acrividades
Tipo y URI:

  GET /activities/search
Headers
	
  HEADER: AUTHORIZATION, Bearer + token
Mensaje:
  
	body: {
		tipo: "normal", // random, normal
		texto: "futbol",
		categorias: ["futbol", "racing"],
		fechaDesde: "10/7/2018",
		fechaHasta: "11/7/2018"
	}
Respuesta:

	respuesta --> 200 // + LISTA DE ACTIVIDADES
	body: [{
		_id: "",
		username: "",
		nombre: "",
		descripcion: "",
		fechaInicio: "",
		horaInicio: "",
		fechaFin: "",
		horaFin: "",
		categorias: ["categoria", "categoria"],
		prioridad: "",
		participantes: ["username", "username"],
		recordatorio: "fecha",
		periodicidad: int,
		estimacion: int,
		objetivo: "",
		tipo: ""
	}]

