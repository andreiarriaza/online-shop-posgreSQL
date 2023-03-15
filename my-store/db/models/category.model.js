const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Category extends Model {
  /*Dentro del método estático "associate()" se crean las relaciones deseadas.  */
  static associate(models) {
    /* Se crea una relación de tipo "hasMany()" (de uno a muchos). Esto significa una categoría puede tener MUCHOS productos. Esta relación se correrá desde la entidad "PRODUCT_TABLE"; estableciéndose dicha relación desde la entidad "CATEGORY_TABLE" hacia la entidad "PRODUCT_TABLE". El atributo "as" sirve para definir un alias que represente a la relación que se está estableciendo. En este caso, la relación creada entre la tabla "categories" y la tabla "products", tendrá asignado el alias: "products".
     */
    this.hasMany(models.Product, {
      as: 'products',
      /* Se define que el campo "categoryId" es la llave foránea de la relación entre la tabla "CATEGORY_TABLE" y la tabla "PRODUCT_TABLE".  */
      foreignKey: 'categoryId',
    });
  }

  static config(sequelize) {
    return {
      /* Nombre de la conexión que va a tener. */
      sequelize,
      /* Nombre de la tabla. */
      tableName: CATEGORY_TABLE,
      /* Nombre que se le desea asignar al modelo. */
      modelName: 'Category',
      /* Se elige si se desea o no crear campos por defecto.  */
      timestamps: false,
    };
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
