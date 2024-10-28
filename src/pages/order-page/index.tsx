import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { clsx } from 'clsx';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ROUTES } from '../../app/routes/config.ts';
import { UIButton } from '../../shared/ui/button';
import styles from '../../widgets/buy-form/style.module.scss';

type OrderPageProps = {};

export function OrderPageProps({}: OrderPageProps): ReactElement {
	const navigate = useNavigate();
	const orderId = useAppSelector((state) => state.certificates.orderId);

	const handleHistory = () => {
		navigate(`/${ROUTES.CERTIFICATES.BASE}/${ROUTES.CERTIFICATES.SELECT.BASE}`);
	};

	return (
		<Box
			component="section"
			sx={{
				p: 2,
				zIndex: 1,
				boxSizing: 'border-box',
				backgroundColor: 'white',
				borderRadius: '10px',
				margin: '24px auto 0',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				maxWidth: '600px',
			}}
		>
			{!orderId ? (
				<>
					<Typography
						sx={{
							margin: 0,
							textAlign: 'center',
							fontWeight: 800,
						}}
					>
						Не удалось создать заказ, попробуйте еще раз.
					</Typography>
					<UIButton
						value={'Назад'}
						isColorGreen={true}
						type={'button'}
						className={clsx(styles.back_center)}
						onClick={() => handleHistory()}
					/>
				</>
			) : (
				<>
					<Typography
						sx={{
							margin: 0,
							textAlign: 'center',
							fontWeight: 800,
						}}
					>
						Заглушка оплаты заказа с ID - {orderId}
					</Typography>
				</>
			)}
		</Box>
	);
}
