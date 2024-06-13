import { Navigate, useParams } from 'react-router-dom';
import { NoteLayout } from '@/components/layouts';
import { NoteDetailForm } from '@/components/forms';

export default function NoteDetail() {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Navigate to='/app/note' />;
	}

	return (
		<NoteLayout>
			<NoteDetailForm id={id ? id : ''} />
		</NoteLayout>
	);
}
