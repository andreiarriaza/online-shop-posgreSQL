'use strict';

const { UserSchema, USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface /*, Sequelize*/) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /* El método "addColumn()" permite agregar una columna en la tabla de la base de datos indicada.
    El método "addColumn()" tiene tres parámetros:
      - Primer parámetro: indica el nombre de la tabla a modificar. En este caso, se
                          modificará la tabla llamada "USER_TABLE", la cual se definió en el archivo "user.model.js".
      - Segundo parámetro: nombre de la columna que se agregará. Dicha columna se llama,
                           en este caso, "role".
      - Tercer parámetro: el esquema que va a tener la nueva columna. En este caso, el
                          esquema del campo "role", se encuentra en el campo "role"de la constante "UserSchema", la cual se importó desde el archivo "user.model.js".

    */
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down(queryInterface /*, Sequelize*/) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /*  Como la función "down()" permite revertir cambios, ahora en lugar de usar el método  "addColumn()", se usará el método "removeColumn()", para deshacer el cambio realizado anteriormente.

    Es necesario indicar el nombre del campo que se desea eliminar (en este caso, el campo "role") y también la tabla a la que pertenece dicho campo (en este caso, la tabla "USER_TABLE").
     */
    await queryInterface.removeColumn(USER_TABLE, 'role');
  },
};
