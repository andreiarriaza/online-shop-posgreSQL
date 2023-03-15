// const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  /* La función "create" se encarga de crear (insertar) un nuevo registro en la tabla "categories". */
  async create(data) {
    /* Lo que se busca es que cuando el usuario haga una petición de tipo POST hacia el endpoint de "categories": http://localhost:3000/api/v1/categories/ , también se inserten también los campos "email" y "password" en la tabla "users". Es decir, se busca que al acceder al endpoint de "customers", se puedan insertar los datos tanto de la tabla "customers", como de la tabla "clientes". */

    /* Se ejecuta el método "create" de la tabla clase "User". Se puede acceder directamente al modelo "User" porque anteriormente se importo el objeto "models".

    Se desea usar la función "create" con los datos que se encuentran dentro del objeto "user", el cual fue creado en el archivo "customer.schema.js" dentro de la constante "createCustomerSchema".

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
    /* Con solo incluir el alias (user) de la tabla "users", sequelize reconocerá que los datos que se envíen desde el endpoint "customers" (http://localhost:3000/api/v1/customers/) también incluirán los datos que deben ser insertados en la tabla "users". Esto se consigue agregando el comando:

          include: ['user'],
    */
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    /*
    La constante "category" almacenará la respuesta de la consulta ejecutada
    en la base de datos. En este caso, como se desea buscar un registro específicoesto se conseguirá mediante el método "findByPk()", el cual permite buscar un registro con base en su PrimaryKey (llave primaria), la cual, en este caso, es el campo "id".

     El método "findByPk" forma parte de la librería "Sequelize" y devolverá la información del registro que corresponda al "id" indicado que se encuentre en la tabla "categories". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "Category", es decir, en el archivo "category.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    /* Con solo incluir el alias (products), el cual se asignó cuando se creó la asociación (relación) entre la tabla "categories" y la tabla "products", dentro del archivo "category.model.js", en la sección donde se declaró el método estático "associate()", sequelize reconocerá que los datos que se envíen desde el endpoint "customers" (http://localhost:3000/api/v1/categories/idCategoria) también incluirán los datos que deben ser insertados en la tabla "products". Esto se consigue agregando el comando:

          include: ['products'],
    */
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    return category;
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

module.exports = CategoryService;
