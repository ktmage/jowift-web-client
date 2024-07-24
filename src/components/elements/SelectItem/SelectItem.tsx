interface SelectItemProps {
	id: string;
	label: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	selectValues: string[];
}

export default function SelectItem(props: SelectItemProps) {
	return (
		<div className='form-control'>
			<label className='label'>
				<span className='label-text'>{props.label}</span>
				<select
					className='select select-bordered w-full max-w-xs'
					id={props.id}
					onChange={(e) => props.onChange(e)}
					value={props.value}
				>
					{props.selectValues.map((value: string, index: number) => (
						<option
							key={index}
							value={value}
						>
							{value}
						</option>
					))}
				</select>
			</label>
		</div>
	);
}
