window.onload = () => {

    const encryptionAlgorithm = "AES-GCM";
    const keyDataSourceFormat = "raw";
    const keyUsages = ["encrypt", "decrypt"];
    const decryptionFailure = "Failure to decrypt, invalid data";

    const hashBits = 256;
    const cryptographicHashAlgorithmPrefix = "SHA-";
    async function digestSHA2(message) {
        const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest(`${cryptographicHashAlgorithmPrefix}${hashBits}`, msgUint8); // hash the message
        return hashBuffer;
    } //digestSHA2      

    const elementSet = {
        password: document.querySelector("#id-password"),
        inputData: document.querySelector("#id-input-data"),
        result: document.querySelector("#id-result"),
        buttons: {
            encrypt: document.querySelector("table tr:nth-of-type(2) button"),
            decrypt: document.querySelector("table tr:last-of-type button"),
        },
        showDecryptButton: function(doShow) {
            this.buttons.decrypt.style.display = doShow ? null : "none";
        },
        makeWrapping: value => value.replaceAll(",", ", "),
    }; //elementSet

    elementSet.showDecryptButton(false);

    const getMessageData = () => {
        const message = elementSet.inputData.value;
        const enc = new TextEncoder();
        return enc.encode(message);
    } //getMessageData

    const createKey = async masterPassword => {
        const rawKey = await digestSHA2(masterPassword);
        return window.crypto.subtle.importKey(
            keyDataSourceFormat,
            rawKey,
            encryptionAlgorithm,
            true,
            keyUsages
          );      
    } //createKey

    const encrypt = async (iv, key, messageData) =>
        await window.crypto.subtle.encrypt(
            {
              name: encryptionAlgorithm,
              iv: iv
            },
            key,
            messageData
          );   
    const decrypt = async (iv, key, encryptedData) =>
        await window.crypto.subtle.decrypt(
          {
            name: encryptionAlgorithm,
            iv: iv
          },
          key,
          encryptedData
        );

    let encrypted = null;
    const buttonHandler = async doEncrypt => {
        const key = await createKey(elementSet.password.value);
        const iv = await digestSHA2(elementSet.password.value); //SA???
        if (doEncrypt) {
            encrypted = await encrypt(iv, key, getMessageData());
            const encryptedArray = Array.from(new Uint8Array(encrypted));
            elementSet.result.textContent = elementSet.makeWrapping(encryptedArray.toString());
            elementSet.showDecryptButton(true);    
        } else {
            try {
                const decrypted = await decrypt(iv, key, encrypted);
                let decoder = new TextDecoder();
                elementSet.result.textContent = decoder.decode(decrypted);    
            } catch {
                elementSet.result.textContent = decryptionFailure;
            }
        } //if
    } //buttonHandler

    elementSet.buttons.encrypt.onclick = () => buttonHandler(true);
    elementSet.buttons.decrypt.onclick = () => buttonHandler(false);

}
