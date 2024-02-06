import { useResponsive } from '@/hooks';
import { Box, Paper } from '@mui/material';

interface WindowLayoutProps {
	children: React.ReactNode;
}

export default function WindowLayout(props: WindowLayoutProps) {
	const { isDesktop } = useResponsive();

	return (
		<Box
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
					width: isDesktop ? '500px' : '90%',
					bgcolor: 'background.paper',
					p: 2,
				}}
			>
				{props.children}
			</Paper>
		</Box>
	);
}
