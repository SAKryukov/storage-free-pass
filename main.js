"use strict";

(()=>{

    const sources = ["../passwords.sa/user-data.js", "utility.js", "crypto.js", "ui.js"];
    for (let source of sources) {
        const script = document.createElement("script");
        script.src = source;
        document.body.appendChild(script);
    }

})();