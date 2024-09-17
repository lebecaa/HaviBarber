import { connectToDB } from '../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDB();
      const collection = db.collection('consultas');
      
      const consultas = await collection.find({}).toArray();
      
      return res.status(200).json(consultas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
