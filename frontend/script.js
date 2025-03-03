let publicKey = "";

// Fetch Public Key from Backend
async function fetchPublicKey() {
    try {
        let response = await fetch("http://localhost:3000/public-key");
        let data = await response.json();
        publicKey = data.publicKey;
    } catch (error) {
        console.error("Failed to fetch public key:", error);
    }
}

// Run fetchPublicKey when the page loads
fetchPublicKey();

// Encryption Function
async function encrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value;

    if (!text) {
        alert("Please enter text!");
        return;
    }

    let encryptedText;

    if (algorithm === "AES") {
        encryptedText = CryptoJS.AES.encrypt(text, key).toString();
    } else if (algorithm === "DES") {
        encryptedText = CryptoJS.DES.encrypt(text, key).toString();
    } else if (algorithm === "TripleDES") {
        encryptedText = CryptoJS.TripleDES.encrypt(text, key).toString();
    } else if (algorithm === "RSA") {
        try {
            let response = await fetch("http://localhost:3000/encrypt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });
            let result = await response.json();
            encryptedText = result.encrypted;
        } catch (error) {
            console.error("Encryption failed:", error);
            alert("RSA Encryption failed!");
            return;
        }
    } else if (algorithm === "Blowfish") {
        encryptedText = CryptoJS.Blowfish.encrypt(text, key).toString();
    } else if (algorithm === "ChaCha20") {
        encryptedText = CryptoJS.ChaCha20.encrypt(text, key).toString();
    } else {
        alert("Invalid algorithm selected.");
        return;
    }

    document.getElementById("outputText").value = encryptedText;
}

// Decryption Function
async function decrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let text = document.getElementById("outputText").value;
    let key = document.getElementById("key").value;

    if (!text) {
        alert("Please enter text!");
        return;
    }

    let decryptedText;

    if (algorithm === "AES") {
        decryptedText = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "DES") {
        decryptedText = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "TripleDES") {
        decryptedText = CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "RSA") {
        try {
            let response = await fetch("http://localhost:3000/decrypt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ encryptedText: text }),
            });
            let result = await response.json();
            decryptedText = result.decrypted;
        } catch (error) {
            console.error("Decryption failed:", error);
            alert("RSA Decryption failed!");
            return;
        }
    } else if (algorithm === "Blowfish") {
        decryptedText = CryptoJS.Blowfish.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "ChaCha20") {
        decryptedText = CryptoJS.ChaCha20.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else {
        alert("Invalid algorithm selected.");
        return;
    }

    document.getElementById("outputText").value = decryptedText;
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
