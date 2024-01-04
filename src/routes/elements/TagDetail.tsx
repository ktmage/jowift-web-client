import { Navigate, useParams } from 'react-router-dom';
import { TagLayout } from '@/components/Layouts';
import { TagDetailForm } from '@/components/Forms';

export default function TagDetail() {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <Navigate to='/app/tag' />;
	}

	return (
		<TagLayout>
			<TagDetailForm id={id ? id : ''} />
		</TagLayout>
	);
}
