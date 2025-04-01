import crypto from "crypto";
import fs from "fs";

// Genera coppia di chiavi RSA (2048 bit)
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

fs.writeFileSync("keys/privateKey.pem", privateKey);
fs.writeFileSync("keys/publicKey.pem", publicKey);

console.log("Chiavi RSA generate e salvate!");
console.log("Chiave Privata:\n", privateKey);
console.log("Chiave Pubblica:\n", publicKey);

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
console.log("Chiave AES cifrata:", encryptedKey.toString("base64"));
