import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormEvent, ReactElement } from 'react';
import styles from '../../pages/select-page/style.module.scss';
import { Certificate } from '../../shared/types/certificate.ts';
import { UIButton } from '../../shared/ui/button';
import { UISelect } from '../../shared/ui/select';

type SelectFormProps = {
	certificates: Certificate[];
	currentCertificate: Certificate | null;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	handleSelectChange: (currentCertificate: Certificate) => void;
};

export function SelectForm({
	certificates,
	currentCertificate,
	handleSubmit,
	handleSelectChange,
}: SelectFormProps): ReactElement {
	return (
		<form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
			<UISelect
				id={'select'}
				items={certificates}
				label={'Выберите сертификат'}
				labelId={'certificate'}
				current={currentCertificate ? currentCertificate : null}
				onChange={handleSelectChange}
			/>
			<Box className={styles.form_footer}>
				{currentCertificate && (
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
							{currentCertificate.SUMMA} рублей
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
	);
}
