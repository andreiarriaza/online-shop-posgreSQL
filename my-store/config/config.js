/* Se importa el paquete "dotenv". */

/* El paquete "dotenv" se encarga de leer el archivo "env" que se creó anteriormente. Se debe recordar que las variables de entorno se pueden agregar directamente al archivo
"package.json", sin embargo, com en esta ocasión se creó el archivo ".env"  este paquete permite que dicho archivo sea leído y carga automáticamente cada una de las variables en el "process" (process.env: este comando es el que permite leer las variables de entorno de Node) de Node JS. */
// import the "dotenv" package
require('dotenv').config();

/* Este archivo sirve para configurar las variables de entorno que se
utilizarán en este proyecto. */
const config = {
  /*

  env: el atributo "env" sirve para indicar en qué entorno nos encontramos.
    - process.env: es el comando utilizado por Node JS para leer variables de entorno.
    - NODE_ENV: es una variable de entorno de Node que indica en qué entorno está el
                usuario.

                Se agregó un operador de cortocircuito para comprobar si se detecta el entorno en el que está el usuario; si lo detecta, ese entorno se asignará al atributo "env", pero, si no lo detecta, se asignará de forma predeterminada el entorno 'dev' (desarrollador).

  port: el atributo "port" permite definir el puerto en el que se va a ejecutar la
        aplicación.
        PORT: es una variable de entorno de Node que devuelve el puerto en el que se está corriendo una aplicación.
  */
  /*
  Cortocircuito OR(||):
    Cuando el valor de la izquierda en la expresión
    sea igual a "true", dicho valor de la izquierda será el
    valor que se agregará, de lo contrario, si el valor de la
    izquierda es igual a "false" el valor que
    se agregará será el de la derecha.
  */
  env: process.env.NODE_ENV || 'dev',
  /* Si no se detecta un puerto, se asignará de forma predeterminada el puerto "3000". */
  port: process.env.NODE_PORT || 3000,

  /* ************* Configuración de base de datos ************* */
  /*
  dbUser: el atributo "dbUser" permite definir el usuario de la base datos.
        DB_USER: es una variable de entorno de Node que devuelve el usuario de la base de datos.
  */
  dbUser: process.env.DB_USER,
  /* Clave de la base de datos. */
  dbPassword: process.env.DB_PASSWORD,
  /* Nombre del "host" con el que se conectará la base de datos. */
  dbHost: process.env.DB_HOST,
  /* Nombre de la base de datos. */
  dbName: process.env.DB_NAME,
  /* Puerto por medio del cual se conectará la base de datos. */
  dbPort: process.env.DB_PORT,
};

module.exports = { config };
