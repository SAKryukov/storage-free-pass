"use strict";

const redirectAPI = {
    
    redirect: function(applicationPath, names) { //called by user side
        let url = applicationPath + "?";
        if (!names) return;
        for (let index in names)
            url += `${index}=${names[index]}&`;
        url = url.slice(0, -1);
        document.location = url;
    }, //redirect

    applyScripts: function(sourceFileNames) { //called by application side
        const search = new URLSearchParams(document.location.search);
        for (let source of sourceFileNames) {
            const substitute = search.get(source);
            const script = document.createElement("script");
            script.src = substitute ? `${substitute}.js` : `${source}.js`;
            document.body.appendChild(script);
        } //loop
    }, //applyScripts

};
