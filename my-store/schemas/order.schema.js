const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

/* Estas constantes servirán para validar los campos que son indispensables para el adecuado funcionamiento
de la tabla "order-product" (tabla de unión). */
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

/* La constante "addItemSchema", servirá para configurar el esquema que controlará el ingreso de productos
a la tabla correspondiente. */
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema };
