import React from 'react';
import '../styles/Order.css';

/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/
import flechita from '../assets/icons/flechita.svg';

const Order = () => {
	return (
		<div className="Order">
			<p>
				<span>03.25.21</span>
				<span>6 articles</span>
			</p>
			<p>$560.00</p>
			<img src={flechita} alt="arrow" />
		</div>
	);
}

export default Order;