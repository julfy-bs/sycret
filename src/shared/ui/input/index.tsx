import { Input as BaseInput } from '@mui/base/Input';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';
import { ErrorText } from '../error-text';
import { PlaceholderText } from '../placeholder-text';
import styles from '../textarea/style.module.scss';

const Input = forwardRef(
	(
		props: InputHTMLAttributes<HTMLInputElement>,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
	}
);

type UnstyledInputProps = {
	placeholder: string;
	name: string;
	ariaName: string;
	errorMessage?: FieldError;
	type: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	ariaInvalid: boolean;
	props?: InputHTMLAttributes<HTMLInputElement>;
};

export const UnstyledInputIntroduction = forwardRef(
	(
		{
			placeholder,
			props,
			ariaName,
			errorMessage,
			name,
			type,
			value,
			ariaInvalid,
			onChange,
		}: UnstyledInputProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<label className={styles.label}>
				<PlaceholderText id={'label'} title={ariaName} />
				<Input
					ref={ref}
					name={name}
					type={type}
					aria-errormessage={errorMessage?.message}
					aria-invalid={ariaInvalid}
					aria-labelledby={'label'}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					{...props}
				/>
				<ErrorText message={errorMessage?.message} />
			</label>
		);
	}
);

const InputElement = styled('input')(
	({ theme }) => `
	box-sizing: border-box;
	width: 100%;
	font-family: 'IBM Plex Sans', sans-serif;
	font-size: 0.875rem;
	font-weight: 400;
	line-height: 1.5;
	padding: 8px 12px;
	border-radius: 8px;
	color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
	background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
	box-shadow: 0px 2px 4px ${
		theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
	};

	&:hover {
		border-color: ${blue[400]};
	}

	&:focus {
		border-color: ${blue[400]};
		box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
	}

	// firefox
	&:focus-visible {
		outline: 0;
	}
`
);
