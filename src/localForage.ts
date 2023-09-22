import localforage from 'localforage';
import { merge } from 'merge-anything';

const datastore = localforage.createInstance({
  name: 'simple-scale',
});

export default datastore;

export async function loadWithDefault<TData>(
  key: string,
  defaultValue: TData,
): Promise<TData> {
  const result = await datastore.getItem<TData>(key);

  return result ? (merge(defaultValue, result) as TData) : defaultValue;
}
