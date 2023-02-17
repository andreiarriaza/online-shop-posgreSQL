/* ************************ Componente que contendrá la barra de navegación de la aplicación (NavBar) ************************ */

/* Se importa la librería de React, el hook "useState" para poder trabajar con estados (states), y el hook "useContext" para
poder trabajar con el contexto creado en el archivo "AppContext". */
import React, { useState, useContext } from 'react';

/* Se importa el Componente "Menu". */
import Menu from './Menu';

/* Se importa el Componente "AppContext" (dentro del cual se encuentra el contexto). */
import AppContext from '../context/AppContext';

/* Se importa el Componente "MyOrder", el cual se encuentra dentro de la carpeta "containers". */
import MyOrder from '../containers/MyOrder';

/* Se importa la hoja externa CSS llamada "Header.css". */
import '../styles/Header.css';


/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/

import icon_menu from '../assets/icons/icon_menu.svg';

import logo_yard_sale from '../assets/logos/logo_yard_sale.svg';

import icon_shopping_cart from '../assets/icons/icon_shopping_cart.svg';

const Header = () => {
    /* El valor inicial del estado "toggle" será "false". El estado "toggle" permitirá controlar si se muestra
    o no el Componente "Menu". */
    const [toggle, setToggle] = useState(false);

    /* 
    El valor inicial del estado "toggleOrders" será "false": 
    El estado "toggleOrders" servirá para mostrar u ocultar el Componente "MyOrder". */
    const [toggleOrders, setToggleOrders] = useState(false);

    /* Se desestructura el estado "state", obtenido por medio del hook "useContext()" a partir del Componente "AppContext", dentro del cual
    se cuentra el contexto. 
    
    Se debe recordar que el Componente "AppContext" importa dentro de él los valores devueltos por el hook personalizado
    llamado "useInitialState(). Dichos valores son: "state" (estado) y addToCart(función). 

    De esos dos, en el actual Componente solamente se desestructura el estado "state", que es el que se necesita en este caso. 
    */
    const { state } = useContext(AppContext);

    const handleToggle = () => {
        /* El operador lógico de negación (!), cambiará el valor del estado "toggle", 
        cada vez que se ejecute la función manejadora "handleToggle()". Esto quiere decir, 
        que si el estado es "false" se convertirá en "true" y viceversa.  */
        setToggle(!toggle);
    };

    const handleToggleOrders = () => {
           /* El operador lógico de negación (!), cambiará el valor del estado "toggleOrders", 
        cada vez que se ejecute la función manejadora "handleToggleOrders()". Esto quiere decir, 
        que si el estado es "false" se convertirá en "true" y viceversa.  */
        setToggleOrders(!toggleOrders);
    };

    return (
        <nav>
            <img src={icon_menu} alt="Menu" className="menu" />

        <div className="navbar-left">
            <img src={logo_yard_sale} alt="Logo" className="nav-logo" />

            <ul>
            <li><a href="">All</a></li>
            <li><a href="">Clothes</a></li>
            <li><a href="">Electronics</a></li>
            <li><a href="">Furnitures</a></li>
            <li><a href="">Toys</a></li>
            <li><a href="">Others</a></li>
            </ul>
        </div>

        <div className="navbar-right">
                <ul>
                    {/* El evento "onClick" invocará a la función manejadora "handleToggle()". */}
                    <li className="navbar-email" onClick={handleToggle}>
                        email@example.com
                    </li>

                    {/* El evento "onClick" invocará a la función manejadora "handleToggleOrders()". Esto permitirá que al dar clic en
                    el ícono del carrito de compras o en el número que está sobrepuesto a dicho ícono, se muestre u oculte el Componente "MyOrder". */}
                    <li className="navbar-shopping-cart" onClick={handleToggleOrders}>
                
                        <img src={icon_shopping_cart} alt="Shopping cart" />
                        {/* Se debe recordar que el estado "state", el cual fue creado dentro del hook personalizado "useInitialState",
                        contiene el atributo "cart", el cual a su vez contiene un arreglo con los datos de los productos que se hayan agregado
                        al carrito de compras. 
                        
                        Se usa un operador ternario para verificar si el atributo "cart" (state.cart) del estado "state", el cual es un arreglo,
                        contiene elementos almacenados dentro de él. 

                        Si los tiene, el operador ternario devovlerá el número de elementos que se encuentran dentro del arreglo "cart", de lo contrario
                        devolverá un valor "null".


                        IMPORTANTE: el contenedor "div" se colocó dentro del operador ternario, de esta manera: 
                            {
                                state.cart.length > 0 ? <div>{state.cart.length}</div> : null
                            }
                            
                        En lugar de como originalmente estaba: 
                            <div>
                                {
                                    state.cart.length > 0 ? state.cart.length : null

                                }
                            </div>

                        Para evitar que cuando no hubiera ningún producto agregado al Carrito de Compras, se viera el "circulito" (color de fondo del div)
                        sobre el carrito de compras sin ningún valor en su interior. 
                        
                        Agregando el "div" dentro del operador ternario, el "circulio" (el elemento "div"), solamente se mostrará cuando
                        se hayan agregado productos al carrito de compras. 

                        */} 
                        {
                            state.cart.length > 0 ? <div>{state.cart.length}</div> : null
                        }
                    </li>
                </ul>
            </div>
            { /* Se utiliza el Operador de Cortocircuito "&&" para comprobar si el estado "toggle" es VERDADERO. 
            Si el estado "toggle" es verdadero, se mostrará el Componente "Menu". 
            De lo contrario, si el estado "toggle" es falso, este operador devolverá justamente
            el valor del estado "toggle", el cual sería en ese caso igual a "false", lo cual no afecta en absoluto el funcionamiento de la página web. */}
            {toggle && <Menu />}

             { /* Se utiliza el Operador de Cortocircuito "&&" para comprobar si el estado "toggleOrders" es VERDADERO. 
            Si el estado "toggleOrders" es verdadero, se mostrará el Componente "MyOrder". 
            De lo contrario, si el estado "toggleOrders" es falso, este operador devolverá justamente
            el valor del estado "toggleOrders", el cual sería en ese caso igual a "false", lo cual no afecta en absoluto el funcionamiento de la página web. */}
            
            { toggleOrders && <MyOrder/>}
            
        </nav>

    );

};


export default Header;