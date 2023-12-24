import { Box, IconButton, Stack } from '@mui/material';

interface headerItems {
	icon: React.ReactNode;
	onClick: () => void;
}

interface FormLayoutProps {
	children: React.ReactNode;
	headerItems: headerItems[];
	disableHeader?: boolean;
}

export default function FormLayout(props: FormLayoutProps) {
	const { children, disableHeader = false, headerItems } = props;

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
			>
				{headerItems.map((item, index) => (
					<IconButton
						key={index}
						onClick={item.onClick}
					>
						{item.icon}
					</IconButton>
				))}
			</Stack>

			<Stack
				spacing={4}
				paddingX={'15%'}
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
