import { useAuth } from '@/hooks';
import { Box, Button, Stack, Tab, Tabs, TextField } from '@mui/material';
import { useState } from 'react';

export default function AuthForm() {
	const [value, setValue] = useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<Tabs
				value={value}
				onChange={handleChange}
			>
				<Tab
					label='Login'
					value={0}
				/>
				<Tab
					label='Signup'
					value={1}
				/>
			</Tabs>
			<Box flexGrow={1}>
				{value === 0 && <LoginForm />}
				{value === 1 && <SignUpForm />}
			</Box>
		</Box>
	);
}

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useAuth();
	const handleClick = () => {
		login(email, password);
	};

	return (
		<>
			<Box
				px={2}
				display={'flex'}
				flexDirection={'column'}
				height={'100%'}
			>
				<Stack
					spacing={2}
					py={4}
					flexGrow={1}
				>
					<TextField
						type='email'
						label='Email'
						variant='outlined'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						type='password'
						label='Password'
						variant='outlined'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Stack>
				<Stack
					direction={'row-reverse'}
					spacing={2}
				>
					<Button
						variant='contained'
						disableElevation
						onClick={handleClick}
					>
						Login
					</Button>
				</Stack>
			</Box>
		</>
	);
};

const SignUpForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { signUp } = useAuth();
	const handleClick = () => {
		signUp(name, email, password);
	};

	return (
		<>
			<Box
				px={2}
				display={'flex'}
				flexDirection={'column'}
				height={'100%'}
			>
				<Stack
					spacing={2}
					py={4}
					flexGrow={1}
				>
					<TextField
						type='text'
						label='Name'
						variant='outlined'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						type='email'
						label='Email'
						variant='outlined'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						type='password'
						label='Password'
						variant='outlined'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Stack>
				<Stack
					direction={'row-reverse'}
					spacing={2}
				>
					<Button
						variant='contained'
						disableElevation
						onClick={handleClick}
					>
						Signup
					</Button>
				</Stack>
			</Box>
		</>
	);
};