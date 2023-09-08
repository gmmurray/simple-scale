import BarChartIcon from '@mui/icons-material/BarChart';
import EntriesPage from './pages/EntriesPage';
import ErrorPage from './pages/ErrorPage';
import HomeIcon from '@mui/icons-material/Home';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import ListIcon from '@mui/icons-material/List';
import StatsPage from './pages/StatsPage';
import { createBrowserRouter } from 'react-router-dom';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeIcon />,
    element: <Layout />,
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
    element: <Layout />,
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
    element: <Layout />,
    children: [
      {
        path: '',
        element: <StatsPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
