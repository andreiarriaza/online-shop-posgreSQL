/* Se importa la librería de React y el hook "useContext" para poder trabajar con contextos. */
import React, { useContext } from 'react';

/* Se importa el Componente "AppContext", el cual contiene el contexto de la aplicación. */
import AppContext from '../context/AppContext';

import '../styles/ProductItem.css';

/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */


/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/

import bt_add_to_cart from '../assets/icons/bt_add_to_cart.svg';

/* Se recibe la prop "product", la cual contiene la información de cada uno de los productos del objeto "products". 
La prop "product", le es enviada desde el Componente "ProductList". */
const ProductItem = ({ product }) => {
	
	
	/* Se desestructura el objeto "product", en las variables: 
		- id
		- title
		- price
		- image
	*/
	/* IMPORTANTE: para saber con certeza los nombres de los atributos en los que se desestructura la prop "product", 
	es necesario ver la estructura de la API con la cual se está realizando la comunicación. */
	const { id, title, price, images } = product;

	/* La función "addToCart" fue creada dentro del hook personalizado "useInitialState", y es enviado al Componente "MyOrder" desde
  el Componente "App" mediante el provider del contexto (AppProvider). Para poder utilizar dicha función, es necesario importarla mediante el hook "useContext", para
	después desestructurarla con el nombre "addToCart". 
	*/
	const { addToCart } = useContext(AppContext);

	
	/* Se declara la función manejadora llamada "handleClick". */
	const handleClick = (item) => {
		/* Se envía a la función "addToCart()", la cual, como se dijo antes, ahora forma parte del contexto, el parámetro "item". 
		Dicho parámetro contiene la información del producto que será enviada al Carrito de Compras.

		El valor del parámetro "item" es enviada cuando se da clic dentro de la imagen "bt_add_to_cart" (imagen del carrito de compras) que se encuentra más abajo. 
		*/
		addToCart(item);
	};

	return (
		<div className="ProductItem">
			<img src={images[0]} alt={title} />
			<div className="product-info">
				<div>
					<p>Q{price}</p>
					<p>{title}</p>
				</div>
				{/* El evento "onClick" invocará la función manejadora "handleClick()", y se le enviará como parámetro
				el contenido de la prop "product", la cual contiene la información del producto seleccionado, y que es enviada
				a este Componente desde el Componente "ProductList".  */}
				<figure onClick={() => handleClick(product)}>
					<img src={bt_add_to_cart} alt="" />
				</figure>
				
			</div>
		</div>
	);
}

export default ProductItem;