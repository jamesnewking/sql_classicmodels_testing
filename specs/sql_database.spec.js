const db = require('../helper/db.js');
const { dbConfig } = require('../constants/config.js');
const { dbTables, customersColumnName, customersColumnProperties } = require('../test-data/testData.js');
let connection;

describe('SQL Database Tests', () => {
    beforeAll(async () => {
        connection = await db.connect(connection);
    });
    
    afterAll(async () => {
        // await db.disconnect(connection); // not sure why this would not work
        await connection.end();          
        console.log(`Finished all tests`);
    });
    
    test('Schema - connect to the database', async () => {    
        expect(connection).toBeDefined();
        console.log(`Connected to the database`);
    }
    );

    test('Schema - database name', async () => {
        const [rows] = await connection.query('SELECT DATABASE() AS db_name');
        expect(rows[0].db_name).toBe(dbConfig.database);
        // console.log(`Database name: ${rows[0].db_name}`);
    }
    );

    test('Schema - database version', async () => {    
        const [rows] = await connection.query('SELECT VERSION() AS version');
        expect(rows[0].version).toBeDefined();
        // console.log(`Database version: ${rows[0].version}`);
    });

    test('Schema - database tables', async () => {    
        const [tables] = await connection.query('SHOW tables;');
        // console.table(tables);
        const tablesTitleName = `Tables_in_${dbConfig.database}`;
        const tablesArray = tables.map((obj) => obj[tablesTitleName])
        expect(tablesArray).toEqual(dbTables);
    });

    test(`Schema - number of columns of customers is: ${customersColumnName.length}`, async () => {    
        const numberOfColumns = await connection.query(`SELECT COUNT(*) AS numberOfColumns FROM information_schema.columns WHERE table_name = "customers" AND TABLE_SCHEMA = "${dbConfig.database}";`);
        expect(numberOfColumns[0][0].numberOfColumns).toBe(customersColumnName.length);
        // console.log(`Number of columns in customers table: ${numberOfColumns[0][0].numberOfColumns}`);
    });

    test('Schema - column names of customers table', async () => {    
        const columnNames = await connection.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "customers" AND TABLE_SCHEMA = "${dbConfig.database}" ORDER BY COLUMN_NAME ASC;`);
        const columnNamesArray = []
        for(const name of columnNames[0]) {
            columnNamesArray.push(name.COLUMN_NAME);
        }
        expect(columnNamesArray).toEqual(customersColumnName);
    });

    test('Schema - different properties of columns customers table', async () => {    
        const columnNamesProperties = await connection.query(`SELECT COLUMN_NAME, data_type, column_type, is_nullable, column_key FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = "customers" AND TABLE_SCHEMA = "${dbConfig.database}" ORDER BY COLUMN_NAME ASC;`);
        expect(columnNamesProperties[0]).toEqual(customersColumnProperties);
        // console.table(columnNamesProperties[0]);
        // const columnNamesArrayJson = JSON.parse(JSON.stringify(columnNamesProperties[0]));
        // console.log(columnNamesArrayJson);
    });

});
