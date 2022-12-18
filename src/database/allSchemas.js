import Realm from 'realm';

export const ITEMS_SCHEMA = 'ITEMS_SCHEMA';

export const ItemsSchema = {
  name: ITEMS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    creationDate: {type: 'date', default: new Date()},
    done: {type: 'bool', default: false},
    title: {type: 'string', default: ''},
    location: {type: 'string', default: ''},
    deadline: {type: 'date', default: new Date()},
    repeating: {type: 'bool', default: false},
  },
};

const databaseOptions = {
  path: 'default.realm',
  schema: [ItemsSchema],
  schemaVersion: 1,
};

export const insertNewItem = newItem =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(ITEMS_SCHEMA, newItem);
          resolve(newItem.uniqueID);
        });
      })
      .catch(error => reject(error));
  });

export const queryAllItems = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allItems = realm.objects(ITEMS_SCHEMA);
          resolve(allItems);
        });
      })
      .catch(error => reject(error));
  });

export const deleteItem = itemId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingItem = realm.objectForPrimaryKey(ITEMS_SCHEMA, itemId);
          realm.delete(deletingItem);
          resolve('deleted');
        });
      })
      .catch(error => reject('deleting error: ', error));
  });

export const updateItem = item =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let oldItem = realm.objectForPrimaryKey(ITEMS_SCHEMA, item.id);
          oldItem.done = item.done;
          oldItem.title = item.title;
          oldItem.deadline = item.deadline;
          oldItem.repeating = item.repeating;
          oldItem.location = item.location;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteAllItems = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allItems = realm.objects(ITEMS_SCHEMA);
          realm.delete(allItems);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
