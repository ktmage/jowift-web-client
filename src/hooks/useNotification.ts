import { NotificationContext } from '@/providers/NotificationProvider';
import { useContext } from 'react';

export default function useNotification() {
	return useContext(NotificationContext);
}
