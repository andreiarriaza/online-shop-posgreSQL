import express from 'express';

/* Se importa la clase "ProductsService", la cual corresponde a los servicios que han sido creados. */
import ProductsService from '../services/productService.js';

/* Se importa el Middleware de validación llamado: "validatorHandler.js". */
import validatorHandler from '../middlewares/validatorHandler.js';

/* Se importan los Schemas "createProductSchema, updateProductSchema y getProductSchema" creados en el archivo "productSchema.js" dentro de la carpeta "schemas". */
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from '../schemas/productSchema.js';

const router = express.Router();

/* Se crea una instancia del servicio. */
const service = new ProductsService();

/* Se debe recordar que el archivo "productsRouter.js" se invoca en el archivo "routes/index.js",
mediante la siguiente línea de código:
        router.use('/products', productsRouter);

Tomando en cuenta lo anterior, cuando en el presente archivo (productsRouter.js) se crea
el método "router.get('/'...) que está a continuación, la diagonal sirve
para indicar que ese método se ejecutará cuando se acceda a la ruta raíz (/) del archivo "productsRouter.js" mediante el método GET.

Dicha ruta raíz equivale al endpoint:
     localhost:3000/api/v1/products

*/
router.get('/', async (req, res) => {
  /* También es posible enviar objetos JSON al servidor.
  En este caso, se envía un arreglo, el cual contiene
  diferentes objetos JSON. */

  /* Se accede al método "find" de la instancia de servicio llamada "service", es decir, se acede al método "find()" del
  archivo de servicio llamado "productService.js". Con esto, se obtienenen los productos, los cuales se almacenan dentro de la constante "products".  */
  const products = await service.find();

  /*

Parámetros query

Son parámetros de consulta que suelen venir en los métodos de consulta o métodos GET.

Son los que se utilizan, por ejemplo,
para controlar la paginación de un sitio web, y
poder mostrar los productos de la página 1, o los
productos de la página 2, etc.

La mayoría de veces se utilizan para filtrar determinados registros, para que solo sean mostrados algunos productos en específico.
*/
  /*
 Para poder capturar los parámetros de tipo "query", se utiliza la propiedad "req.query".

  Ejemplo:
    const { size } = req.query;

*/

  /* Se utiliza un operador de cortocircuito para comprobar si el usuario envió el parámetro query (el cual es opcional),
  o bien, si no lo envió.

  Si el parámetro query llamado "size" fue enviado, es decir, si existe, será almacenado en la variable "limit".
  De lo contrario, si dicho parámetro no fue enviado, en la variable "limit" se almacenará el valor "10".
  */

  res.json(products);
});

/* ******************* Métodos ******************* */
/*


- GET: Permite obtener datos del servidor.

- PUT: Permite editar un registro en el servidor, con la salvedad de que se deben modificar TODOS los
       campos que correspondan a ese registro.

- PATCH: Hermano de "PUT", con la diferencia de que permite modificar solamente los campos del registro que se desee,
         es decir, NO ES NECESARIO MODIFICAR TODOS LOS CAMPOS DEL REGISTRO.

- POST: Permite crear nuevos registros en el servidor.

- DELETE: Permite eliminar un registro del servidor.

*/

/* ******************* Método GET ******************* */

/* ********** Ejemplo 1 ********** */

