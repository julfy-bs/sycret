import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormEvent, ReactElement, useCallback, useEffect } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ROUTES } from '../../app/routes/config.ts';
import {
	loadCertificates,
	setCurrentCertificate,
} from '../../app/store/features/certificates/certificatesSlice.ts';
import { CertificateResponse } from '../../shared/api/settings.ts';
import { Certificate } from '../../shared/types/certificate.ts';
import { UIButton } from '../../shared/ui/button';
import { UISelect } from '../../shared/ui/select';
import styles from './style.module.scss';

type SelectPageProps = {};

export function SelectPage({}: SelectPageProps): ReactElement {
	const navigate = useNavigate();
	const certificatesState = useAppSelector((state) => state.certificates);
	const dispatch = useAppDispatch();
	const certificatesData = useRouteLoaderData(
		'certificate'
	) as CertificateResponse<Certificate>;

	useEffect(() => {
		if (certificatesData.data) {
			dispatch(loadCertificates(certificatesData.data));
		}
	}, [certificatesData]);

	const handleSelectChange = useCallback(
		(currentCertificate: Certificate) => {
			if (currentCertificate) {
				dispatch(setCurrentCertificate(currentCertificate));
			}
		},
		[dispatch]
	);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (certificatesState.current?.SUMMA) {
				navigate({
					pathname: `/${ROUTES.CERTIFICATES.BASE}/${ROUTES.CERTIFICATES.BUY.BASE}`,
				});
			}
		},
		[navigate, certificatesState.current?.SUMMA]
	);

	return (
		<>
			{!certificatesState.certificates ? (
				<CircularProgress />
			) : (
				<Box
					component="section"
					sx={{
						p: 2,
						zIndex: 1,
						backgroundColor: 'white',
						borderRadius: '10px',
						margin: '24px auto 0',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						maxWidth: '600px',
					}}
				>
					<form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
						<UISelect
							id={'select'}
							items={certificatesState.certificates}
							label={'Выберите сертификат'}
							labelId={'certificate'}
							current={
								certificatesState.current ? certificatesState.current : null
							}
							onChange={handleSelectChange}
						/>
						<Box className={styles.form_footer}>
							{certificatesState.current?.SUMMA && (
								<Box className={styles.form_price}>
									<Typography
										sx={{
											textAlign: 'left',
											fontWeight: 800,
										}}
									>
										Стоимость:
									</Typography>
									<Typography sx={{ textAlign: 'center' }}>
										{certificatesState.current?.SUMMA} рублей
									</Typography>
								</Box>
							)}
							<UIButton
								type={'submit'}
								value={'Оформить'}
								className={styles.submit}
							/>
						</Box>
					</form>
				</Box>
			)}
		</>
	);
}
