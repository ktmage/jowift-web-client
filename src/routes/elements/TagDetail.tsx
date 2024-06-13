import { Navigate, useParams } from 'react-router-dom';
import { TagLayout } from '@/components/layouts';
import { TagDetailForm } from '@/components/forms';

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
