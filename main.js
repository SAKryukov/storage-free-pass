"use strict";

(()=>{

    const fileName = redirectAPI.getUserDataScriptFileName();
    const sources = [
        fileName ? fileName : "user-data.js", 
        "utility.js", "crypto.js", "ui.js",
    ];
    redirectAPI.applyScripts(sources);

})();