import express from 'express';
/* Se importa el archivo que contiene las rutas relacionadas con los productos. */
import productsRouter from './productsRouter.js';
import usersRouter from './usersRouter.js';
import categoriesRouter from './categoriesRouter.js';

function routerApi(app) {
  /* Las siguientes dos líneas se utilizan para modificar la ruta.
  Una buena práctica al trabajar con API's es definir rutas específicas indicando la versión
  de la API a la que se desea conectar. Dicha versión va precedida de la palabra "api". Esto es un estándar
  en el trabajo con API's.

  Para conseguir esto, se crea una instancia del "router" de "express":
      const router = express.Router();

  Luego, se define por medio del método "use", la ruta (/api/v1) que será asignada a la instancia "router".

  Por útlimo, se va definiendo cada ruta a partir de la instancia "router":
      router.use('/products', productsRouter);

  Esto significa, que para acceder a la ruta de "products", ahora se deberá escribir la ruta:

      localhost:3000/api/v1/products






  */
  const router = express.Router();
  app.use('/api/v1', router);

  /* Se define la ruta que será asignada a "productsRouter", el cual hace referencia al módulo "router" que se exportó
  desde el archivo "productsRouter.js". */
  router.use('/products', productsRouter);

  /* Se define la ruta que será asignada a "usersRouter", el cual hace referencia al módulo "router" que se exportó
  desde el archivo "usersRouter.js". */
  router.use('/users', usersRouter);

  /* Se define la ruta que será asignada a "categoriesRouter", el cual hace referencia al módulo "router" que se exportó
  desde el archivo "categoriresRouter.js". */
  router.use('/categories', categoriesRouter);
}

export default routerApi;
