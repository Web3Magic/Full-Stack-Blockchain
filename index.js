const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');

//create express app
const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

//root node http request
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//setTimeout(() => pubsub.broadcastChain(), 1000);

//Parse out Json Body 
app.use(bodyParser.json());

//get the blockchains block
app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

//Post to the blockchain,body parser to parse object
app.post('/api/mine', (req, res) => {
 const { data } = req.body;
 blockchain.addBlock({ data });
//broadcast the chain
pubsub.broadcastChain();

 res.redirect('/api/blocks');
});
//sync chains to the network- req to root node api/blocks endpoint 
const syncChains = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) =>{
    if (!error && response.statusCode === 200 ) {
      const rootChain = JSON.parse(body);
      //log if replace chain sync with root chain
      console.log('replace chain on a sync with', rootChain);
      blockchain.replaceChain(rootChain);
    }
  });
};


//Create peer ports
let PEER_PORT;

//Check if peer is on port
if(process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}
//Port Listener on 3000 => changed to PEER PORT
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);

  if(PORT !== DEFAULT_PORT) {
    syncChains();
  }
 
});
