"use strict";

const passwordGenerator = (() => {

    const hashBits = 256;
    const maxLength = hashBits / 8;
    const cryptographicHashAlgorithm = `SHA-${hashBits}`;

    async function digestSHA2(message) {
        const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest(cryptographicHashAlgorithm, msgUint8); // hash the message
        return Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    } //digestSHA2

    async function generatePassword(masterPassword, seed, start, length, characterRepertoire, shift, inserts) {
        if (!masterPassword) return "";
        if (!start) start = 0;
        start = start % maxLength;
        if (!length) length = maxLength;
        if (length > maxLength) length = maxLength;
        if (!shift) shift = 0;
        shift = shift % characterRepertoire.length;
        const arrayOfBytes = await digestSHA2(masterPassword + seed);
        let output = "";
        for (let index = start; index < start + length; ++index)
            output += characterRepertoire.charAt((shift + arrayOfBytes[index % maxLength]) % characterRepertoire.length);
        if (inserts)
            for (let insert of inserts)
                output = output.slice(0, insert.position) + insert.value + output.slice(insert.position);
        return output;
    }; //generatePassword

    return generatePassword;
    
})();
