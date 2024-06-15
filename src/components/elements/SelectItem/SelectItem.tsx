import { FormControlLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SelectItemProps {
	id: string;
	label: string;
	value: string;
	onChange: (event: SelectChangeEvent<string>) => void;
	selectValues: string[];
}

export default function SelectItem(props: SelectItemProps) {
	return (
		<FormControlLabel
			control={
				<Select
					name={props.id}
					color='primary'
					value={props.value}
					onChange={props.onChange}
				>
					{props.selectValues.map((value: string, index: number) => (
						<MenuItem
							key={index}
							value={value}
						>
							{value}
						</MenuItem>
					))}
				</Select>
			}
			label={props.label}
			labelPlacement='start'
			sx={{
				width: '100%',
				justifyContent: 'space-between',
			}}
		/>
	);
}
