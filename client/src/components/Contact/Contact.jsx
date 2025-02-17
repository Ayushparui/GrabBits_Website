import React, { useState } from 'react';
import classes from './Contact.module.css';
import http from '../../api';
import Swal from 'sweetalert2';
import { contactValidation } from '../../helper/validate';

import { Button, Input, Textarea } from '../common';
import {
	FaLocationArrow,
	FaEnvelope,
	FaMobileAlt,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
} from 'react-icons/fa';

const Contact = () => {
	const [contact, setContact] = useState({
		name: '',
		email: '',
		phoneNo: '',
		message: '',
	});
	const [error, setError] = useState({})

	const { name, email, phoneNo, message } = contact;

	const onChangeHandler = (e) => {
		const {name, value} = e.target;
		setContact({
			...contact,
			[name]: value,
		});
		const errorObj = contactValidation[name](value);
		setError((prev)=>{
			return {...prev, ...errorObj}
		})
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		 let submitable = true;
		 Object.values(error).forEach((err)=>{
			if(err != false){
				submitable = false;
				return ;
			}
		 })
 
	if(submitable){
		try {
			http.post('/contact/createContact', contact).then(
				() => {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Your query is sent to us.',
						showConfirmButton: false,
						timer: 1500,
					});
				},
				(error) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: error,
					});
				}
			);
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error,
			});
		}
		setContact({
			name: '',
			email: '',
			phoneNo: '',
			message: '',
		});
	 }else{
			alert("Enter Valid Values in all Fields.")
			
		}
	
	};

	return (
		<>
			<div className={classes.container}>
				<div className={classes.form}>
					<div className={classes.contact_info}>
						<h3 className={classes.title}>We would love to hear from you ! 	</h3>
						<p className={classes.text}>
						Whether you’re curious about GrabBit, have any doubts, want to do any kind of sponsorships - we’re ready to answer all of your queries. 
						</p>
						<div className={classes.info}>
							<div className={classes.information}>
								<FaMobileAlt className={classes.icon} />
								<p>8177854760</p>
							</div>
							<div className={classes.information}>
								<FaEnvelope className={classes.icon} />
								<p>grabbitofficial1@gmail.com</p>
							</div>
							<div className={classes.information}>
								<FaLocationArrow className={classes.icon} />
								<p>Pune, Maharashtra</p>
							</div>
						</div>

						<div className={classes.social_media}>
							<p>Connect with us : </p>
							<div className={classes.social_icons}>
								<a href="https://www.instagram.com/grabbits_/" target="blank">
									<FaInstagram />
								</a>
								<a
									href="https://www.linkedin.com/company/grabbits/"
									target="blank"
								>
									<FaLinkedinIn />
								</a>
								<a href="https://twitter.com/grabbits_" target="blank">
									<FaTwitter />
								</a>
							</div>
						</div>
					</div>

					<div className={classes.contact_form}>
						<span className={`${classes.circle} ${classes.one}`}></span>
						<span className={`${classes.circle} ${classes.two}`}></span>

						<form onSubmit={submitHandler}>
							<h3 className={classes.title}>Contact Us</h3>
							<Input
								onChange={onChangeHandler}
								type="text"
								value={name}
								label="Name"
								name="name"
								required
							/>
							{error.name? <p className={classes.error}>{error.name}</p> : null}
							<Input
								onChange={onChangeHandler}
								type="text"
								value={email}
								label="Email"
								name="email"
								required
							/>
								{error.email? <p className={classes.error}>{error.email}</p> : null}
							<Input
								onChange={onChangeHandler}
								type="text"
								value={phoneNo}
								label="Mobile Number"
								name="phoneNo"
								required
							/>
								{error.phoneNo? <p className={classes.error}>{error.phoneNo}</p> : null}
							<Textarea
								onChange={onChangeHandler}
								type="text"
								value={message}
								label="Your Message"
								name="message"
								required
							/>
								{error.message? <p className={classes.error}>{error.message}</p> : null}
							<div className={classes.button}>
								<Button
									padding="8px 24px"
									fontSize="18px"
									label="Send"
									bgColor="#7541C8"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;
