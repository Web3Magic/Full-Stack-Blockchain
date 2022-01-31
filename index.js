const bodyParser = require('body-parser');
const express = require('express');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');

//create express app
const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

setTimeout(() => pubsub.broadcastChain(), 1000);

//Parse out Json Body 
app.use(bodyParser.json());

//get the blockchains block
app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

//Post to the blockchain, need body parser
app.post('/api/mine', (req, res) => {
 const { data } = req.body;
 blockchain.addBlock({ data });

 res.redirect('/api/blocks');
});

//Create peer ports
const DEFAULT_PORT = 3000;
let PEER_PORT;

//Check if peer is on port
if(process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}
//Port Listener on 3000 => changed to PEER PORT
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));
