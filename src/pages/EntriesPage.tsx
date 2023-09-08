import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Entry, getDiffInfo } from '../data/appData';
import { Fragment, useState } from 'react';

import PageHeader from '../components/layout/PageHeader';
import UpdateEntryDialog from '../components/entries/UpdateEntryDialog';
import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { useDataProvider } from '../data/dataContext';

function EntriesPage() {
  const {
    data: { entries },
  } = useDataProvider();
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>(
    undefined,
  );

  const visibleEntries = sort(entries).desc(e => e.timestamp);

  return (
    <Fragment>
      <PageHeader title="Entries" />
      <List>
        <ListItem divider>
          <Grid
            container
            spacing={1}
            sx={{ textAlign: 'center', color: 'text.secondary' }}
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
            >
              <ListItemButton onClick={() => setSelectedEntry(entry)}>
                <Grid container spacing={1} sx={{ textAlign: 'center' }}>
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
                    {`${entry.value} ${entry.unit}`}
                  </Grid>
                  {!!diffInfo && (
                    <Grid item xs={3}>
                      <Box
                        component="span"
                        sx={{
                          color: theme =>
                            theme.palette[
                              diffInfo.desirable ? 'success' : 'error'
                            ].main,
                        }}
                      >
                        {`${diffInfo.diff} ${entry.unit}`}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      {selectedEntry && (
        <UpdateEntryDialog
          open={!!selectedEntry}
          onClose={() => setSelectedEntry(undefined)}
          entry={selectedEntry}
        />
      )}
    </Fragment>
  );
}

export default EntriesPage;
