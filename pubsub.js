const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-7e454122-4ceb-4a3d-b8e5-258329f09133',
  subscribeKey: 'sub-c-addec6f6-74a3-11ec-ba3b-4692c5eb8503',
  secretKey: 'sec-c-NzgyMjJkMDEtMmRlNS00MzMwLTg3OGYtMDIwNjc5YmQ5YmNm',
};

const CHANNELS = {
  TEST: 'TEST'  
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);
  }
}
