/*

Validación de Datos

La dependencia "joi" permite realizar la validación de datos de la información enviada desde el FrontEnd.

El sitio web oficial es:
    https://joi.dev/

Para instalarla, se debe escribir lo siguiente:
    npm i joi


*/

/* Importación de la librería "joi". */
const Joi = require('joi');

/* Para poder utilizar "joi" es indispensable definir el tipo de dato
   que será recibido por la variable. En este caso, la constante "id", recibirá datos "enteros". */

const id = Joi.number().integer();

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
const price = Joi.number().integer().min(10);

/*
También se agregará el campo "description", el cual contendrá la descripción de cada producto, el cual será de tipo "string" y tendrá una longitud mínima de 10 caracteres.
*/
const description = Joi.string().min(10);

/* En este caso, se está definiendo que la constante "name" debe tener las siguientes características:
    - Tipo String.
    - Acepta solo URL's (uri). IMPORTANTE: aunque pudiera parecer lo contrario, el método se llama realmente "uri" y NO "url".

  */

const image =
  Joi.string().uri(); /* El nombre del método "uri()" es correcto. */

const categoryId = Joi.number().integer();

/* Estas dos constantes servirán para filtrar los productos con base en un precio mínimo y un máximo.*/
const price_min = Joi.number().integer().min(10);
const price_max = Joi.number().integer().min(10);

/* Estas constantes servirán para controlar la paginación. */
/*

El comando _**limit**_ permite especificar la cantidad de elementos que se desea mostrar. Si se le asignara un valor de **10**, solamente 10 elementos se mostrarían en el sitio web.

Por otra parte el _**offset**_ es como un apuntador, para indicar el primer registro que se quiere devolver.

Ejemplo 1:
Suponiendo que se tengan los siguiente elementos:
1 2 3 4 5 6

Si se asignará un valor de _**offset**_ igual a "0" y un _**limit**_ igual a "2", se mostrarían únicmante los registros **1 y 2** de la base de datos, porque se mostrarían
"2" elementos a partir del elemento al que le corresponde el índice "0".

Ejemplo 2:
Suponiendo que se tengan los siguiente elementos:
1 2 3 4 5 6

Si se asignará un valor de _**offset**_ igual a "2" y un _**limit**_ igual a "2", se mostrarían únicmante los registros **3 y 4** de la base de datos, porque se mostrarían
"2" elementos a partir del elemento al que le corresponde el índice "2".

*/
const limit = Joi.number().integer();
const offset = Joi.number().integer();

/* Creación de Schema para la "creación" */

/* El método "required()" indica si el campo es o no obligatorio. */
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

/* Creación de Schema para la "actualización" */
/* Para la actualización de datos, se define que cada atributo "name" se almacenará en el atributo "name "respectivo".
Como NO SE UTILIZÓ el método "required()", estos campos no serán obligatorios (requeridos).
*/
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

/* Creación de Schema para la "obtención" de datos a partir del "id" */
/* El método "required()" indica si el campo es o no obligatorio. */
/* Para obtener la información de un producto, solamente es necesario el "id" de dicho producto. */
const getProductSchema = Joi.object({
  id: id.required(),
});

/* Creación de Schema para la paginación de la aplicación */
/*  Los parámetros "price", "limit" y "offset" son parámetro de tipo "query" (enviados por medio de la URL), por lo tanto, son opcionales, no es necesario agregar el método "require()". */
/* (*/
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  /*
  Al atributo "price_max" se le agregará una validación, la cual consite en lo siguiente:
    El atributo "price_max" erá obligatorio, si y solo sí, el atributo "price_min" fue enviado también.

    Esto se consigue mediante la librería Joi. Ejecutando un condicional mediante el método "when", dentro del cual se indica
    el atributo (price_min) que será tomado como referencia para verificar si cumple la condición.

    La condición se define por medio del comando "is", dentro del cual se comprobará si el atributo "price_min" es un número entero (Joi.number().integer()) y además,
    se verifica si dicho número realmente fue enviado, y esto se consigue mediante el método "require()":  Joi.number().integer()

    Si la condición se cumple, se realizará lo que se encuentra definido dentro del atributo "then". En este caso,
    si se comprueba que existe el atributo "price_min" y que este es un número entero, entonces (then) se
    definirá que el atributo "price_max" debe ser obligatorio (Joi.required).




  */
  price_max: price_max.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};

/* IMPORTANTE: para realizar la validación, se creó el Middleware llamado: "validatorHandler.js"*/
