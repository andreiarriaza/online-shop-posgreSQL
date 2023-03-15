'use strict';

/*   Se importan, desde el archivo "category.model.js" las constantes "CategorySchema" y "CATEGORY_TABLE". */
const {
  CategorySchema,
  CATEGORY_TABLE,
} = require('../models/category.model.js');

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
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
      - CATEGORY_TABLE: esta constante fue creada en el archivo "category.model.js" y contiene el nombre de la tabla que se creará.
      - CategorySchema: contiene la estructura o esquema de la tabla que se va a crear. Dicho esquema también fue definido dentro del archivo "category.model.js". */
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down(queryInterface /*, Sequelize */) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    /* Como la función "down()" permite revertir cambios, ahora en lugar de usar el método  "createTable()", se usará el método "dropTable()", para deshacer el cambio realizado anteriormente. La constante "CATEGORY_TABLE" es necesaria para indicar la tabla que se desea eliminar.

    Como la función "up()" creó la tabla, la función "down()" se encargaría de revertir ese cambio, eliminando la tabla que anteriormente fue creada.  */

    await queryInterface.dropTable(CATEGORY_TABLE);
    /* Como la función "down()" permite revertir cambios, ahora en lugar de usar el método  "createTable()", se usará el método "dropTable()", para deshacer el cambio realizado anteriormente. La constante "PRODUCT_TABLE" es necesaria para indicar la tabla que se desea eliminar.

    Como la función "up()" creó la tabla, la función "down()" se encargaría de revertir ese cambio, eliminando la tabla que anteriormente fue creada.  */
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};
