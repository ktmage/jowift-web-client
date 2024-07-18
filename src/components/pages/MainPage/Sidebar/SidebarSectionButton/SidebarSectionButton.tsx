type SidebarSectionButtonProps = {
	onClick: () => void;
	label: string;
	icon: React.ReactNode;
};

export default function SidebarSectionButton(props: SidebarSectionButtonProps) {
	return (
		<li className='max-w-full'>
			<div
				onClick={props.onClick}
				className='flex items-center gap-2 h-8 max-w-full'
			>
				{props.icon}
				<span className='truncate'>{props.label}</span>
			</div>
		</li>
	);
}
