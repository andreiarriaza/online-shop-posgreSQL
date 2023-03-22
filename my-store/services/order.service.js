// const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  /* Función "create()" sirve para agregar una ÓRDEN DE COMPRA. */
  /* La función "create" se encarga de crear (insertar) un nuevo registro en la tabla "orders". */
  async create(data) {
    /* Se ejecuta el método "create" de la tabla clase "Order". Se puede acceder directamente al modelo "Order" porque anteriormente se importo el objeto "models".

    Se desea usar la función "create" con los datos que se encuentran dentro del objeto "order", el cual fue creado en el archivo "order.schema.js" dentro de la constante "createOrderSchema".

    */
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  /* Función "addItem()" se usa para agregar un ITEM. */
  /* La función "addItem()" se encarga de crear (insertar) un nuevo registro en la tabla "order-product". */
  async addItem(data) {
    /* Se ejecuta el método "create" de la tabla clase "Order". Se puede acceder directamente al modelo "Order" porque anteriormente se importo el objeto "models".

    Se desea usar la función "create" con los datos que se encuentran dentro del objeto "order", el cual fue creado en el archivo "order.schema.js" dentro de la constante "createOrderSchema".

    */
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      /* Es posible utilizar anidaciones para incluir más de una asociación (relación) en el resultado de la búsqueda. En este caso,
       como las tablas "orders" y "customers" están relacionadas, se desea que cuando se busque una orden con base en su id, se muestre también lo siguiente:

          - Los datos del cliente (customer) asociado a dicha orden.
          - Los datos del usuario (user) en la misma búsqueda.
          - Los datos de la asociación "items".
       */
      include: [
        {
          association: 'customer',
          include: ['user'],
        },

        'items',
      ],
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
