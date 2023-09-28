const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

// generate random private key
const privateKey = secp.secp256k1.utils.randomPrivateKey();

// private key from byte array to hex
console.log("private key:", toHex(privateKey));

// public key is address to send funds to
// we get the public key from the private key
const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log("Public Key: ", toHex(publicKey));

// run this script w: node scripts/generate.js
