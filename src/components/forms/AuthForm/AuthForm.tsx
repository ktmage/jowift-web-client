import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { API_URL } from '@/config';
import { useLogin } from '@/hooks';

export default function AuthForm() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<LoginForm />
		</Box>
	);
}

const LoginForm = () => {
	// const [email] = useState('');
	// const [password] = useState('');

	// const { login } = useLogin(email, password, {
	//     onSuccess: () => {
	//         navigate('/app/note');
	//     }
	// });

	const { login: guestLogin } = useLogin('guest1@email.com', 'Rp8tNQmh', {
		onSuccess: () => {
			window.location.reload();
		},
	});

	return (
		<>
			<Stack
				px={2}
				display={'flex'}
				flexDirection={'column'}
				height={'100%'}
				spacing={2}
			>
				<Box
					display={'flex'}
					flexDirection={'column'}
					alignItems={'center'}
					justifyContent={'center'}
					height={'150px'}
				>
					<img
						src='jowift.webp'
						alt='Next.js E-Commerce'
						style={{ width: 100, height: 100, margin: '0 auto' }}
					/>
					<Typography
						variant='h5'
						align='center'
					>
						Welcome to Jowift
					</Typography>
				</Box>
				<Divider />
				<Stack
					spacing={2}
					mt={'auto'}
					flexGrow={1}
				>
					<Button
						variant='contained'
						disableElevation
						startIcon={<GoogleIcon />}
						onClick={() => {
							window.location.href = API_URL + '/auth/google';
						}}
					>
						Googleで続行
					</Button>
					<Button
						variant='outlined'
						startIcon={<AccountBoxIcon />}
						onClick={guestLogin}
					>
						ゲストとして続行
					</Button>
				</Stack>
			</Stack>
		</>
	);
};
