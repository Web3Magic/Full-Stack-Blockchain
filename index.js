const express = require('express');
const Blockchain = require('./blockchain');

//create express app
const app = express();
const blockchain = new Blockchain();
//get the blockchains block
app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));
