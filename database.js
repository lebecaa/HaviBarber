// database.js
const sqlite3 = require('sqlite3').verbose();

// Cria ou abre um banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Banco de dados aberto com sucesso.');
    }
});

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
    )`, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err.message);
        } else {
            console.log('Tabela criada ou já existe.');
        }
    });
});

// Função para adicionar um agendamento
function adicionarAgendamento(nome, telefone, data, horario, servico, preco, callback) {
    const sql = `INSERT INTO agendamentos (nome, telefone, data, horario, servico, preco) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [nome, telefone, data, horario, servico, preco], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, this.lastID);
    });
}

// Função para listar todos os agendamentos
function listarAgendamentos(callback) {
    const sql = `SELECT * FROM agendamentos`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
}

// Exporta as funções para serem usadas em outros arquivos
module.exports = { adicionarAgendamento, listarAgendamentos };
