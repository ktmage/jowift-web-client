import { FormControlLabel, Switch } from '@mui/material';

interface SwitchItemProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SwitchItem(props: SwitchItemProps) {
	return (
		<FormControlLabel
			control={
				<Switch
					checked={props.checked}
					onChange={props.onChange}
					name={props.id}
					color='primary'
				/>
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
