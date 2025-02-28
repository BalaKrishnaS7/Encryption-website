const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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
    try {
        const { text, key } = req.body;
        if (!text || !key) {
            return res.status(400).json({ error: "Missing text or key." });
        }
        const encrypted = crypto.publicEncrypt(key, Buffer.from(text));
        res.json({ encrypted: encrypted.toString("base64") });
    } catch (error) {
        console.error("Encryption error:", error.message);
        res.status(500).json({ error: "Encryption failed. Invalid key or input." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
