import React from 'react';
import ProductInfo from '../components/ProductInfo';
import '../styles/ProductDetail.css';


/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicada dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/

import icon_close from '../assets/icons/icon_close.png';

const ProductDetail = () => {
	return (
		<aside className="ProductDetail">
			<div className="ProductDetail-close">
				<img src={icon_close} alt="close" />
			</div>
			<ProductInfo />
		</aside>
	);
}

export default ProductDetail;