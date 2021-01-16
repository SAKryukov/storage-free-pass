"use strict";

const redirectAPI = {
    
    redirect: (applicationPath, names)  => { //called by user side
        let url = applicationPath + "?";
        if (!names) return;
        for (let index in names)
            url += `${index}=${names[index]}&`;
        url = url.slice(0, -1);
        document.location = url;
    }, //redirect

    applyScripts: sourceFileNames => { //called by application side
        const search = new URLSearchParams(document.location.search);
        const effectiveSourceFileNames = [];
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
            script.src = source;
            script.addEventListener('load', addScript);
            document.body.appendChild(script);
        }; //addScript
        addScript();
    }, //applyScripts

}; //redirectAPI
