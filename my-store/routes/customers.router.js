const express = require('express');

const CustomerService = require('../services/customers.service');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "customer.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "find()" del archivo "customer.service.js" ejecuta la consulta "SELECT * FROM tasks" en la base de datos y devuelve el resultado de dicha consulta.
     */
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  /* La función "validatorHandler" tiene dos parámetros:
     - En el primer parámetro se invoca la función "createCustomerSchema", la cual se
       encargará de ejecutar la validación de los datos, la cual fue creada en el archivo "customer.schema.js".
     - El segundo parámetro sirve para definir el nombre con el que los datos devueltos
       por la función "createUserSchema", serán identificados.   */
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "create()" del archivo "customer.service.js" creará la tabla "CUSTOMER_TABLE".
     */
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "update()" del archivo "customer.service.js" actualizara la tabla "CUSTOMER_TABLE".
     */
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "delete()" del archivo "customer.service.js".
     */
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
