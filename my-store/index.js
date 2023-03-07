/*
IMPORTANTE: para probar esta API es necesario tomar en cuenta los siguientes comandos (estos comandos son para inicializarla sin DOCKER):

EJECUTAR NODEMON:
  Para probar la aplicación en el entorno de Desarrollo, se utiliza NODEMON para que dicha aplicación detecte
  cualquier cambio en tiempo real, y lo actualice en el navegador.

      npm run dev

      ¡¡¡¡¡IMPORTANTE!!!!! El comando "npm run dev" es equivalente (porque así se configuró en el archivo "package.json") al comando "node index.js". POr lo que si aparece algún error similar a este: "el puerto 3000 se encuentra ocupado", es causado porque probablemente se ejecutó antes el comando "npm run dev", y luego se quiere ejecutar el comando "node index.js" directamente, o viceversa. TOMARLO EN CUENTA.

  Este comando entonces, ejecuta nodemon y va a escuchar a todos los archivos JavaScript y actualizar la aplicación en tiempo real, al detectar
  algún cambio en ella.


PROBAR LA APLICACIÓN EN PRODUCCIÓN:
  Para probar la aplicación en Producción, es necesario ejecutar el comando:

      npm run start


¡¡¡ATENCIÓN!!!!
Es imprescindible que al ejecutar los comandos anteriores, se encuentre abierta en Visual Code la carpeta dentro de la cual
se encuentra el archivo "index.js". En este caso, dicha carpeta se llama "MY-STORE".

Si esto no fuera así, al ejecutar, los comandos anteriores, se desplegará un error como el siguiente:

        npm ERR! code ENOENT
        npm ERR! syscall open
        npm ERR! path C:\Users\Taller\Documents\GitHub\nodeJS\2. Backend-NodeJS-API-Rest-Express/package.json
        npm ERR! errno -4058
        npm ERR! enoent ENOENT: no such file or directory, open 'C:\Users\Taller\Documents\GitHub\nodeJS\2. Backend-NodeJS-API-Rest-Express\package.json'
        npm ERR! enoent This is related to npm not being able to find a file.
        npm ERR! enoent

        npm ERR! A complete log of this run can be found in:
        npm ERR!     C:\Users\Taller\AppData\Local\npm-cache\_logs\2023-02-16T14_32_51_711Z-debug-0.log

        asistente@DESKTOP-G74TPFV MINGW64 ~/Documents/GitHub/nodeJS/2. Backend-NodeJS-API-Rest-Express (main)
        $ npm run start
        npm ERR! code ENOENT
        npm ERR! syscall open
        npm ERR! path C:\Users\Taller\Documents\GitHub\nodeJS\2. Backend-NodeJS-API-Rest-Express/package.json
        npm ERR! errno -4058
        npm ERR! enoent ENOENT: no such file or directory, open 'C:\Users\Taller\Documents\GitHub\nodeJS\2. Backend-NodeJS-API-Rest-Express\package.json'
        npm ERR! enoent This is related to npm not being able to find a file.
        npm ERR! enoent

        npm ERR! A complete log of this run can be found in:
        npm ERR!     C:\Users\Taller\AppData\Local\npm-cache\_logs\2023-02-16T14_33_54_397Z-debug-0.log



*/

