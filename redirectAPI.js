"use strict";

const redirectAPI = {
    
    APIDataKey: "S. A. Kryukov SHA-2 Password Generator API",
    storage: sessionStorage,

    redirect: function(applicationPath, userDataScriptFileName) { //called by user side
        this.storage.setItem(this.APIDataKey, userDataScriptFileName);
        document.location = applicationPath;
    }, //redirect

    getUserDataScriptFileName: function() { //called by application side
        const fileName = this.storage.getItem(this.APIDataKey);
        this.storage.removeItem(this.APIDataKey);
        return fileName;
    }, //getUserDataScriptFileName

};
