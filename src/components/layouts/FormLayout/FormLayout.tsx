import { useResponsive } from '@/hooks';
import IconButton from '@/components/ui/IconButton/IconButton';
import clsx from 'clsx';

type headerItems = {
	icon: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
};

type FormLayoutProps = {
	children: React.ReactNode;
	headerItems: {
		right: headerItems[];
		left: headerItems[];
	};
	disableHeader?: boolean;
};

export default function FormLayout(props: FormLayoutProps) {
	const { children, disableHeader = false, headerItems } = props;
	const { isDesktop, isTablet } = useResponsive();

	return (
		<div className='flex flex-col h-full bg-base-100'>
			<div className='flex flex-row justify-between'>
				<div
					className={clsx('flex flex-row px-2 py-1 space-x-1', { hidden: disableHeader })}
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
				</div>
				<div
					className={clsx('flex flex-row px-2 py-1 space-x-1', { hidden: disableHeader })}
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
				</div>
			</div>

			<div
				className={clsx(
					'flex flex-col space-y-10',
					'py-20 flex-grow overflow-y-auto',
					isDesktop ? 'px-[15%]' : isTablet ? 'px-[10%]' : 'px-[5%]',
				)}
			>
				{children}
			</div>
		</div>
	);
}
