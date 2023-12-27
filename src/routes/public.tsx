import { useAuth } from '@/hooks';
import { Link, Navigate, RouteObject } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
	return (
		<div>
			<Link to='/login'>Login</Link>
			<Link to='/signup'>Signup</Link>
		</div>
	);
};

const LoginForm = () => {
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		login(email, password);
	};

	return (
		<div>
			<input
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='Email'
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

const SignUpForm = () => {
	const { signUp } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = () => {
		signUp(name, email, password);
	};

	return (
		<div>
			<input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder='Name'
			/>
			<input
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='Email'
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<button onClick={handleSignup}>Signup</button>
		</div>
	);
};

const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <LoginForm />,
	},
	{
		path: '/signup',
		element: <SignUpForm />,
	},
	{
		path: '*',
		element: <Navigate to='/' />,
	},
];

export default publicRoutes;
