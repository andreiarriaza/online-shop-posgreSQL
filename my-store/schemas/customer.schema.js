const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const email = Joi.string().email();
const password = Joi.string();

/* La constante "userId" se utilizará únicamente cuando se realice una actualización. */
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),

  /* Este objeto se creará, porque lo que se busca es que cuando el usuario haga una petición de tipo POST hacia el endpoint de "customers": http://localhost:3000/api/v1/customers/ , también se inserten también los campos "email" y "password" en la tabla "users". Es decir, se busca que al acceder al endpoint de "customers", se puedan insertar los datos tanto de la tabla "customers", como de la tabla "clientes".

  Es necesario también hacer modificaciones dentro del archivo "customer.service.js".
  */

  /*
  Para verificar que esto funciona, se enviará por medio de método POST hacia el endpoint "customers" (http://localhost:3000/api/v1/customers/) la siguiente información de ejemplo:
        {
            "name": "Grecia",
            "lastName": "de Arriaza",
            "phone": "78451245",
            "user": {
                "email": "grecia@gmail.com",
                "password": "123456"
            }
        }

  La respuesta de esta petición será la siguiente:
        {
          "createdAt": "2023-03-10T18:25:29.088Z",
          "id": 7,
          "name": "David",
          "lastName": "Estrada",
          "phone": "78451245",
          "user": {
              "role": "customer",
              "createdAt": "2023-03-10T18:25:29.088Z",
              "id": 7,
              "email": "d@gmail.com",
              "password": "123456"
          },
          "userId": 7
        }

  */
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
