import { useResponsive } from '@/hooks';
import { Box, ButtonBase } from '@mui/material';
import { useState } from 'react';

interface SidebarDetailLayoutProps {
	sidebar: React.ReactNode;
	children: React.ReactNode;
}

export default function SidebarDetailLayout(props: SidebarDetailLayoutProps) {
	const { isMobile, isTablet } = useResponsive();
	const [isListOpen, setIsListOpen] = useState<boolean>(true);
	const toggleListOpen = () => setIsListOpen(!isListOpen);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				height: isMobile ? '100%' : isTablet ? '100%' : '100vh',
			}}
		>
			<Box
				sx={{
					width: '30%',
					display: isListOpen ? 'block' : 'none',
				}}
			>
				{props.sidebar}
			</Box>
			<ButtonBase
				sx={{
					height: '100%',
					width: '20px',
					bgcolor: 'divider',
				}}
				onClick={toggleListOpen}
			/>

			<Box
				sx={{
					flexGrow: 1,
				}}
			>
				{props.children}
			</Box>
		</Box>
	);
}
