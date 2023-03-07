/* Se importa el módulo "pkg" de la librería "pg" (node-postgres). Luego, se desestructura a partir de ella la constante "Client". */
const { Client } = require('pg');

async function getConnection() {
  /*
Para realizar la conexión con la base de datos, se crea una instancia
de la clase "Client()".
*/
  const client = new Client({
    /* Se define la configuración de la conexión.
    - host: se indica el nombre del servidor en el que se encuentra la base
            de datos. En este caso, como todo se está trabajando con Docker, se le asigna el valor: "localhost".

    - port: sirve para indicar en qué puerto está corriendo la base de datos.
            En este caso, es en el puerto "5432", el cual es el mismo que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".
    - user: nombre del usuario de la base de datos. Nuevamente, es el mismo
            usuario que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".

    - password: password asociado a la base de datos.
                Nuevamente, es el mismo password que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".
    - database: nombre de la base de datos. Es el mismo nombre que se definió
                en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".

  */
    host: 'localhost',
    port: 5432,
    user: 'walter',
    password: '123',
    database: 'my_store',
  });

  /* Se realiza la conexión mediante el método "connect()". Pero como dicho método devuelve una promesa, se puede correr de forma asíncrona. Por ello, la función "getConnection()" fue declarada asíncrona (async), y también por ello, en la siguiente línea se utiliza el comando "await". */
  await client.connect();

  /* Es necesario retornar la instancia "client" que se conectó con la base de datos. */
  return client;
}

/* Se exporta la función "getConnection()". */
module.exports = getConnection;
