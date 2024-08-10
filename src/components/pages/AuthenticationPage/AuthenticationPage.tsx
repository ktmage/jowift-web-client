import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GoogleIcon from '@mui/icons-material/Google';
import { API_URL } from '@/config';
import { useLogin, useSettings } from '@/hooks';
import { Divider } from '@/components/ui';
import TextLogoSvg from '@/components/icons/TextLogoSvg/TextLogoSvg';
import IconButton from '@/components/ui/IconButton/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function AuthenticationPage() {
	const { login: guestLogin } = useLogin('guest1@email.com', 'Rp8tNQmh', {
		onSuccess: () => {
			window.location.reload();
		},
	});

	const { themeConfig } = useSettings();

	return (
		<div className='min-h-screen max-h-screen flex'>
			<IconButton
				className='absolute top-2 left-4'
				variant='ghost'
				onClick={() =>
					themeConfig.setValue(themeConfig.value === 'light' ? 'dark' : 'light')
				}
			>
				{themeConfig.value === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
			</IconButton>
			<div className='flex-grow flex items-center justify-center p-8'>
				<div>
					<div className='w-full space-y-4'>
						<div className='flex items-center justify-center flex-col mb-4'>
							{/* fill-accentが効かない */}
							<TextLogoSvg
								className={`h-12 w-auto ${themeConfig.value === 'light' ? 'fill-black' : 'fill-white'}`}
							/>
							<p className='text-xl font-bold'>Jot it down, move on up</p>
						</div>
						<button
							className='btn btn-primary w-full font-normal'
							onClick={() => {
								window.location.href = API_URL + '/auth/google';
							}}
						>
							<GoogleIcon className='mr-2' />
							Googleアカウントで続行
						</button>
						<Divider
							isHorizontal
							text='optionally'
						/>
						<button
							className='btn btn-sm btn-outline w-full font-normal'
							onClick={guestLogin}
						>
							<AccountBoxIcon className='mr-2' />
							ゲストとして続行
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
