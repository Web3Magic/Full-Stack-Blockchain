const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let blockchain;
  
  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('contains a `chain` Array instance ', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });

    expect(blockchain.chain[blockchain.chain.length-1].data)
      .toEqual(newData);
  });

  describe(' isValidChain()', () => {
    describe('when the chain does not start with the genesis block', () => {
      it('returns false', () =>{
        blockchain.chain[0] = { data: 'fake-genesis' }; 
        
        expect(blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe('when the chain does start with the genesis block and has mutltiple blocks', () => {
      beforeEach(() =>{
          blockchain.addBlock({ data:  'foxy'});
          blockchain.addBlock({ data:  'roxy'});
          blockchain.addBlock({ data:  'dafox'});
      });
      describe('and a lastHash refrence has changed', () => {
        it('returns false', () =>{
          blockchain.chain[2].lastHash = 'broken-lastHash';

          expect(blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe('and the chain contains a block with an invalid field', () =>{
        it('returs false', () => {
          blockchain.chain[2].data = 'Ugly Data';
          expect(blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe('and if the chain does not contain any invalid blocks', () => {
        it('returns true', () =>{
          expect(blockchain.isValidChain(blockchain.chain)).toBe(true);

        });
      });
    });
  });
});