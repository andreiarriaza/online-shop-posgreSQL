/* 
Se utilizará una API de Platzi para trabajar este ejemplo. 

La documentación de dicha API se encuentra en: 
	https://api.escuelajs.co/docs/#/products/ProductsController_getAll



Sin embargo, si por alguna razón, esta API dejará de ser funcional, también se puede utilizar cualquier otra API, 
como por ejemplo, la siguiente:
	https://fakestoreapi.com/



*/

import React from 'react';

/* Se importa el Componente "ProductItem" que se encuentra almacenado dentro de la carpeta "components". */
import ProductItem from '../components/ProductItem';

/* Se importa el Hook Personalizado llamado "useGetProducts", el cual se encuentra dentro de la carpeta "hooks". */
import useGetProducts from '../hooks/useGetProducts';



import '../styles/ProductList.css';



/* Endpoint de la API con la que se establecerá la comunicación. En este caso, la API de la cual se desea obtener los datos respectivos. */
const API = 'https://api.escuelajs.co/api/v1/products';



const ProductList = () => {

	/* Se invoca el Hook Personalizado "useGetProducts" y se le envía como parámetro el "endpoint". 
	
	El valor devuelto por el Hook Personalizado "useGetProducts", se almacena en la constante "products", 
	la cual contendrá un objeto con la información de todos los productos de la API. 
	*/
	const products = useGetProducts(API);




	return (
		<section className="main-container">
			<div className="ProductList">
				{/* Se envían al Componente "ProductItem" las props: 
					1. key: la cual contiene el id (product.id) del producto correspondiente para identificar a cada producto del objeto "products" de manera única.
					2. product: contiene la información de cada producto almacenado dentro del objeto "products". 
				*/}
				{
					
					products.map(product => (
						
						<ProductItem key={product.id} product={product} />
					)) 
				}
				
			</div>
		</section>
	);
}

export default ProductList;