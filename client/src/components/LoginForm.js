// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";

const Login = (props) => {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await login({
				variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			email: "",
			password: "",
		});
	};

	return (
		<>
			<Form noValidate validated={validated} onSubmit={handleFormSubmit}>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger"
				>
					Something went wrong with your login credentials!
				</Alert>
				<Form.Group>
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Your email"
						name="email"
						onChange={handleChange}
						value={formState.email}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Email is required!
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Your password"
						name="password"
						onChange={handleChange}
						value={formState.password}
						required
					/>
					<Form.Control.Feedback type="invalid">
						Password is required!
					</Form.Control.Feedback>
				</Form.Group>
				<Button
					disabled={!(userFormData.email && userFormData.password)}
					type="submit"
					variant="success"
				>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default Login;