/*
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡IMPORTANTE!!!!!!!!!!!!!!!!!!!!

Los primeros dos ejemplos tienen una peculiaridad que vale la pena resaltar.

El "endpoint" del ejemplo 1 es:
     /products/filter

El "endpoint" del ejemplo 2 es:
    /products/:id

Como se explica en el ejemplo 2, cualquier valor que sea enviada en la ruta, será tomado como "id".

  Ejemplo:

    /products/5   (el id es igual a 5)
    /products/one  (el id es igual a "one")


Esto es importantísimo porque, siendo así, qué podría pasar con la ruta del ejemplo 1:
    /products/filter

El valor "filter" podría ser interpretado como si fuera el valor del parámetro "id" que se le está enviando. Es
decir, podría pensarse que si la ruta es "/products/filter", el "id" sería "filter". Pero eso NO ES LO QUE SE BUSCA,
se quiere que "filter" sea una ruta a la que el usuario pueda acceder, y no se desea que
sea interpretado como "id".

Para evitar esta confusión, se debe tomar en cuenta la siguiente REGLA DE ORO de Node JS:

            "LOS 'ENDPOINT' ESPECIFICOS, DEBEN IR ANTES DE LOS 'ENPOINT' DINÁMICOS."



Lo anterior significa que cuando se tiene un endpoint específico, como la ruta:
    /products/filter          (endpoint específico)

Dicha ruta debe ser creada antes del endpoint dinámico, por ejemplo, la ruta:
    /products/:id             (enpoint dinámico)


Precisamente por ello es que el ejemplo 1, se encuentra antes del ejemplo 2.

Siguiendo este orden, cuando se escriba la ruta:
    /productsa/filter

NO SERÁ RECONOCIDA la palabra "filter" como un "id", sino que será interpretada como una ruta específica; es decir, que mostrará el texto:
   "Yo soy un filter".

*/

/* Ruta "filter" con "endpoint" específico. */
/*
Para testear esta ruta, se debe hacer una petición por método GET al siguiente endpoint:
    localhost:3000/api/v1/products/filter
*/
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter.');
});
/* ********** Ejemplo 2 ********** */

/* En este caso, se usa el método "GET",
pero se está indicando que el "endpoint"
recibirá un parámetro; esto se indica por medio de
los dos puntos (:). El parámetro que recibirá el
endpoint en este ejemplo, es el parámetro "id" (:id). */

/* En este ejemplo, como no se asignó ningún atributo "id" dentro del objeto JSON,
cualquier número o texto que se escriba el "endpoint", será
tomado como "id".

Es decir, que si se escribiera la siguiente ruta:
    localhost:3000/products/5

Se mostraría el siguiente objeto JSON:
    {
    "id": "5",
    "name": "Product 2",
    "price": 2000
    }

    */

/* Después de la ruta (/:id) se invoca la validación de datos mediante la función "validatorHandler", dentro de la cual
se envían dos parámetros:
    - Primer parámetro: en este, se especifica qué tipo de Schema se quiere validar, en este caso, el schema "getProductSchema".
    - Segundo parámetro: se indica de dónde vendrá la información que se utilizará de referencia. En este caso, el valor que se requiere es el
                         valor del "id", el cual es enviado por medio de la URL como parámetro (params).

Si la validación es exitosa, solo entonces, se ejecuta la función asíncrona (async) que está a continuación del parámetro "validatorHandler()".
*/

/* El parámetro "next" corresponde a la función "next()", la cual se encargará, en el caso de haber un error,
    de invocar los Middlewares de error ubicados en el archivo "errorHandler.js". */

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      /*
  En este ejemplo, el comando "req.params.id" obtiene
  el valor del parámetro "id"(:id) que se está enviando
  mediante el "endpoint".
  */
      /* Se utiliza la desestructuración para indicar
    que de todos los parámetros, únicamente se desea obtener el parámetro llamdo "id". */
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      /* En caso de detectar un error, se ejecuta la función "next()", la cual se encarga de invocar
    los middlewares de error que fueron creados en el archivo "errorHandler.js". */
      next(err);
    }
  }
);

/* ****************************** Método POST ****************************** */

/* Para corroborar el envío por medio de método POST, se debe utlizar ya sea POSTMAN o INSOMNIA,
para realizar el envío de datos al servidor.


Los datos que serán enviados desde POSTMAN o INSOMNIA, deben tener el siguiente formato JSON:

    {
      "name": "New Product",
      "price": 1500,
      "image": "http://placeimg.com/640/480"
    }

*/
/*
¡¡¡¡¡¡¡¡¡¡IMPORTANTE!!!!!!!!!

 Para el funcionamiento del método POST, es necesario implementar un Middleware en el arhivo "MY-STORE/index.js".


Middleware

El término middleware se refiere a un sistema de software que ofrece servicios y funciones comunes para las aplicaciones.
En general, el middleware
se encarga de las tareas de gestión de datos, servicios de aplicaciones, mensajería, autenticación y gestión de API.
⠀⠀⠀
Ayuda a los desarrolladores a diseñar aplicaciones con mayor eficiencia. Además, actúa como hilo conductor entre las aplicaciones,
los datos y los usuarios.

"express.json()" es un método incorporado en express para reconocer el objeto de solicitud entrante como objeto JSON. Este método se llama como middleware en su aplicación usando el código:
              app.use(express.json());

Este Middleware es INDISPENSABLE, para poder realizar el envío y recepción del método POST sin problemas.

  */

