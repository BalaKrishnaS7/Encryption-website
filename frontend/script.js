async function getRSAKeys() {
    const response = await fetch("http://localhost:3000/keys");
    const keys = await response.json();
    return keys;
}

async function encrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value;

    if (!text) {
        alert("Please enter text!");
        return;
    }

    let encryptedText;
    if (algorithm === "RSA") {
        let keys = await getRSAKeys();
        let rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey(keys.publicKey);
        encryptedText = rsaEncrypt.encrypt(text);
    } else if (algorithm === "Blowfish") {
        encryptedText = CryptoJS.Blowfish.encrypt(text, key).toString();
    } else if (algorithm === "ChaCha20") {
        encryptedText = CryptoJS.ChaCha20.encrypt(text, key).toString();
    } else {
        encryptedText = CryptoJS[algorithm].encrypt(text, key).toString();
    }

    document.getElementById("outputText").value = encryptedText;
}

async function decrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let text = document.getElementById("outputText").value;
    let key = document.getElementById("key").value;

    if (!text) {
        alert("Please enter text!");
        return;
    }

    let decryptedText;
    if (algorithm === "RSA") {
        let keys = await getRSAKeys();
        let rsaDecrypt = new JSEncrypt();
        rsaDecrypt.setPrivateKey(keys.privateKey);
        decryptedText = rsaDecrypt.decrypt(text);
    } else if (algorithm === "Blowfish") {
        decryptedText = CryptoJS.Blowfish.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "ChaCha20") {
        decryptedText = CryptoJS.ChaCha20.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    } else {
        decryptedText = CryptoJS[algorithm].decrypt(text, key).toString(CryptoJS.enc.Utf8);
    }

    document.getElementById("inputText").value = decryptedText;
}

// Dark mode persistence
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add('dark-mode');
    }

    document.getElementById("darkModeToggle").addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem("darkMode", document.body.classList.contains('dark-mode') ? "enabled" : "disabled");
    });
});

window.encrypt = encrypt;
window.decrypt = decrypt;
