/*

Validación de Datos

La dependencia "joi" permite realizar la validación de datos de la información enviada desde el FrontEnd.

El sitio web oficial es:
    https://joi.dev/

Para instalarla, se debe escribir lo siguiente:
    npm i joi


*/

/* Importación de la librería "joi". */
import Joi from 'joi';

/* Para poder utilizar "joi" es indispensable definir el tipo de dato
   que será recibido por la variable. En este caso, la constante "id", recibirá datos de tipo String (string). */

/*  El método "uuid()" permite obtener un string largo ÚNICO que se genera de forma aleatoria, el cual
    se convertirá en el "id". */
const id = Joi.string().uuid();

/* En este caso, se está definiendo que la constante "name" debe tener las siguientes características:
    - Tipo String
    - Longitud mínima: 3 caracteres.
    - Longitud máxima: 15 caracters.
  */
const name = Joi.string().min(3).max(15);

/* En este caso, se está definiendo que la constante "name" debe tener las siguientes características:
    - Tipo numérica.
    - Estricto. Esto es indispensable, porque, de otro modo, cuando se envíe como dato un precio con una cantidad numérica entre comillas, como "1000",
      este será interpretado también como número, lo cual es incorrecto. El método "strict()" asegura que todo número ingresado sea exactamente un número y no un string.
    - Acepta números enteros.
    - Valor mínimo: 10 (esto significa que el precio más bajo aceptado es "10").
  */
const price = Joi.number().strict().integer().min(10);

/* En este caso, se está definiendo que la constante "name" debe tener las siguientes características:
    - Tipo String.
    - Acepta solo URL's (uri). IMPORTANTE: aunque pudiera parecer lo contrario, el método se llama realmente "uri" y NO "url".

  */

const image =
  Joi.string().uri(); /* El nombre del método "uri()" es correcto. */

/* Creación de Schema para la "creación" */

/* El método "required()" indica si el campo es o no obligatorio. */
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

/* Creación de Schema para la "actualización" */
/* Para la actualización de datos, se define que cada atributo "name" se almacenará en el atributo "name "respectivo".
Como NO SE UTILIZÓ el método "required()", estos campos no serán obligatorios (requeridos).
*/
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

/* Creación de Schema para la "obtención" de datos a partir del "id" */
/* El método "required()" indica si el campo es o no obligatorio. */
/* Para obtener la información de un producto, solamente es necesario el "id" de dicho producto. */
const getProductSchema = Joi.object({
  id: id.required(),
});

export { createProductSchema, updateProductSchema, getProductSchema };

/* IMPORTANTE: para realizar la validación, se creó el Middleware llamado: "validatorHandler.js"*/
