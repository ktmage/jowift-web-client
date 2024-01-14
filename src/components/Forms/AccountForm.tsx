import { Backdrop, Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { FormLayout } from '../Layouts';
import { useAuth, useDeleteUser, useUser } from '@/hooks';

export default function AccountForm() {
	const { data, isLoading } = useUser();
	const { deleteUser } = useDeleteUser();
	const { logout } = useAuth();

	return (
		<>
			<Backdrop open={isLoading}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				disableHeader
				headerItems={[]}
			>
				<Stack
					spacing={2}
					direction='column'
					padding={2}
				>
					<Typography variant='h6'>アカウント情報</Typography>
					<Typography variant='body1'>ユーザー名: {data?.name}</Typography>
					<Typography variant='body1'>メールアドレス: {data?.email}</Typography>
				</Stack>
				<Divider />
				<Stack
					spacing={2}
					direction='row-reverse'
				>
					<Button
						variant='outlined'
						onClick={() => logout()}
					>
						Logout
					</Button>
					<Button
						variant='outlined'
						color='error'
						onClick={() => deleteUser()}
					>
						Delete
					</Button>
				</Stack>
			</FormLayout>
		</>
	);
}
