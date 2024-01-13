import { SettingContext } from '@/providers/SettingProvider';
import { useContext } from 'react';

export default function useSetting() {
	return useContext(SettingContext);
}
