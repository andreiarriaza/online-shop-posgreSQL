/*
Middleware

El término middleware se refiere a un sistema de software que ofrece servicios y funciones comunes para las aplicaciones.
En general, el middleware se encarga de las tareas de gestión de datos,
servicios de aplicaciones, mensajería, autenticación y gestión de API.
⠀⠀⠀
Ayuda a los desarrolladores a diseñar aplicaciones con mayor eficiencia. Además, actúa como hilo conductor entre las aplicaciones,
los datos y los usuarios.

"express.json()" es un método incorporado en express para reconocer el objeto de solicitud entrante como objeto JSON.
Este método se invoca como middleware en la aplicación usando el código:
              app.use(express.json());

Este Middleware es INDISPENSABLE, para poder realizar el envío y recepción del método POST sin problemas.

  */

/*

El paquete "boom" permite administrar errores de la API.

Para instalarlo, se debe escribir lo siguiente en consola:
    npm i @hapi/boom
*/

import Boom from '@hapi/boom';

/* Para realizar la validación con la libería "Joi" (ver archivo "productSchema.js"),
es necesario crear un Middleware dinámico, por lo cual, este recibe como parámetros:
    - schema
    - property
*/

function validatorHandler(schema, property) {
  /* Básicamente el Middleware "validatorHandler", ejecuta la función anónima que está a continuación y que recibe
  los parámetros: req, res y next. */
  /* El procedimiento a continuación es una "Clausura o Closure"*/
  /*
  Clausura o Closure
  Una clausura o closure es una función que guarda referencias del estado adyacente (ámbito léxico).
  En otras palabras, una clausura permite acceder al ámbito de una función exterior desde una función interior. En JavaScript,
  las clausuras se crean cada vez que una función es creada.
  */
  return (req, res, next) => {
    //  Se define que la información  de la petición (req)se tomará del parámetro "property", y se almacenará en la constante "data".

    const data = req[property];

    /* La propiedad "abortEarly: false" se incluye para que cuando se realice la validación,
    se muestren todos los errores de validación encontrados. Si no se utiliza esta propiedad,
    se mostraría el primer error, luego, después de corregir este, se mostraría el segundo error, y así sucesivamente. */
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      /* El tipo de error de la libería "Boom" llamado "badRequest()" indica que hubo un error en la petición. */
      /* Se envía el error a los middleware de error (que se encuentra en el archivo "errorHandler.js") mediante la función "next()". */
      next(Boom.badRequest(error));
    }
    /* Si no hubiese ningún error, simplemente se ejecuta la función "next()" que hará que la aplicación siga su ejecución normal. */
    next();
  };
}

export default validatorHandler;
