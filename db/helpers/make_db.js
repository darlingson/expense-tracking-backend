const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db/expenses.db');
// db.run('DROP TABLE IF EXISTS expenses');
db.run('CREATE TABLE expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount REAL, category TEXT, date TEXT, note TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,user_id TEXT)');
db.close();
