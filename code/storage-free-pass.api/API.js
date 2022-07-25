"use strict";

const api = (()=>{

    const defaultCryptoScript = "crypto.js";
    const scriptChain = [ "definitionSet", "utility", "contentCreator", "controls", "ui" ];
    
    /*
    const showError = error => {
        while (document.body.lastChild)
            document.body.removeChild(document.body.lastChild);
        const element = document.createElement("h1");
        element.style.margin = "1em 1em 1em 1em";
        element.textContent = error;
        document.body.appendChild(element);
    }; //showError
    */
    
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
