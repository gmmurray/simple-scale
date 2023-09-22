import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Link as MUILink,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  getDiffInfo,
  getOverallWeightGoal,
  isAtOrPastWeightGoal,
  sortEntries,
} from '../data/appData';

import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { roundToOneDecimal } from '../util/mathUtil';
import { useEntriesProvider } from '../data/entries/entriesContext';
import { useSettingsProvider } from '../data/settings/settingsContext';

function EntriesPage() {
  const { settings } = useSettingsProvider();
  const { entries, selectEntry, toggleCsvDialog } = useEntriesProvider();

  const visibleEntries = sortEntries(entries);
  const overallWeightGoal = getOverallWeightGoal(settings);
  const firstGoalEntry = sortEntries(entries, 'asc').find(entry =>
    isAtOrPastWeightGoal(entry, settings),
  );

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'end' }}>
        <Button variant="outlined" onClick={toggleCsvDialog}>
          Import/Export
        </Button>
        {settings.goals.weight && (
          <MUILink
            variant="body1"
            color="text.secondary"
            sx={{ ml: 'auto' }}
            component={Link}
            to="/settings#goals-weight"
          >
            {`Goal Weight: ${settings.goals.weight.end} ${settings.goals.weight.unit}`}
          </MUILink>
        )}
      </Box>
      <List>
        <ListItem divider>
          <Grid
            container
            spacing={1}
            sx={{ color: 'text.secondary', textAlign: 'center' }}
          >
            <Grid item xs={3}>
              <Typography variant="overline">Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Weight</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="overline">Change</Typography>
            </Grid>
          </Grid>
        </ListItem>
        {visibleEntries.map((entry, index) => {
          const diffInfo = getDiffInfo(
            entry,
            visibleEntries[index + 1],
            overallWeightGoal,
          );
          return (
            <ListItem
              key={entry.id}
              divider={index !== visibleEntries.length - 1}
              disablePadding
            >
              <ListItemButton
                onClick={() => selectEntry(entry)}
                selected={firstGoalEntry && firstGoalEntry.id === entry.id}
              >
                <Grid
                  container
                  spacing={1}
                  sx={{ textAlign: 'center', alignItems: 'center' }}
                >
                  <Grid item xs={3}>
                    <Tooltip
                      title={dayjs(entry.timestamp).toDate().toLocaleString()}
                    >
                      <span>
                        {dayjs(entry.timestamp).toDate().toLocaleDateString()}
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    {`${roundToOneDecimal(entry.value)} ${entry.unit}`}
                  </Grid>
                  {!!diffInfo && (
                    <Grid item xs={3}>
                      <Chip
                        label={`${
                          diffInfo.diff > 0
                            ? `+${diffInfo.diff}`
                            : diffInfo.diff
                        } ${entry.unit}`}
                        color={diffInfo.desirable ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </Grid>
                  )}
                </Grid>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
}

export default EntriesPage;
