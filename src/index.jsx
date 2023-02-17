/*

Archivos .jsx

Es una extensión que hace referencia a JavaScript y a XML, es básicamente un sistema de plantillas que se podrá utilizar para usar HTMl Y CSS dentro de JavaScript. Permitirá sacar el mayor provecho de JavaScript combinándolo con HTML y CSS.

*/

/* 

Se utilizará una API de Platzi para trabajar este ejemplo. 

La documentación de dicha API se encuentra en: 
	https://api.escuelajs.co/docs/#/products/ProductsController_getAll



Sin embargo, si por alguna razón, esta API dejará de ser funcional, también se puede utilizar cualquier otra API, 
como por ejemplo, la siguiente:
	https://fakestoreapi.com/



*/

/* Se importa el Componente "React". */
import React from "react";


import ReactDOM from "react-dom/client";


/* Se importa el componente "App"*/
import App from './App';


/* Se implementa el hook "createRoot()", el cual capturara el "id" llamado "root".
Como este archivo (index.jsx) se importa como módulo desde el archivo "index.html", el método
"createRoot()" buscará el id llamado "root" que se encuentre dentro del archivo "index.html". 

*/
const root = ReactDOM.createRoot(document.getElementById("root"));

/* Se renderiza, por medio del método "render()", el componente "App", creado anteriormente. */
root.render(<App />);