const amqp = require('amqplib');
const logger = require('./logger/logger');

async function publishEvent(event) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'user_registration_queue';
    await channel.assertQueue(queueName, { durable: false });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(event)));
    console.log(`Event published: ${JSON.stringify(event)}`);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error publishing event:', error);
  }
}

async function publishMessage(message) {
    try {
      const connection = await amqp.connect(config.rabbitMQUrl);
      const channel = await connection.createChannel();
  
      await channel.assertExchange(config.exchangeName, 'fanout', { durable: false });
      channel.publish(config.exchangeName, '', Buffer.from(JSON.stringify(message)));
  
      logger.info(`Message published: ${JSON.stringify(message)}`);
  
      await channel.close();
      await connection.close();
    } catch (error) {
      logger.error('Error publishing message:', error);
    }
  }

module.exports = {publishEvent,
    // publishMessage
};
