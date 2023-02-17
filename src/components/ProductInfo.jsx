import React from 'react';
import '../styles/ProductInfo.css';



/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/
import bicicleta from '../assets/bicicleta.svg';

const ProductInfo = () => {
	return (
		<>
			<img src={bicicleta} alt="bike" />
			<div className="ProductInfo">
				<p>$35,00</p>
				<p>Bike</p>
				<p>With its practical position, this bike also fulfills a decorative function, add your hall or workspace.</p>
				<button className="primary-button add-to-cart-button">
					<img src="./icons/bt_add_to_cart.svg" alt="add to cart" />
					Add to cart
				</button>
			</div>
		</>
	);
}

export default ProductInfo;