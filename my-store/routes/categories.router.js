import express from 'express';

const router = express.Router();

/* En este ejemplo, como se asignaron dos atributos  dentro del objeto JSON (categoryId y productId),

si se escribe la siguiente ruta:
    localhost:3000/categories/1/products/1000

Se mostraría el siguiente objeto JSON:
    {
    "categoryId": "1",
    "productId": "1000"
    }

    */
/* Se debe recordar que el archivo "categoriesRouter.js" se invoca en el archivo "routes/index.js",
mediante la siguiente línea de código:
        router.use('/categories', categoriesRouter);

Tomando en cuenta lo anterior, cuando en el presente archivo (categoriesRouter.js) se crea
el método "router.get('/:categoryId/products/:productId'...)  como se devolverán los atributos "categoryId" y "productId" como respuesta "res"
de la petición, si se escribe la siguiente ruta:

     localhost:3000/categories/1/products/1000

Se mostraría el siguiente objeto JSON:
    {
    "categoryId": "1",
    "productId": "1000"
    }

*/
router.get('/:categoryId/products/:productId', (req, res) => {
  /* Como "categoryId" y "productId" son parámetros normales (y no parámetros query), se usa la propiedad "req.params" para desestructurarlos. */
  const { categoryId, productId } = req.params;

  /* El método "json()" convierte un objeto JSON en un objeto JavaScript. A pesar de su nombre,
  este método no convierte un objeto en JSON, sino que convierte un objeto JSON en objeto JavaScript. */
  res.json({
    categoryId,
    productId,
  });
});

/* Se exporta la constante "router" como un módulo. */
export default router;