/*

PASOS PARA COMENZAR:

    1. Se crea una configuración por defecto para los nuevos paquetes "npm" que se instalarán:
        npm init -y

    2. Se accede al archivo "package.json" y dentro del área de "scripts" se agregan las siguientes tareas:
            "dev": "nodemon index.js",    (permite levantar el entorno de desarrollo)
            "start": "node index.js",      (levantar la aplicación para producción)
            "link": "eslint"               (verifica que se estén aplicando las buenas prácticas)

    3. Instalar las siguientes dependencias de desarrollo (paquetes):
        a. nodemon: crea el entorno de desarrollo y crea un servidor y ejecuta la actualización de la aplicación en tiempo real,
                    al detectar algún cambio en ella.
        b. ESLint: es un linter para JavaScript. Un Linter no es más que una herramienta que nos ayuda a cumplir
                   las buenas prácticas de codificación y de estilos en un lenguaje de programación
        c. Prettier: es una herramienta que se usa para dar formato a tu código, siendo una de las mejores
                     opciones cuando quieres obtener un estilo de programación consistente tanto en el caso de
                     que trabajes con un equipo como en el caso de que trabajes solo en un proyecto.

        Todas las dependencias de desarrollo anteriores, se instalan mediante el siguiente comando:

            npm install nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D

          La letra "-D" indica que las que se instalarán son dependencias de forma de "DESARROLLO" y NO para "PRODUCCIÓN".


EJECUTAR NODEMON:
  Para probar la aplicación en el entorno de Desarrollo, se utiliza NODEMON para que dicha aplicación detecte
  cualquier cambio en tiempo real, y lo actualice en el navegador.

      npm run dev

  Este comando entonces, ejecuta nodemon y va a escuchar a todos los archivos JavaScript y actualizar la aplicación en tiempo real, al detectar
  algún cambio en ella.


PROBAR LA APLICACIÓN EN PRODUCCIÓN:
  Para probar la aplicación en Producción, es necesario ejecutar el comando:

      npm run start



Para agregar el contenido del archivo ".gitignore" se recomienda realizar lo siguiente:

1. Acceder a la página:
    https://www.toptal.com/developers/gitignore/
2. Como se desea ignorar algunos archivos de NodeJS, tanto en plataforma "Windows", como en "Linux" y "MacOS",
   en la barrá de búsqueda del sitio web escribir los siguientes términos de búsqueda (los 4 deben estar en una sola casilla):
    a. Node
    b. Windows
    c. Linux
    d. macOS
3. Clic en el botón "Create".
4. Se abre un sitio web con el código apropiado para ser agregado al archivo ".gitignore". Copiar dicho código.
5. Pegar el código anterior dentro del archivo ".gitignore".
6. ¡¡¡IMPORTANTE!!! Revisar lo que se agregó en la sección "dependencies", esto se hizo para que no agregue a GitHub la carpeta "node_modules", sin importar en qué ubicación se encuentre.





IMPORTANTE:
1. El archivo ".editorconfig" se crea para que todos los desarrolladores tengan la misma configuración en el editor de código.
2. El archivo ".eslintrc.json" permite configurar el proyecto, para seguir las buenas prácticas.
   En este caso, dentro de dicho archivo se especifica lo siguiente:
      a. Se trabajará con ECMAScript 6 (es6)
      b. Se utilizarán las extensiones "ESLint" y "Prettier".

          ESLint: es un linter para JavaScript. Un Linter no es más que una herramienta que nos ayuda a cumplir
                  las buenas prácticas de codificación y de estilos en un lenguaje de programación

          Prettier: es una herramienta que se usa para dar formato a tu código, siendo una de las mejores
                    opciones cuando quieres obtener un estilo de programación consistente tanto en el caso de
                    que trabajes con un equipo como en el caso de que trabajes solo en un proyecto.
*/

/*
Express JS:
    Es el framework backend más popular para Node.js, y es una parte extensa del ecosistema JavaScript.
    Está diseñado para construir aplicaciones web de una sola página, multipágina e híbridas, también se ha convertido en el estándar para desarrollar aplicaciones backend con Node.js.

INSTALAR EXPRESS JS:
  Para instalarlo, se debe escribir el siguiente comando:
      npm install express

Express NO ES una dependencia de desarrollo (devDependencies), sino una dependencia de producción (dependencies)

*/
/*
 ¡¡¡¡¡¡¡¡¡¡IMPORTANTE!!!!!!!!!!
 Antes de hacer uso del comando "import" o "export", es indispensable
 realizar lo siguiente:

    1. Abrir el archivo de configuración de ESLint (el cual es el eslinter para manejar buenas prácticas) llamado ".eslintrc.json"
       y agregar en la sección de "parserOptions" la siguiente propiedad con el valor indicado para que no sea reconocido como un error:
            "sourceType": "module"

    2. Abrir el archivo "package.json" y agregar la siguiente propiedad, con su respectivo valor:
          "type": "module"

        La línea anterior se debe agregar después de la propiedad "main", es decir, quedaría así el archivo "package.json":
            {
              "name": "my-store",
              "version": "1.0.0",
              "description": "",
              "main": "index.js",
              "type": "module",
              "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "dev": "nodemon index.js",
                "start": "node index.js",
                "link": "eslint"
              },
              "keywords": [],
              "author": "",
              "license": "ISC",
              "devDependencies": {
                "@faker-js/faker": "^7.6.0",
                "eslint": "^8.29.0",
                "eslint-config-prettier": "^8.5.0",
                "eslint-plugin-prettier": "^4.2.1",
                "nodemon": "^2.0.20",
                "prettier": "^2.8.1"
              },
              "dependencies": {
                "express": "^4.18.2"
              }
            }

*/

