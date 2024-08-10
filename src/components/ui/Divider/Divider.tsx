type DividerProps = {
	isHorizontal?: boolean;
	orientation?: 'horizontal' | 'vertical';
	text?: string;
	className?: string;
};

export default function Divider(props: DividerProps) {
	return (
		<div
			className={`
        flex items-center
        ${props.isHorizontal ? 'w-full' : 'h-full flex-col'}
        ${props.className}
        `}
		>
			<div
				className={`
            flex-grow border-accent
            ${props.isHorizontal ? 'border-t' : 'border-l'}
        `}
			></div>
			{props.text && (
				<span
					className={`
            px-3 text-accent text-sm
            ${props.isHorizontal ? 'mx-4' : 'my-4 transform -rotate-90'}
            `}
				>
					{props.text}
				</span>
			)}
			<div
				className={`
            flex-grow border-accent
            ${props.isHorizontal ? 'border-t' : 'border-l'}
        `}
			></div>
		</div>
	);
}
