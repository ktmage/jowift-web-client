import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Divider,
	Modal,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { FormLayout } from '../Layouts';
// import { useAuth, useDeleteUser, useProfile } from '@/hooks';
import { useDeleteUser, useProfile, useLogout } from '@/hooks';
import { useState } from 'react';

export default function AccountForm() {
	const { profile, isLoading } = useProfile();
	const { deleteUser } = useDeleteUser();
	const { logout } = useLogout();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
					<Typography variant='body1'>ユーザー名: {profile?.name}</Typography>
					<Typography variant='body1'>メールアドレス: {profile?.email}</Typography>
					<Typography variant='body1'>アカウントタイプ: {profile?.authMethod}</Typography>
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
						ログアウト
					</Button>

					<Button
						variant='outlined'
						color='error'
						onClick={handleOpen}
					>
						アカウントを削除
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '100vh',
							width: '100vw',
						}}
					>
						<Paper
							sx={{
								display: 'flex',
								gap: 2,
								flexDirection: 'column',
								alignItems: 'center',
								width: '50%',
								bgcolor: 'background.paper',
								p: 2,
							}}
						>
							<Typography variant='h6'>本当にアカウントを削除しますか？</Typography>
							<Box
								display={'flex'}
								gap={2}
							>
								<Button
									variant='outlined'
									color='error'
									onClick={() => deleteUser()}
								>
									削除
								</Button>
								<Button
									variant='outlined'
									onClick={handleClose}
								>
									キャンセル
								</Button>
							</Box>
						</Paper>
					</Modal>
				</Stack>
			</FormLayout>
		</>
	);
}
