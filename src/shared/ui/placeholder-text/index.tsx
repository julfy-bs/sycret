import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';
import { ReactElement } from 'react';

type PlaceholderTextProps = {
	id: string;
	title: string;
};

export function PlaceholderText({
	id,
	title,
}: PlaceholderTextProps): ReactElement {
	const Placeholder = styled('span')(
		({ theme }) => `
		box-sizing: border-box;
		width: 100%;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		padding: 8px 12px;
		border-radius: 8px;
		color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};;
		background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	`
	);

	return <Placeholder id={id}>{title}</Placeholder>;
}
