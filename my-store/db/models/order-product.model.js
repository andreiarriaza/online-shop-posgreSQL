/* Esta tabla es la tabla de unión para la relación de muchos a muchos establecida entre la tabla "customers" y la tabla "orders". */

const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model.js');
const { PRODUCT_TABLE } = require('./product.model.js');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /*El atributo references, sirve para definir cuál será la llave primaria con la que irá relacionado el campo "orderId". En este caso, la llave primaria se encuentra dentro de la tabla "ORDER_TABLE", y el campo tiene tiene asignado el nombre "id".  */
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  /* Como esta es una tabla de unión entre las tablas "orders" y "products", es necesario también enlazar el campo "productId".  */
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /*El atributo references, sirve para definir cuál será la llave primaria con la que irá relacionado el campo "productId". En este caso, la llave primaria se encuentra dentro de la tabla "PRODUCT_TABLE", y el campo tiene tiene asignado el nombre "id".  */
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class OrderProduct extends Model {
  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      /* Nombre de la conexión que va a tener. */
      sequelize,
      /* Nombre de la tabla. */
      tableName: ORDER_PRODUCT_TABLE,
      /* Nombre que se le desea asignar al modelo. */
      modelName: 'OrderProduct',
      /* Se elige si se desea o no crear campos por defecto.  */
      timestamps: false,
    };
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
