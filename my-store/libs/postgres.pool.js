/* Se importa el módulo "pkg" de la librería "pg" (node-postgres). Luego, se desestructura a partir de ella la constante "Pool". */
const { Pool } = require('pg');

/* Se importa el archivo "config.js", el cual contiene las variables de entorno que,
por seguridad, fueron creadas en él. */
const { config } = require('./../config/config.js');

/* Es sugerido proteger las variables de entorno que sean delicadas, codificándolas. Esto se logra mandando un URL con todo el esquema de conexión por medio del método "encodeURIComponent()"

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
Para realizar la conexión con la base de datos, se crea una instancia
de la clase "Pool()".
*/
const pool = new Pool({
  /* Se define la configuración de la conexión por medio de la instancia "pool":
    - host (dbHost): se indica el nombre del servidor en el que se encuentra la base
            de datos. En este caso, como todo se está trabajando con Docker, se le asigna el valor: "localhost".

    - port (dbPort): sirve para indicar en qué puerto está corriendo la base de datos.
            En este caso, es en el puerto "5432", el cual es el mismo que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".
    - user (USER): nombre del usuario de la base de datos. Nuevamente, es el mismo
            usuario que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".

    - password (PASSWORD): password asociado a la base de datos.
                Nuevamente, es el mismo password que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".
    - database (dbName): nombre de la base de datos. Es el mismo nombre que se definió
                en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".

  */

  /* El atributo "connectionString" es reconocido por el _**Pool**_ de conexiones, y sirve para poder indicar cuál será la URL (cadena) de conexión.

  Luego, se le pasa como valor la constante URI que se declaró justo arriba. */
  connectionString: URI,
});

/* Se exporta la instancia "pool". */
module.exports = pool;
