import { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';

export function App(): ReactElement {
	return <RouterProvider router={router} />;
}
