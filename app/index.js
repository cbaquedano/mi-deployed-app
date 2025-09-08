const express = require('express');
const { Pool } = require('pg');
const Redis = require('redis');

const app = express();
const port = 3000;

// Configuración PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  user: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'db'
});

// Configuración Redis
const redisClient = Redis.createClient({ url: 'redis://redis:6379' });
redisClient.connect();

app.get('/', async (req, res) => {
  await redisClient.set('lastVisit', new Date().toISOString());
  const lastVisit = await redisClient.get('lastVisit');
  res.send(`¡Hola! Última visita registrada: ${lastVisit}`);
});

app.listen(port, () => {
  console.log(`App corriendo en puerto ${port}`);
});
