const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model.js');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
    unique: true,

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
};

class Customer extends Model {
  /*Dentro del método estático "associate()" se crean las relaciones deseadas.  */
  static associate(models) {
    /* Se usó el método "belongsTo" porque un cliente (customer) solamente puede tener un usuario asignado.
     */
    /* Se crea una relación de tipo "belongsTo()". Esto significa que la relación se correrá desde la entidad "CUSTOMER_TABLE"; estableciéndose dicha relación desde la entidad "CUSTOMER_TABLE" hasta la entidad "USER_TABLE". El atributo "as" sirve para definir un alias que represente a la relación que se está estableciendo. En este caso, la relación creada entre la tabla "customers" y la tabla "users", tendrá asignado el alias: "user".
     */
    this.belongsTo(models.User, { as: 'user' });

    /* Se usó el método "hasMany" porque un cliente, puede tener varias órdenes asignadas.
     */
    /*

   La relación está del lado de la tabla "customers". Por lo que es necesario enviar el campo  de la tabla "orders" que sirve como llave foránea (foreign key):

        foreignKey: 'userId'

    Nuevamente, es necesario definir un alias para la relación. Dicho alias será "customer".


    */
    this.hasMany(models.Order, {
      /*
    La relación está del lado de la tabla "customers". Por lo que es necesario enviar el campo de la tabla "orders" que sirve como llave foránea (foreign key):

        foreignKey: 'customerId'

    Nuevamente, es necesario definir un alias para la relación. Dicho alias será "orders".

    */
      as: 'orders',

      foreignKey: 'customerId',
    });
  }

  /* Configuración del modelo */
  static config(sequelize) {
    return {
      /* Nombre de la conexión que va a tener. */
      sequelize,
      /* Nombre de la tabla. */
      tableName: CUSTOMER_TABLE,
      /* Nombre que se le desea asignar al modelo. */
      modelName: 'Customer',
      /* Se elige si se desea o no crear campos por defecto.  */
      timestamps: false,
    };
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
