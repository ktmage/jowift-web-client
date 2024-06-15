import { useResponsive } from '@/hooks';
import { Box, Paper } from '@mui/material';

interface WindowLayoutProps {
	children: React.ReactNode;
}

export default function WindowLayout(props: WindowLayoutProps) {
	const { isMobile } = useResponsive();

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
					width: isMobile ? '90%' : '300px',
					bgcolor: 'background.paper',
					p: 2,
					py: 4,
				}}
			>
				{props.children}
			</Paper>
		</Box>
	);
}
