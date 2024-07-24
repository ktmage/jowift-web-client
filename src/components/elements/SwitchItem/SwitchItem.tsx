interface SwitchItemProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SwitchItem(props: SwitchItemProps) {
	return (
		<div className='form-control'>
			<label className='label cursor-pointer'>
				<span className='label-text'>{props.label}</span>
				<input
					type='checkbox'
					className='toggle'
					checked={props.checked}
					onChange={props.onChange}
				/>
			</label>
		</div>
	);
}
