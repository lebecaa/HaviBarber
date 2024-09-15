// setupDatabase.js
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre um banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Cria uma tabela se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL,
        data TEXT NOT NULL,
        horario TEXT NOT NULL,
        servico TEXT NOT NULL,
        preco REAL NOT NULL
    )`);
});

db.close();
