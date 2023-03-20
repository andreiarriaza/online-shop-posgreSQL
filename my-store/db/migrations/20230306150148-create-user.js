'use strict';

/* Se importan las utilidades "DataTypes" y "Sequelize"
que forman parte del ORM llamado Sequelize. */
const { DataTypes, Sequelize } = require('sequelize');

/*   Se importa, desde el archivo "user.model.js" las constantes "UserSchema" y "USER_TABLE". */
const { USER_TABLE } = require('./../models/user.model.js');

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
    comandos que ejecutan acciones en la base de datos, es decir, ejecutan acciones que normalmente haría un sentencia SQL. En este caso,
    se ejecutará la función "createTable()", la cual permitirá crear la tabla en la base de datos.

    El método "createTable()" recibe dos parámetros:
      - USER_TABLE: esta constante fue creada en el archivo "user.model.js" y contiene el nombre de la tabla que se creará.
      - UserSchema: contiene la estructura o esquema de la tabla que se va a crear. Dicho esquema también fue definido dentro del archivo "user.model.js". */

    await queryInterface.createTable(USER_TABLE, {
      id: {
        /* Sirve para indicar si se permite (true) o no (false) que haya campos registros
    nulos en dicho campo. */
        allowNull: false,
        /* Se define si se desea que el campo sea autoincrementable. */
        autoIncrement: true,
        /* Se indica si el campo es o no una llave primaria. */
        primaryKey: true,
        /* Se define qué tipo de dato es el apropiado para el campo en cuestión. En este caso, un entero (INTEGER). */
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        /* Este campo evita que hayan registros duplicados, evitando que haya dos valores iguales. */
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        /* El nombre real del campo es "create_at". El nombre del atributo "createdAt" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
        field: 'create_at',
        /* Se define que el valor predeterminado de este campo, será la fecha actual. */
        defaultValue: Sequelize.NOW,
      },
    });
  },

  /* La función "down()" permite que sea posible revertir cambios dentro de la aplicación. */
  async down(queryInterface /*, Sequelize*/) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /* Como la función "down()" permite revertir cambios, ahora en lugar de usar el método  "createTable()", se usará el método "dropTable()", para deshacer el cambio realizado anteriormente. La constante "USER_TABLE" es necesaria para indicar la tabla que se desea eliminar.

    Como la función "up()" creó la tabla, la función "down()" se encargaría de revertir ese cambio, eliminando la tabla que anteriormente fue creada.  */
    await queryInterface.dropTable(USER_TABLE);
  },
};
