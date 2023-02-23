// import Boom from '@hapi/boom';

import getConnection from '../libs/postgres.js';

class UserService {
  constructor() {}
  async create(data) {
    return data;
  }

  /* Se declara la función asíncrona llamada "find".  */
  async find() {
    /* Se crea la constante "client", la cual esperará (await), la respuesta de la función asíncrona "getConnection()".  */
    const client = await getConnection();
    /* La constante "response" almacenará la respuesta de la consulta ejecutada
    en la base de datos almacenada en la constante "client" (client.query).

    En este caso, la consulta devolverá todos los campos de la tabla "tasks" de la base de datos conectada con la aplicación, la cual, en este caso se llama "my_store":
    */
    const response = await client.query('SELECT * FROM tasks');

    /* La propiedad "rows" retorna el número de filas que hay dentro de los datos de la tabla "tasks" obtenidos como respuesta.  */
    return response.rows;
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
