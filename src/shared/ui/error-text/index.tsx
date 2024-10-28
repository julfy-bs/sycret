import { grey, red } from '@mui/material/colors';
import { styled } from '@mui/system';
import { ReactElement } from 'react';

type ErrorTextProps = {
	message?: string;
};

export function ErrorText({ message }: ErrorTextProps): ReactElement {
	const Error = styled('span')(
		({ theme }) => `
		box-sizing: border-box;
		width: 100%;
		min-height: 16px;
		max-height: 16px;
		height: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-family: 'IBM Plex Sans', sans-serif;
		font-size: 12px;
		font-weight: 400;
		margin-top: 3px;
		line-height: 1;
		padding: 1px 12px;
		border-radius: 8px;
		color: ${message && message?.length > 0 ? red[400] : 'transparent'};
		background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
	`
	);

	return <Error>{message}</Error>;
}
