import BarChartIcon from '@mui/icons-material/BarChart';
import EntriesPage from './pages/EntriesPage';
import ErrorPage from './pages/ErrorPage';
import HomeIcon from '@mui/icons-material/Home';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsPage from './pages/SettingsPage';
import StatsPage from './pages/StatsPage';
import { createBrowserRouter } from 'react-router-dom';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeIcon />,
    element: <Layout pageTitle="Simple Scale" />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    label: 'Entries',
    path: '/entries',
    icon: <ListIcon />,
    element: <Layout pageTitle="Entries" />,
    children: [
      {
        path: '',
        element: <EntriesPage />,
      },
    ],
  },
  {
    label: 'Stats',
    path: '/stats',
    icon: <BarChartIcon />,
    element: <Layout pageTitle="Stats" />,
    children: [
      {
        path: '',
        element: <StatsPage />,
      },
    ],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
    element: <Layout pageTitle="Settings" />,
    children: [
      {
        path: '',
        element: <SettingsPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
