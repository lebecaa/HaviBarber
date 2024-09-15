const express = require('express');
const bodyParser = require('body-parser');
const { adicionarAgendamento, listarAgendamentos } = require('./database'); 

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/agendamentos', (req, res) => {
    const { nome, telefone, data, horario, servico, preco } = req.body;
    adicionarAgendamento(nome, telefone, data, horario, servico, preco, (err, id) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar agendamento.' });
        }
        res.status(201).json({ message: 'Agendamento adicionado com sucesso!', id });
    });
});

app.get('/agendamentos/:data', (req, res) => {
    const data = req.params.data;
    listarAgendamentos(data, (err, agendamentos) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar agendamentos.' });
        }
        res.json(agendamentos);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
