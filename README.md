# Podcast Backend

_El objetivo de este poryecto es tener un backend con una base de datos con todos los datos que se requieren para guardar, reproducir y editar datos de audio que seran consumido despues por un cliente al cual puedes acceder en [este link](https://github.com/Franklingp/podcastAngular). Esta api cuenta con un subsistema de autenticacion por token y un subsistema para guardar los datos archivos de imagen y audio para poder reproducirse en el cliente cuando se solicite. (Este proyecto esta sujeto a cambios)._

### Pre-requisitos 📋

_Para poder ejecutar este proyecto necesitas tener disponible en tu PC Node JS, MongoDB y npm para poder descargar las dependencias necesarias y poder ejecutar el proyecto en un servidor local_

### Instalación 🔧

_Para poder correr este proyecto necesitas clonar el repositorio e instalar las dependencias necesarias con npm usando el siguiente codigo dentro de la carpeta del proyecto._

```
npm install --save
```

_Y luego de que instale todas las dependencias necesarias debes correr habilitar mongoDB para que NodeJS pueda tarbajar con la base de datos, esto lo puedes hacer con el siguiente comando en caso de que tengas Linux:_

```
sudo service mongod start
```

Y ahora si puedes correr el proyecto con:

```
npm start
```

_De esta forma tendras el proyecto corriendo en un servidor local en tu computadora, por defecto el puerto que que he definido es 3700, asi que el proyecto debe de estar corriendo en la ruta http://localhost:3700/_

## Construido con 🛠️

_Este proyecto esta construido con Node JS, Express, Mongoose y Multer_