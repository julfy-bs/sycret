import Button from '@mui/material/Button';
import { ReactElement } from 'react';

type ButtonProps = {
	value: string;
	disabled?: boolean;
	isColorGreen?: boolean;
	type: string;
	onClick?: () => void;
	className?: string;
};

export function UIButton({
	value,
	disabled = false,
	isColorGreen = false,
	type,
	onClick,
	className,
}: ButtonProps): ReactElement {
	return (
		<>
			{/* @ts-ignore strange error with attributes */}
			<Button
				variant="contained"
				color={isColorGreen ? 'success' : 'primary'}
				type={type}
				className={className}
				disabled={disabled}
				onClick={onClick}
			>
				{value}
			</Button>
		</>
	);
}
