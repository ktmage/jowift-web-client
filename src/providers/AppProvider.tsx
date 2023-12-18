interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return <>{props.children}</>;
}
