import { Link } from 'react-router-dom';

type SidebarSectionLinkProps = {
	to: string;
	label: string;
	icon: React.ReactNode;
};

export default function SidebarSectionLink(props: SidebarSectionLinkProps) {
	return (
		<li className='max-w-full'>
			<Link
				to={props.to}
				className='flex items-center gap-2 h-8 max-w-full'
			>
				{props.icon}
				<span className='truncate'>{props.label}</span>
			</Link>
		</li>
	);
}
