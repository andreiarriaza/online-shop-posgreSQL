'use strict';

/*   Se importa, desde el archivo "user.model.js" las constantes "UserSchema" y "USER_TABLE". */
import { UserSchema, USER_TABLE } from '../models/user.model.js';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /* La función "up()" permite definir qué acción realizará esta migración.

  La función "up()" decibe dos parámetros:
    - queryInterface: es una API que permite realizar acciones con la base de datos.
    - Sequelize: en este caso, este parámetro no es necesario.




  */
  async up(queryInterface /*, Sequelize */) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /* Como se dijo antes, el parámetro "queryInterface" es una API que permite utilizar
    comandos que ejecutan acciones en la base de datos. En este caso,
    se ejecutará la función "createTable()", la cual permitirá crear la tabla en la base de datos.

    El método "createTable()" recibe dos parámetros:
      - USER_TABLE: esta constante fue creada en el archivo "user.model.js" y contiene el nombre de la tabla que se creará.
      - UserSchema: contiene la estructura o esquema de la tabla que se va a crear. Dicho esquema también fue definido dentro del archivo "user.model.js". */

    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  /* La función "down()" permite que sea posible revertir cambios dentro de la aplicación. */
  async down(queryInterface /*, Sequelize*/) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /* Como la función "down()" permite revertir cambios, ahora en lugar de usar el método  "createTable()", se usará el método "drop()", para deshacer el cambio realizado anteriormente. La constante "USER_TABLE" es necesaria para indicar la tabla que se desea eliminar.

    Como la función "up()" creó la tabla, la función "down()" se encargaría de revertir ese cambio, eliminando la tabla que anteriormente fue creada.  */
    await queryInterface.dropTable(USER_TABLE);
  },
};
