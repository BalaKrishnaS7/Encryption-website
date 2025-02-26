/**
 * Encryption and Decryption Module
 * 
 * This module provides functions to encrypt and decrypt messages using various algorithms:
 * AES, DES, TripleDES, RSA, Blowfish, and ChaCha20.
 *
 * Note:
 * - For RSA, ensure the JSEncrypt library is included, and replace the placeholder keys with your actual keys.
 * - For Blowfish and ChaCha20, this implementation assumes that corresponding CryptoJS extensions are loaded.
 */

/* Encrypt a given text using the selected algorithm and key */
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
    } else if (algorithm === "RSA") {
        // RSA encryption requires a public key. Replace with your actual RSA public key.
        let rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey("-----BEGIN PUBLIC KEY-----\nYOUR_RSA_PUBLIC_KEY_HERE\n-----END PUBLIC KEY-----");
        encryptedText = rsaEncrypt.encrypt(text);
        if (!encryptedText) {
            alert("RSA encryption failed. Check your public key and input.");
            return;
        }
    } else if (algorithm === "Blowfish") {
        // Assuming CryptoJS has been extended with Blowfish support.
        encryptedText = CryptoJS.Blowfish.encrypt(text, key).toString();
    } else if (algorithm === "ChaCha20") {
        // Assuming CryptoJS has been extended with ChaCha20 support.
        encryptedText = CryptoJS.ChaCha20.encrypt(text, key).toString();
    } else {
        alert("Selected algorithm is not supported.");
        return;
    }

    document.getElementById("outputText").value = encryptedText;
}

/* Decrypt a given text using the selected algorithm and key */
function decrypt() {
    let algorithm = document.getElementById("algorithm").value;
    let text = document.getElementById("outputText").value;
    let key = document.getElementById("key").value;

    if (!text || !key) {
        alert("Please enter text and key!");
        return;
    }

    let decryptedText;
    if (algorithm === "AES") {
        let bytes = CryptoJS.AES.decrypt(text, key);
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "DES") {
        let bytes = CryptoJS.DES.decrypt(text, key);
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "TripleDES") {
        let bytes = CryptoJS.TripleDES.decrypt(text, key);
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "RSA") {
        // RSA decryption requires a private key. Replace with your actual RSA private key.
        let rsaDecrypt = new JSEncrypt();
        rsaDecrypt.setPrivateKey("-----BEGIN PRIVATE KEY-----\nYOUR_RSA_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----");
        decryptedText = rsaDecrypt.decrypt(text);
        if (!decryptedText) {
            alert("RSA decryption failed. Check your private key and input.");
            return;
        }
    } else if (algorithm === "Blowfish") {
        let bytes = CryptoJS.Blowfish.decrypt(text, key);
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else if (algorithm === "ChaCha20") {
        // Assuming decryption support for ChaCha20 is available in CryptoJS extension.
        let bytes = CryptoJS.ChaCha20.decrypt(text, key);
        decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    } else {
        alert("Selected algorithm is not supported.");
        return;
    }

    document.getElementById("inputText").value = decryptedText;
}

/* Expose functions to the global scope for use in HTML */
window.encrypt = encrypt;
window.decrypt = decrypt;