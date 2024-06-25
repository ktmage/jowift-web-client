import { useResponsive } from '@/hooks';
// import { Box, IconButton, Stack } from '@mui/material';
import { Box, Stack } from '@mui/material';
import IconButton from '@/components/ui/IconButton/IconButton';

interface headerItems {
	icon: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

interface FormLayoutProps {
	children: React.ReactNode;
	headerItems: headerItems[];
	disableHeader?: boolean;
}

export default function FormLayout(props: FormLayoutProps) {
	const { children, disableHeader = false, headerItems } = props;
	const { isDesktop, isTablet } = useResponsive();

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			height={'100%'}
			bgcolor={'background.paper'}
		>
			<Stack
				display={disableHeader ? 'none' : 'flex'}
				direction={'row'}
				justifyContent={'flex-end'}
				paddingX={2}
				paddingY={1}
				spacing={1}
			>
				{headerItems.map((item, index) => (
					<IconButton
						key={index}
						size='small'
						variant='ghost'
						onClick={item.onClick}
						disabled={item.disabled}
					>
						{item.icon}
					</IconButton>
				))}
			</Stack>

			<Stack
				spacing={4}
				paddingX={isDesktop ? '15%' : isTablet ? '10%' : '5%'}
				paddingY={8}
				flexGrow={1}
				sx={{
					overflowY: 'auto',
				}}
			>
				{children}
			</Stack>
		</Box>
	);
}
