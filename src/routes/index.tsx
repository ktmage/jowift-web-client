import { useRoutes } from 'react-router-dom';
import protectedRoutes from './protected';
// import publicRoutes from './public';

export default function AppRoutes() {
	const routes = useRoutes(protectedRoutes);
	// const routes = useRoutes(publicRoutes);
	return <>{routes}</>;
}
