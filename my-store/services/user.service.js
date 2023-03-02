// import Boom from '@hapi/boom';

/* Como se utilizó en esta aplicación el ORM llamado "Sequelize", la siguiente línea no será necesaria: */
// import getConnection from '../libs/postgres.js';

/* Se importa la clase "User", la cual se encuentra dentro del archivo "user.model.js", y que corresponde al modelo "User".

Por medio de dicho modelo se realizarán las consultas en la base de datos.
*/
import { User } from '../db/models/user.model.js';

/*

El paquete "boom" permite administrar errores de la API.

Para instalarlo, se debe escribir lo siguiente en consola:
    npm i @hapi/boom
*/

import Boom from '@hapi/boom';

class UserService {
  constructor() {}

  async create(data) {
    /* Para realizar peticiones mediante POSTMAN, se deben seguir los siguientes pasos:
      1. Tipo de petición: POST
      2. Endpoint para conectarse: http://localhost:3000/api/v1/users
      3. Seleccionar la opción "Body". Luego elegir la opción "raw", y seleccionar la
      opción "JSON", y escribir los datos deseados, en este caso:
        {
          "email": "mail@as.com",
          "password": "12127845"
        }

        Como se utilizó "Joi" para hacer las validaciones, el password debe ser "string"
        y tener 8 caracteres.
      3. Enviar petición.
      4. Se desplegará un mensaje de confirmación como el siguiente:
          {
            "createdAt": "2023-03-02T15:55:52.520Z",
            "id": 3,
            "email": "mail@as.com",
            "password": "12127845"
          }
   */
    /*

    La constante "newUser" almacenará los datos del usuario que se insertará en la base de datos.

    Se accede al modelo "User", el cual fue importado en este archivo, y que fue creado en el archivo "user.service.js". .

    El método "create()" forma parte de la librería "Sequelize" y se encarga de insertar campos en una tabla de la base de datos, en este caso, en la tabla "users". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "User", es decir, en el archivo "user.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    const newUser = await User.create(data);
    return newUser;
  }

  /* Se declara la función asíncrona llamada "find".  */
  async find() {
    /* Para realizar peticiones mediante POSTMAN, se deben seguir los siguientes pasos:
      1. Tipo de petición: GET
      2. Endpoint para conectarse: http://localhost:3000/api/v1/users
      3. Enviar petición.
   */

    /* Sentencia SQL que se desea ejecutar. */
    /* Como se utilizó en esta aplicación el ORM llamado "Sequelize", la siguiente línea no será necesaria: */
    // const query = 'SELECT * FROM tasks';

    /*

    La constante "response" almacenará la respuesta de la consulta ejecutada
    en la base de datos.

    Se accede al modelo "User", el cual fue importado en este archivo, y que fue creado en el archivo "user.service.js". .

    El método "findAll()" forma parte de la librería "Sequelize" y devolverá todos los campos de la tabla "users". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "User", es decir, en el archivo "user.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    const response = await User.findAll();
    /* La propiedad "rows" retorna el número de filas que hay dentro de los datos de la tabla "tasks" obtenidos como respuesta.  */
    return response;
  }

  async findOne(id) {
    /* Para realizar peticiones mediante POSTMAN, se deben seguir los siguientes pasos:

      1. Tipo de petición: GET
      2. Endpoint para conectarse: http://localhost:3000/api/v1/users/idUsuario
          Si se quisiera buscar el id "3", el endpoint quedaría de la siguiente manera:
              http://localhost:3000/api/v1/users/3
      3. Enviar petición.
      4. POSTMAN devolverá el resultado de la petición:
            {
              "user": {
              "id": 3,
              "email": "mail@as.com",
              "password": "12127845",
              "createdAt": "2023-03-02T15:55:52.520Z"
              }
            }
   */

    /*
    La constante "user" almacenará la respuesta de la consulta ejecutada
    en la base de datos. En este caso, como se desea buscar un registro específicoesto se conseguirá mediante el método "findByPk()", el cual permite buscar un registro con base en su PrimaryKey (llave primaria), la cual, en este caso, es el campo "id".

     El método "findByPk" forma parte de la librería "Sequelize" y devolverá la información del registro que corresponda al "id" indicado que se encuentre en la tabla "USER_TABLE". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "User", es decir, en el archivo "user.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    const user = await User.findByPk(id);
    /* Se verifica si la variable "user" es falsa, es decir, se vierifica si está vacía.

    */
    if (!user) {
      /* El tipo de error de la libería "Boom" llamado "notFound()" indica que no hay datos en el objeto evaluado, en este caso, se desplegará cuando la constante "user"
      se encuentre vacía. */

      /* El comando "throw" se encarga de lanzar el error. */
      throw Boom.notFound('User not found');
    }
    return { user };
  }

  async update(id, changes) {
    /* Para realizar peticiones mediante POSTMAN, se deben seguir los siguientes pasos:
      1. Tipo de petición: PATCH
      2. Endpoint para conectarse: http://localhost:3000/api/v1/users/idUsuario
          Si, por ejemplo, se deseara actualizar el registro con el id "3", el endpoint
          sería el siguiente:
              http://localhost:3000/api/v1/users/3

      3. Seleccionar la opción "Body". Luego elegir la opción "raw", y seleccionar la
      opción "JSON", y escribir los datos que se desean modificar, en este caso:
        {
          "email": "andrei@gmail.com",
        }

      3. Enviar petición.
      4. Se desplegará un mensaje de confirmación como el siguiente:
          {
            "user": {
                "user": {
                    "id": 3,
                    "email": "andreiarriaza@gmail.com",
                    "password": "12127845",
                    "createdAt": "2023-03-02T15:55:52.520Z"
                }
            }
          }

    /*
    Para no agregar nuevamente el siguiente código:
            const user = await User.findByPk(id);

            if (!user) {

              throw Boom.notFound('User not found');
            }

            return { user };

    Simplemente se invoca nuevamente la función "findOne()" que fue creada arriba en este mismo archivo.
    */
    const user = await this.findOne(id);
    /*  El método "update" forma parte de la librería "Sequelize" y actualizará el registro que se desea modificar, el cual se encuentra almacenado en la constante "user", con los cambios enviados por medio del parámetro "changes". Luego de esperar (await) la respuesta de esta promesa, los resultados s e almacenarán en la constante "response". */

    /* IMPORTANTE: tanto con el método "update", como con el método "destroy" de la librería "Sequelize", es indispensable enviar también el atributo "where" con el id del elemento que se quiere actualizar o eliminar. */
    await User.update(changes, { where: { id } });
    return { user };
  }
  async delete(id) {
    /*
    Para no agregar nuevamente el siguiente código:
            const user = await User.findByPk(id);

            if (!user) {

              throw Boom.notFound('User not found');
            }

            return { user };

    Simplemente se invoca nuevamente la función "findOne()" que fue creada arriba en este mismo archivo.
    */
    const user = await this.findOne(id);
    /*
    El método "destroy" forma parte de la librería "Sequelize" y permite eliminar un registro de la tabla "USER_TABLE". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "User", es decir, en el archivo "user.model.js".

    IMPORTANTE: tanto con el método "update", como con el método "destroy" de la librería "Sequelize", es indispensable enviar también el atributo "where" con el id del elemento que se quiere actualizar o eliminar.
    */
    await User.destroy({ where: { id } });
    /* Se retorna el "id" del registro que fue eliminado.*/
    return user;
  }
}

export default UserService;