/* Después de la ruta (/) se invoca la validación de datos mediante la función "validatorHandler", dentro de la cual
se envían dos parámetros:
    - Primer parámetro: en este, se especifica qué tipo de Schema se quiere validar, en este caso, el schema "createProductSchema".
    - Segundo parámetro: se indica de dónde vendrá la información que se utilizará de referencia. En este caso, la información
                         es enviada en el "body".

Si la validación es exitosa, solo entonces, se ejecuta la función asíncrona (async) que está a continuación del parámetro "validatorHandler()".
*/
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    /* La constante "body", almacenará toda la información que será enviada en formato JSON a la API por medio del método POST desde POSTMAN. */
    /* La propiedad "req" (request), hace referencia a la petición de datos que se realizará.  */
    const body = req.body;
    /* Se accede al método "create" de la instancia de servicio llamada "service", es decir,
    se accede al método "create()" del archivo de servicio "productService.js", el cual devolverá los datos del nuevo producto
    que se desea agregar. El estatus "200" indica que la petición fue exitosa. */
    const newProduct = await service.create(body);

    /* El método "json()" convierte un objeto JSON en un objeto JavaScript. A pesar de su nombre,
  este método no convierte un objeto en JSON, sino que convierte un objeto JSON en objeto JavaScript. */
    /*
  El objeto "res" devolverá los siguientes atributos:
    message: mensaje que se mostrará.
    data: cuerpo (body) con los datos que serán enviados como respuesta. */

    res.status(200).json(newProduct);
  }
);

/* ****************************** Método PUT ****************************** */
/*
Se utilizar para editar TODOS los campos del registro indicado. Esto significa que si se quiere modificar solamente algunos campos
del registro, no debería ser utilizado este método.


Aunque el método PUT también podría ser usado para modificar solo algunos campos del registro, la convención de API Rest determina
que el método apropiado en ese caso, sería el método "PATCH".

*/

/* Después de la ruta (/:id) se invocan, en esta ocasión 2 validaciones:

Primera validación: Para validar el envío de un "id" que cumpla con el formato buscado, se invoca la función "validatorHandler", dentro de la cual
                    se envían dos parámetros:
                      - Primer parámetro: en este, se especifica qué tipo de Schema se quiere validar, en este caso, el schema "getProductSchema".
                      - Segundo parámetro: se indica de dónde vendrá la información que se utilizará de referencia. En este caso, el valor que se requiere es el
                           valor del "id", el cual es enviado por medio de la URL por medio del parámetro (params).

Segunda validación: Para validar que se haya enviado la información que se editará, se realiza la validación de datos mediante la función "validatorHandler",
                    dentro de la cual se envían dos parámetros:
                      - Primer parámetro: en este, se especifica qué tipo de Schema se quiere validar, en este caso, el schema "updateProductSchema".
                      - Segundo parámetro: se indica de dónde vendrá la información que se utilizará de referencia. En este caso, la información
                         es enviada en el "body" desde POSTMAN desde el FrontEnd.

Si ambas validaciones son exitosas, solo entonces, se ejecuta la función asíncrona (async) que está a continuación del parámetro "validatorHandler()".

*/
router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    /* Se utiliza la destructuración para obtener el valor del parámetro "id" (:id) que fue
  enviado mediante la URL. */
    const { id } = req.params;
    /* Se accede al método "update" de la instancia de servicio llamada "service", es decir, se invoca el método "update" del archivo
    de servicio llamado "productService.js". */
    const product = await service.update(id, body);
    res.json(product);
  }
);

