const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  /* La función "find()" se encargará de mostrar todos los campos de la tabla "customers". */
  async find() {
    /*

    La constante "response" almacenará la respuesta de la consulta ejecutada
    en la base de datos.

    Se accede al modelo "Customer", el cual fue importado en este archivo, y que fue creado en el archivo "customer.service.js". .

    El método "findAll()" forma parte de la librería "Sequelize" y devolverá todos los campos de la tabla "users". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "Customer", es decir, en el archivo "customer.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    /*
    En el archivo "customer.model.js" se agregó la siguiente línea de código:

      this.belongsTo(models.User, { as: 'user' });

    Como allí se explicó, esta permite crear la relación entre la tabla "customers" y la tabla "users". Y también se indicó que el atributo "as" sirve para definir un alias que represente a la relación que se está estableciendo. En este caso, la relación creada entre la tabla "customers" y la tabla "users", tendrá asignado el alias: "user".

    Ahora bien, se desea que cuando se acceda al endoint de "customer": http://localhost:3000/api/v1/customers/ en la API, se muestre la información respectiva de la tabla "customers", pero también se desea que se muestre la información que corresponde a la tabla "users", de forma anidada, es decir, se incluye la relación con la tabla "users". Para conseguir esto se agrega el siguiente comando:

        include: ['user']

    */
    const rta = await models.Customer.findAll({ include: ['user'] });
    return rta;
  }

  /*
  La función "findOne(id)" mostrará únicamente el registro de la tabla "customers" que coincida con el "id" indicado.
  */
  async findOne(id) {
    /*
    La constante "user" almacenará la respuesta de la consulta ejecutada
    en la base de datos. En este caso, como se desea buscar un registro específicoesto se conseguirá mediante el método "findByPk()", el cual permite buscar un registro con base en su PrimaryKey (llave primaria), la cual, en este caso, es el campo "id".

     El método "findByPk" forma parte de la librería "Sequelize" y devolverá la información del registro que corresponda al "id" indicado que se encuentre en la tabla "CUSTOMER_TABLE". Dicha tabla fue creada en el mismo archivo dentro del cual se creó el modelo llamado "Customer", es decir, en el archivo "customer.model.js".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  /* La función "create" se encarga de crear (insertar) un nuevo registro en la tabla "customers". */
  async create(data) {
    /* Lo que se busca es que cuando el usuario haga una petición de tipo POST hacia el endpoint de "customers": http://localhost:3000/api/v1/customers/ , también se inserten también los campos "email" y "password" en la tabla "users". Es decir, se busca que al acceder al endpoint de "customers", se puedan insertar los datos tanto de la tabla "customers", como de la tabla "clientes". */

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
    /* Con solo incluir el alias (user), el cual se asignó cuando se creó la asociación (relación) entre la tabla "customers" y la tabla "users", dentro del archivo "customer.model.js", en la sección donde se declaró el método estático "associate()", sequelize reconocerá que los datos que se envíen desde el endpoint "customers" (http://localhost:3000/api/v1/customers/) también incluirán los datos que deben ser insertados en la tabla "users". Esto se consigue agregando el comando:

          include: ['user'],
    */
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  /* La función "update()" se encarga de actualizar la tabla "customers". */
  async update(id, changes) {
    /*
    Para no agregar nuevamente el siguiente código:
            const user = await User.findByPk(id);

            if (!user) {

              throw Boom.notFound('User not found');
            }

            return { user };

    Simplemente se invoca nuevamente la función "findOne()" que fue creada arriba en este mismo archivo.
    */
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
module.exports = CustomerService;
