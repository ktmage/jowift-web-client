type BackdropProps = {
	open: boolean;
	children: React.ReactNode;
};

export default function Backdrop(props: BackdropProps) {
	return (
		<div className={`fixed inset-0 z-50 ${props.open ? 'block' : 'hidden'}`}>
			{props.open && (
				<div className='flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
					{props.children}
				</div>
			)}
		</div>
	);
}
