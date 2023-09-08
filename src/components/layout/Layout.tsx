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
  Typography,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { routes } from '../../router';
import { useState } from 'react';

function Layout() {
  const [bottomNavValue, setBottomNavValue] = useState(0);

  return (
    <Box sx={{ pb: 7 }}>
      <AppBar component="nav" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SimpleScale
            </Typography>
            <Stack direction="row" spacing={2}>
              {routes.map((item, index) => (
                <MUILink
                  component={Link}
                  key={index}
                  sx={{ color: 'inherit' }}
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
        <Outlet />
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
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(_, newValue: number) => setBottomNavValue(newValue)}
        >
          {routes.map((page, index) => {
            return (
              <BottomNavigationAction
                key={index}
                label={page.label}
                component={Link}
                to={page.path}
                icon={page.icon}
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Layout;
