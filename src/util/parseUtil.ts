import { ParseResult, parse } from 'papaparse';

export const papaParsePromise = (file: File): Promise<ParseResult<unknown>> =>
  new Promise((resolve, reject) => {
    parse(file, {
      header: true,
      complete: function (results) {
        resolve(results);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
