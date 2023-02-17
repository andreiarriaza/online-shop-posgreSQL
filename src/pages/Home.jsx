/* ************************ Componente que contendrá la página de Home ************************ */

/* Se importa la librería de React. */
import React from 'react';

/* Se importa el Componente "Header", dentro del cual se encuentra la barra de navegación de la aplicación. */
import ProductList from '../containers/ProductList';

import Header from '../components/Header';


const Home = () => {
    return (
        <>
            <Header/>
            <ProductList/>
        </>
        
    );

};

export default Home;