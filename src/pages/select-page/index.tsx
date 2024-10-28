import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
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
import { SelectForm } from '../../widgets/select-form';

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
					<SelectForm
						certificates={certificatesState.certificates}
						currentCertificate={certificatesState.current}
						handleSubmit={handleSubmit}
						handleSelectChange={handleSelectChange}
					/>
				</Box>
			)}
		</>
	);
}
