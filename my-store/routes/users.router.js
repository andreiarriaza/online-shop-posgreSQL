const express = require('express');

const UserService = require('../services/user.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "find()" del archivo "user.service.js" ejecuta la consulta "SELECT * FROM tasks" en la base de datos y devuelve el resultado de dicha consulta.
     */
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "findOne()" del archivo "user.service.js" devuelve el registro que coincida con el valor del "id" enviado.
     */
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  /* La función "validatorHandler" tiene dos parámetros:
     - En el primer parámetro se invoca la función "createUserSchema", la cual se
       encargará de ejecutar la validación de los datos, la cual fue creada en el archivo "user.schema.js".
     - El segundo parámetro sirve para definir el nombre con el que los datos devueltos
       por la función "createUserSchema", serán identificados.   */
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "create()" del archivo "user.service.js" creará la tabla "USER_TABLE".
     */
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "update()" del archivo "user.service.js" actualizara la tabla "USER_TABLE".
     */
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      /*Se espera (await) la ejecución del servicio "find()", el cual se encuentra dentro del archivo "user.service.js", que a su vez se ubica  dentro de la carpeta "services".

    El método "delete()" del archivo "user.service.js".
     */
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
