import Box from '@mui/material/Box';
import {
	ChangeEvent,
	Dispatch,
	ReactElement,
	SetStateAction,
	useCallback,
} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes/config.ts';
import { Inputs } from '../../shared/types/inputs.ts';
import { UIButton } from '../../shared/ui/button';
import { UnstyledInputIntroduction as Input } from '../../shared/ui/input';
import { Textarea } from '../../shared/ui/textarea';
import { VALIDATION_SCHEMA } from '../../shared/validation/schema.ts';
import styles from './style.module.scss';

type BuyFormProps = {
	onSubmit: (data: Inputs) => void;
	formValues: Inputs;
	setFormValues: Dispatch<SetStateAction<Inputs>>;
};

export function BuyForm({
	onSubmit,
	formValues,
	setFormValues,
}: BuyFormProps): ReactElement {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<Inputs>({
		defaultValues: formValues,
	});

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const name = e.target.name;
			const value = e.target.value;

			if (name && value) {
				setFormValues((prev: Inputs) => ({
					...prev,
					[name]: value,
				}));
				setValue(name as keyof Inputs, value);
			}
		},
		[setValue, setFormValues]
	);

	const handleHistory = useCallback(() => {
		navigate(`/${ROUTES.CERTIFICATES.BASE}/${ROUTES.CERTIFICATES.SELECT.BASE}`);
	}, [navigate]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Input
				{...register(
					VALIDATION_SCHEMA.name.fieldName,
					VALIDATION_SCHEMA.name.options
				)}
				ariaName={VALIDATION_SCHEMA.name.ariaName}
				placeholder={VALIDATION_SCHEMA.name.placeholder}
				ariaInvalid={!!errors.name}
				errorMessage={errors.name}
				name={VALIDATION_SCHEMA.name.fieldName}
				type={'text'}
				value={formValues.name}
				onChange={handleChange}
			/>
			<Input
				{...register(
					VALIDATION_SCHEMA.phone.fieldName,
					VALIDATION_SCHEMA.phone.options
				)}
				ariaName={VALIDATION_SCHEMA.phone.ariaName}
				placeholder={VALIDATION_SCHEMA.phone.placeholder}
				ariaInvalid={!!errors.phone}
				errorMessage={errors.phone}
				name={VALIDATION_SCHEMA.phone.fieldName}
				value={formValues.phone}
				type={'number'}
				onChange={handleChange}
			/>
			<Textarea
				{...register(
					VALIDATION_SCHEMA.message.fieldName,
					VALIDATION_SCHEMA.message.options
				)}
				ariaName={VALIDATION_SCHEMA.message.ariaName}
				minRows={3}
				placeholder={VALIDATION_SCHEMA.message.placeholder}
				ariaInvalid={!!errors.message}
				errorMessage={errors.message}
				name={VALIDATION_SCHEMA.message.fieldName}
				onChange={handleChange}
				value={formValues.message as string}
			/>
			<Input
				{...register(
					VALIDATION_SCHEMA.email.fieldName,
					VALIDATION_SCHEMA.email.options
				)}
				ariaName={VALIDATION_SCHEMA.email.ariaName}
				placeholder={VALIDATION_SCHEMA.email.placeholder}
				ariaInvalid={!!errors.email}
				errorMessage={errors.email}
				name={VALIDATION_SCHEMA.email.fieldName}
				type={'email'}
				value={formValues.email}
				onChange={(e) => handleChange(e)}
			/>
			<Box
				component="span"
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '16px',
				}}
			>
				<UIButton
					value={'Назад'}
					isColorGreen={true}
					type={'button'}
					className={styles.back}
					onClick={() => handleHistory()}
				/>
				<UIButton value={'Купить'} type={'submit'} className={styles.submit} />
			</Box>
		</form>
	);
}
