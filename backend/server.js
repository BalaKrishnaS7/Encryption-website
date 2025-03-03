const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { generateKeyPairSync } = require("crypto");

// Generate RSA Key Pair at Server Startup
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

// API to Fetch Public Key
app.get("/public-key", (req, res) => {
    res.json({ publicKey });
});

// API to Encrypt Data using RSA Public Key
app.post("/encrypt", (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Missing text to encrypt." });
        }
        const encrypted = crypto.publicEncrypt(
            { key: publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
            Buffer.from(text)
        );
        res.json({ encrypted: encrypted.toString("base64") });
    } catch (error) {
        console.error("Encryption error:", error.message);
        res.status(500).json({ error: "Encryption failed. Invalid input." });
    }
});

// API to Decrypt Data using RSA Private Key
app.post("/decrypt", (req, res) => {
    try {
        const { encryptedText } = req.body;
        if (!encryptedText) {
            return res.status(400).json({ error: "Missing encrypted text to decrypt." });
        }
        const decrypted = crypto.privateDecrypt(
            { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING },
            Buffer.from(encryptedText, "base64")
        );
        res.json({ decrypted: decrypted.toString() });
    } catch (error) {
        console.error("Decryption error:", error.message);
        res.status(500).json({ error: "Decryption failed. Invalid input." });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
