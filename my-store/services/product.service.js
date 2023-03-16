/* ******************************************** CREACIÓN DE SERVICIOS ******************************************** */

/* En los servicios está toda la lógica de negocio y resuelve los casos de uso. */

/*

Faker JS
Es una librería (dependencia) que genera
datos falsos para pruebas y desarrollo.

Su sitio web es: https://fakerjs.dev/

Para instalarla y utilizarla se deben seguir los siguientes pasos:

    1. Instalar la dependencia de "Faker js":
            npm install @faker-js/faker --save-dev

    2. Antes de realizar la importación del paso
       siguiente, es indispensable abrir el archivo
       de configuración de ESLint llamadio ".eslintrc.json"
       y agregar en la sección de "parserOptions"
       la siguiente propiedad con el valor indicado:

            "sourceType": "module"

       Esto es necesario para que la aplicación permita utilizar el comando "import", que se utilizará a continuación.

    3. Importar la librería dentro del proyecto:
            import { faker } from '@faker-js/faker';

        Ejemplo de cómo obtener el atributo nombre de dicha API:
            const randomName = faker.name.findName();
*/
const { faker } = require('@faker-js/faker');

/* Sequelize también proporciona un objeto llamado "Op", el cual permite utilizar operadores de Sequelize dentro de la aplicación.  */
const { Op } = require('sequelize');
/*
Paquete "boom":
El paquete "boom" permite administrar errores de la API.

Para instalarlo, se debe escribir lo siguiente en consola:
    npm i @hapi/boom
*/

const boom = require('@hapi/boom');

/* Se importa los modelos de "sequelize". */
const { models } = require('../libs/sequelize');

/*
IMPORTANTE: no es necesario importar el archivo "postgres.pool.js", porque el "pool"
fue incluido dentro del ORM llamado "Sequelize" (ver la sección "Qué es ORM" del archivo README.md).
*/
// import pool from '../libs/postgres.pool.js';

