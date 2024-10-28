import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes/config';

const pages = [
	{
		id: 0,
		link: ROUTES.CERTIFICATES.SELECT.BASE,
		title: 'Выбрать сертификат',
	},
	{
		id: 1,
		link: ROUTES.CERTIFICATES.BUY.BASE,
		title: 'Провести оплату',
	},
];

export function Header(): ReactElement {
	const navigate = useNavigate();
	const location = useLocation();

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = (): void => {
		setAnchorElNav(null);
	};

	const navigatePage = (to: string): void => {
		navigate(to);
	};

	return (
		<AppBar position="static" color={'default'} component={'header'}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages.map((page) => (
								<MenuItem key={page.id}>
									<Button
										aria-label={`Перейти на страницу ${page.title}`}
										onClick={() => navigatePage(page.link)}
										sx={{ my: 2, color: 'black', display: 'block' }}
										disabled={location.pathname.includes(page.link)}
									>
										<Typography sx={{ textAlign: 'center' }}>
											{page.title}
										</Typography>
									</Button>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'center',
							gap: '2rem',
							padding: '16px',
						}}
					>
						{pages.map((page) => (
							<Button
								aria-label={`Перейти на страницу ${page.title}`}
								key={page.id}
								onClick={() => navigatePage(page.link)}
								sx={{
									my: 2,
									color: 'black',
									display: 'block',
									padding: '8px 16px',
									margin: 0,
								}}
								disabled={location.pathname.includes(page.link)}
							>
								<Typography sx={{ textAlign: 'center' }}>
									{page.title}
								</Typography>
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
