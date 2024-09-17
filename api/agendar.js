import { connectToDB } from '../lib/db'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, telefone, data, horario, servico } = req.body;

    try {
      const db = await connectToDB();
      const collection = db.collection('agendamentos');

      const horarioOcupado = await collection.findOne({ data, horario });
      if (horarioOcupado) {
        return res.status(400).json({ error: 'Horário já ocupado' });
      }

      await collection.insertOne({ nome, telefone, data, horario, servico });
      return res.status(200).json({ success: 'Agendamento realizado com sucesso' });
      
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
