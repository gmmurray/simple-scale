import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { getDiffInfo, sortEntries } from '../data/appData';

import { Fragment } from 'react';
import dayjs from 'dayjs';
import { roundToOneDecimal } from '../util/mathUtil';
import { useEntriesProvider } from '../data/entries/entriesContext';

function EntriesPage() {
  const { entries, selectEntry, toggleCsvDialog } = useEntriesProvider();

  const visibleEntries = sortEntries(entries);

  return (
    <Fragment>
      <Box>
        <Button variant="outlined" onClick={toggleCsvDialog}>
          Import/Export
        </Button>
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
          const diffInfo = getDiffInfo(entry, visibleEntries[index + 1]);
          return (
            <ListItem
              key={entry.id}
              divider={index !== visibleEntries.length - 1}
              disablePadding
            >
              <ListItemButton onClick={() => selectEntry(entry)}>
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
                        label={`${diffInfo.diff} ${entry.unit}`}
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
