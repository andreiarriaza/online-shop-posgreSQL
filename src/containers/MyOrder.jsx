/* Se importa la librería "React" la cual permite trabajar con "React" y el hook "useContext" el cual permite utilizar el contexto que se creó anteriormente. */
import React, { useContext } from "react";

/* Se importa el Componente "AppContext", el cual contiene el contexto de la aplicación. */
import AppContext from '../context/AppContext';

/* Se importa el Componente "OrderItem". */
import OrderItem from "../components/OrderItem";


import "../styles/MyOrder.css";

/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */


/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/
import flechita from '../assets/icons/flechita.svg';

const MyOrder = () => {
  
  /* Se desestructura el estado "state", el cual fue creado dentro del hook personalizado "useInitialState", y es enviado al Componente "MyOrder" desde
  el Componente "App" mediante el provider del contexto (AppProvider). Para poder utilizar dicho estado, es necesario importarlo mediante el hook "useContext", para
	después desestructurarlo con el nombre "state". 

  Se debe recordar que el componente "AppContext", tiene asignado el estado "state", la función "addToCart", y la función "removeFromCart", los cuales 
  le son enviados desde el hook personalizado llamado "useInitialState()". 


  El estado "state" contiene el atributo "cart", el cual es un arreglo que incluye en su interior los datos de los diferentes 
  productos agregados al carrito de compras. 
  */

  const { state } = useContext(AppContext);

  /* La función "sumTotal()" permitirá realizar la suma de todos los productos agregados al carrito de compras que 
  se muestran dentro del Componente "MyOrder".*/
  const sumTotal = () => {
    /* La función "reducer" recibirá dos parámetros: 
      - accumulator: precio total acumulado. 
      - currentValue: precio actual del producto. 
    */
    /* Para evitar errrores, a la ArrowFunction que se encuentra dentro de la función "reducer" NO se le deben agregar llaves. */
    const reducer = (accumulator, currentValue) => 
      /* Lo que se estarpa sumando al parámetro "accumulator", será 
      el precio actual (price) de cada producto agregado al carrito de compras. */

      accumulator + currentValue.price;

    
    /* 
    El método reduce() ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.

    En otras palabras, el método reduce() aplica una función a un acumulador y a cada valor de una array (de izquierda a derecha) para reducirlo a un único valor.

    Ejemplo de función "reduce()":

      const suma = [10,20,30].reduce((a,b) => a + b);
      console.log(suma);

      Lo que intentamos hacer es sumar todos los elementos de una array y retornar el total de la suma. 
      Podemos observar que el método reduce(), puede ser implementado directamente en el array, luego dentro del array voy a 
      invocar a una función que se encargara de procesar la tarea a realizar.

      La función utilizada dentro de reduce es el equivalente en ES6 de:

        const suma = [10, 20, 30].reduce(function(a, b){return a + b});

      (a, b) son los parámetros que recibe la función, es nuestro ejemplo a = 10 y b = 20. 
      Nuestra función retorna la suma de ambos, es decir 30. Debido a que existen más elementos en el array, 
      la función reduce() es invocada nuevamente, la diferencia radica en que el parámetro “a” ahora es igual a 30 (representa el monto acumulado) 
      y “b” es el elemento (tercer elmento del array) restante en el array, es decir 30. 
      Al concretarse la operación el resultado que será mostrado en consola es ahora igual a 60.
    */
    /* 
    En el caso particular de este ejemplo, se recorrerá el arreglo que se encuentra dentro del atributo "cart", 
    el cual forma parte del estado "state". 
    Como se definió antes, la función "reducer" sumará el valor acumulado (accumulator) con el precio actual (currentValue.price). 
    El parámetro "0" indica cuál es el valor inicial que se tomará de referencia. 

    El método "reduce()" ejecutará la función "reducer" por cada elemento del arreglo. 

     La primera vez, la función reducer sumará el valor inicial (0)  + el elemento "a" del arreglo "cart". Al sumarlos se obtendrá 
     un total que se almacenará en el parámetro "accumulator". 

    Para el siguiente elemento del arreglo, llamémoslo "b", se sumará el valor acumulado (accumulator) + el valor del elemento "c" del arreglo. 
    Al sumarlos se obtendrá un total que se almacenará en el parámetro "accumulator". 

    Y así sucesivamente hasta sumar todos los precios de los elementos del arreglo "cart" y obtener el total acumulado de los mismos. 
    */
    const sum = state.cart.reduce(reducer, 0);

    /* Se retorna el total de los precios de los productos. */
    return sum; 
  };

  return (
    <aside className="MyOrder">
      <div className="title-container">
        <img src={flechita} alt="arrow" />
        <p className="title">My order</p>
      </div>
      <div className="my-order-content">
        {/* El método "map" hará un mapeo del atributo "cart" (el cual es un arreglo), que se encuentra dentro del estado "state". 
        Es decir, que se recorrerán uno a uno los elementos que se encuentren dentro del arreglo "cart", y por cada uno de los elementos 
        se mostrará el Componente "OrderItem" respectivo. 

        El parámetro "product" irá tomando la información de cada producto que se encuentre almacenado dentro del estado "state". 
        */}
        {/*
          IMPORTANTE: para que funcione correctamente el mapeo del método "map", es necesario tomar en cuenta que si la ArrowFunction
          en su interior se coloca con llaves ({}), exigirá que se agregue un "return" para funcionar correctamente, por lo que si se escribe
          de la siguiente manera, el Componente "MyOrder" no funcionará correctamente:
              {state.cart.map((product) => {
          
                <OrderItem product={product} key={`orderItem ${product.id}`} />
              })}
          
          Como en este caso no se precisaba dicho return, se agregó simplemente con paréntesis. Al usar paréntesis 
          no demandará un "return" para funcionar apropiadamente:

                {state.cart.map((product) => (
          
                  <OrderItem product={product} key={`orderItem ${product.id}`} />
                ))}
        */}
        {/* 
        El parámetro "index" es generado por el método "map" y corresponde al índice que 
        el método "map" asocia a cada uno de los componentes generados mediante el método "map". 

        En este ejemplo, por cada elemento almacenado dentro del atributo "cart", se generará
        un Componente "OrderItem" con los datos que correspondan a dicho elemento. Esto significa
        que cada Componente "OrderItem" tendrá asociado un índice (parámetro index) específico que lo identifica de forma única. 

        De esta manera se puede asociar un atributo "key" único para cada Componente "OrderItem" que haya generado. 
        */}
        {state.cart.map((product, index) => (
          /* Se envía como "prop" el valor del parámetro "product", es decir, el valor del producto que se esté recorriendo en ese momento.
          
          Y se asigna como siempre el atributo "key" el cual contiene el identificador único que se asignará a cada componente "OrderItem" generado. 
          La prop "indexValue" contiene el identificador único que se asignará al Componente "OrderItem" que corresponda a cada producto
          que se haya agregado al carrito de compras. A dicha prop se le asignará el parámetro "index", el cuál es generado automáticamente
          por el método "map" y que asigna un identificado único (index) a cada Componente "OrderItem" generado. 
                    
          En este caso la información de cada producto (product), es tomada del arreglo "cart".
          */
          
          /* 
          También se envía la prop "indexValue", esta propiedad se usará para evitar que cuando se agreguen el mismo producto 
          varias veces al carrito de compras y se elimine dicho producto, se borren todos los productos idénticos del carrito de compras. 
          La propiedad "indexValue" será enviada hacia el Componente "OrderItem", para que así, aunque en el carrito de compras haya varios productos idénticos agregados, 
          únicamente elimine el producto seleccionado. 
          */
          <OrderItem indexValue={index} product={product} key={index} />
        ))}
   
        <div className="order">
          <p>
            <span>Total</span>
          </p>
          <p>${ sumTotal() }</p>
        </div>
        <button className="primary-button">Checkout</button>
      </div>
    </aside>
  );
};

export default MyOrder;
