import React from 'react';
import '../styles/SendEmail.css';

/* *********************** IMPORTAR IMÁGENES A UN COMPONENTE *********************** */

/* 
Se importan las imágenes ubicadas dentro de la carpeta "assets", la cual a su vez se encuentra dentro de la carpeta "src". 
*/

import logo_yard_sale from '../assets/logos/logo_yard_sale.svg';
import email from '../assets/icons/email.svg';

const SendEmail = () => {
	return (
		<div className="SendEmail">
			<div className="SendEmail-container">
				<img src={logo_yard_sale} alt="logo" className="logo" />
				<h1 className="title">Email has been sent!</h1>
				<p className="subtitle">Please check your inbox for instructions on how to reset the password</p>
				<div className="email-image">
					<img src={email} alt="email" />
				</div>
				<button className="primary-button login-button">Login</button>
				<p className="resend">
					<span>Didn't receive the email?</span>
					<a href="/">Resend</a>
				</p>
			</div>
		</div>
	);
}

export default SendEmail;