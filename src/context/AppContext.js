import React from "react";

/* 
¿Qué es Context?
Context provee una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.

En una aplicación típica de React, los datos se pasan de arriba hacia abajo (de padre a hijo) a través de props, pero esta forma puede resultar incómoda para ciertos tipos de props (por ejemplo, localización, el tema de la interfaz) que son necesarias para muchos componentes dentro de una aplicación. Context proporciona una forma de compartir valores como estos entre componentes sin tener que pasar explícitamente una prop a través de cada nivel del árbol.
Context provee una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.

En una aplicación típica de React, los datos se pasan de arriba hacia abajo (de padre a hijo) a través de props, pero esta forma puede resultar incómoda para ciertos tipos de props (por ejemplo, localización, el tema de la interfaz) que son necesarias para muchos componentes dentro de una aplicación. Context proporciona una forma de compartir valores como estos entre componentes sin tener que pasar explícitamente una prop a través de cada nivel del árbol.


Link a la documentación oficial de React JS para comprender mejor la funcionalidad "Context" de React JS: 
    https://es.reactjs.org/docs/context.html#gatsby-focus-wrapper
*/

/*
Cuando se trabaja con Context API de React JS, se pueden crear "variable globales", es decir, variables
desde las cuales se puede acceder desde cualquier componente abarcado por el contexto, sin la necesidad
de estar enviando "props" a cada uno de ellos.

IMPORTANTE: Es recomendable usarlo SOLAMENTE en el caso de que deban ser enviadas muchas props a varios componentes distintos.
*/
import { createContext } from "react"; /*El hook "createContext" es el que permite trabajar con "contextos". */

import useInitialState from "../hooks/useInitialState";

/*Se crea un contexto llamado "CrudContext". */
/* Un contexto contiene dos objetos:
    1. Un proveedor(provider) que va a proporcionar a cada elemento interno los distintos valores almacenados en el Context.
    2. Un consumido(consumer) el objeto que permitirá consumir los elementos proporcionados por el proveedor. En este ejemplo no se mostrará cómo
    usar el "Consumer" porque en su lugar se utiliza el hook "useContext" proporcionado por React JS. 
*/

/* IMPORTANTE: este Componente (AppContext) será importado desde el archivo "App.jsx". */
const AppContext = createContext();

/* Se crea el "provider", que en este caso será llamado "AppProvider". */
const AppProvider = ({ children }) => {
  /* Se almacena en la variable "initialState" los valores devueltos por el hook personalizado llamado "useInitialState()". 
    Se debe recordar que dicho hook personalizado devuelve el estado "state" y la función "addToCart". */
  const initialState = useInitialState();

  return (
    /*Se retorna como "Componente" la función "AppContext" */
    /*El Componente "AppContext" asignado a la propiedad "Provider" envolverá a todos los componentes "hijos" 
        que necesiten los valores proporcionados por ese contexto. */

    /*Por medio de la prop "value"(el nombre puede ser cualquiera), enviará el valor de la variable ""initialState", la cual contendrá los valores que se compartirán
        en el "Context" como VALORES GLOBALES. */
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
