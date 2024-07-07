import { useResponsive } from '@/hooks';
import { Box, Stack } from '@mui/material';
import IconButton from '@/components/ui/IconButton/IconButton';

interface headerItems {
	icon: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

interface FormLayoutProps {
	children: React.ReactNode;
	headerItems: {
		right: headerItems[];
		left: headerItems[];
	};
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
			<Box
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
			>
				<Stack
					display={disableHeader ? 'none' : 'flex'}
					direction={'row'}
					justifyContent={'flex-end'}
					paddingX={2}
					paddingY={1}
					spacing={1}
				>
					{headerItems.left.map((item, index) => (
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
					display={disableHeader ? 'none' : 'flex'}
					direction={'row'}
					justifyContent={'flex-end'}
					paddingX={2}
					paddingY={1}
					spacing={1}
				>
					{headerItems.right.map((item, index) => (
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
			</Box>

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
