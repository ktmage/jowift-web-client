import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type SidebarSectionProps = {
	label: string;
	icon: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

export default function SidebarSection(props: SidebarSectionProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='overflow-y-hidden flex flex-col'>
			<div
				className='flex items-center justify-between cursor-pointer p-2'
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className='flex items-center gap-2 font-bold h-8 px-1 '>
					{props.icon}
					<span>{props.label}</span>
				</div>
				{isOpen ? (
					<ExpandLessIcon className='w-5 h-5 text-gray-600' />
				) : (
					<ExpandMoreIcon className='w-5 h-5 text-gray-600' />
				)}
			</div>
			{isOpen && (
				<div className='overflow-y-auto'>
					<ul className='menu gap-1'>{props.children}</ul>
				</div>
			)}
		</div>
	);
}
