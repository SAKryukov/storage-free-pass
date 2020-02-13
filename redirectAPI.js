"use strict";

const redirectAPI = {
    
    redirect: function(applicationPath, userDataScriptFileName) { //called by user side
        document.location = applicationPath + "?" + userDataScriptFileName;
    }, //redirect

    getUserDataScriptFileName: function() { //called by application side
	const parts = document.location.toString().split("?");
	if (parts.length != 2) return null;
        return parts[1];
    }, //getUserDataScriptFileName

    applyScripts: function(sourceFileNames) { //called by application side
        for (let source of sourceFileNames) {
            const script = document.createElement("script");
            script.src = source;
            document.body.appendChild(script);
        } //loop
    }, //applyScripts

};
