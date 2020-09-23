import SQLite from 'react-native-sqlite-storage';

export default class SQLiteWrapper {
    db;

    constructor(dbName) {
        this.setup(dbName);
    }
    setup(dbName) {
        this.db = SQLite.openDatabase({name: dbName + ".sqlite"});
    }
    queryPromise(query,data = []) {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(query,data,(tx, results) => {
                    resolve(results);
                });
            })
        });
    }
}