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
import { faker } from '@faker-js/faker';

/*
Paquete "boom":
El paquete "boom" permite administrar errores de la API.

Para instalarlo, se debe escribir lo siguiente en consola:
    npm i @hapi/boom
*/

import Boom from '@hapi/boom';

class ProductsService {
  constructor() {
    // Se inicializa un array en memoria.
    this.products = [];
    /* Se invoca el método "generate" que se crea a continuación. */
    this.generate();
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

  /* Se realiza una petición "asíncrona". */
  async create(data) {
    const newProduct = {
      /* El método "uuid()" permite obtener un string ÚNICO largo que se genera de forma aleatoria, el cual
        se convertirá en el "id". Se indica que la API "f" */
      id: faker.datatype.uuid(),
      /* Se utiliza el Spread Operator (...) para concatenar junto con el id, lo que se encuentre dentro del parámetro "data",
      el cual es recibido por el método "create(data)".  */
      ...data,
    };
    /* Se envía, mediante el método "push", los datos del nuevo producto al arreglo "products". */
    this.products.push(newProduct);
    /* Se retorna los datos del nuevo producto agregado.  */
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      // Se agrega el método "setTimeout()" para simular la asíncronía.
      setTimeout(() => {
        /* Se retorna el contenido del arreglo "products". */
        resolve(this.products);
      }, 5000);
    });
  }

  /* Petición asíncrona para buscar un producto determinado a partir de su "id". */

  async findOne(id) {
    // Para comprobar la generación del error de los Middlewares de errores.
    //  Si se quisiera comprobar el funcionamiento de los middlewares para errores, se puede agregar la línea que está a continuación.
    // const name = this.getTotal();

    /* Se comprueba si algún valor del atributo "id" de cada producto(item), coincide con el "id" que fue enviado
    como parámetro a la función "findOne()". La función "find" buscará el "id" que coincida dentro del arreglo "products" y lo devolverá, en caso
    sea encontrado. Si el "id" es encontrado, la constante "product" será VERDADERA. Pero si el "id" no es encontrado, la constante "product"
    tendrá el valor "FALSE". */
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      // Se lanza un error mediante el comando "throw", por medio del paquete "boom".
      throw Boom.notFound('Producto no encontrado');
    }

    /* Se verifica si la propiedad "isBlock" es "verdadera"; si lo es, se ejecuta un error de la librería "boom"
    de tipo "conflict", lo cual impedirá que se muestre la información de dicho producto. */
    if (product.isBlock) {
      throw Boom.conflict('Producto bloqueado.');
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
      throw Boom.notFound('Producto no encontrado');
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
      throw Boom.notFound('Producto no encontrado');
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

export default ProductsService;
