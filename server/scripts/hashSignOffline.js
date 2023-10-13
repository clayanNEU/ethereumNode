const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");

(async () => {
  const PRIVATE_KEY = "";
  // message we want to send with from and to address
  let message = {
    from: "ca6c88ed8fd6484ac8075cceed7157010ae886c4912ddc552e70894fdb63b3e4",
    to: "05856c04c2842f7eb3a964d4fdaf790fd6cc7c49a9019c9520af1fe1e9a204e4",
    amount: 10,
  };

  console.log("Message: ", message);

  // take message -> JSON -> to bytes -> take keccak256 hash - > to hex
  // const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  // console.log("Hashed Message: ", messageHash);

  const messageBytes = utf8ToBytes(JSON.stringify(message));
  const messageHash = keccak256(messageBytes);

  const messageHashHex = toHex(messageHash);
  console.log("Hashed Message: ", messageHashHex);

  // sign the message, generate and print out signature here
  const signature = await secp256k1.sign(messageHash, PRIVATE_KEY);
  console.log("Signature: ", signature);
  console.log("Recovery Bit: ", signature.recovery);
})();
