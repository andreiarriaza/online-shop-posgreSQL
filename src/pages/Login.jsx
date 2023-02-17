/* ************************ Componente para Login ************************ */


/* Se importa la librería de React. */
/* 
Características y diferencias entre useRef y useState

  useRef es un hook utilizado para obtener una referencia a los datos de un objeto con información mutable. Es decir, es como una manera de siempre poder obtener los datos mas recientes mediante referencia de algún objeto de html. En este caso referenciamos a los valores recientes de un formulario. 
  
  Dos características importantes de useRef es que los datos son persistentes en caso de que se re-renderice el componente. Así como también, actualizar los datos de esta referencia no causan el re-render. 
  
  Cabe recalcar las diferencias con useState:
    1. En "useRef" la actualización de datos es síncrona
    2. "useRef" no se re-renderiza
*/
import React, { useRef } from 'react';

/* Se importa la hoja externa CSS llamada "Login.css". */
import '../styles/Login.css';

/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/
import logo_yard_sale from '../assets/logos/logo_yard_sale.svg';

const Login = () => {
  /* Se inicializa la constante "form", la cual se define como "useRef()" y se le asigna el valor inicial "null". */
  const form = useRef(null);

  /* La función "FormData" permitirá manejar el "submit" del formulario. 
   Esta es una función de JavaScript, la cual permite capturar los valores de todos los elementos del formulario según sean llenado, 
  por lo que se envíe el formulario, dichos valores seguirán almacenados en ella. 
  
  Todo el objeto generado por la función "formData" puede ser enviado al Backend. consiguiendo con ello que la 
  información viaje de forma más segura y que no sea tan sencillo acceder a ella por personas maliciosas. 
  */
  
  const handleSubmit = (e) => {
    /* El parámetro "e" hace referencia al elemento que origina el evento. 
    En este caso, el elemento que origina el evento "clic", el cual invoca a la función "handleSubmit()", 
    es el botón llamado "Log in". */

    /* El método "preventDefault()", evita que el botón "Log in" realice su función predeterminada, 
    evitando con esto que el sitio web cargue de nuevo. */
    e.preventDefault();
    /* Se crea una instancia de la función "FormData()", 
    y se le envía como parámetro la constante de tipo "useRef" la cual se llama "form" (que fue creada anteriormente), y se le
    agrega la propiedad "current", para indicar que se desea enviar los valores actuales del formulario.  */
    const formData = new FormData(form.current);
    const data = {
      /* 
      El objeto "data", contendrá atributos cuyos valores corresponden a los valores actuales del formulario. 

      Como se dijo antes, "formData" es una instancia de "FormData", y como tal, permite
      hacer uso del método "get()", el cual a su vez hace posible capturar el valor que corresponda a un elemento del formulario
      en específico. Para que se pueda capturar el valor de un elemento del formulario, cada uno de esos elementos
      debe tener asignado el atributo "name", con un nombre único para cada uno. 
      */
      
      /* Se captura el valor del input que tiene asignado en el atributo "name" el nombre "email"
       y se almacena dentro del atributo "username".  */
      username: formData.get('email'),
      password: formData.get('password'),
    }

    console.group();
    console.log(data);
    console.groupEnd();
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <img src={logo_yard_sale} alt="Logo" className="logo" />

       
        
        {/* El atributo "ref" hace referencia a la constante "form", la cual es de tipo "useRef()".  */}
        <form action="/" className="form" ref={form}>
          <label htmlFor="email" className="label">Email adress</label>
          <input type="text" name="email" placeholder="platzi@example.cm" className="input input-email" />
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            className="input input-password"
          />

          
          {/* Al dar clic en el botón se ejecutará la función "handleSubmit", la cual capturará los datos del formulario que serán enviados. */}
         <button
						onClick={handleSubmit}
						className="primary-button login-button">
						Log in
         </button>
          
          <a href="/">Forgot my password</a>
        </form>

        <button className="secondary-button signup-button">
					Sign up
        </button>
        
      </div>
    </div>
  );
};

export default Login;