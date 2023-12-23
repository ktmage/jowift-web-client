interface ListViewItem {
	text: string;
	to: string;
}

interface ListViewProps {
	items: ListViewItem[];
}

export default function ListView(props: ListViewProps) {
	return (
		<ul>
			{props.items.map((item) => (
				<li key={item.text}>{item.text}</li>
			))}
		</ul>
	);
}
