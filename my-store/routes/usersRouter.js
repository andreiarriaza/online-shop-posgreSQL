import express from 'express';
import UserService from '../services/user.service.js';
import validatorHandler from '../middlewares/validatorHandler.js';

import {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} from '../schemas/user.schema.js';

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
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
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
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
