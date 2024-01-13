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

	const { themeConfig, languageConfig, isHappinessConfig } = useSetting();

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
				<SelectItem
					id='theme'
					label='Theme'
					value={themeConfig.value}
					onChange={(e) => themeConfig.setValue(e.target.value as 'light' | 'dark')}
					SelectValues={themeConfig.options}
				/>
				<SelectItem
					id='language'
					label='Language'
					value={languageConfig.value}
					onChange={(e) => languageConfig.setValue(e.target.value as 'en' | 'jp')}
					SelectValues={languageConfig.options}
				/>
				<SwitchItem
					id='isHappiness'
					label='Happiness'
					checked={isHappinessConfig.value}
					onChange={(e) => isHappinessConfig.setValue(e.target.checked)}
				/>
			</FormLayout>
		</>
	);
}
