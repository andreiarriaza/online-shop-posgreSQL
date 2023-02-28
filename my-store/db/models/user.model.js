/*
Se crea el modelo llamado "User", el cual será utilizado en el archivo "db/models/index.js"
*/

/* Se importan las utilidades "Model", "DataTypes" y "Sequelize"
que forman parte del ORM llamado Sequelize. */
import { Model, DataTypes, Sequelize } from 'sequelize';

// Definir el nombre de la tabla
/* Una buena práctica para nombrar los elementos en Sequelize y en general en las bases de datos es, en lugar de utilizar Camel Casing, utilizar el casign llamado "snake case".
  Ejemplo:
    snake_case

*/
const USER_TABLE = 'users';

/* Se define el esquema que define la estrctura de la base de datos. Los esquemas que se
encuentran dentro de la carpeta "schemas" son distintos a este, pues los que se encuentran dentro de la mencionada carpeta, ya que esos solo sirven para validar los datos de entrada, mientras que este esquema, sirve para definir la estructura de la tabla de la base de datos. */

const UserSchema = {
  //  Cada campo de la tabla se define en forma de atributos que a su vez son objetos con sus respectivas propiedades.
  /* El nombre de cada atributo corresponde al nombre con el que dicho campo se manipulará en JavaScript. */
  id: {
    /* Sirve para indicar si se permite (true) o no (false) que haya campos registros
    nulos en dicho campo. */
    allowNull: false,
    /* Se define si se desea que el campo sea autoincrementable. */
    autoIncrement: true,
    /* Se indica si el campo es o no una llave primaria. */
    primaryKey: true,
    /* Se define qué tipo de dato es el apropiado para el campo en cuestión. */
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    /* Este campo evita que hayan registros duplicados, evitando que haya dos valores iguales. */
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    /* El nombre real del campo es "create_at". El nombre del atributo "createdAt" que está unas líneas arriba, es el nombre con el que dicho campo se manipulará en JavaScript. */
    field: 'create_at',
    /* Se define que el vvalor predeterminado de este campo, será la fecha actual. */
    defaultValue: Sequelize.NOW,
  },
};

/* La clase "User" heredará de la clase "Model" que se importóal inicio de este archivo.

Esto significa que la clase "User" es el modelo de la base de datos con el que se trabajará.

La clase Model es la que contiene los métodos que permiten ejecutar queries. */
class User extends Model {
  /* Los método estáticos (static) no necesitan que se cree antes una instancia de la clase para poder utilizarse. */

  /* Asociaciones */
  static associate() {
    // associate
  }

  /* Configuración */
  static config(sequelize) {
    return {
      /* Nombre de la conexión que va a tener. */
      sequelize,
      /* Nombre de la tabla. */
      tableName: USER_TABLE,
      /* Nombre que se le desea asignar al modelo. */
      modelName: 'User',
      /* Se elige si se desea o no crear campos por defecto.  */
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
