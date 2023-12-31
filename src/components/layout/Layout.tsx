import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Link as MUILink,
  Paper,
  Stack,
  Toolbar,
} from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import PageHeader from './PageHeader';
import ScrollTopButton from './ScrollTopButton';
import { routes } from '../../router';
import { useEffect } from 'react';

type Props = {
  pageTitle: string;
};

function Layout({ pageTitle }: Props) {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <Box sx={{ pb: 7 }}>
      <AppBar component="nav" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img src="/icon_transparent.png" height="40" />
            </Box>
            <Stack direction="row" spacing={2}>
              {routes.map((item, index) => (
                <MUILink
                  component={NavLink}
                  key={index}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&.active': {
                      color: theme => theme.palette.primary.light,
                    },
                  }}
                  to={item.path}
                >
                  {item.label}
                </MUILink>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{ display: { xs: 'none', sm: 'block' } }} />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <PageHeader title={pageTitle} />
        <Outlet />
        <ScrollTopButton />
      </Container>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <BottomNavigation showLabels sx={{ height: '70px' }}>
          {routes.map((page, index) => {
            return (
              <BottomNavigationAction
                key={index}
                label={page.label}
                component={NavLink}
                to={page.path}
                icon={page.icon}
                sx={{
                  '&.active': {
                    color: theme => theme.palette.primary.main,
                  },
                }}
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Layout;
