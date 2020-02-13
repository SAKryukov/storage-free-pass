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

};
