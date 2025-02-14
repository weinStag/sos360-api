import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL, // A URL de conexão será carregada das variáveis de ambiente
});

const testConnection = async () => {
  try {
    // Tentando conectar ao banco de dados
    await client.connect();
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error.message);
  } finally {
    await client.end(); // Fecha a conexão após o teste
  }
};

testConnection();
