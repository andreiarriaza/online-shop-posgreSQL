/* Se importa la librería "React" la cual permite trabajar con "React" y el hook "useContext" el cual permite utilizar el contexto que se creó anteriormente. */
import React, { useContext } from 'react';

/* Se importa el Componente "AppContext", el cual contiene el contexto de la aplicación. */
import AppContext from '../context/AppContext';

import '../styles/OrderItem.css';


/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/

import icon_close from '../assets/icons/icon_close.png';

/* 
Esta imagen se importó solo como ejemplo, antes de importar desde la API las imágenes dinámicamente. /
	import bicicleta from '../assets/bicicleta.jpg'; 
*/

/* El Componente "OrderItem" recibe como parámetro la prop llamada "product". Esta prop le es enviada desde el Componente "MyOrder".

La prop "product", contiene varios atributos, entre ellos. 
	- title: título del producto.
	- price: precio del producto. 
	- images: imagen del producto. 

Estos atributos son proporcionados por la API de Platzi que se utilizó en este ejemplo, la cual se puede
consultar desde el siguiente link: 
	https://api.escuelajs.co/docs/#/products/ProductsController_getAll

*/

/* El parámetro "props" contiene las props que le han sido enviadas a este Componente desde el Componente "MyOrder". 

En este caso, contien las props: 
	- product (la información que corresponde a cada uno de los productos agregados al carrito de compras)
	- indexValue (valor único que identifica a cada Componente "OrderItem" que es generado mediante el método "map" del Componente "MyOrder", 
	              Es decir, identifica de forma única a la información asociada a cada producto del carrito de compras.)
*/
const OrderItem = ( props ) => {

	/* Se desestructura el parámetro "props", el cual contiene las props "product" e "indexValue" que
	le fueron enviadas desde el Componente "MyOrder". */
	const { product, indexValue } = props;
	
	/* Se desestructura la función "removeFromCart()", la cual fue creada dentro del hook personalizado "useInitialState", y es enviada al Componente "OrderItem" desde
  el Componente "App" mediante el provider del contexto (AppProvider). Para poder utilizar dicha función, es necesario importarla mediante el hook "useContext", para
	después desestructurarla con el nombre "state". 

  Se debe recordar que el componente "AppContext", tiene asignado el estado "state", la función "addToCart" y la función "removeFromCart", los cuales 
  le son enviados desde el hook personalizado llamado "useInitialState()". 


  El estado "state" contiene el atributo "cart", el cual es un arreglo que incluye en su interior los datos de los diferentes 
  productos agregados al carrito de compras. 
  */
	const { removeFromCart } = useContext(AppContext);

	/* La función "handleRemove" recibirá como parámetro (index) el identificador del producto que se desea eliminar,
	y luego ejecutará la función "removeFromCart" para eliminar dicho producto del carrito de compras. 
	
	Esta función se ejecutará cuando se dé clic sobre la imagen de eliminar (icon_close) que se encuentra más abajo. 
	*/
	const handleRemove = (product) => {
		removeFromCart(product);
	}
	return (
		<div className="OrderItem">
			<figure>
				<img src={product.images[0]} alt={product.title} />
			</figure>
			<p>{product.title}</p>
			<p>{product.price}</p>
			{/* Al dar clic en la siguiente imagen, se ejecutará la función "handleRemove()", la cual
			a su vez invocará a la función "removeFromCart()" que eliminará el producto seleccionado del carrito de compras.
			
			El producto que se desea eliminar es enviado mediante el parámetro "product". 
			*/}
			{
				 /* 
          La prop "indexValue" se usará para evitar que cuando se agreguen el mismo producto 
          varias veces al carrito de compras y se elimine dicho producto, se borren todos los productos idénticos del carrito de compras. 
          La propiedad "indexValue" le es enviada a este Componente desde el Componente "MyOrder". 
          */
			}
			<img src={icon_close} alt="close" onClick={() => handleRemove(indexValue)} />
		</div>
	);
}

export default OrderItem;