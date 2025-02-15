const { Kafka } = require('kafkajs');
const nodemailer = require('nodemailer');

// Kafka Config
const kafka = new Kafka({
  clientId: 'service-name',
  brokers: ['kafka1:19092'],  // Use INTERNAL listener
  retry: { retries: 5 }
});

const consumer = kafka.consumer({ groupId: 'email-group' });

// Email Transporter Setup
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password'
//   }
// });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notifications.email', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const emailData = JSON.parse(message.value.toString());
      console.log('Received Email Data:', emailData);

      // Sending Email
      // const mailOptions = {
      //   from: 'your-email@gmail.com',
      //   to: emailData.recipient,
      //   subject: emailData.subject,
      //   text: emailData.body
      // };

      // try {
      //   await transporter.sendMail(mailOptions);
      //   console.log(`Email sent to ${emailData.recipient}`);
      // } catch (err) {
      //   console.error('Error sending email:', err);
      // }
    },
  });
};

run().catch(console.error);