class ProductsService {
  constructor() {
    // Se inicializa un array en memoria.
    this.products = [];
    /* Se invoca el método "generate" que se crea a continuación. */
    this.generate();

    /*
IMPORTANTE: no es necesario usar los siguientes comandos "pool", porque este ya fue incluido dentro del ORM llamado "Sequelize" (ver la sección "Qué es ORM" del archivo README.md).
*/

    /* Se indica que se desea obtener un "pool", el cual corresponde al "pool" que fue importado en la parte superior de este archivo, y que se encuentra en el archivo "postgres.pool.js". */

    //this.pool = pool;

    /* Se va a "escuchar" si hay un error cuando se obtenga el "pool". Si se detecta
    un error, se ejecutará un callback, que en este caso es una ArrowFunction que indicará que hubo un error en el "pool". */
    /* IMPORTANTE: los "console.log" aparcen subrayados porque NO ES UNA BUENA PRÁCTICA dejaron allí cuando
    el archivo es enviado a Producción. Pueden estar para pruebas solamente en la etapa de Desarrollo, pero
    en la etapa de Producción deben ser eliminados. */

    // this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    /* Se mostrarán 100 productos como máximo */
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      /*

    La librería Fake JS devuelve, entre otros, los siguientes valores:

      - id único: faker.datatype.uuid()  (genera un id único)
      - nombre de producto: faker.commerce.productName()
      - Precio del producto (cadena de texto): faker.commerce.price()
      - URL de la imagen del producto: faker.image.imageUrl()


      El precio devuelto por "faker.commerce.price()"
      es una cadena de texto, por ello, es necesario
      castearlo a número, en este caso, a
      número entero.

      Al castearlo, se indica que el valor anterior se convertirá a un número entero de base "10"
      */

      /* Se envía al arreglo "products" un objeto mediante el método PUSH.  */
      this.products.push({
        /* El método "uuid()" permite obtener un string largo ÚNICO que se genera de forma aleatoria, el cual
        se convertirá en el "id". */

        id: faker.datatype.uuid(),

        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),

        /* La propiedad "isBlock" almacenará datos booleanos generados por la librería "faker" de forma aleatoria.

        Para que "faker" genere dichos datos se utiliza la propiedad "faker.datatype.boolean".

        Esta propiedad servirá, para ejemplificar la librería "Boom", la cual impedirá que la información
        del producto correspondiente se muestre, si el valor de la propiedad "isBlock" es "verdadero".
        */
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  /* La función "create" se encarga de crear (insertar) un nuevo registro en la tabla "products". */
  async create(data) {
    /* Algunas líneas de código se dejaron comentadas, porque dichas líneas sirvieron solo provisionalmente, con una API falsa nada más.

    */

    //const newProduct = {
    /* El método "uuid()" permite obtener un string ÚNICO largo que se genera de forma aleatoria, el cual
        se convertirá en el "id". Se indica que la API "f" */
    // id: faker.datatype.uuid(),
    /* Se utiliza el Spread Operator (...) para concatenar junto con el id, lo que se encuentre dentro del parámetro "data",
      el cual es recibido por el método "create(data)".  */
    // ...data,
    // };
    /* Se envía, mediante el método "push", los datos del nuevo producto al arreglo "products". */
    // this.products.push(newProduct);
    /* Se retorna los datos del nuevo producto agregado.  */
    // return newProduct;

    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  /* La función "find()" que servirá para visualizar los datos almacenados en la tabla "products", recibe el parámetro "query", el
  cual le fuen enviado desde el archivo "products.router.js"; específicamente desde la función "get()".

  El parámetro "query" es un objeto que incluye dos valores:
  "limit" y "offset". */
  async find(query) {
    /* La constante "options" almacena las opciones que le serán enviadas al método "findAll()".

    En este caso, se le enviarán los datos que se encuentran en la asociación "category",
    */
    const options = {
      /* Con solo incluir el alias (category), el cual se asignó cuando se creó la asociación (relación) entre la tabla "categories" y la tabla "products", dentro del archivo "product.model.js", en la sección donde se declaró el método estático "associate()", sequelize devolverá, además de los datos de la tabla "products", también los datos de la tabla "categories". Esto se consigue agregando el comando:

          include: ['category'],
    */
      include: ['category'],
      /* Se usa el comando "where", el cual equivale a la sentencia "WHERE" de SQL.

      Sequelize proporciona distintos comandos equivalentes a las distantas consultas o sentencias SQL.

      Para conocer los distintos comandos, se puede acceder al siguiente link:
        https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      */
      /* Se agrea un valor vacío dentro del comando "where", esto permitirá que si no se envía ningún valor dentro de él más adelante,
      no afectará en nada a la aplicación.  */
      where: {},
    };

    /* Se desestructuran los valores "limit" y "offset" que fueron enviados como parte del parámetro "query". */
    const { limit, offset } = query;
    /* Se comprueba si fueron enviados los parámetros "limit" y "offset". */
    if (limit && offset) {
      /* Se agrega el parámetro "limit" dentro del objeto "options", con el nombre "limit" (options.limit).  */
      options.limit = limit;
      /* Se agrega el parámetro "offset" dentro del objeto "options", con el nombre "offset" (options.offset).  */
      options.offset = offset;
    }
    /* Se desestructura el valor "price" que también fue enviado como parte del parámetro "query".  */
    const { price } = query;

    /* Si el parámetro "price" es verdadero, es decir, si el parámetro NO está vacío,
    se agregará el atributo "price" y se le asigna el valor del parámetro "price",
    al objeto que se encuentra almacenado dentro del atributo "where", el cual se definió dentro
    de la constante "options" anteriormente. */
    if (price) {
      options.where.price = price;
    }

    /* Se desestructuran los valores "price_min" y "price_max", los cuales también están incluidos dentro del parámetro "query". */
    const { price_min, price_max } = query;

    /* Si el parámetro "price" es verdadero, es decir, si el parámetro NO está vacío,
    se agregará el atributo "price" y se le asigna el valor del parámetro "price",
    al objeto que se encuentra almacenado dentro del atributo "where", el cual se definió dentro
    de la constante "options" anteriormente. */
    if (price_min && price_max) {
      /* Sequelize también proporciona un objeto llamado "Op", el cual permite utilizar operadores de Sequelize dentro de la aplicación.
      Este objeto fue importado al inicio de este archivo. */
      options.where.price = {
        /* El operador "Op.gte" equivale al operador "mayor o igual que". En este caso, se desea que sea mayor o igual al precio mínimo. */
        [Op.gte]: price_min,
        /* El operador "Op.lte" equivale al operador "menor o igual que". En este caso, se desea que sea menor o igual al precio máximo. */
        [Op.lte]: price_max,
      };
    }

    /* Algunas líneas de código se dejaron comentadas, porque dichas líneas sirvieron solo provisionalmente, con una API falsa nada más.

    */
    // const query = 'SELECT * FROM tasks';

    /* Esta línea:
          const query = 'SELECT * FROM tasks';

    Es equivalente a la siguiente línea creada con el ORM llamado Sequelize:


    */

    /*

    La constante "response" almacenará la respuesta de la consulta ejecutada
    en la base de datos, mediante la instancia "Pool" que se importó del archivo "posgres.pool.js".

    En este caso, la consulta devolverá todos los campos de la tabla "tasks" de la base de datos conectada con la aplicación, la cual, en este caso se llama "my_store".

    Debido a que este procedimiento se debe realizar de forma asíncrona, se agrega el comando "await".
    */

    // const [data /*, metadata*/] = await sequelize.query(query);

    /* La función "findAll()" devolverá todos los datos que correspondan a una tabla específica. */

    /* Con solo incluir el alias (category), el cual se asignó cuando se creó la asociación (relación) entre la tabla "categories" y la tabla "products", dentro del archivo "product.model.js", en la sección donde se declaró el método estático "associate()", sequelize devolverá, además de los datos de la tabla "products", también los datos de la tabla "categories". Esto se consigue agregando el comando:

          include: ['category'],
    */
    const products = await models.Product.findAll(options);

    /* El ORM llamado Sequelize, devuelve un arreglo con los siguientes elementos:
      - data: los datos que correspondan a la consulta ejecutada.
      - metadata: devuelve información más detallada de los datos, por ejemplo: sentencia SQL ejecutada (command), número de filas que conforman la tabla (rowCount), etc.

    En este caso, solamente se usará el elemento que contiene la "data".
    Si se quisiera también la "metadata", el comanto anterior se debería escribir así:
          const [data, metadata] = await sequelize.query(query);
    */
    return {
      products,
      // metadata,
    };
  }

  /* Petición asíncrona para buscar un producto determinado a partir de su "id". */

  /*
  Endpoint para poder realizar la búsqueda con base en determinado "id":
      http://localhost:3000/api/v1/products/1
  */
  async findOne(id) {
    // Para comprobar la generación del error de los Middlewares de errores.
    //  Si se quisiera comprobar el funcionamiento de los middlewares para errores, se puede agregar la línea que está a continuación.
    // const name = this.getTotal();

    /* Se comprueba si algún valor del atributo "id" de cada producto(item), coincide con el "id" que fue enviado
    como parámetro a la función "findOne()". La función "find" buscará el "id" que coincida dentro del arreglo "products" y lo devolverá, en caso
    sea encontrado. Si el "id" es encontrado, la constante "product" será VERDADERA. Pero si el "id" no es encontrado, la constante "product"
    tendrá el valor "FALSE". */
    const product = models.Product.findByPk(id);

    if (!product) {
      // Se lanza un error mediante el comando "throw", por medio del paquete "boom".
      throw boom.notFound('Producto no encontrado');
    }

    /* Se verifica si la propiedad "isBlock" es "verdadera"; si lo es, se ejecuta un error de la librería "boom"
    de tipo "conflict", lo cual impedirá que se muestre la información de dicho producto. */
    if (product.isBlock) {
      throw boom.conflict('Producto bloqueado.');
    }

    return product;
  }

  /* La función "update()" es invocada desde el archivo "productsRouter.js". */
  async update(id, changes) {
    /* Se comprueba si algún valor del atributo "id" de cada producto(item), coincide con el "id" que fue enviado
    como parámetro a la función "update()". La función "update" buscará el "id" que coincida dentro del arreglo "products" y devolverá el número
    de índice (la posición) que ocupa dicho elemento dentro del arreglo. Esto se consigue mediante el método "findIndex()", el cual devuelve
    el índice o posición que corresponde a determinado elemento. " */
    const index = this.products.findIndex((item) => item.id === id);
    /* Se comprueba si existe un valor almacenado en la constante "index". Si el método "findIndex()" devuelve el valor "-1", esto
    significa que dicho método "findIndex()" no encontró el "id" que el usuario quiere editar, dentro del arreglo "products". */
    if (index === -1) {
      // Se lanza un error mediante el comando "throw", por medio del paquete "boom".
      throw boom.notFound('Producto no encontrado');
    } else {
      const product = this.products[index];
      /* Se modifica el elemento ubicado en el índice almacenado en la variable "index", y se le asignan los
      datos enviados por medio del parámetro "changes". */
      this.products[index] = {
        /* Se utiliza el Spread Operator para concategnar lo que ya existe dentro de la variable "product",
           con lo que se encuentra almacenado en el parámetro "changes". De esta forma, para ese elemento específico
           del arreglo "products", NO SE REEMPLAZARÁN TODOS LOS VALORES de dicho producto, sino
           únicamente se reemplazarán los valores que se hayan indicado dentro del parámetro "changes", es decir, solamente
           se reemplazarán los valores que fueron modificados.  */
        ...product,
        ...changes,
      };

      /* Se retorna el producto con los cambios realizados. */
      return this.products[index];
    }
  }

  async delete(id) {
    /* Se comprueba si algún valor del atributo "id" de cada producto(item), coincide con el "id" que fue enviado
    como parámetro a la función "delete()". La función "delete" buscará el "id" que coincida dentro del arreglo "products" y devolverá el número
    de índice (la posición) que ocupa dicho elemento dentro del arreglo. Esto se consigue mediante el método "findIndex()", el cual devuelve
    el índice o posición que corresponde a determinado elemento. " */
    const index = this.products.findIndex((item) => item.id === id);
    /* Se comprueba si existe un valor almacenado en la constante "index". Si el método "findIndex()" devuelve el valor "-1", esto
    significa que dicho método "findIndex()" no encontró el "id" que el usuario quiere editar, dentro del arreglo "products". */
    if (index === -1) {
      // Se lanza un error mediante el comando "throw" por medio del paquete "boom".
      throw boom.notFound('Producto no encontrado');
    }

    /* El método "splice()" permite eliminar un elemento o elementos específicos de un arreglo.
    Tiene dos parámetros:
      - Primer parámetro: índice del primer elemento que se comenzará a eliminar.
      - Segundo parámetro: número de elementos a eliminar. (en este caso, se eliminará solamente 1 elemento).

    */
    this.products.splice(index, 1);
    /* Se retorna el "id" que fue eliminado (en dado caso, dicho "id" sí se haya encontrado".*/
    return {
      id,
    };
  }
}

module.exports = ProductsService;
