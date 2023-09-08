/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Box, Button, Link, Tab, Tabs, Typography } from '@mui/material';
import { download, generateCsv } from 'export-to-csv';
import { useCallback, useEffect, useState } from 'react';

import { Entry } from '../../data/appData';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FormDialog from '../shared/FormDialog';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { papaParsePromise } from '../../util/parseUtil';
import { useEntriesProvider } from '../../data/entries/entriesContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

function EntriesCsvDialog({ open, onClose }: Props) {
  const [tabValue, setTabValue] = useState(0);
  return (
    <FormDialog open={open} onClose={onClose} title="Import/Export Entries">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          aria-label="import/export tabs"
        >
          <Tab label="Import" value={0} />
          <Tab label="Export" value={1} />
        </Tabs>
      </Box>
      {tabValue === 0 && <ImportTab />}
      {tabValue === 1 && <ExportTab />}
    </FormDialog>
  );
}

export default EntriesCsvDialog;

const ImportTab = () => {
  const { entries, update } = useEntriesProvider();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [errorText, setErrorText] = useState<string | undefined>(undefined);
  const [resultText, setResultText] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResultText(undefined);
  }, []);

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = (event.target.files ?? [])[0];
      if (file) {
        setUploadedFile(file);
      }
    },
    [],
  );

  const handleImportClick = useCallback(async () => {
    setErrorText(undefined);
    setResultText(undefined);
    setLoading(true);
    const validEntries = await uploadAndParseEntries(uploadedFile);
    if (!validEntries) {
      setErrorText(
        'Please enter a valid .csv file using the provided template',
      );
    } else {
      await update([...entries, ...validEntries]);
      setResultText(`Uploaded ${validEntries.length} entries`);
    }
    setLoading(false);
  }, [entries, update, uploadedFile]);

  return (
    <Box sx={{ my: 2 }}>
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Import entries using{' '}
          <Link href="/entryUploadTemplate.csv" download>
            this
          </Link>{' '}
          template.
        </Typography>
        <ul>
          <li>
            <Typography variant="body2" color="text.secondary">
              {`Timestamp should be a string formatted as "MM/DD/YYYY" i.e. "${dayjs().format(
                'MM/DD/YYYY',
              )}"`}
            </Typography>
          </li>
          <li>
            <Typography variant="body2" color="text.secondary">
              {`Unit should be "lbs" for now. Additional units may be supported in the future`}
            </Typography>
          </li>
        </ul>
        <Box sx={{ my: 2 }}>
          <input type="file" onChange={handleFileInputChange} accept=".csv" />
        </Box>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleImportClick}
          startIcon={<FileUploadIcon />}
          disabled={!uploadedFile}
          loading={loading}
        >
          Import
        </LoadingButton>
      </Box>
      {!!errorText && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="error">
            {errorText}
          </Typography>
        </Box>
      )}
      {!!resultText && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption">{resultText}</Typography>
        </Box>
      )}
    </Box>
  );
};

const ExportTab = () => {
  const { entries } = useEntriesProvider();
  const [resultText, setResultText] = useState<string | undefined>(undefined);

  useEffect(() => {
    setResultText(undefined);
  }, []);

  const handleExportClick = useCallback(() => {
    setResultText(undefined);
    const config = { useKeysAsHeaders: true };
    const unidentified = entries.map(entry => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = entry;
      return rest;
    });
    const csv = generateCsv(config)(unidentified as any);
    download(config)(csv);
    setResultText(`Downloaded ${entries.length} entries`);
  }, [entries]);

  return (
    <Box sx={{ my: 2 }}>
      <Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Download all entries to a .csv file
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportClick}
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
      </Box>
      {!!resultText && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption">{resultText}</Typography>
        </Box>
      )}
    </Box>
  );
};

const uploadAndParseEntries = async (
  file?: File,
): Promise<Entry[] | undefined> => {
  if (!file) {
    return undefined;
  }

  try {
    const result = await papaParsePromise(file);
    if (
      !result.data ||
      result.data.length === 0 ||
      !entriesAreValid(result.data)
    ) {
      return undefined;
    }

    return result.data.map(d => ({
      ...(d as Entry),
      id: nanoid(),
    }));
  } catch (error) {
    return undefined;
  }
};

const entriesAreValid = (input: unknown[]): boolean =>
  input.every(element => {
    if (typeof element !== 'object') {
      return false;
    }

    const timestamp = (element as Record<string, string>)['timestamp'];
    if (typeof timestamp !== 'string' || !dayjs(timestamp).isValid()) {
      return false;
    }

    const value = Number((element as Record<string, number>)['value']);
    if (typeof value !== 'number') {
      return false;
    }

    const unit = (element as Record<string, string>)['unit'];
    if (typeof unit !== 'string' || !['lbs'].includes(unit)) {
      return false;
    }

    return true;
  });
