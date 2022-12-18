import Realm from 'realm';

export const ITEMS_SCHEMA = 'ITEMS_SCHEMA';

export const ItemsSchema = {
  name: ITEMS_SCHEMA,
  primaryKey: 'id',
  properties: {},
};

const databaseOptions = {
  path: 'default.realm',
  schema: [ItemsSchema],
  schemaVersion: 1,
};

export default new Realm(databaseOptions);
