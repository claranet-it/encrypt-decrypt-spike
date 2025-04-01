import crypto from "crypto";
import fs from "fs";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

if (!fs.existsSync('keys')) {
    fs.mkdirSync('keys');
}

fs.writeFileSync("keys/privateKey.pem", privateKey);
fs.writeFileSync("keys/publicKey.pem", publicKey);

console.log("Private Key:\n", privateKey);
console.log("Public Key:\n", publicKey);

const aesKey = crypto.randomBytes(32);
const encryptedKey = crypto.publicEncrypt(
    {
        key: fs.readFileSync("keys/publicKey.pem"),
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
    },
    aesKey
);

fs.writeFileSync("keys/aesKey.txt", encryptedKey.toString("base64"));

console.log("Encrypted Symmetric Key:", encryptedKey.toString("base64"));
