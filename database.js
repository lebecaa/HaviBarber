const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Banco de dados aberto com sucesso.');
    }
});

function adicionarAgendamento(nome, telefone, data, horario, servico, preco, callback) {
    const sql = `INSERT INTO agendamentos (nome, telefone, data, horario, servico, preco) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [nome, telefone, data, horario, servico, preco], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, this.lastID);
    });
}

function listarAgendamentos(data, callback) {
    const sql = `SELECT horario FROM agendamentos WHERE data = ?`;
    db.all(sql, [data], (err, rows) => {
        if (err) {
            return callback(err);
        }
        const horarios = rows.map(row => row.horario);
        callback(null, horarios);
    });
}

module.exports = { adicionarAgendamento, listarAgendamentos };
