'use strict';

/* Se importan las utilidades "DataTypes" y "Sequelize"
que forman parte del ORM llamado Sequelize. */
const { DataTypes, Sequelize } = require('sequelize');
/*   Se importa, desde el archivo "customer.model.js" las constantes "CustomerSchema" y "CUSTOMER_TABLE". */
const { CUSTOMER_TABLE } = require('../models/customer.model.js');

const { USER_TABLE } = require('../models/user.model.js');

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
    se ejecutará la función "createTable()", la cual permitirá crear la tabla en la base de datos.

    El método "createTable()" recibe dos parámetros:
      - CUSTOMER_TABLE: esta constante fue creada en el archivo "customer.model.js" y contiene el nombre de la tabla que se creará.
      - CustomerSchema: contiene la estructura o esquema de la tabla que se va a crear. Dicho esquema también fue definido dentro del archivo "customer.model.js". */

    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        /* El campo "id" será la llave primaria de la tabla. */
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        /* El nombre real del campo es "last_name". El nombre del atributo "lastName" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
        field: 'last_name',
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        /* El nombre real del campo es "created_at". El nombre del atributo "createdAt" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },

      /* El campo "userId" es el que servirá para establecer la relación de la tabla "CUSTOMER_TABLE" con la tabla "USER_TABLE". */
      userId: {
        /* El nombre real del campo es "user_id". El nombre del atributo "userId" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,

        /*El atributo references, sirve para definir cuál será la llave foránea con la que irá relacionado el campo "userId". En este caso, la llave foránea se encuentra dentro de la tabla "USER_TABLE", y el campo tiene tiene asignado el nombre "id".  */
        references: {
          model: USER_TABLE,
          key: 'id',
        },
        /* El atributo "onUpdate", sirve para indicar que cuando se actualice el campo "user_id" de la tabla "CUSTOMER_TABLE", también se actualice el campo "id" de la tabla "USER_TABLE". */
        onUpdate: 'CASCADE',
        /* El atributo "onnDelete", sirve para indicar que cuando se elimine el valor del campo "user_id", este sea definido como "null".  */
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface /*, Sequelize*/) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /* Como la función "down()" permite revertir cambios, ahora en lugar de usar el método  "createTable()", se usará el método "dropTable()", para deshacer el cambio realizado anteriormente. La constante "CUSTOMER_TABLE" es necesaria para indicar la tabla que se desea eliminar.

    Como la función "up()" creó la tabla, la función "down()" se encargaría de revertir ese cambio, eliminando la tabla que anteriormente fue creada.  */
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
