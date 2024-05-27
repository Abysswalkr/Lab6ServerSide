# Api sobre futbol

La API de futbol es un servicio RESTful diseñado para gestionar información relacionada con noticias de fútbol

## Requisitos Previos

Necesitarás tener Node.js, npm y Docker instalados en tu sistema para ejecutar este proyecto.

## Instalación

Clona este repositorio y navega al directorio del proyecto:

git clone 



## Instalar las dependencias

Instala las dependencias del proyecto:

npm install
npm install eslint
npm install cors
npm install mysql2
npm install express
npm install yamljs
npm install nodemon
npm install swagger-jsdoc
npm install swagger-ui-express

## Uso

Para iniciar el server y empezar a hacer los endpoints:

npm start

Esto iniciazará el servidor de Express en [Server](http://127.0.0.1:22907)



## Documentacion

Para conocer la documentación que pertenece a la API se encuentra en [Server](http://127.0.0.1:22907/docs)


## Docker

Para construir y ejecutar el contenedor de la base de datos, debes de utilizar:

1. docker build -t mysql-blog-futbol . 
2. docker run -d -p 3306:3306 --name container-mysql-blog-futbol mysql-blog-futbol

## Licencia

Este proyecto está bajo la licencia de MIT.
