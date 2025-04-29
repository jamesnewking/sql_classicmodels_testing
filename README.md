# SQL DATABASE AUTOMATION TESTING
## WITH MYSQL2, JEST IN JS
### Author: James W

### Inspired by [Youtube: Database Testing](https://youtu.be/Q3SnLBVWOGI?si=XKMNL_8QwzJkUPL7)

### Setup Database Environment
#### Download classic models test database from: [classic models](https://www.mysqltutorial.org/getting-started-with-mysql/mysql-sample-database/)

#### Import data to MYSQL Database
> CREATE DATABASE classicmodels;
```
In DBeaver, go to SQL Editor, Import SQL Script, Select the downloaded .sql file
Run the script, it will create the tables, and populated them with sample data for testing

* If there was errors running the entire SQL Script in DBeaver, try running it one command at a time
-or-
* Use MySQL Workbench
```

### Running Tests
> npm run test

