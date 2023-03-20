/*
Este archivo se encarga de crear la conexión usando Sequelize y ejecutar
los modelos creados.
*/

/*

1. Instalar _**Sequelize**_ con el siguiente comando: `npm install --save sequelize`
2. Instalar los _drivers_ que se necesitan en función del lenguaje de Backend con el que se desea trabajar. Las opciones disponibles son las siguientes:


npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
npm install --save oracledb # Oracle Database


En este caso, como se está trabajando con _**PostgreSQL**_ se ejecutará el siguiente comando: `npm install --save pg-hstore`

**IMPORTANTE:** en el comando anterior no se incluyó el comando _**pg**_ (que se utiliza para instalar _**node-postgres**_), el cual sí aparece en el comando original, debido a que dicho comando ya fue utilizado anteriormente cuando se realizó la instalación de _**node-postgres**_.

3. Dentro de la carpeta _**libs**_ se crea un nuevo archivo llamado: _**sequelize.js**_.
4. Ahora es necesario conectarse a la base de datos agregando el siguiente código:


import { Sequelize } from "sequelize";

/* **************** Para obtener la URI de conexión, se usó parte del código del archivo
 "postgres-pool.js". **************** */

/* Se importa el archivo "config.js", el cual contiene las variables de entorno que,
por seguridad, fueron creadas en él. */
// import config from "../config/config.js";

/* Es sugerido proteger las variables de entorno que sean delicadas, codificándolas. Esto se logra mandando un URL con todo el esquema de conexión por medio del método "encodeURIComponent()"

La función encodeURIComponent() en javascript codifica un componente de un componente URI (Identificador uniforme de recursos) reemplazando cada copia de un carácter determinado con una o más secuencias de escape que representan la codificación UTF-8 del carácter en cuestión.

URI significa Identificador de Recurso Uniforme (Uniform Resourse Identifier).

Cualquier cosa que excepcionalmente identifique un recurso es su URI como id, nombre, o número ISBN.

*/

/* ***** Las variables de entorno "dbUser" y "dbPassword" se consideran delicadas, por lo tanto serán codificadas o protegidas. ***** */

/* Se codifica la variable de entorno "dbUser". */
// const USER = encodeURIComponent(config.dbUser);
/* Se codifica la variable de entorno "dbPassword". */
// const PASSWORD = encodeURIComponent(config.dbPassword);

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
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/* **************** FIN Para obtener la URI de conexión, se usó parte del código del archivo
 "postgres-pool.js". **************** */

/* Se crea una instancia de la clase "Sequelize".

Al crear la instancia se le envían los siguientes parámetros:
  - URL de conexión: en este caso, la URL de conexión se encuentra almacenada en la constante URI.
  - dialect: el lenguaje utilizado por la base de datos de PostgreSQL. "
  - logging: el valor "console.log" sirve para que cada vez que se ejecute una consulta por medio de Sequelize ORM, se muestre en consola cuál sería el comando SQL equivalente.
,

*/
/*
const sequelize = new Sequelize(URI, {
  dialect: postgres,
  logging: console.log,
});

export default sequelize;
*/

const { Sequelize } = require('sequelize');

/* **************** Para obtener la URI de conexión, se usó parte del código del archivo
 "postgres-pool.js". **************** */

/* Se importa el archivo "config.js", el cual contiene las variables de entorno que,
por seguridad, fueron creadas en él. */
const { config } = require('./../config/config.js');

/* Se importa el archivo "db/models/index.js" dentro del cual fueron configurados los modelos. */
const setupModels = require('./../db/models/index.js');

/* Se sugiere proteger las variables de entorno que sean delicadas, codificándolas. Esto se logra mandando un URL con todo el esquema de conexión por medio del método "encodeURIComponent()"

La función encodeURIComponent() en javascript codifica un componente de un componente URI (Identificador uniforme de recursos) reemplazando cada copia de un carácter determinado con una o más secuencias de escape que representan la codificación UTF-8 del carácter en cuestión.

URI significa Identificador de Recurso Uniforme (Uniform Resourse Identifier).

Cualquier cosa que excepcionalmente identifique un recurso es su URI como id, nombre, o número ISBN.

*/

/* ***** Las variables de entorno "dbUser" y "dbPassword" se consideran delicadas, por lo tanto serán codificadas o protegidas. ***** */

/*
¡¡¡IMPORTANTE!!!: si se trabajará con el Sistema de Gestión de Bases de Datos MySQL,
la línea anterior debería quedar así:

    const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

*/

// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/* **************** FIN Para obtener la URI de conexión, se usó parte del código del archivo
 "postgres-pool.js". **************** */

/* Se crea una instancia de la clase "Sequelize".

Al crear la instancia se le envían los siguientes parámetros:
  - URL de conexión: en este caso, la URL de conexión se encuentra almacenada en la constante URI.
  - dialect: el lenguaje utilizado por la base de datos de PostgreSQL. "
  - logging: el valor "true" sirve para que cada vez que se ejecute una consulta por medio de Sequelize ORM, se muestre en consola cuál sería el comando SQL equivalente.
,

*/
const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  /* De forma predeterminada, el atributo "logging", tiene asignado el valor "console.log", por eso se dejó comentada esa línea. */
  /*logging: console.log,*/

  /* ¡¡¡IMPORTANTE!!!: si se deseara utilizar el sistema de gestión de bases de datos "MySQL", el atributo "dialect" debería quedar como se muestra a continuación.

        dialect: 'mysql',
  */

  // dialect: 'mysql',
});

/* La función "setupModels()" fue creada en el archivo "db/models/index.js"; y recibe
como parámetros la conexión que se almacena en la constante "sequelize".

Esta función se encarga de inicializar los modelos correspondientes.
*/
setupModels(sequelize);
/* El método "sync()" se encarga de crear la estructura de la base de datos; es decir, crea las tablas y los campos campos con las características que se definieron dentro de cada modelo. Por ejemplo, la estructura del modelo "User" fue definida en el archivo "user.model.js".

IMPORTANTE: Sin embargo, el método "sync()" usado directamente, como se muestra a continuación, NO ES RECOMENDADO, inclusive "Sequelize" en su sitio web, advierte que no se recomienda utilizar este método en producción. La razón es que este método ejecutará cada vez que se inicie la aplicación TODOS LOS PASOS realizados anteriormente: crear la base de datos, crear las tablas, etc. Lo cual NO ES LO MEJOR, precisamente para corregir este problema se utilizan las MIGRACIONES.

¿Qué son las migraciones?
Es un registro/bitácora donde se visualizan los cambios realizados a elemento(s) de la base de datos. Esto es necesario para evitar que una aplicación llevada a producción, repita de forma innecesaria procesos que ya hizo una vez. Por ejemplo, no se desea que cada vez que se inicie una aplicación, se creen de nuevo las tablas, se inserten los registros, etc., sino que solamente se haga una vez, y después, en el momento deseado, pues ya realizar las actualizaciones que se crean convenientes.

*/

/* IMPORTANTE: el siguiente código no se utilizó porque todo se manejará con Migraciones. */
// sequelize.sync();

module.exports = sequelize;