/*
**********  Enviar peticiones a la API mediante POSTMAN (FORMA PARA INICIAR LA APLICACIÓN CON DOCKER) **********


Para probar el envío de una petición GET a la API, se deben seguir los siguientes pasos:

1. Abrir Docker en la computadora.

2. Como siempre, inicializar el contenedor de Docker. En este ejemplo, dicho contenedor tiene asignado el nombre postgres, por medio del siguiente comando:

  docker-compose up -d nombreContenedor


    Ejemplo:

      docker-compose up -d postgres


3. En la misma consola, ejecutar el comando `node index.js`. El cual permitirá iniciar Node JS en la aplicación actual.
4. Acceder a POSTMAN, crear una nueva petición (request) de tipo GET y agregar, por ejemplo, el endpoint: http://localhost:3000/api/v1/users
5. Al realizar el envío de la petición, se obtendrán los datos de la tabla que corresponda (si los hubiera). En este caso, se consultó la tabla "tasks" de la base de datos "my_store".

*/

/* Se importa "Express JS" */
const express = require('express');

/* Se importa la función "routerApi" que se encuentra dentro del archivo "index.js", el cual se encuentra
dentro de la carpeta "routes". No hace falta agregar explícitamente el nombre del archivo "index.js" (aunque, en este caso, se agregó
por decisión propia), debido a que se sobreentiende que con solo agregar el nombre de la carpeta "routes", lo que se quiere importar es
el archivo "index.js" que contiene. */
const routerApi = require('./routes/index.js');

/* Se importan los Middleware de error que serán utilizados globalmente en la aplicación. */
/*
  IMPORTANTE: para que el Middleware funcione, es indispensable implementarlo después de la línea: routerApi(app)
*/
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

/*
Por seguridad, cuando se desea acceder a determinado recurso desde un dominio diferente al dominio en el que se encuentr alojado
dicho recurso, dicha comunicación es bloqueada por el navegador por políticas de CORS.


El Intercambio de Recursos de Origen Cruzado (CORS) es un mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent (en-US) obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece. Un agente crea una petición HTTP de origen cruzado cuando solicita un recurso desde un dominio distinto, un protocolo o un puerto diferente al del documento que lo generó.


Un ejemplo de solicitud de origen cruzado: el código JavaScript frontend de una aplicación web que es localizada en http://domain-a.com utiliza XMLHttpRequest para cargar el recurso http://api.domain-b.com/data.json.

Por razones de seguridad, los exploradores restringen las solicitudes HTTP de origen cruzado iniciadas dentro de un script. Por ejemplo, XMLHttpRequest y la API Fetch siguen la política de mismo-origen. Ésto significa que una aplicación que utilice esas APIs XMLHttpRequest sólo puede hacer solicitudes HTTP a su propio dominio, a menos que se utilicen cabeceras CORS.


Cuando se trabaja con API's lo más común es que se desee permitir el acceso a dicha API desde diferentes dominios, y no únicamente desde el dominio
en el cual se encuentra almacenada, es por ello que es importante conocer cómo evitar errores por restricciones de CORS.


INSTALAR CORS:

Para evitar este problema, se utilizará la librería "CORS", la cual se instala de la siguiente manera:

    npm i cors



*/
const cors = require('cors');

/* Se asigna el método "express()" a la constante "app". */
const app = express();
/* Se define el puerto con el que se comunciará. Normalmente el puerto es el 3000, o, en su defecto, 3001, 3002, etc.

En este caso, se usa el operador de cortocircuito para verificar si se está enviando el Puerto al que
debe conectarse la API dentro de la variable de entorno "PORT" (una variable de entorno
se obtiene mediante el comando "process.env.NOMBRE_VARIABLE_ENTORNO"). Si no se envía ningún valor en dicha variable,
la API se conectará de forma predeterminada al puerto "3000".
*/
const port = process.env.PORT || 3000;

/* Implementación del framework "Express". */
app.use(express.json());

/* Por medio del método "use()" se habilita el Intercambio de Recursos de Origen Cruzado (CORS), lo cual permitirá
que sea posible conectarse a la API desde cualquier dominio y no únicamente desde el dominio en el que se encuentra almacenada la API:
    app.use(cors());

Lo anterior funciona perfectamente para las API's públicas, sin embargo, cuando se está trabajando con una API privada, es
indispensable elegir únicamente los dominios (orígenes) específicos con los cuales se desea permitir establecer la comunicación.

Suponiendo que se tiene una API privada, los pasos para permitir CORS solamente de ciertos orígenes específicos, serían los siguientes:
  1. Crear un arreglo con la "Lista Blanca" de los orígenes permitidos:
        const whitelist = ["https://localhost:8080", "https://myapp.com"];

      En este caso, como la API es privada, solamente se permitirán CORS si los orígenes son los siguientes:
          - https://localhost:8080    (localhost)
          - https://myapp.com          (¡Dirección ficticia! Usada para ejemplificar que aquí podría definirse la URL de otro orígen,
                                       en el cual también se permitirán los CORS.  !)

  IMPORTANTE: se recalca que la dirección "https://myapp.com" es FICTICIA.
*/

