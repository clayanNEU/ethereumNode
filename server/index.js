const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "0241e850d0f175166c90787a84beca53d11d23fe67ab748409d7fc483b68a3b174": 100,
  "027813b7ffadd16cbacbb0a1b7c5d5f28c07324ac4d57b3e77e784beb1d07465fe": 50,
  "03dea4d3b698a93c56d29614daae3f093fd829d9667f0e44d48b6f1f5e989b0cb5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // todo: get a signature from the client side application

  // then recover the public address from the signature (that will be the sender)
  // client should not set sender
  // if we derive the address from the signature, we know that that sig could have only originated from the person w the private key

  // request body for post
  const { sender, recipient, amount } = req.body;

  function hashMessage(message) {
    // turn into byte array
    const bytes = utf8ToBytes(message);
    // hash message using keccak256, return 32 bytes
    const hash = keccak256(bytes);
    return hash;
  }
  // get the message hash
  const hashed = hashMessage(msg);
  // sign it and have recovery bit to allow us to recover pubic key from this signature
  secp.sign(hashed, PRIVATE_KEY, { recovered: true });

  // when signature is passed w all of its components, the public key can be recovered
  async function recoverKey(message, signature, recoveryBit) {
    // hash the message
    const messageHash = hashMessage(message);
    return secp.recoverPublicKey(messageHash, signature, recoveryBit);
  }

  // get ethereum address
  function getAddress(publicKey) {
    // format it
    const sliced = publicKey.slice(1);
    // hash of the rest of the public key
    const hashOfPublicKey = keccak256(sliced);
    // return last 20 bytes
    return hashOfPublicKey.slice(-20);
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
