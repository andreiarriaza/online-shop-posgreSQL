/* 
Se utilizará una API de Platzi para trabajar este ejemplo. 

La documentación de dicha API se encuentra en: 
	https://api.escuelajs.co/docs/#/products/ProductsController_getAll



Sin embargo, si por alguna razón, esta API dejará de ser funcional, también se puede utilizar cualquier otra API, 
como por ejemplo, la siguiente:
	https://fakestoreapi.com/



*/

import React from 'react';
/* Se importan los Componentes:

  - HashRouter (Componente que permite contener las rutas del Componente "Routes").
  - Routes (Componente Padre (Routes) que permitirá agregar Rutas Hijas (Route).
  - Route (Rutas Hijas del Componente Padre llamado "Routes")




el Componente "React". */


/*  El componente "HashRouter" permite también crear rutas de manera parecida al "BrowserRouter", pero la diferencia es de que
    el componente "HashRouter" evita los errores que las rutas pueden generar cuando el sitio web se despliega para producción (se compila para producción) y se
    sube al Hosting.

    Por ejemplo, suponiendo que se define la siguiente ruta con "BrowserRouter": "/rutas/ejemplo" 

    Si se despliega en producción el proyecto anterior y se sube al servidor, y se accede a la página:
            https://plastikito.com y desde ella se accede por medio de un menú a la ruta "/rutas/ejemplo", todo funcionará perfecto.

    Se debe recordar que React es la tecnología de "Single Page Application", eso significa que cuando se accede a una página de React,
    en ese momento se cargan todos los componentes necesarios para su funcionamiento. Por eso, cuando primero se accede a la página https://plastikito.com
    y luego se accede a "/rutas/ejemplo" todo funciona bien, porque en el momento que se accedió a la página "plastikito.com" en ese mismo momento
    se cargaron los componentes "Rutas" y "Ejemplo". SE DEBE RECORDAR QUE LAS RUTAS NO SON RUTAS REALES SINO SIMULADAS, es decir, no hay una carpeta llamada "rutas"
    y otra carpeta llamada "ejemplos" en el hosting, sino son rutas creadas que hacen referencia a componentes.

    Ahora bien, si en lugar de acceder primero a la página "https://www.plastikito.com" y después a la ruta "/rutas/ejemplo", se accediera
    directamente a la primera a la página "https://plastikito.com/rutas/ejemplo" se generaría un error 404. Esto porque como se dijo, la página principal primero
    debe cargarse para que así se carguen los componentes "Rutas" y "Ejemplo". Si se accede directamente a esta dirección https://plastikito.com/rutas/ejemplo"
    el navegador no reconocería los componentes "Rutas" y "Ejemplo" porque aún no han sido cargados, y tampoco encontraría las carpetas "rutas" y "ejemplo"
    porque dichas carpetas no fueron creadas en el proyecto. 

    Para evitar este error existe el componente "HashRouter" el cual se encarga de permitir que se pueda acceder directamente a una ruta, agregando antes de la ruta
    el símbolo numeral para indicar al navegador que debe buscar dentro de la página principal los componentes para acceder a la ruta deseada.

    Con HashRouter la ruta quedaría así:  https://plastikito.com/#/rutas/ejemplo

    El numeral(#) le indica al navegador que la ruta a continuación "/rutas/ejemplo" es un recurso de la página index principal, es decir,
    la página "index" generada por React cuando se lleva a producción el proyecto. De esta manera no buscará una carpeta llamada "rutas" y otra llamada
    "ejemplo" sino que entenderá que "/rutas/ejemplo" hace referencia a componentes internos de la página "index" del proyecto de React.
*/
import { HashRouter, Route, Routes} from "react-router-dom";

/* Se importa el archivo externo CSS con los Estilos Globales de la aplicación. */
import './styles/global.css';


/* Se importa el Componente llamado "Home".*/
import Home from "./pages/Home";

/* Se importa el Componente llamado "Login".*/
import Login from "./pages/Login";

/* Se importa el Componente llamado "RecoveryPassword".*/
import RecoveryPassword from "./pages/RecoveryPassword";

/* Se importa el Componente llamado "SendEmail".*/
import SendEmail from "./pages/SendEmail";

/* Se importa el Componente llamado "NewPassword".*/
import NewPassword from "./pages/NewPassword";

/* Se importa el Componente llamado "MyAccount".*/
import MyAccount from "./pages/MyAccount";

/* Se importa el Componente llamado "CreateAccount".*/
import CreateAccount from "./pages/CreateAccount";

/* Se importa el Componente llamado "Checkout".*/
import Checkout from "./pages/Checkout";

/* Se importa el Componente llamado "Orders".*/
import Orders from "./pages/Orders";

/* Se importa el Componente llamado "NotFound".*/
import NotFound from "./pages/NotFound";


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


/* Se importa la función "AppProvider", la cual se encuentra dentro del Componente "AppContext", el que a su vez se encuentra dentro
de la carpeta "context". Esta función permite delimitar qué componentes compartirán el Contexto definido en el Componente "AppContext". */
import { AppProvider } from './context/AppContext';



function App() {
 

      /* El Componente "AppProvider", es el que permitirá utilizar contextos en los componentes que se encuentran
      dentro de él. */
    return (
        
   
      <AppProvider>
         



       
            
            <HashRouter>

                <Routes>
                    {/*
        Se debe recordar que hay dos formas de agregar Componentes: 
        Primera forma: 
          <Layout>
          </Layout>

        Segunda forma: 
          <Login/>

        Ambas formas son válidas, sin embargo, lo más recomendable es que si el Componente NO TIENE Componentes hijos, se escriba así: 
          <Login/>

        Mientras que si el Componente TIENE Componentes hijos, es recomedable
        que se escriba así: 
          <Layout>

          </Layout>
    */}
                    
        {/* 
        - El atributo "path" permite definir la ruta a la que el usuario debe acceder, para visualizar el Componente correspondiente. 
        - El atributo "element" permite indica qué Componente se cargará cuando se acceda a la ruta indicada en el atributo "path". En este caso, 
          cuando el usuario acceda a la rura ""
        

        */} 
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/recovery-password" element={<RecoveryPassword />} />
                    <Route path="/send-email" element={<SendEmail />} />
                    <Route path="/new-password" element={<NewPassword />} />
                    <Route path="/acount" element={<MyAccount />} />
                    <Route path="/signup" element={<CreateAccount />} />
                    <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
             

                    {/* El Componente "NotFound" será el que se mostrará de forma predeterminada si se accediera a una ruta que no existe.
                    Para que el Componente "NotFound" se muestre cuando no se acceda a una ruta válida, es necesario
                    agregar al atributo "path" el asterisco (*). */}
                    <Route path="*" element={<NotFound/>} />
                    

                </Routes>
    </HashRouter>
      
       </AppProvider>
        
    );
};


export default App;