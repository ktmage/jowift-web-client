import { useResponsive, useSplitView } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@/components/ui/IconButton/IconButton';

interface ListHeaderItem {
	icon: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

export default function SidebarHeader() {
	const { isMobile } = useResponsive();

	const { toggleSplitRatio } = useSplitView();

	const navigate = useNavigate();

	const headerItems: ListHeaderItem[] = [
		{
			icon: <AddCircleIcon />,
			onClick: () => {
				navigate('/');
			},
			disabled: false,
		},
		{
			icon: <SearchIcon />,
			onClick: () => {},
			disabled: false,
		},
	];

	return (
		<div className='flex items-center justify-between py-2 px-4 border-b-2'>
			<div className='text-lg font-semibold'>Jowift</div>
			<div className='flex items-center space-x-2'>
				{headerItems?.map((item: ListHeaderItem, index: number) => (
					<IconButton
						key={index}
						onClick={item.onClick}
						disabled={item.disabled}
						variant='ghost'
						size='small'
					>
						{item.icon}
					</IconButton>
				))}
				{isMobile && (
					<IconButton
						onClick={toggleSplitRatio}
						variant='ghost'
						size='small'
					>
						<DehazeIcon />
					</IconButton>
				)}
			</div>
		</div>
	);
}
