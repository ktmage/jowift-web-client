import { useAuth } from '@/hooks';
import { Box, Button, Divider, Stack, Tab, Tabs, TextField } from '@mui/material';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { API_URL } from '@/config';

export default function AuthForm() {
	const [value, setValue] = useState(0);
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
					py={2}
					spacing={2}
				>
					<Stack
						spacing={2}
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
							ログイン
						</Button>
					</Stack>
				</Stack>
				<Divider />
				<Stack
					spacing={2}
					py={2}
					flexGrow={1}
				>
					<Button
						variant='outlined'
						startIcon={<GoogleIcon />}
						onClick={() => {
							window.location.href = API_URL + '/auth/google';
						}}
					>
						Googleでログイン
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
					py={2}
					spacing={2}
				>
					<Stack
						spacing={2}
						flexGrow={1}
					>
						<TextField
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
							新規登録
						</Button>
					</Stack>
				</Stack>
				<Divider />
				<Stack
					spacing={2}
					py={2}
					flexGrow={1}
				>
					<Button
						variant='outlined'
						startIcon={<GoogleIcon />}
						onClick={() => {
							window.location.href = API_URL + '/auth/google';
						}}
					>
						Googleで登録
					</Button>
				</Stack>
			</Box>
		</>
	);
};
