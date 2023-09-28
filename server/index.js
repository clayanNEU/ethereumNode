const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

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
  const { sender, recipient, amount } = req.body;

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
