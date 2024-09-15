const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Armazenar horários agendados
let horariosAgendados = {};

// Endpoint para obter horários disponíveis
app.get('/horarios', (req, res) => {
    res.json(horariosAgendados);
});

// Endpoint para adicionar um agendamento
app.post('/agendamento', (req, res) => {
    const { data, horario } = req.body;

    if (!horariosAgendados[data]) {
        horariosAgendados[data] = [];
    }

    if (!horariosAgendados[data].includes(horario)) {
        horariosAgendados[data].push(horario);
        res.status(200).send('Agendamento realizado com sucesso');
    } else {
        res.status(400).send('Horário já agendado');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
