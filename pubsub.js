const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-7e454122-4ceb-4a3d-b8e5-258329f09133',
  subscribeKey: 'sub-c-addec6f6-74a3-11ec-ba3b-4692c5eb8503',
  secretKey: 'sec-c-NzgyMjJkMDEtMmRlNS00MzMwLTg3OGYtMDIwNjc5YmQ5YmNm',
};

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN'  
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;

    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }

  subscribeToChannels() {
    this.pubnub.subscribe({
      channels: [Object.values(CHANNELS)]
    });
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject;

        console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        const parsedMessage = JSON.parse(message);

        switch(channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(parsedMessage, true, () =>{

            })
        }
      }
    };
  }
//does not have a call back to fire after success for the unsusbscribe feature to work in pubnub...  
//redundant publishing to the same local subscriber will be as noisy no-ops
  publish({ channel, message}) {
    this.pubnub.publish({ channel, message });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
}

//const testPubSub = new PubSub();
//testPubSub.publish({ channel: CHANNELS.TEST, message: 'hello pubnub test'});

module.exports = PubSub;