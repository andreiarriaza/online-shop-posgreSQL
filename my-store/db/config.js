/* Se importa el archivo "config.js", el cual contiene las variables de entorno que,
por seguridad, fueron creadas en él. */
const { config } = require('../config/config.js');

/* Se sugiere proteger las variables de entorno que sean delicadas, codificándolas. Esto se logra mandando un URL con todo el esquema de conexión por medio del método "encodeURIComponent()"

La función encodeURIComponent() en javascript codifica un componente de un componente URI (Identificador uniforme de recursos) reemplazando cada copia de un carácter determinado con una o más secuencias de escape que representan la codificación UTF-8 del carácter en cuestión.

URI significa Identificador de Recurso Uniforme (Uniform Resourse Identifier).

Cualquier cosa que excepcionalmente identifique un recurso es su URI como id, nombre, o número ISBN.

*/

/* ***** Las variables de entorno "dbUser" y "dbPassword" se consideran delicadas, por lo tanto serán codificadas o protegidas. ***** */

/* Se codifica la variable de entorno "dbUser". */
const USER = encodeURIComponent(config.dbUser);
/* Se codifica la variable de entorno "dbPassword". */
const PASSWORD = encodeURIComponent(config.dbPassword);

/* Se comenzará a obtener la URL completa de conexión. */

/* Cuando se desea conectar la aplicación a una base de datos remota, por ejemplo en Amazon, Heroku, Digital Ocean, etc., no proporcionan los datos: host, port, user, password, database de forma directa, sino que proporcionan una URL de Conexión.

En este ejemplo, a continuación se conformará una URL de Conexión.
*/

/* La constante "URI" almacenará la "URL de Conexión". */

/* ************ URL de Conexión ************ */
/* La URL de Conexión tiene las siguientes partes:
      - postgres://  Es el protocolo con el que se conectará a PostgresSQL
      - USER: es el usuario que se codificó anteriormente.
      - PASSWORD: el password que se configuró anteriormente.
      - dbHost: la variable de entorno "dbHost" que fue creada en el archivo "config.js".
      - dbPort: la variable de entorno "dbPort" que fue creada en el archivo "config.js".
      - dbName: la variable de entorno "dbName" que fue creada en el archivo "config.js".
*/
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/*
¡¡¡IMPORTANTE!!!: si se trabajará con el Sistema de Gestión de Bases de Datos MySQL,
la línea anterior debería quedar así:

    const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

*/

// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  /* Se exporta el ambiente para desarrollo proporcionado por CLI para las migraciones. */
  development: {
    url: URI,
    /* Se indica el tipo de base de datos con el que se conectará.*/
    dialect: 'postgres',
  },
  /* Se exporta el ambiente para producción proporcionado por CLI para las migraciones. */
  production: {
    url: URI,
    /* Se indica el tipo de base de datos con el que se conectará.*/
    dialect: 'postgres',
  },
};
