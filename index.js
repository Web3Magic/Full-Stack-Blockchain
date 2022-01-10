const express = require('express');
const Blockchain = require('./blockchain');

//create express app
const app = express();

const blockchain = new Blockchain();

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

//Port Listener on 3000 
const PORT = 3000;
app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));
