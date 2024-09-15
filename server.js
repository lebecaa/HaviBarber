const express = require('express');
const bodyParser = require('body-parser');
const { adicionarAgendamento, listarAgendamentos } = require('./database'); // Importa as funções do banco de dados

const app = express();
app.use(bodyParser.json());

// Rota para adicionar um agendamento
app.post('/agendamentos', (req, res) => {
    const { nome, telefone, data, horario, servico, preco } = req.body;
    adicionarAgendamento(nome, telefone, data, horario, servico, preco, (err, id) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar agendamento.' });
        }
        res.status(201).json({ message: 'Agendamento adicionado com sucesso!', id });
    });
});

// Rota para listar todos os agendamentos
app.get('/agendamentos', (req, res) => {
    listarAgendamentos((err, agendamentos) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar agendamentos.' });
        }
        res.json(agendamentos);
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
