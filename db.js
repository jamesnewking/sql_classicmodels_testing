const mysql = require('mysql2/promise');
const { dbConfig } = require('./constants/config');

const connect = async () => {
    const conn = await mysql.createConnection(dbConfig);
    return conn;
}

const disconnect = async (connection) => {       
  if (connection) {
    try {
      await connection.end();
      console.log('Connection closed');
    }
    catch (error) {
      console.log('Error closing connection:', error);
    }
  } else {
    console.log('No connection to close');
  }
}

module.exports = { connect, disconnect };