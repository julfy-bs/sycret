import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

type FooterProps = {};

export function Footer({}: FooterProps): ReactElement {
	return (
		<AppBar
			position="static"
			color={'default'}
			component={'footer'}
			sx={{
				flexShrink: 0,
				padding: '16px',
			}}
		>
			<Container maxWidth="xl">
				<Box
					sx={{
						flexGrow: 1,
						display: { xs: 'none', md: 'flex' },
						justifyContent: 'center',
						gap: '2rem',
					}}
				>
					<Typography sx={{ textAlign: 'center' }}>
						&copy; Сутужко Богдан, 2024
					</Typography>
				</Box>
			</Container>
		</AppBar>
	);
}
