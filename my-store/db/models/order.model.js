/* Se importan las utilidades "Model", "DataTypes" y "Sequelize"
que forman parte del ORM llamado Sequelize. */
const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model.js');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  /* El campo "customerId" es el que servirá para establecer la relación de la tabla "ORDER_TABLE" con la tabla "CUSTOMER_TABLE". */
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    /*El atributo references, sirve para definir cuál será la llave primaria con la que irá relacionado el campo "customerId". En este caso, la llave primaria se encuentra dentro de la tabla "CUSTOMER_TABLE", y el campo tiene tiene asignado el nombre "id".  */
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  /*El atributo "total" será un campo calculado, lo cual también es posible en Sequelize.
  En este caso, este campo calculado, devolverá el total, es decir, la suma de la multiplicación del atributo "amount" por el atributo "price" de todos los productos

  Como este campo no formará realmente parte de la tabla de la base de datos, se debe indicar que será un campo "virtual" (DataTypes.VIRTUAL).
  */

  /* IMPORTANTE: los campos calculados usando "Sequelize", deben utilizarse solamente para calculos pequeños; para valores más grandes,
  es necesario usar con sentencia SQL. */
  total: {
    type: DataTypes.VIRTUAL,
    /* La función "get()" sirve para definir cómo se calculará este campo.  */
    get() {
      /* Se comprueba si el tamaño o la cantidad (this.items.length) de items que se encuentran dentro de la asociación (relación) "items" es
      mayor a 0, lo que significaría que sí hay "items" almacenados en la tabla "products". */
      if (this.items.length > 0) {
        /*
        El método reduce () ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.
        El método "reduce()" se encargará de recorrer cada "item" de la asocicación "items" y luego se encargará de
        ir sumando el contenido de la variable "total" + el resultado de multiplicar el precio (item.price)
        con la cantidad (item.OrderProduct.amount) del producto, repitiendo esta operación para cada producto que se encuentre dentro de la asociación "items".

        El "0", indica que el valor inicial será "0".
        */
        return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }
      /* Si el tamaño de la asociación "items" fuera igual a "0", se retornará ese valor. */
      return 0;
    },
  },
};

class Order extends Model {
  static associate(models) {
    /* Se usó el método "belongsTo" porque una orden pertenece solamente a un cliente.
     */
    /* Se crea una relación de tipo "belongsTo()". Esto significa que la relación se correrá desde la entidad "ORDER_TABLE"; estableciéndose dicha relación desde la entidad "CUSTOMER_TABLE" hacia la entidad "ORDER_TABLE". El atributo "as" sirve para definir un alias que represente a la relación que se está estableciendo. En este caso, la relación creada entre la tabla "customers" y la tabla "orders", tendrá asignado el alias: "customer".
     */
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    /* Se usó el método "belongToMany" porque una orden puede estar asociada a varios productos. */
    this.belongsToMany(models.Product, {
      /*
      El atributo "as" sirve para definir un alias que represente a la relación que se está estableciendo. En este caso, la relación creada entre la tabla "orders" y la tabla "order-product", tendrá asignado el alias: "items". Esta relación se establece por medio del modelo que corresponde a la tabla "order-products", el cual es el modelo "OrderProduct".

      Se indica que la relación se establacerá con la llave foránea "orderId" de la tabla "order-product", pero también se establecerá con la otra llave foránea que también se encuentra en la tabla "order-product".
      */
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
