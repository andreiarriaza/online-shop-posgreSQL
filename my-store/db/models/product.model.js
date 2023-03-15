/* Se importan las utilidades "Model", "DataTypes" y "Sequelize"
que forman parte del ORM llamado Sequelize. */
const { Model, DataTypes, Sequelize } = require('sequelize');

/* Se importa la constante "CATEGORY_TABLE", la cual tiene almacenado
el nombre de la tabla con la que se desea crear la relación entre la tabla "categories" y la tabla "products".  */
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    /* El tipo de dato "TEXT" permite ingresar cadenas de texto más largas, que las que
    permiten ingresar el tipo de dato "STRING". */
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  /* El campo "categoryId" es el que servirá para establecer la relación con la tabla "categories". */
  categoryId: {
    /* El nombre real del campo es "category_id". El nombre del atributo "categoryId" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,

    /*El atributo "references", sirve para definir cuál será la llave primaria con la que irá relacionado el campo "categoryId". En este caso, la llave primaria se encuentra dentro de la tabla "CATEGORY_TABLE", y el campo tiene tiene asignado el nombre "id".  */
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    /* El atributo "onUpdate", sirve para indicar que cuando se actualice el campo "category_id" de la tabla "CATEGORY_TABLE", también se actualice el campo "id" de la tabla "PRODUCTS_TABLE". */
    onUpdate: 'CASCADE',
    /* El atributo "onnDelete", sirve para indicar que cuando se elimine el valor del campo "user_id", este sea definido como "null".  */
    onDelete: 'SET NULL',
  },
};

class Product extends Model {
  /*Dentro del método estático "associate()" se crean las relaciones deseadas.  */
  static associate(models) {
    /* Se crea una relación de tipo "belongsTo()". Esto significa que la relación se correrá desde la entidad "PRODUCT_TABLE"; estableciéndose dicha relación desde la entidad "CATEGORY_TABLE" hacia la entidad "PRODUCT_TABLE". El atributo "as" sirve para definir un alias que represente a la relación que se está estableciendo. En este caso, la relación creada entre la tabla "categories" y la tabla "products", tendrá asignado el alias: "category".
     */
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
