// Purpose: To provide test data for the tests
const dbTables = JSON.parse(JSON.stringify(require('./dbtables.json')));
const customersColumnName = JSON.parse(JSON.stringify(require('./customersColumnName.json')));
const customersColumnProperties = JSON.parse(JSON.stringify(require('./customersColumnProperties.json')));

module.exports = {
    dbTables, customersColumnName, customersColumnProperties
};