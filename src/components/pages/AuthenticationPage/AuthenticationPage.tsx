import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GoogleIcon from '@mui/icons-material/Google';
import { API_URL } from '@/config';
import { useLogin } from '@/hooks';
import { LogoSvg } from '@/components/ui';

export default function AuthenticationPage() {
	const { login: guestLogin } = useLogin('guest1@email.com', 'Rp8tNQmh', {
		onSuccess: () => {
			window.location.reload();
		},
	});

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='card rounded-md max-w-sm bg-base-100 shadow-xl'>
				<div className='card-body items-center text-center'>
					<LogoSvg
						style={{ width: '8rem', height: '8rem', marginBottom: '1rem' }}
						color='rgba(0,0,0,0.6)'
					/>
					<h2 className='card-title text-2xl font-bold mb-6'>Jowift</h2>
					<div className='w-full space-y-4'>
						<button
							className='btn btn-primary w-full'
							onClick={() => {
								window.location.href = API_URL + '/auth/google';
							}}
						>
							<GoogleIcon className='mr-2' />
							Continue with Google
						</button>
						<button
							className='btn btn-outline w-full'
							onClick={guestLogin}
						>
							<AccountBoxIcon className='mr-2' />
							Continue as Guest
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
