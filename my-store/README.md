# Curso de Backend con NodeJS: base de datos con PostgreSQL

Esta es la cuarta parte de un grupo de cursos Platzi que están relacionados.

1. [Curso Práctico de FrontEnd developer.](https://github.com/andreiarriaza/online-shop-html-css)
2. [Curso de React JS.](https://github.com/andreiarriaza/online-shop-react)
3. [Curso de BackEnd con NodeJS: API REST con Express JS](https://github.com/andreiarriaza/nodeJS/tree/main/2.%20Backend-NodeJS-API-Rest-Express)
4. Curso de BackEnd con NodeJS: base de datos con PostgreSQL.

## ¿Qué es PostgreSQL?

PostgreSQL, también llamado Postgres, es un sistema de gestión de bases de datos relacional orientado a objetos y de código abierto, publicado bajo la licencia PostgreSQL,1​ similar a la BSD o la MIT.

Como muchos otros proyectos de código abierto, el desarrollo de PostgreSQL no es manejado por una empresa o persona, sino que es dirigido por una comunidad de desarrolladores que trabajan de forma desinteresada, altruista, libre o apoyados por organizaciones comerciales.

## ¿Qué es Docker?

Docker es un software de código abierto utilizado para desplegar aplicaciones dentro de contenedores virtuales. La contenerización permite que varias aplicaciones funcionen en diferentes entornos complejos. Por ejemplo, Docker permite ejecutar el sistema de gestión de contenidos WordPress en sistemas Windows, Linux y macOS sin ningún problema.

Aunque Docker y las máquinas virtuales tienen un propósito similar, su rendimiento, compatibilidad con el sistema operativo (SO) y portabilidad difieren significativamente.

La principal diferencia es que los contenedores Docker comparten el sistema operativo del anfitrión, mientras que las máquinas virtuales tienen un sistema operativo invitado que se ejecuta sobre el sistema anfitrión. Este método de funcionamiento afecta al rendimiento, las necesidades de hardware y la compatibilidad con el sistema operativo.

## Instalar Docker

Para su instalación se deben seguir los siguientes pasos:

1. Descargar Docker desde el sitio oficial: https://www.docker.com/
2. Al final de la instalación, dejar activadas los checkbox:
   - Use WSL 2 instead of Hyperv-V
   - Add shortcut to desktop
3. Abrir Docker y aceptar los términos y condiciones. Luego, acceder a:

   - Settings.
   - Resources.
   - WSL Integration
   - Luego, asegurarse que esté activado el Checkbox:
     _**Enable integration with my default WSL distro**_

4. Si la versión de Kernel de Linux está desactualidazada en la computadora, al abrir docker se despliega una ventana emergente que mostrará un mensaje en la que se indica que es necesario actualizar la versión de "WSL 2". Para realizar esta actualización, solo se deben seguir los pasos que se brindan en el link que se muestra en la ventana que se desplegó: https://learn.microsoft.com/es-es/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package

5. Listo.

## Asociar base de datos de PostgreSQl a Docker

1. Crear el archivo "docker-compose.yml".
2. Levantar el contenedor que se creó en el archivo "docker-compose.yml", es necesario ejecutar el siguiente comando:

```bash
# El comando "up" hace referencia a que se desea levantar el contenedor.
# El comando "-d" sirve para que el contenedor se ejecute en segundo plano.
# Se define el nombre del servicio asociado al contenedor que se desea levantar. Se debe recordar,
# que dentro del archivo "docker-compose.yml" se definió un servicio con el nombre de "postgres".
docker-compose up -d postgres
```

**IMPORTANTE:** si se despliega una ventana, en la que pide confirmar si se desea que el Firewall de Windows permita realiar las modificaciones hechas por Docker. Dar clic en Aceptar.

3. Para corroborar cuáles son los contenedores levantados que existen, se utiliza el comando:

```bash
docker-compose ps
```

4. Para cerrar o detener la ejecución de un contenedor, se usa el comando:

```bash
docker-compose down
```

5. Activar el subsistema de Linux en Windows, ejecutando en la consola Power Shell (como administrador) el siguiente comando (ver [link](https://github.com/apoorvpandey-ap/Docker_1/issues/1)):

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

6. Activar la característica de Windows "Hyper-V" la cual sirve para crear máquinas virtuales en Windows. Hay dos maneras de realizar esto:

   a. Ejecutar el comando:

   ```bash
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
   ```

   b. Activar por medio del Panel de Control:

   - Panel de Control
   - Programas
   - Dentro de la sección "Programas y características", seleccionar la opción "Activar o desactivar las características de Windows".
   - En la ventana que se despliega, buscar la carpeta "Hyper-v" y activar las opciones "Herramientas de administración de Hyper-V" y "Plataforma de "Hyper-V".
   - Clic en el botón "Aceptar" en todas las ventanas.

7. Abrir _**Docker Desktop**_. Se debería iniciar correctamente. Si se muestra el mensaje de que "Docker" no se inició apropiadamente, es necesario revisar si se realizaron correctamente los pasos del 5 al 7 correctamente.

**Si Docker no se inicia correctamente:**

**IMPORTANTE 2:** Los contenedores NO TIENEN ESTADO. Esto significa que al detener la ejecución de un contenedor, toda la información se borrará. Esto es precisamente lo contrario de lo que se busca conseguir usando base de datos, pues es indispensable que la información de la base de datos persista (se almacene) aún después de que el contenedor de Docker se haya detenido. Para corregir este problema, es necesario agregar el atributo "volumen" al archivo "docker-compose.yml".

## Conectarse a la base de datos que está corriendo o ejecutándose

1. Abrir Docker.

2. Levantar el contenedor que se creó en el archivo "docker-compose.yml", es necesario ejecutar el siguiente comando:

```bash
# El comando "up" hace referencia a que se desea levantar el contenedor.
# El comando "-d" sirve para que el contenedor se ejecute en segundo plano.
# Se define el nombre del servicio asociado al contenedor que se desea levantar. Se debe recordar,
# que dentro del archivo "docker-compose.yml" se definió un servicio con el nombre de "postgres".
docker-compose up -d postgres
```

3. Para corroborar cuáles son los contenedores levantados que existen, se utiliza el comando:

```bash
docker-compose ps
```

4. Ejecutar el comando:

```bash
# El comando "exec" hace referencia a "execute" (ejecutar).
# El comando "bash", indica que deseamos conectarnos a una terminal en bash.
# Se define el nombre del servicio o contenedor que se ejecutará.

docker-compose exec nombreContenedor bash
```

Ejemplo:

```bash
# En este caso, el contenedor se llama "postgres".
docker-compose exec postgres bash
```

5. Una vez dentro del contenedor, es decir, una vez que se está ejecutando el contenedor, es necesario conectarse a la base de datos deseada por medio del siguiente comando:

```bash
psql -h localhost -d nombreBaseDatos -U nombreUsuariuo

```

Ejemplo:

```bash
psql -h localhost -d my_store -U walter
```

- psql: comando de PostgreSQL que permite ejecutar comandos.
- h: indica que se definirá el host al que se desea conectarse.
- localhost: indica que el host con el que se realizará la conexión es nuestra propia computadora.
- d: sirve para indicar a qué base de datos se desea conectarse.
- my_store (ejemplo): es el nombre que en este ejemplo se le dio a la base de datos. Este nombre debe reemplazarse por el nombre de la base de datos que corresponda.
- U: sirve para definir el usuario de la base de datos que se definió en el archivo "docker-compose.yml".
- walter (ejemplo): en este ejemplo, el usuario se llama "walter". Este usuario se debe reemplazar por el nombre de usuario que se asignó en el archivo "docker-compose.yml".

6. Cuando se desee salir de la base de datos actual, se debe usar el comando:

```bash

\q
```

7. Cuando se desee salir del contendor actual, se debe utilizar el comando:

```bash
exit
```

## Comandos útiles para Docker

1. ls -l Permite listar todos los archivos del contenedor de Docker.
2. \d+ Permite obtener la estructura de la base de datos.
3. \q Salir de la base de datos actual.
4. exit Salir del contenedor actual.
5. docker ps Devuelve el listado de contenedores incluyendo el **id** de cada contenedor (este comando es parecido al comando `docker-compose ps`, con la diferencia de que este último no muestra el **id** del contenedor).
6. docker inspect idContendor Despliega la información del contendor cuyo **id** (idContenedor) se indicó al ejecutar el comando. Dentro de esta información se encuentra la **IPAdress**, es decir, la **IP** asociada a ese contenedor.

## pgAdmin: Interfaz gráfica para trabajar con PostgreSQL

Aunque hay varias opciones de interfaz gráfica para _**PostgreSQL**_, se usará la interfaz _**pgAdmin**_ la cual es gratuita y permite ser usada por medio del navegador.

### Como configurar pgAdmin en Docker

Para poder usar la imagen de 'pgAdmin' es fundamental hacer lo siguiente:

1. Acceder al sitio web: https://hub.docker.com/search?q=pgadmin
2. Seleccionar la primera opción de descarga, en este ejemplo, la versión más reciente es: _**dpage/pgadmin4**_ _** (este paquete no debe descargarse, de eso se encargará Docker)**_

3. Se debe agregar el servicio _**pgadmin**_ al archivo _**docker-compose.yml**_, lo cual se consigue agregando los siguientes valores al archivo mencionado:

```bash
# Este servicio permitirá utilizar la interfaz gráfica para trabajar con
  # PostgreSQL, la cual se llama "pgAdmin".
  # IMPORTANTE: Este servicio se descargará y ejecutará por medio de Docker.
  pgadmin:
    # (opcional) Se le asigna el nombre al contenedor. Puede ser
    # cualquier nombre, en este caso, se le asignó el mismo nombre del servicio,
    # pero esto puede cambiar sin ningún problema.
    container_name: pgadmin

    # Para poder usar la imagen de 'pgAdmin' es fundamental hacer lo siguiente:
    # 1. Acceder al sitio web:
    #  https://hub.docker.com/search?q=pgadmin
    # 2. Seleccionar la primera opción de descarga, en este ejemplo, la
    # versión más reciente es: dpage/pgadmin4
    # 3. Ejecutar el servicio:
    # docker-compose up -d pgadmin

    # IMPORTANTE: para corroborar que los servicios
    # se están ejecutando correctamente, se usa el comando:
    # docker-compose ps

    # Al definir la imagen, se puede definir la versión específica de "pgadmin",
    # como se muestra en la siguiente línea:
    # image: dpage/pgadmin4

    # Si no se desea definir la versión específica,
    # se puede indicar que se desea trabajar con la versión más reciente
    # utililzando la palabra "latest":
    image:
      dpage/pgadmin4
      # Se definen las variables de entorno (envirnoment), las cuales son las que permiten indicar la configuración
      # inicial que se le asignará a la imagen.
    environment:
      # Se le asigna un correo electrónico por default. El correo
      # puede ser inventado.
      - PGADMIN_DEFAULT_EMAIL=admin@mail.com
      # Se define una contraseña asociada al correo electrónico anterior.
      - PGADMIN_DEFAULT_PASSWORD=root

    ports:
      # Este servicio correrá en el puerto de la computadora "5050".
      # Internamente, correrá en el puerto "80" del contenedor.
      - 5050:80

      # IMPORTANTE: en este servicio NO es necesario definir un atributo
      # "volumes" (volúmenes), porque este servicio no necesita
      # persistencia de datos. El único servicio que necesita persistencia,
      # es el servicio "postgres", el cual contiene la base de datos.

```

3. Ejecutar el servicio con el siguiente comando:

```bash
     docker-compose up -d pgadmin
```

IMPORTANTE: para corroborar que los servicios se están ejecutando correctamente, se usa el comando:

```bash
docker-compose ps
```

**IMPORTANTE:** Si por alguna razón el servicio _**pgadmin**_ no se ejecuta correctamente, se debe seguir intentando, hasta que se muestre en la lista obtenida por medio del comando `docker-compose ps`.

4. Acceder en el navegador al puerto asociado al servicio _**pgadmin**_. En este caso, en el archivo _**docker-compose.yml**_ se indicó que el archivo al que se conectará el servicio _**pgadmin**_ es el **5050**. Por lo que, para poder acceder a _**pgAdmin**_ en el navegador, se debe escribir la siguiente URL: **http://localhost:5050/**. En esta página web se debe escribir tanto el _**email**_ como el _**password**_ asociados al servicio _**pgadmin**_ que se definieron en el archivo _**docker-compose.yml**_.

Para acceder al sitio web mencionado, en lo que respecta a este ejemplo, los datos son los siguientes:

- Email: admin@mail.com
- Password: root

5. Cuando se haya accedido con el email y contraseña antes indicados, ya se puede visualiza la interfaz gráfica de _**pgAdmin**_. Ahora es necesario registrar el servidor de _**postgreSQL**_ con el que se desea establecer la conexión, lo cual se hará en los siguientes pasos.

6. Acceder a menú "Object".
7. Seleccionar la opción "Register".
8. Elegir la opción "Server".
9. Se abre un cuadro de diálogo. En la ficha _**General**_ se debe agregar en la casilla _**Name**_ el nombre que se desea dar al servidor. En este ejemplo, se le asignó el nombre: _**MyStore**_
10. En el mismo cuadro de diálogo, seleccionar la opción _**Connection**_. Y agregar los siguientes datos:

- Host name/adress: aquí se puede escribir la IP del contenedor en el que se está corriendo PostgreSQL, sin embargo, NO ES RECOMENDABLE usar la IP del contenedor, ya que esta IP cambia cuando el contenedor se destruye. Lo recomendable es agregar acá el nombre del contenedor de _**postgreSQL**_ con el que se desea establecer la conexión. En este caso, en el archivo _**docker-compose.yml**_ se definió que el contenedor que almacena el servicio de _**postgreSQL**_ se llama: _**postgres**_.

- Port: acá se escribe el puerto que está asociado al contenedor que almacena el servicio de _**postgreSQL**_. En este caso, el contenedor _**postgres**_ se conecta al puerto **5432**.

- Maintenance database: nombre de la base de datos con la que se desea conectarse. En este caso se llama: _**my_store**_.

- Username: se escribe el nombre de usuario que se asoció al servicio de _**postgreSQL**_ que se creó en Docker por medio del archivo _**docker-compose.yml**_. En este caso, dicho servicio se llama _**postgres**_ y tiene asociado el nombre de usuario: **walter**.

- Password: se escribe el password que se asoció al servicio de _**postgreSQL**_ que se creó en Docker por medio del archivo _**docker-compose.yml**_. En este caso, dicho servicio se llama _**postgres**_ y tiene asociado el password: **123**.

  Ejemplo:

  ```txt
  Host name/adress: postgre
  Port: 5432
  Maintenance database: my_store
  Username: walter
  Password: 123

  ```

11. Se debe activar la casilla _**Save password**_ para que la contraseña sea guardada.
12. Dar clic en el botón _**Save**_.

13. Listo. Ahora es posible ejecutar consultas en la base de datos.

## Abrir pgAdmin y ejecutar consultas

1. Para que todo funcione correctamente, deben estar inicializados los contenedores de _**Docker**_ que correspondan. En este caso, se deben haber inicializado los contendores _**postgres**_ y _**pgadmin**_:

```bash
  docker-compose up -d postgres
  docker-compose up -d pgadmin
```

2. Luego, es necesario obtener el puerto al que se está conectando el contenedor llamado _**pgadmin**_. Para conocerlo, es necesario obtener el puerto al que se conecta el contenedor _**pgadmin**_. Para obtener dicho puerto, hay dos métodos:

- **Primer método:** acceder al archivo _**docker-compose.py**_ y buscar el servicio (contenedor) llamado _**pgadmin**_. Luego, dentro de dicho servicio, buscar el número de puerto asignado. El cual es, en este caso, el **5050**.

- **Segundo método:** ejecutar el comando `dockerc-compose ps`. Al ejecutarlo, se mostrará la lista de contendores de Docker que se están ejecutando actualmente. En este ejemplo, mostraría lo siguiente:

```bash
NAME                IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS

pgadmin             dpage/pgadmin4      "/entrypoint.sh"         pgadmin             24 hours ago        Up 10 minutes       443/tcp, 0.0.0.0:5050->80/tcp

postgres            postgres:latest     "docker-entrypoint.s…"   postgres            24 hours ago        Up About an hour    0.0.0.0:5432->5432/tcp
```

En el despliegue anterior, se puede ver que en la última columna aparecen los puertos de conexión (PORTS) del contenedor respectivo. Cuando se ubica el contenedor "pgadmin", se comprueba que, en este ejemplo, dicho contendor se conecta al puerto **5050**. Ese número de puerto es el que servirá para acceder, desde el navegador a _**pgAdmin**_.

2. Abrir el navegador y escribir la siguiente URL, según el número de puerto al que esté conectado el contenedor _**pgadmin**_ en _**Docker**_:

```
http://localhost:puertoContedorPgAdmin/
```

En este ejemplo, dicha URL queda así:

```bash
# Porque el puerto al que se conecta el contenedor "pgadmin" es, en este caso, el 5050.
http://localhost:5050/

```

3. Luego de acceder, se debe mostrar la ventana de inicio de sesión de _**pgAdmin**_. En esa ventana se debe escribir tanto el usuario como la contraseña que se definieron en el **paso 3 del tema [Como configurar pgAdmin en Docker](#como-configurar-pgadmin-en-docker)** que se detalló anteriormente.

En este ejemplo, dichos datos de inicio de sesión son:

- **usuario:** admin@mail.com
- _**password:**_ root

4. Para poder agregar código SQL para ejecutar consultas en _**pgAdmin**_, se debe seleccionar en el panel _**Browser**_ que se encuentra a la izquierda de la ventana de _**pgAdmin**_, la base de datos en la que se quiere realizar las consultas SQL.

En este ejemplo, al dar clic dentro del panel _**Browser**_ en la carpeta **Servers**, se debe seleccionar el nombre del servidor deseado; en este caso, se le asignó el nombre _**MyStore**_. A continuación, se debe elegir el nombre de la base de datos que corresponda; en este caso, se llama _**my_store**_.

Una vez seleccionada la base de datos deseada, se debe dar clic en el botón _**Query tool**_ que se encuentra en la parte superior derecha del panel _**Browser**_:

![Query Tools](database_icon_pgadmin.png)

### Crear tablas

1. Para acceder a la herramienta _**Query tool**_, la cual permite agregar código SQL para ejecutar consultas en _**pgAdmin**_, se debe seleccionar en el panel _**Browser**_ que se encuentra a la izquierda de la ventana de _**pgAdmin**_, la base de datos en la que se quiere realizar las consultas SQL.

En este ejemplo, al dar clic dentro del panel _**Browser**_ en la carpeta **Servers**, se debe seleccionar el nombre del servidor deseado que, en este caso, sellama _**MyStore**_. A continuación, se debe elegir el nombre de la base de datos que corresponda, la cual en este ejemplo se llama _**my_store**_.

Una vez seleccionada la base de datos deseada, se debe dar clic en el botón _**Query tool**_ que se encuentra en la parte superior derecha del panel _**Browser**_:
![Query Tools](database_icon_pgadmin.png)

2. Agregar la estructura de la tabla deseada; en este caso, se utilizó la siguiente:

```sql
CREATE TABLE tasks (
  /* El valor "serial" indica que este campo será autoincremental (se incrementará automáticamente). */
	id serial PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	/* El campo "completed" tiene asignado el valor "false" por defecto. */
	completed boolean DEFAULT false


	);
```

### Listar todos los campos de una tabla

Cuando se hace referencia a una tabla, _**pgAdmin**_ requiere que el nombre de la tabla vaya precedido del comando `public.`. En este caso, como la tabla se llama _**tasks**_, se hace referencia a ella por medio del comando `public.tasks`.

```sql
SELECT * FROM public.tasks ORDER BY id ASC
```

## Agregar registros a una tabla

1. Ejecutar una sentencia que permita ver los datos de una tabla. En este caso, se ejecutó la sentencia:

```sql
SELECT * FROM public.tasks ORDER BY id ASC

```

Esta sentencia mostrará los nombres de los campos ordenados de forma ascendente por _**id**_. Aunque la tabla está vacía, en el panel de la parte inferior aparece la estructura de la tabla y se mostrará los campos que se asignaron a la tabla _**tasks**_ que se creó anteriormente. En este caso, dichos campos son: _**id, title y completed**_.

2. En el panel de la parte inferio, se debe dar clic en el botón _**Add row**_. Al dar clic, se agregará una fila para agregar el primer registro.

- El campo _**id**_ se dejará en blanco porque se desea que se incremente automáticamente (por eso, cuando se creó la tabla se le asignó el valor _**serial**_).
- En el campo _**title**_ se escribe el título de la tarea que se desea agregar.
- El campo _**completed**_ se deja vacío, pues se configuró la tabla para que su valor predeterminado sea _**false**_.

Una vez agregados todos los registros deseados, se debe dar clic en el botón _**Save Data Changes**_ que se encuentra también en el panel inferior.

3. Listo.

```sql
/* Esta tabla contiene los campos "id", "title" y "completed". */
CREATE TABLE tasks (
	id serial PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	/* El campo "completed" tiene asignado el valor "false" por defecto. */
	completed boolean DEFAULT false
);
```

3. Para corroborar que la tabla se creó correctamente se debe acceder a la siguiente ruta dentro del panel _**Browser**_:

- Servers
- MyStore (en este caso, el servidor se llama así)
- Databases
- my_store (en este caso, ese es el nombre dado a la base de datos)
- Schemas
- Tables
- (Seleccionar la tabla deseada)

4. Otra opción es corroborar desde la consola si la tabla fue creada. Para ello se deben escribir los siguientes comandos:

```bash
# Een este caso, el servicio se llama 'postgres'.
docker-compose exec postgres bash
# En este ejemplo, el usuario es 'walter'.
psql -h localhost -d my_store -U walter

# Este comando permite visualizar la estructura de la base de datos.
\d+
```

## Integración de Node JS con PostgreSQL

Para realizar
Para realizar la integración de Node JS con PostgreSQL se utilizará la librería _**node-postgres**_ cuyo sitio oficial es: https://node-postgres.com/

Esta librería es una colección de módulos que corren con Node JS, los cuales permiten usar promesas y callbacks de forma asíncrona.

Para realizar la isntalación de _**node-postgres**_ es necesario seguir los siguientes pasos:

1. Instalar node-postgres por medio del comando: `npm install pg`
2. Se crea una carpeta dentro del proyecto, con el nombre deseado. En este caso se nombrará _**libs**_. Dentro de ella se almacenarán las librerías que permiten la conexión con terceros, ya sean API's o bases de datos.
3. Dentro de la carpeta _**libs**_ se crea el archivo _**postgres.js**_.
4. Dentro del sitio web de _**[node-postgres](https://node-postgres.com/)**_
   se encuentra la sección _**Geting started**_ , dentro de la cual se encuentra un ejemplo de cómo implementar Node JS con PostgresSQL. Tomando como referencia dicho código, se adecuará a lo que se necesita en esta aplicación, y se agregará dentro del archivo _**postgres.js**_ recién creado:

```js
/* Se importa la librería "pkg" de la librería "pg", y se desestructura a partir de ella la constante "Client". */
import pkg from "pg";

const { Client } = pkg;

async function getConnection() {
  /*
Para realizar la conexión con la base de datos, se crea una instancia
de la clase "Client()".
*/
  const client = new Client({
    /* Se define la configuración de la conexión.
    - host: se indica el nombre del servidor en el que se encuentra la base
            de datos. En este caso, como todo se está trabajando con Docker, se le asigna el valor: "localhost".

    - port: sirve para indicar en qué puerto está corriendo la base de datos.
            En este caso, es en el puerto "5432", el cual es el mismo que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".
    - user: nombre del usuario de la base de datos. Nuevamente, es el mismo
            usuario que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".

    - password: password asociado a la base de datos.
                Nuevamente, es el mismo password que se definió en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".
    - database: nombre de la base de datos. Es el mismo nombre que se definió
                en el contenedor "postgres" que se creó en el archivo "docker-compose.yml".

  */
    host: "localhost",
    port: 5432,
    user: "walter",
    password: "123",
    database: "my_store",
  });

  /* Se realiza la conexión mediante el método "connect()". Pero como dicho método devuelve una promesa, se puede correr de forma asíncrona. Por ello, la función "getConnection()" fue declarada asíncrona (async), y también por ello, en la siguiente línea se utiliza el comando "await". */
  await client.connect();
}

/* Se exporta la función "getConnection()". */
export default getConnection;
```

## Enviar peticiones a la API mediante POSTMAN

Para probar el envío de una petición GET a la API, se deben seguir los siguientes pasos:

1. Como siempre, inicializar el contenedor de _**Docker**_. En este ejemplo, dicho contenedor tiene asignado el nombre _**postgres**_, por medio del siguiente comando:

```bash
docker-compose up -d nombreContenedor
```

Ejemplo:

```bash
docker-compose up -d postgres
```

2. En la misma consola, ejecutar el comando `node index.js`. El cual permitirá iniciar _**Node JS**_ en la aplicación actual.
3. Acceder a _**POSTMAN**_, crear una nueva petición (request) de tipo _**GET**_ y agregar el _**endpoint**_: http://localhost:3000/api/v1/users
4. Al realizar el envío de la petición, se obtendrán los datos de la tabla que corresponda (si los hubiera). En este caso, se consultó la tabla "tasks" de la base de datos "my_store".
