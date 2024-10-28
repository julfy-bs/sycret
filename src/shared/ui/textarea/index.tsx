import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { blue, grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { ErrorText } from '../error-text';
import { PlaceholderText } from '../placeholder-text';
import styles from './style.module.scss';

type TextareaProps = {
	minRows: number;
	name: string;
	placeholder: string;
	ariaName: string;
	ariaInvalid: boolean;
	errorMessage?: FieldError;
	value: string;
	props?: {
		[key: string]: any;
	};
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Textarea = forwardRef(
	(
		{
			minRows,
			name,
			ariaName,
			placeholder,
			props,
			errorMessage,
			ariaInvalid,
			value,
			onChange,
		}: TextareaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		const Textarea = styled(BaseTextareaAutosize)(
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
		border: 1px solid ${
			errorMessage?.message && errorMessage?.message?.length > 0
				? 'red'
				: theme.palette.mode === 'dark'
					? grey[700]
					: grey[200]
		};
		box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
		resize: none;
		
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

		return (
			<label className={styles.label}>
				<PlaceholderText id={'label'} title={ariaName} />
				<Textarea
					ref={ref}
					name={name}
					aria-labelledby={'label'}
					minRows={minRows}
					placeholder={placeholder}
					aria-errormessage={errorMessage?.message}
					aria-invalid={ariaInvalid}
					{...props}
					onChange={onChange}
					value={value}
				/>
				<ErrorText message={errorMessage?.message} />
			</label>
		);
	}
);
