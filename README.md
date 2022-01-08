# Full-Stack-Blockchain

 You've probably heard by now that buzzword bitcoin and blockchain...
 
 Blockchain protocol is a revolutionary technology that allows for the secure, distributed, decentralized storage of information. 
 
 Many people in the industry predict that blockchains will disrupt the way we interact with technology in the same way the Internet did in the early 2000s.

 Features of this blockchain
 Made as a template for startups. 

 Proof of Work
 Smart Contracts & Signing
 Peer-to-Peer Network of nodes pub sub implimentation
 React Front Ui
 API 
 Tranaction pool for real-time list of incoming data. 
 include transactions in core blocks of the chain.

This chain is an open-source project and contributions are welcome!

What has been done 11 15 2021
Created the basic building block of the blockchain - with blocks themselves!

Started a test-driven development approach to the project.

Built the genesis block - to get the blockchain going.

Added functionality to mine a block - create a new block for the blockchain.

Developed the important sha-256 hash function.

Applied the hash to mine a block.

---December 7th updates--
Created the fundamental blockchain class.

Developed functionality to validate the blockchain, to allow for chain replacement.

Implemented chain replacement.

Investigated stubbing console output in tests to keep the output clean.

Working on Proof of work and the 51% attack problem. 

---Happy new year ---
Whats Next. Lets make the mineblock adjust difficulty based upon how much time the last block in the chain took to be mined. 

Week of 1-07-2022 - 
Implemented the proof of work system by adding a difficulty and nonce value to each block.

Adjusted the difficulty for a block to ensure that blocks are mined at a rate which approaches a set mining rate for the system.

Investigated the proof of work system by writing a script which checked how will the dynamic difficulty adjusted the system to approach the mine rate.

Switched the hexadecimal character-based difficulty criteria to a more fine-grained binary bit-based difficulty criteria.

Prevented a potential difficulty jump attack by adding extra validation for the blockchain.