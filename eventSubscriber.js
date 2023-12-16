const amqp = require('amqplib');
const fs = require('fs');

async function subscribeToEvents() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'user_registration_queue';
    await channel.assertQueue(queueName, { durable: false });

    console.log('Waiting for events. To exit press CTRL+C');

    channel.consume(queueName, (msg) => {
      const event = JSON.parse(msg.content.toString());
      console.log(`Received event: ${JSON.stringify(event)}`);

      // Log the event in a file
      fs.appendFileSync('event_log.txt', JSON.stringify(event) + '\n');

      channel.ack(msg);
    });
  } catch (error) {
    console.error('Error subscribing to events:', error);
  }
}

module.exports = subscribeToEvents;
