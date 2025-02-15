const { Kafka } = require('kafkajs');

// Kafka Config
const kafka = new Kafka({
  clientId: 'sms-service',
  brokers: ['kafka1:19092'], // Internal listener
});

const consumer = kafka.consumer({ groupId: 'sms-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notifications.sms', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const smsData = JSON.parse(message.value.toString());
      console.log('Received SMS Data:', smsData);

      // Simulate SMS Sending
      try {
        console.log(`Sending SMS to ${smsData.phoneNumber}: ${smsData.message}`);
        // Implement actual SMS sending logic here
        console.log(`SMS sent successfully to ${smsData.phoneNumber}`);
      } catch (err) {
        console.error('Error sending SMS:', err);
      }
    },
  });
};

run().catch(console.error);
