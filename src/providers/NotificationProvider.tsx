import clsx from 'clsx';
import { createContext, ReactNode, useEffect, useState } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

interface Notification {
	severity: 'success' | 'info' | 'warning' | 'error';
	message?: string;
}

interface NotificationContextProps {
	dispatchNotification: (notification: Notification) => void;
}

export const NotificationContext = createContext({} as NotificationContextProps);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	const dispatchNotification = (notification: Notification) => {
		setNotifications([...notifications, notification]);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setNotifications(notifications.slice(1));
		}, 3000);
		return () => clearTimeout(timer);
	}, [notifications]);

	return (
		<NotificationContext.Provider value={{ dispatchNotification }}>
			<div className='fixed bottom-0 left-0 z-50 w-full p-1 flex flex-col items-end gap-2'>
				{notifications.map((notification: Notification, index: number) => (
					<div
						role='alert'
						className={clsx('alert rounded-md w-fit py-3 px-4', {
							'alert-success': notification.severity === 'success',
							'alert-info': notification.severity === 'info',
							'alert-warning': notification.severity === 'warning',
							'alert-error': notification.severity === 'error',
						})}
						key={index}
					>
						{notification.severity === 'success' && <InfoIcon />}
						{notification.severity === 'info' && <CheckCircleIcon />}
						{notification.severity === 'warning' && <WarningIcon />}
						{notification.severity === 'error' && <ErrorIcon />}
						<span>
							{notification.message ? notification.message : notification.severity}
						</span>
					</div>
				))}
			</div>
			{children}
		</NotificationContext.Provider>
	);
};
