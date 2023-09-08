import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import AnnualEntiresSparkline from '../components/entries/charts/AnnualEntiresSparkline';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import RecentEntries from '../components/entries/RecentEntries';
import { useEntriesProvider } from '../data/entries/entriesContext';

function HomePage() {
  const { entries } = useEntriesProvider();
  return (
    <Fragment>
      <PageHeader title="SimpleScale" />
      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid item xs={6}>
          <Card sx={{ minHeight: '150px', height: '100%' }}>
            <CardActionArea
              sx={{ height: '100%' }}
              component={Link}
              to="/entries"
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'primary.dark',
                }}
              >
                <Typography variant="h6">Entries</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ minHeight: '150px', height: '100%' }}>
            <CardActionArea
              sx={{ height: '100%' }}
              component={Link}
              to="/stats"
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'secondary.dark',
                }}
              >
                <Typography variant="h6">Stats</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {entries.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <AnnualEntiresSparkline />
              </CardContent>
            </Card>
          </Grid>
        )}
        {entries.length > 0 && (
          <Grid item xs={12} md>
            <Card sx={{ minHeight: '150px', height: '100%' }}>
              <CardContent>
                <RecentEntries />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
}
export default HomePage;
