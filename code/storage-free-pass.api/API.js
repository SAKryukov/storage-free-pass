"use strict";

const api = (()=> {

    const defaultCryptoScript = "crypto.js";
    const scriptChain = [ "definitionSet", "utility", "contentCreator", "controls", "ui" ];
    const cryptoSystemNotProvidedError = `Cryptographic system is not provided, checkup HTML file`;
    const errorElementTag = "h1";
    const errorElementStyle = "margin-left: 1em; margin-top: 1em";

    window.onerror = function (message, url, line, column) {
        const effectiveUrl = url ? `URL: ${url}\n` : "";
        const effectiveLine = line == null ? "" : `Line: ${line}\n`;
        const effectiveColumn = column == null ? "" : `Column: ${column}`;
        const effectiveMessage = `${message}\n${effectiveUrl}${effectiveLine}${effectiveColumn}`;
        if (document && document.body)
            showError(effectiveMessage);
        else
            alert(effectiveMessage);
        throw new Error();
    }; //window.onerror    
    const showError = error => {
        error = error.replaceAll("\n", "<br/>");
        while (document.body.lastChild)
            document.body.removeChild(document.body.lastChild);
        const element = document.createElement(errorElementTag);
        element.style = errorElementStyle;
        element.innerHTML = error;
        document.body.appendChild(element);
    }; //showError
    const checkupCryptoPresence = () => {
        if (typeof passwordGenerator == `${undefined}`)
            showError(cryptoSystemNotProvidedError);
    }; //checkupCryptoPresence
    
    const applyScripts = (sourceFileNames, customCryptoScript) => {
        let directory = getCurrentDirectory();
        if (customCryptoScript == null)
            customCryptoScript = directory + defaultCryptoScript;
        const search = new URLSearchParams(document.location.search);
        const effectiveSourceFileNames = [];
        if (customCryptoScript != null)
            effectiveSourceFileNames.push(customCryptoScript)
        for (let source of sourceFileNames) {
            const substitute = search.get(source);
            const effectiveSource = substitute ? `${substitute}.js` : `${source}.js`;
            effectiveSourceFileNames.push(effectiveSource);
        } //loop
        let currentIndex = 0;
        const addScript = () => {
            if (currentIndex >= effectiveSourceFileNames) return;
            const source = effectiveSourceFileNames[currentIndex++];
            const script = document.createElement("script");
            script.src = currentIndex == 1 ? source : directory + source;
            script.addEventListener('load', addScript);
            document.head.appendChild(script);
        }; //addScript
        addScript();
        const style = document.createElement("link");
        style.rel="stylesheet";
        style.href = directory + "style.css";
        document.head.appendChild(style);
        window.addEventListener("load", () => { checkupCryptoPresence(); }); // will later be disabled by window.onload = () => { /* ... */ }
    }; //applyScripts

    const getCurrentScript = () => {
        return document.querySelector("head script");
    }; //getCurrentScript

    const getCurrentDirectory = () => {
        const script = getCurrentScript();
        return script.src.substring(0, script.src.lastIndexOf("/") + 1);
    }; //getCurrentDirectory

    const getCustomCrypto = () => {
        const data = getCurrentScript().dataset;
        if (data == null) return null;
        const cryptoScript = data.crypto;
        if (cryptoScript == null) return null;
        return cryptoScript;
    }; //getCustomCrypto

    applyScripts(scriptChain, getCustomCrypto());

    return { getCurrentDirectory: getCurrentDirectory }

})();
