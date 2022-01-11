const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: "BLOCKCHAIN"
};

class PubSub {
  constructor() {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
    this.subscriber.on(
      'message', 
      (channel, message) => this.handleMessage(channel, message)
    );
  }

  handleMessage(channel,message) {
    console.log(`Message Received. Channel: ${message}.`);
  }
}

module.exports = PubSub;