/* ****************************** Método PATCH ****************************** */
/*
Se utilizar para editar solamente ALGUNOS de los campos del registro indicado. Esto significa que si se quieren modificar TODOS los campos
del registro, no debería ser utilizado este método.


Aunque el método PATCH también podría ser usado para modificar TODOS los campos del registro, la convención de API Rest determina
que el método apropiado en ese caso, sería el método "PUT".

*/

/* Después de la ruta (/:id) se invocan, en esta ocasión 2 validaciones:

Primera validación: Para validar el envío de un "id" que cumpla con el formato buscado, se invoca la función "validatorHandler", dentro de la cual
                    se envían dos parámetros:
                      - Primer parámetro: en este, se especifica qué tipo de Schema se quiere validar, en este
                        caso, el schema "getProductSchema".
                      - Segundo parámetro: se indica de dónde vendrá la información que se utilizará de
                        referencia. En este caso, el valor que se requiere es el
                        valor del "id", el cual es enviado por medio de la URL como parámetro (params).

Segunda validación: Para validar que se haya enviado la información que se editará, se realiza la validación de datos mediante la función "validatorHandler",
                    dentro de la cual se envían dos parámetros:
                      - Primer parámetro: en este, se especifica qué tipo de Schema se quiere validar, en este caso, el schema "updateProductSchema".
                      - Segundo parámetro: se indica de dónde vendrá la información que se utilizará de referencia. En este caso, la información
                         es enviada en el "body" desde POSTMAN o desde el FronEnd.

Si ambas validaciones son exitosas, solo entonces, se ejecuta la función asíncrona (async) que está a continuación del parámetro "validatorHandler()".
*/

/* El parámetro "next" corresponde a la función "next()", la cual se encargará, en el caso de haber un error,
    de invocar los Middlewares de error ubicados en el archivo "errorHandler.js". */
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      /* Se utiliza la destructuración para obtener el valor del parámetro "id" (:id) que fue
  enviado mediante la URL. */
      const { id } = req.params;
      /* Se accede al método "update" de la instancia de servicio llamada "service".   */
      const product = await service.update(id, body);
      res.json(product);
    } catch (err) {
      /* En caso de detectar un error, se ejecuta la función "next()", la cual se encarga de invocar
    los middlewares de error que fueron creados en el archivo "errorHandler.js". */
      next(err);
    }
  }
);

/* ****************************** Método DELETE ****************************** */

router.delete('/:id', async (req, res) => {
  /* Como se está eliminando un registro, no se envía ningún contenido dentro del elemento "Body". */
  // const body = req.body;

  /* Se utiliza la destructuración para obtener el valor del parámetro "id" (:id) que fue
  enviado mediante la URL. */
  const { id } = req.params;
  /* Se accede al método "delete" de la instancia de servicio llamada "service". */
  const confirmDelete = await service.delete(id);

  res.json(confirmDelete);
});

/* Se exporta la constante "router" como un módulo. */
export default router;

/*

Middlewares

Estos se encuentran entre el "REQUEST" y el "RESPONSE". El middleware es un tipo de software que, como su propio nombre indica (middle significa “medio”) se coloca entre las diferentes aplicaciones y el sistema operativo que las tiene que ejecutar, con el objetivo de facilitar la comunicación de datos entre ellos. Se trata de un término que aparece por primera vez en el año 68 es una conferencia de la OTAN.

El middleware se conoce también como “plumbing” (tuberías) porque conecta unas aplicaciones contras. También se puede comparar con un traductor que facilita que las distintas aplicaciones se comuniquen entre ellas y compartan datos.

Un ejemplo de Middleware, sería el que valida que el usuario haya accedido a la API con las credenciales correctas,
si es así, entonces se podría ejecutar otro Middleware que realice otro proceso en específico.

Pueden ejecutarse varios Middlewares. Si hay varios, se ejecutarán secuencialmente.


Algunas de sus funciones son:
  - Funcionan omo Pipes (tuberías) Es decir, se pueden conectar unos con otros.
  - Validar datos.
  - Capturar errores.
  - Validar permisos.
  - Controlar accesos.

*/
