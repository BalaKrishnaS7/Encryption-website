function encrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let text = document.getElementById("inputText").value;
    let key = document.getElementById("key").value;

    if (!text || !key) {
        alert("Please enter text and key!");
        return;
    }

    let encryptedText;
    if (algorithm === "AES") {
        encryptedText = CryptoJS.AES.encrypt(text, key).toString();
    } else if (algorithm === "DES") {
        encryptedText = CryptoJS.DES.encrypt(text, key).toString();
    } else if (algorithm === "TripleDES") {
        encryptedText = CryptoJS.TripleDES.encrypt(text, key).toString();
    }

    document.getElementById("outputText").value = encryptedText;
}

function decrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let encryptedText = document.getElementById("outputText").value;
    let key = document.getElementById("key").value;

    if (!encryptedText || !key) {
        alert("Please enter encrypted text and key!");
        return;
    }

    let decryptedText;
    if (algorithm === "AES") {
        decryptedText = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "DES") {
        decryptedText = CryptoJS.DES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "TripleDES") {
        decryptedText = CryptoJS.TripleDES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    }

    if (!decryptedText) {
        alert("Decryption failed! Incorrect key?");
    } else {
        document.getElementById("outputText").value = decryptedText;
    }
}
