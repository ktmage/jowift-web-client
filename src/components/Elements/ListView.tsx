interface ListViewItem {
	text: string;
	to: string;
}

interface ListViewProps {
	items: ListViewItem[];
}

export default function ListView(props: ListViewProps) {
	return (
		<li>
			{props.items.map((item) => (
				<div key={item.text}>{item.text}</div>
			))}
		</li>
	);
}
