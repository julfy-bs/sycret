import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { clsx } from 'clsx';
import { ReactElement, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ROUTES } from '../../app/routes/config.ts';
import { setOrderId } from '../../app/store/features/certificates/certificatesSlice.ts';
import { API } from '../../shared/api/api.ts';
import { Inputs } from '../../shared/types/inputs.ts';
import { UIButton } from '../../shared/ui/button';
import { BuyForm } from '../../widgets/buy-form';
import styles from '../../widgets/buy-form/style.module.scss';

type FormPageProps = {};

export function FormPage({}: FormPageProps): ReactElement {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<Inputs>({
		name: '',
		phone: '',
		email: '',
		message: '',
	});

	const certificatesState = useAppSelector((state) => state.certificates);
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			if (certificatesState.current) {
				const response = await API.postCustomerInfo({
					ID: certificatesState.current.ID,
					TABLENAME: certificatesState.current.TABLENAME,
					SUMMA: certificatesState.current.SUMMA,
					PRIMARYKEY: certificatesState.current.PRIMARYKEY,
					PRICE: certificatesState.current.PRICE,
					...data,
				});
				if (response.data) {
					dispatch(setOrderId(response.data[0].CERTNUMBER));
					navigate(
						`/${ROUTES.CERTIFICATES.BASE}/${ROUTES.CERTIFICATES.PAY.BASE}`
					);
				}
				return response;
			}
		} catch (e) {
			throw Error('Ошибка при отправке данных');
		}
	};

	const handleHistory = () => {
		navigate(`/${ROUTES.CERTIFICATES.BASE}/${ROUTES.CERTIFICATES.SELECT.BASE}`);
	};

	return (
		<>
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
				{!certificatesState.certificates || !certificatesState.current ? (
					<>
						<Typography
							sx={{
								margin: 0,
								textAlign: 'center',
								fontWeight: 800,
							}}
						>
							Не выбран сертификат, вернитесь на страницу выбора сертификата.
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
							Выбран: {certificatesState.current?.NAME}
						</Typography>
						<BuyForm
							formValues={formData}
							onSubmit={onSubmit}
							setFormValues={setFormData}
						/>
					</>
				)}
			</Box>
		</>
	);
}
