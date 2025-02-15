const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');

const kafka = new Kafka({
  clientId: 'service-name',
  brokers: ['kafka1:19092'],  // Use INTERNAL listener
  retry: { retries: 5 }
});

const producer = kafka.producer();
const mongoUrl = 'mongodb://admin:adminpassword@mongodb:27017';

async function run() {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl);
    console.log('Connected to MongoDB');

    // Connect to Kafka
    await producer.connect();
    console.log('Connected to Kafka');

    // Produce a sample event
    const event = {
      eventId: '12345',
      type: 'email',
      recipient: 'user@example.com',
      subject: 'Welcome!',
      body: 'Thanks for signing up.'
    };

    await producer.send({
      topic: 'notifications.email',
      messages: [{ value: JSON.stringify(event) }]
    });

    console.log('Sample event sent to Kafka');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
