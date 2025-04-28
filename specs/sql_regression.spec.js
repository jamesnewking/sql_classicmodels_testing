const db = require('../db');
const { dbConfig } = require('../constants/config');
const { dbTables } = require('../test-data/testData.js');
let connection;

describe('SQL Regression Tests', () => {
    beforeAll(async () => {
        connection = await db.connect(connection);
    });
    
    afterAll(async () => {
        // await db.disconnect(connection); // not sure why this would not work
        await connection.end();          
        console.log(`Finished all tests`);
    });
    
    test('should connect to the database', async () => {    
        expect(connection).toBeDefined();
        console.log(`Connected to the database`);
    }
    );

    test('should return the database name', async () => {
        const [rows] = await connection.query('SELECT DATABASE() AS db_name');
        expect(rows[0].db_name).toBe(dbConfig.database);
        console.log(`Database name: ${rows[0].db_name}`);
    }
    );

    test('should return the database version', async () => {    
        const [rows] = await connection.query('SELECT VERSION() AS version');
        expect(rows[0].version).toBeDefined();
        console.log(`Database version: ${rows[0].version}`);
    });

    test('should return the database tables', async () => {    
        const [tables] = await connection.query('SHOW tables;');
        console.table(tables);
        const tablesTitleName = `Tables_in_${dbConfig.database}`;
        const tablesArray = tables.map((obj) => obj[tablesTitleName])
        expect(tablesArray).toEqual(dbTables);
    });

    xtest('should return all series', async () => {
        const [rows] = await connection.execute('SELECT * FROM series');
        expect(rows.length).toBeGreaterThan(0);
        console.table(rows);
    });
    
    xtest('should return a series by ID', async () => {
        const [rows] = await connection.query('SELECT * FROM series LIMIT ?;', [10]);
        console.table(rows);
        expect(rows.length).toBe(10);
        expect(rows[0].id).toBe(1);

        
    });
});
