import { FormLayout } from '@/components/layouts';
import { useDeleteUser, useProfile, useLogout } from '@/hooks';
import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function AccountPage() {
	const { toggleSplitRatio } = useOutletContext<{ toggleSplitRatio: () => void }>();

	const { profile, isLoading } = useProfile();
	const { deleteUser } = useDeleteUser({ onSuccess: () => window.location.reload() });
	const { logout } = useLogout({ onSuccess: () => window.location.reload() });

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Backdrop open={isLoading}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={{
					right: [],
					left: [
						{
							icon: <DehazeIcon />,
							onClick: () => toggleSplitRatio(),
						},
					],
				}}
			>
				<div className='flex flex-col space-y-2 p-4'>
					<h2 className='text-xl font-semibold'>アカウント情報</h2>
					<p>ユーザー名: {profile?.name}</p>
					<p>メールアドレス: {profile?.email}</p>
					<p>アカウントタイプ: {profile?.authMethod}</p>
				</div>
				<div className='divider'></div>
				<div className='flex justify-end space-x-2 p-4'>
					<button
						className='btn btn-outline'
						onClick={logout}
					>
						ログアウト
					</button>
					<button
						className='btn btn-outline btn-error'
						onClick={handleOpen}
					>
						アカウントを削除
					</button>
				</div>
				{open && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-base-100 p-6 rounded-lg shadow-xl w-1/2 flex flex-col items-center space-y-4'>
							<h3 className='text-lg font-semibold'>
								本当にアカウントを削除しますか？
							</h3>
							<div className='flex space-x-4'>
								<button
									className='btn btn-outline btn-error'
									onClick={deleteUser}
								>
									削除
								</button>
								<button
									className='btn btn-outline'
									onClick={handleClose}
								>
									キャンセル
								</button>
							</div>
						</div>
					</div>
				)}
			</FormLayout>
		</>
	);
}
