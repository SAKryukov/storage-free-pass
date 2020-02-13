"use strict";

(()=>{

    const fileName = redirectAPI.getUserDataScriptFileName();
    const sources = [
        fileName ? fileName : "user-data.js", 
        "utility.js", "crypto.js", "ui.js",
    ];
    for (let source of sources) {
        const script = document.createElement("script");
        script.src = source;
        document.body.appendChild(script);
    }

})();