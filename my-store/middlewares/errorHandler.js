/*
IMPORTANTE: los Middlewares de tipo error se deben crear después de definir el "Routing", de lo contrario se generará un error.
*/

/*
Middleware

El término middleware se refiere a un sistema de software que ofrece servicios y funciones comunes para las aplicaciones.

En general, el middleware se encarga de las tareas de gestión de datos, servicios de aplicaciones, mensajería, autenticación y gestión de API.
⠀⠀⠀
Ayuda a los desarrolladores a diseñar aplicaciones con mayor eficiencia. Además, actúa como hilo conductor entre las aplicaciones,
los datos y los usuarios.

"express.json()" es un método incorporado en express para reconocer el objeto de solicitud entrante como objeto JSON. Este método se llama como middleware en su aplicación usando el código:
              app.use(express.json());

Este Middleware es INDISPENSABLE, para poder realizar el envío y recepción del método POST sin problemas.

  */

/* En este caso se creará un Middleware Global para administrar los errores.

Los middleware de error reciben 4 parámetros:
  - err (obligatorio): error a ejecutar.
  - req (obligatorio): petición
  - res (obligatorio): respuesta
  - next (obligatorio): redirige la aplicación al siguiente Middleware. IMPORTANTE: aunque no se utilice la función "next()",
                        SE DEBE COLOCAR SIEMPRE.


Los Middleware normales, que no son de error, únicamente reciben 3 parámetros: req, res y next.
*/

/*

IMPORTANTE: para probar el funcionamiento de los Middlwares de error, se puede buscar la función
"findOne()" del archivo "productService". Dentro de ella se encuentra comentada una línea
con el siguiente código:
    const name = this.getTotal();

Como se sabe, el método "getTotal()" no existe en esta aplicación, así que si la línea anterior se descomenta, se podría
comprobar si los Middlwares de error funcionan correctamente.

Además de descomentar la línea anterior, se agregó dentro del archivo "products.router.js" el siguiente "try-catch":
   try {


      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {

      next(err);
    }


  Dentro del "catch" se invoca la función "nex(err)", la cual se ejecutará cuando se detecté un error. Dicha función ejecutará
  los Middleware de error que se encuentran en este archivo.

  IMPORTANTE: para que los Middlewares de error funcionen, es indispensable quitar temporalmente, cuando se realicen las pruebas de error,
  el siguiente parámetro de la función "router.get()" que se encuentra dentro del archivo "productsRouter.js":

    validatorHandler(getProductSchema, 'params'),


  Luego de haber quitado temporalmente el parámetro anterior, se puede usar Insomnia o Postman para el envío de un "id" por medio del método GET, y comprobar
  el mensaje de error devuelto. Ejemplo de envío por método GET:
    localhost:3000/api/v1/products/12


*/

/* PRIMER MIDDLWARE DE ERROR: captura el error y lo envía a consola. */

function logErrors(err, req, res, next) {
  /* Este "console.log" se utiliza para saber cuál de los dos Middlewares se ejecuta primero, si "logError" o "errorHandler", pues en ese mismo
  orden deben ser implementados en el archivo "index.js". */
  console.log('logError');

  console.error(err);
  /* El método "nex(err)" ejecuta el middleware enviándole un error.
  Si el método "nex()" no tuviera parámetros, sería un middleware normal.
  */

  /* Al ejecutar el método "next()" el error (err) es enviado al Middleware de tipo "error" llamado "errorHandler()"
  que se encuentra a continuación. */
  next(err);
}

/* SEGUNDO MIDDLEWARE DE ERROR: devuelve la respuesta deseada. */

/*

Los middleware de error reciben 4 parámetros:
  - err (obligatorio): error a ejecutar.
  - req (obligatorio): petición
  - res (obligatorio): respuesta
  - next (obligatorio): redirige la aplicación al siguiente Middleware. IMPORTANTE: aunque no se utilice la función "next()",
                        SE DEBE COLOCAR SIEMPRE.

  Los Middleware normales, que no son de error, únicamente reciben 3 parámetros: req, res y next.
*/
/* Este Middleware recibe el parámetro de error (err) que le es enviado desde el Middleware "logErrors" mediante la funcion "next(err)". */
/* IMPORTANTE: este Middleware ya no invoca a la función "next()" porque el parámetro de error (err) ya no será
enviado a otro Middleware. */
function errorHandler(err, req, res, next) {
  /* Este "console.log" se utiliza para saber cuál de los dos Middlewares se ejecuta primero, si "logError" o "errorHandler", pues en ese mismo
  orden deben ser implementados en el archivo "index.js". */
  console.log('errorHandler');

  /* Este Middlware devolverá una respuesta en formato JSON y se le envía el estado de error "".  */
  res.status(500).json({
    /* La respuesta tendrá dos atributos:
        - message: contiene el valor "err.message" el cual corresponde a la propiedad "message" (mensaje de error) del parámetro "err".
        - stack: indica en donde ocurrió el error. Su valor se obtiene de la propiedad "stack" del parámetro "err".
    */
    message: err.message,
    /* "stack" indicará en dónde se encontró el error. */
    stack: err.stack,
  });
}

/* Middleware que será utilizado con el paquete BOOM, el cual permite la gestión de errores. */
function boomErrorHandler(err, req, res, next) {
  /* La propiedad "isBoom" permite verificar si el error que se generó es un error de tipo "boom" (del paquete "boom"). */
  if (err.isBoom) {
    /* Se obtiene la información del error generada por el paquete "boom". Dicha información
     se almacena en el objeto "output". */
    const { output } = err;
    /* En la propiedad "statusCode" del atributo "output", el paquete "boom" envía el código de error generado. Mientras
    que en el atributo "payload" de la propiedad "output" es enviada la información del error. */
    res.status(output.statusCode).json(output.payload);
  }

  /* Si el error generado NO ES de tipo "boom", se invoca la función "next()", la cual ejecuta los Middlewares
  que se crearon en este archivo (excepto el middleware "boomErrorHnadler()", pues este último es exclusivo para errores del paquete "Boom"). */
  next(err);
}

export { logErrors, errorHandler, boomErrorHandler };
