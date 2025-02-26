const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// RSA Key Pair Generation
const { generateKeyPairSync } = require("crypto");
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

app.get("/keys", (req, res) => {
    res.json({ publicKey, privateKey });
});

app.post("/encrypt", (req, res) => {
    const { text, key } = req.body;
    try {
        const encrypted = crypto.publicEncrypt(key, Buffer.from(text));
        res.json({ encrypted: encrypted.toString("base64") });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/decrypt", (req, res) => {
    const { encryptedText, key } = req.body;
    try {
        const decrypted = crypto.privateDecrypt(key, Buffer.from(encryptedText, "base64"));
        res.json({ decrypted: decrypted.toString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));