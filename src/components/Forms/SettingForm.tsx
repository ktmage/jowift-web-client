import {
	Backdrop,
	CircularProgress,
	FormControlLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
} from '@mui/material';
import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import { useSetting } from '@/hooks';

export default function SettingForm() {
	interface SwitchItemProps {
		id: string;
		label: string;
		checked: boolean;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	}

	const SwitchItem = (props: SwitchItemProps) => (
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

	interface SelectItemProps {
		id: string;
		label: string;
		value: string;
		onChange: (event: SelectChangeEvent<string>) => void;
		SelectValues: string[];
	}

	const SelectItem = (props: SelectItemProps) => (
		<FormControlLabel
			control={
				<Select
					name={props.id}
					color='primary'
					value={props.value}
					onChange={props.onChange}
				>
					{props.SelectValues.map((value: string, index: number) => (
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

	const { theme, language, notification, updateSettings } = useSetting();

	return (
		<>
			<Backdrop open={false}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => console.log('save'),
					},
				]}
			>
				<SwitchItem
					id='darkMode'
					label='Enable notifications'
					checked={notification.enabled}
					onChange={(e) =>
						updateSettings({ notification: { enabled: e.target.checked } })
					}
				/>

				<SelectItem
					id='theme'
					label='Theme'
					value={theme.selected}
					onChange={(e) =>
						updateSettings({
							theme: {
								selected: e.target.value,
								options: theme.options,
								default: theme.default,
							},
						})
					}
					SelectValues={theme.options}
				/>

				<SelectItem
					id='language'
					label='Language'
					value={language.selected}
					onChange={(e) =>
						updateSettings({
							language: {
								selected: e.target.value,
								options: language.options,
								default: language.default,
							},
						})
					}
					SelectValues={language.options}
				/>
			</FormLayout>
		</>
	);
}
