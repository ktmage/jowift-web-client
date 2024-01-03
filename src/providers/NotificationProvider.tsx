import { Alert, Stack } from '@mui/material';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface Notification {
	severity: 'success' | 'info' | 'warning' | 'error';
	message: string;
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
			<Stack
				position={'fixed'}
				bottom={0}
				left={0}
				zIndex={999}
				width={'100%'}
				padding={1}
				spacing={1}
				alignItems={'end'}
			>
				{notifications.map((notification: Notification, index: number) => (
					<Alert
						severity={notification.severity}
						key={index}
						elevation={6}
					>
						{notification.message}
					</Alert>
				))}
			</Stack>
			{children}
		</NotificationContext.Provider>
	);
};