/*
Para API's públicas: (permite el acceso desde cualquier origen (dominio))
  app.use(cors());
*/

/*
Para API's privadas: (permite el acceso únicamente de los dominios indicados)
*/

const whitelist = ['https://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    /* El "if" verificará si se cumple por lo menos una de las siguientes condiciones:
          1. Por medio del método "includes()" se verifica si el "origin" (origen) está en la "whitelist".
          2. O bien, se comprobará si el parámetro "origin" no es Verdadero, es decir, si es Falso (dicho parámetro será falso, cuando éste se encuentre vacío).
             Esto se hace para que se pueda acceder a la API desde el mismo origen.


    Si dicho origen sí existe en la "whitelist", se ejecutará un "callback()".

    Dentro de dicho callbak se indica que no hubo ningún error (parámetro "null"), y que el acceso a la API está
    permitido (parámetro "true").

    */
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      /*
      Si se comprueba que el "origin" (origen) no está incluido en la "whitelist",
      se ejecuta nuevamente un "callback", pero esta vez
      se devuelve un error con el mensaje "Acceso no permitido"
      */
      callback(new Error('Acceso no permitido.'));
    }
  },
};
/* Configuración de las opciones de CORS, dentro de las cuales se incluyen los dominios (orígenes) permitidos para comunicarse con la API. */
app.use(cors(options));

/* El siguiente comando crea una ruta.
La ruta es "/".
La ArrowFunction es el Callback que se ejecutará, el cual tiene dos parámetros:
    - req (request o petición)
    - res (response o respuesta)

*/

/* ***************************** Creación de Rutas  ***************************** */
/* IMPORTANTE
Para comprobar que la ruta creada a continuación funciona correctamente, se debe ejecutar nuestra aplicación,
si se está desarrollando aún, sería usando el comando (npm run dev), pero si ya se terminó
la aplicación y quiere probarse en modo de Producción, el comando sería (npm run start).

Luego, al acceder a la ruta:
    localhost:3000
Se deberá desplegar el sitio web que se encuentra en esa ruta con el mensaje "Hola, mi server en Express JS."
*/
app.get('/', (req, res) => {
  /* Por medio del método "send()" se envía una respuesta al servidor. */
  res.send('Hola, mi server en Express JS.');
});

/*
Para ver la siguiente ruta, se debe acceder a:
    localhost:3000/nueva-ruta
*/
app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva ruta (endpoint) en Node JS');
});

/* El método "listen()" permite definir el puerto en el que debe escuchar la aplicación. */
app.listen(port, () => {
  /* IMPORTANTE: los "console.log" aparcen subrayados porque NO ES UNA BUENA PRÁCTICA dejaron allí cuando
    el archivo es enviado a Producción. Pueden estar para pruebas solamente en la etapa de Desarrollo, pero
    en la etapa de Producción deben ser eliminados. */
  /*console.log('Mi port ' + port); */
});

routerApi(app);

/*
  IMPORTANTE: para que el Middleware funcione, es indispensable implementarlo despupés de la línea: routerApi(app)
*/

/* Se implementan los Middlewares de error que fueron creados en el archivo "errorHandler.js", dentro de la carpeta "Middlewares".  */
/* El orden en que se implementan los Middlewares es fundamental, pues en el mismo orden en el que se escriban, se ejecutarán. */
/*
IMPORTANTE: los Middlewares de tipo error se deben crear después de definir el "Routing", de lo contrario se generará un error.
*/
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

/*
Single Responsiblity Principle (Principio de Responsabilidad Única)

Este principio, es fundamental en el área de desarrollo.
Determina que cada función, archivo o método, debe cumplir una única función específica.
Por ejemplo, en el caso de un método, si un método se encarga de realizar una suma,
esa debería ser la única función que dicho método debería desempeñar.

Aplicando este principio, se puede comprobar que no sería correcto tener en un solo archivo, TODAS LAS RUTAS
creadas en el servidor. Por lo que lo ideal sería que cada ruta que ha sido creada, junto con todo el procedimiento
que corresponde a esa ruta, se encuentre en un archivo independiente.

Precisamente por ello, se creó una carpeta "routes", dentro de la cual se crearon
archivos que contienen todo el procedimiento relativo a cada producto.

Por ejemplo, todo el procedimiento relacionado con la ruta "/products", se encuentra
dentro del archivo "productsRouter".


*/
