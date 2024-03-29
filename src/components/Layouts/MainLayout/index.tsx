import { Box } from '@mui/material';
import { useResponsive } from '@/hooks';
import NavigationPanel from './NavigationPanel';

interface MainLayoutProps {
	children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
	const { isMobile, isTablet } = useResponsive();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column-reverse' : isTablet ? 'column-reverse' : 'row',
				Height: '100vh',
				Width: '100vw',
			}}
		>
			<Box
				height={isMobile ? '60px' : isTablet ? '60px' : '100vh'}
				width={isMobile ? '100vw' : isTablet ? '100vw' : '80px'}
				borderTop={isMobile ? 1 : isTablet ? 1 : 0}
				borderRight={isMobile ? 0 : isTablet ? 0 : 1}
				borderColor={'divider'}
			>
				<NavigationPanel />
			</Box>
			<Box
				flexGrow={1}
				height={
					isMobile
						? 'calc(100vh - (60px + 0px))'
						: isTablet
							? 'calc(100vh - (60px + 0px))'
							: '100vh'
				}
			>
				{props.children}
			</Box>
		</Box>
	);
}
