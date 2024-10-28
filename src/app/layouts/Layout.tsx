import Container from '@mui/material/Container';
import { clsx } from 'clsx';
import { ReactElement, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../widgets/footer';
import { Header } from '../../widgets/header';
import { ROUTES } from '../routes/config.ts';
import styles from './style.module.scss';

type LayoutProps = {};

export function Layout({}: LayoutProps): ReactElement {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			!location.pathname.includes(ROUTES.CERTIFICATES.SELECT.BASE) &&
			!location.pathname.includes(ROUTES.CERTIFICATES.BUY.BASE) &&
			!location.pathname.includes(ROUTES.CERTIFICATES.PAY.BASE)
		) {
			navigate(ROUTES.CERTIFICATES.SELECT.BASE, { replace: true });
		}
	}, [navigate, location]);

	return (
		<div className={clsx(styles.page)}>
			<Header />
			<main className={clsx(styles.bg_image)}>
				<Container
					aria-label={
						'Молодая девушка с волнистыми короткими волосами в желтой футболке и белых брюках и солнцезащитных очках позирует на фоне розового круга. В руках девушка держит три коробки разного размера. Подразумевается, что внутри коробок находятся подарки.'
					}
					role={'img'}
					maxWidth="xl"
					sx={{
						flex: '1 0 auto',
					}}
				>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</div>
	);
}
