import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

import AnnualEntiresSparkline from '../components/entries/charts/AnnualEntiresSparkline';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import RecentEntries from '../components/entries/RecentEntries';
import { useEntriesProvider } from '../data/entries/entriesContext';
import { useSettingsProvider } from '../data/settings/settingsContext';

function HomePage() {
  const { settings } = useSettingsProvider();
  const { entries } = useEntriesProvider();
  return (
    <Fragment>
      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid item xs={6}>
          <Card sx={{ minHeight: '150px', height: '100%' }}>
            <CardActionArea
              sx={{ height: '100%' }}
              component={Link}
              to="/settings#goals-weight"
            >
              <CardContent
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'secondary.dark',
                  eight: '100%',
                }}
              >
                <Box>
                  <Typography variant="overline">Goal Weight</Typography>
                  <Typography variant="h6">
                    {settings.goals.weight?.end ?? '--'}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
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
                <Box>
                  <Typography variant="overline">View</Typography>
                  <Typography variant="h6">Entries</Typography>
                </Box>
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
