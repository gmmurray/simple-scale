import localforage from 'localforage';

const datastore = localforage.createInstance({
  name: 'simple-scale',
});

export default datastore;

export async function loadWithDefault<TData>(
  key: string,
  defaultValue: TData,
): Promise<TData> {
  const result = await datastore.getItem<TData>(key);

  return result ?? defaultValue;
}
