"use strict";

const userData = () => {

   const defaultPasswordLength = 16;
   const testCharacterRepertoire = "1234567890ABCDDEFG";
   const strongCharacterRepertoire = "!#$%&()+-0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^abcdefghijkmnopqrstuvwxyz|~/";
      
   return {
      metadata: { title: `${String.fromCodePoint(0x1F642)} User` },
      accounts: [
         {
            identity: {
               seed: "Test",
               selection: { characterRepertoire: testCharacterRepertoire, start: 0, length: 8, shift: 0 }
            },
            display: { name: "Test" }
         },
         {
            identity: {
               seed: "Real account 2020/02/14",
               selection: { characterRepertoire: strongCharacterRepertoire, start: 0, length: 24, shift: 0 }
            },
            display: { name: "Real Account", user: { name: "user", url: "./redirect-demo/accounts.html" } }
         },
      ], // accounts    
      default: {
         identity: {
            seed: "ERROR! define seed!",
            selection: { characterRepertoire: strongCharacterRepertoire, start: 0, length: defaultPasswordLength, shift: 0 }
         },
         display: { name: "Incomplete account", url: "https://www.undefined.account", user: { name: "unknown user", url: String.empty } }
      },
   };
   
};