"use strict";

const passwordGenerator = (() => {

    const hashBits = 256;
    const cryptographicHashAlgorithmPrefix = "SHA-";

    async function digestSHA2(message) {
        const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest(`${cryptographicHashAlgorithmPrefix}${hashBits}`, msgUint8); // hash the message
        return Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    } //digestSHA2

    async function generatePassword(masterPassword, seed, start, length, characterRepertoire, shift, inserts) {
        if (!masterPassword) return "";
        const arrayOfBytes = await digestSHA2(masterPassword + seed);
        const maxLength = arrayOfBytes.length;
        if (!start) start = 0;
        start = start % maxLength;
        if (!length) length = maxLength;
        if (length > maxLength) length = maxLength;
        if (!shift) shift = 0;
        shift = shift % characterRepertoire.length;
        let output = "";
        for (let index = start; index < start + length; ++index)
            output += characterRepertoire.charAt((shift + arrayOfBytes[index % maxLength]) % characterRepertoire.length);
        if (!inserts) return output;
        if (!(inserts instanceof Array)) inserts = [inserts];
        for (let insert of inserts)
            output = insert.position ?
                output.slice(0, insert.position) + insert.value + output.slice(insert.position)
                :
                insert.value + output;
        return output;
    }; //generatePassword

    return generatePassword;
    
})();
