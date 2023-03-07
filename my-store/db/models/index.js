/*
Este archivo se encarga de enviar la conexión hacia los modelos, los cuales se encuentran dentro del archivo "user-model.js".

*/

const { User, UserSchema } = require('./user.model.js');
const { Customer, CustomerSchema } = require('./customer.model.js');
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
 El método "config" recibe como parámetro la conexión de Sequelize. La función "config" fue creada en el archivo "user.model.js", en el donde se puede comprobar que el parámetro "sequelize" lo recibe desde el archivo "sequelize.js".
  */
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
}

module.exports = setupModels;
