/* IMPORTANTE: esta migración se creó para modificar el campo "user_id", de tal forma que sea único. Este cambio también se ve reflejado en el archivo "customer.model.js", dentro del cual, al campo "userId" se le asignó el atributo "unique: true".

Para que el cambio realizado en el archivo anterior se aplique a la tabla de la base de datos, se creó esta migración.
*/
'use strict';

/*   Se importa, desde el archivo "customer.model.js" la constante "CUSTOMER_TABLE". */
const { CUSTOMER_TABLE } = require('./../models/customer.model.js');

/* Se importa el objeto "DataTypes" de Sequelize. */
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface /*, Sequelize*/) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    /* Como se dijo antes, el parámetro "queryInterface" es una API que permite utilizar
    comandos que ejecutan acciones en la base de datos, es decir, ejecutan acciones que normalmente haría un sentencia SQL. En este caso,
    se ejecutará la función "changeColumn()", la cual permitirá crear la tabla en la base de datos.

    El método "changeColumn()" recibe dos parámetros:
      - CUSTOMER_TABLE: esta constante fue creada en el archivo "customer.model.js" y contiene el nombre de la tabla que se creará.
      - 'user_id': este es el nombre del campo (columna) que se desea modificar. . */

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      /* El nombre real del campo es "user_id". El nombre del atributo "userId" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down(queryInterface /*, Sequelize*/) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    /* EN ESTE CASO, NO SE AGREGÓ NINGUNA ACCIÓN ASOCIADA A LA FUNCIÓN "down()". */
  },
};
