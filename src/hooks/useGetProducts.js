/* 
Se utilizará una API de Platzi para trabajar este ejemplo. 

La documentación de dicha API se encuentra en: 
	https://api.escuelajs.co/docs/#/products/ProductsController_getAll



Sin embargo, si por alguna razón, esta API dejará de ser funcional, también se puede utilizar cualquier otra API, 
como por ejemplo, la siguiente:
	https://fakestoreapi.com/



*/

/* 
Este es un Hook Personalizado. Los Hooks deben utilizar Camel Lower Casing y comenzar siempre con la palabra "use". 

Debido a que dentro de este archivo se trabajará únicamente con el lenguaje JavaScript y NO con HTML , su extensión
debe ser ".js".

La extensión ".jsx" se debe utilizar cuando dentro de un archivo se utilia tanto HTML como JavaScript. 

*/

import { useEffect, useState } from "react";
/*
 Se importa la librería AXIOS, la cual se encuentra dentro de la carpeta "libs". */
/* 
En este caso se importó directamente el archivo, sin embargo, también 
es posible realizar la instalación de la librería AXIOS mediante npm, utilizando el comando: 
	npm i axios
*/
import axios from "../libs/axios.min.js";

/* La prop llamada "API" será enviada desde el Componente en el que se invoque este Hook. En este
caso, se invoca desde el Componente "ProductList". */
const useGetProducts = (API) => {
  /* El estado "products" se inicializa con un arreglo vacío. */
  const [products, setProducts] = useState([]);

  /* El hook "useEffect()" permitirá ejecutar cierto procedimiento solo cuando determinada variable cambie su valor. */
  useEffect(() => {
    /* Se realiza la petición asíncrona por medio de la librería "Axios" a la API. */
    const getProducts = async () => {
      const response = await axios(API),
        json = await response;
      /* Se actualizar el estado "products" con los valores devueltos por la petición, los cuales se encuentran dentro de la variable "json". */
      /* El objeto "json", contenxrá varios atributos correspondientes a los distintos productos almacenados en la API entre ellos. 
	          - title: título del producto.
	          - price: precio del producto. 
	          - images: imagen del producto. 

        Estos atributos son proporcionados por la API de Platzi que se utilizó en este ejemplo, la cual se puede
        consultar desde el siguiente link: 
	          https://api.escuelajs.co/docs/#/products/ProductsController_getAll
	
      */
      setProducts(json.data);
    };
    getProducts();
  }, []); /*Cuando dentro de un "useEffect" se agrega una variable dentro de corchetes, se indica
     cuál variable se usará de referencia para que se actualice el estado. */
  return products;
};

export default useGetProducts;
