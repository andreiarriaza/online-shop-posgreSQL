/*
Este archivo se encarga de enviar la conexión hacia los modelos, los cuales se encuentran dentro del archivo "user-model.js".

*/

/* Se importa el modelo "User" y el esquema "UserSchema", los cuales se encuentran dentro del archivo "user.model.js". */
const { User, UserSchema } = require('./user.model.js');
/* Se importa el modelo "Customer" y el esquema "CustomerSchema", los cuales se encuentran dentro del archivo "customer.model.js". */
const { Customer, CustomerSchema } = require('./customer.model.js');

/* Se importa el modelo "Category" y el esquema "CategorySchema", los cuales se encuentran dentro del archivo "category.model.js". */
const { Category, CategorySchema } = require('./category.model.js');

const { Product, ProductSchema } = require('./product.model.js');
const { Order, OrderSchema } = require('./order.model.js');
const {
  OrderProduct,
  OrderProductSchema,
} = require('./order-product.model.js');

/* Esta función se encargará de la configuración de los modelos.


Esta función recibe como parámetro la conexión de Sequelize que se estableció en el archivo
"user.model.js".
*/
function setupModels(sequelize) {
  /* ************************ Configuración del modelo "User" ************************ */
  /*
  Mediante el método "init()" se inicializa el modelo "User", el cual se creó en el archivo "user.model.js".

  Al método "init()" se le envía como parámetro el esquema (UserSchema) que fue creado en el archivo "user.model.js", el cual define el esquema que debe tener dicho modelo.

  */
  /* Se invoca el método estático "config" que forma parte del modelo "User". Como
  es un método estático, no hace falta crear una instancia para poder usarlo, sino que se
  implementa directamente. */
  /*
 El método "config" recibe como parámetro la conexión de Sequelize. El método estático "config" fue creado en el archivo "user.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  User.init(UserSchema, User.config(sequelize));

  /* ************************ Configuración del modelo "Customer" ************************ */
  /*
  Mediante el método "init()" se inicializa el modelo "Customer", el cual se creó en el archivo "customer.model.js".

  Al método "init()" se le envía como parámetro el esquema (CustomerSchema) que fue creado en el archivo "customer.model.js", el cual define el esquema que debe tener dicho modelo.

  */
  /* Se invoca el método estático "config" que forma parte del modelo "Customer". Como
  es un método estático, no hace falta crear una instancia para poder usarlo, sino que se
  implementa directamente. */
  /*
 El método "config" recibe como parámetro la conexión de Sequelize. El método estático "config" fue creado en el archivo "customer.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  Customer.init(CustomerSchema, Customer.config(sequelize));

  /* ************************ Configuración del modelo "Category" ************************ */
  /*
  Mediante el método "init()" se inicializa el modelo "Category", el cual se creó en el archivo "category.model.js".

  Al método "init()" se le envía como parámetro el esquema (CategorySchema) que fue creado en el archivo "category.model.js", el cual define el esquema que debe tener dicho modelo.

  */
  /* Se invoca el método estático "config" que forma parte del modelo "Category". Como
  es un método estático, no hace falta crear una instancia para poder usarlo, sino que se
  implementa directamente. */
  /*
 El método "config" recibe como parámetro la conexión de Sequelize. El método estático "config" fue creado en el archivo "category.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  Category.init(CategorySchema, Category.config(sequelize));

  /* ************************ Configuración del modelo "Product" ************************ */
  /*
  Mediante el método "init()" se inicializa el modelo "Product", el cual se creó en el archivo "product.model.js".

  Al método "init()" se le envía como parámetro el esquema (ProductSchema) que fue creado en el archivo "product.model.js", el cual define el esquema que debe tener dicho modelo.

  */
  /* Se invoca el método estático "config" que forma parte del modelo "Product". Como
  es un método estático, no hace falta crear una instancia para poder usarlo, sino que se
  implementa directamente. */
  /*
 El método "config" recibe como parámetro la conexión de Sequelize. El método estático "config" fue creado en el archivo "product.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  Product.init(ProductSchema, Product.config(sequelize));
  /* ************************ Configuración del modelo "Order" ************************ */
  /*
  Mediante el método "init()" se inicializa el modelo "Order", el cual se creó en el archivo "order.model.js".

  Al método "init()" se le envía como parámetro el esquema (OrderSchema) que fue creado en el archivo "order.model.js", el cual define el esquema que debe tener dicho modelo.

  */
  /* Se invoca el método estático "config" que forma parte del modelo "Order". Como  es un método estático, no hace falta crear una instancia para poder usarlo, sino que se  implementa directamente. */
  /*
 El método "config" recibe como parámetro la conexión de Sequelize. El método estático "config" fue creado en el archivo "order.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  Order.init(OrderSchema, Order.config(sequelize));
  /*
  Mediante el método "init()" se inicializa el modelo "OrderProduct", el cual se creó en el archivo "order-product.model.js".

  Al método "init()" se le envía como parámetro el esquema (OrderProductSchema) que fue creado en el archivo "order.model.js", el cual define el esquema que debe tener dicho modelo.

  */
  /* Se invoca el método estático "config" que forma parte del modelo "OrderProduct". Como  es un método estático, no hace falta crear una instancia para poder usarlo, sino que se  implementa directamente. */
  /*
 El método "config" recibe como parámetro la conexión de Sequelize. El método estático "config" fue creado en el archivo "order-product.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  /* ********** Área para agregar las relacones (asociaciones). ********** */

  /* Se indica que la clase "Customer" tiene una asociación, y se le envían los modelos de dicha asociación (sequelize.models). */
  Customer.associate(sequelize.models);

  /* Se indica que la clase "User tiene una asociación, y se le envían los modelos de dicha asociación (sequelize.models). */
  User.associate(sequelize.models);

  /* Se indica que la clase "Category" tiene una asociación, y se le envían los modelos de dicha asociación (sequelize.models). */
  Category.associate(sequelize.models);

  /* Se indica que la clase "Product" tiene una asociación, y se le envían los modelos de dicha asociación (sequelize.models). */
  Product.associate(sequelize.models);

  /* Se indica que la clase "Order" tiene una asociación, y se le envían los modelos de dicha asociación (sequelize.models). */
  Order.associate(sequelize.models);
}

module.exports = setupModels;
