// import Boom from '@hapi/boom';

/* Como se utilizó en esta aplicación el ORM llamado "Sequelize", la siguiente línea no será necesaria: */
// import getConnection from '../libs/postgres.js';

/* Se importa la clase "User", la cual se encuentra dentro del archivo "user.model.js", y que corresponde al modelo "User".

Por medio de dicho modelo se realizarán las consultas en la base de datos.
*/
import { User } from '../db/models/user.model.js';

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  /* Se declara la función asíncrona llamada "find".  */
  async find() {
    /* Sentencia SQL que se desea ejecutar. */
    /* Como se utilizó en esta aplicación el ORM llamado "Sequelize", la siguiente línea no será necesaria: */
    // const query = 'SELECT * FROM tasks';

    /*

    La constante "response" almacenará la respuesta de la consulta ejecutada
    en la base de datos.

    Se acceder al modelo "User", el cual fue importado en este archivo, y que fue creado en el archivo "user.service.js". .

    El método "findAll()" forma parte de la librería "Sequelize" y devolverá todos los campos de la tabla "users". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "User", es decir, en el archivo "user.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    const response = await User.findAll();
    /* La propiedad "rows" retorna el número de filas que hay dentro de los datos de la tabla "tasks" obtenidos como respuesta.  */
    return response;
  }

  async findOne(id) {
    return { id };
  }
  async update(id, changes) {
    return { id, changes };
  }
  async delete(id) {
    return { id };
  }
}

export default UserService;
