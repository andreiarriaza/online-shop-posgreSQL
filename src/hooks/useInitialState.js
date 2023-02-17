/* 
Este Hook Personalizado permitirá agregar y ver los elementos agregados al carrito de compras. 
*/

import { useState } from "react";

/* El objeto "initialState" contienen el atributo "cart", el cual a su vez contiene un arreglo vacío. */
const initialState = {
  cart: [],
};

const useInitialState = () => {
  /* El estado "state" se inicializa con el valor almacenado en la constante "initialState". */
  const [state, setState] = useState(initialState);

  /* 
  La función "addToCart()" servirá para agregar productos al carrito de compras. 
  El parámetro "payload" contiene la información del producto que se desea agregar al carrito de compras. */
  const addToCart = (payload) => {
    /* Se usa el SpreadOperator(...) para obtener el contenido actual del estado "state". */

    /* Se usa nuevamente el SpreadOperator (...) para obtener el valor actual del atributo "cart" (...state.cart), el cual se encuentra
      dentro del estado "state", y se le agrega el nuevo valor (parámetro "payload") que se desea agregar al carrito. El nuevo valor que se desea
      enviar al carrito se encuentra almacenado dentro del parámetro "payload". */
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };

  /* La función "removeFromCart()", permitirá eliminar productos del carrito de compras. 
  El parámetro "indexValue" contiene el identificador único del producto que se desea eliminar del carrito de compras.
  */
  const removeFromCart = (indexValue) => {
    /* Se usa el SpreadOperator(...) para obtener el contenido actual del estado "state". */
    setState({
      ...state,
      /* Se aplicará un filtro por medio del método "filter". 
      El parámetro "index" del método "filter", asocia automáticamente un identificador único (index) a cada elemento
      que se encuentra almacenado dentro del arreglo "cart". 
      
      Dentro del método "filter" se pueden tener dos parámetros: 
        - primer parámetro (_): el nombre del parámetro que irá tomando el valor de cada elemento que forme parte del arreglo que está evaluando. En este caso, 
                                como no se necesita especificar ningún parámetro, simplemente se asigna el guión bajo (_). 
                                Si fuera necesario un parámetro, podría quedar de la siguiente manera, por ejemplo: 
                                
                                    cart: state.cart.filter((product, index) => index !== indexValue)
                                
                                Si se usará la línea de código anterior, el parámetro "product" iría tomando el valor de cada uno de los elementos 
                                almacenados dentro del arreglo "cart". 
                                
        - segundo parámetro (index)

      Los datos serán filtrados solamente si el valor del parámetro "index" (índice del elemento del atributo "cart") es igual 
      al valor del parámetro "indexValue" (índice del elemento que se seleccionó par ser eliminado). Si no son iguales, el producto se seguirá mostrando
      en el carrito de compras, pero cuando sean iguales, dicho producto ya no se mostrará en el carrito de compras quedando "eliminado" del mismo. 
      */
      cart: state.cart.filter((_, index) => index !== indexValue),
    });
  };

  return {
    state,
    addToCart,
    removeFromCart,
  };
};

export default useInitialState;
