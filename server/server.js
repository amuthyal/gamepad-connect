require('dotenv').config();
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');

// Load URI from environment variable
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const wss = new WebSocket.Server({ port: 8080 });

async function run() {
  try {
    await client.connect();
    const db = client.db('gamepad');
    const collection = db.collection('inputs');

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', async (msg) => {
        const logEntry = {
          message: msg.toString(),
          timestamp: new Date(),
        };

        await collection.insertOne(logEntry);
        console.log('Saved to DB:', logEntry.message);

        ws.send(`✅ Server received & stored: ${msg}`);
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    console.log('WebSocket server running on ws://localhost:8080');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  }
}

run();
