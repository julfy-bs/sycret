import { createBrowserRouter, Navigate } from 'react-router-dom';
import { FormPage } from '../../pages/form-page';
import { OrderPageProps } from '../../pages/order-page';
import { SelectPage } from '../../pages/select-page';
import { loader as SelectLoader } from '../../pages/select-page/loader.ts';
import { basename } from '../../shared/constants/basename.ts';
import { Layout } from '../layouts/Layout.tsx';
import { ROUTES } from './config.ts';

export const router = createBrowserRouter(
	[
		{
			index: true,
			element: <Navigate to={ROUTES.CERTIFICATES.BASE} />,
		},
		{
			id: 'certificate',
			path: ROUTES.CERTIFICATES.BASE,
			element: <Layout />,
			loader: SelectLoader,
			children: [
				{
					path: ROUTES.CERTIFICATES.SELECT.BASE,
					element: <SelectPage />,
				},
				{
					path: ROUTES.CERTIFICATES.BUY.BASE,
					element: <FormPage />,
				},
				{
					path: ROUTES.CERTIFICATES.PAY.BASE,
					element: <OrderPageProps />,
				},
			],
		},
		{
			path: '*',
			element: <h1>error</h1>,
		},
	],
	{ basename }
);
