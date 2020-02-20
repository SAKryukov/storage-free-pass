"use strict";

const userData = () => {

   const defaultPasswordLength = 16;
   const basicCharacterRepertoire = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   const testCharacterRepertoire = basicCharacterRepertoire;
   const strongCharacterRepertoire = "!#$%&()+-0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^abcdefghijkmnopqrstuvwxyz|~/";
   const easiestCharacterRepertoire = "0123456789abcdefghijkmnopqrstuvwxyz";
   const easyCharacterRepertoire =    "0123456789abcdefghijkmnopqrstuvwxyz[]-=/";
   const ultimateCharacterRepertoire =
       "!#$%&()*+/0123456789<=>?@ABCDEFG" +
       "HIJKLMNOPQRSTUVWXYZ[]^abcdefghij" +
       "klmnopqrstuvwxyz{|}~¡¢£¤¥¦§©«¬­®" +
       "±µ»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÐÑÒÓÔÕÖ×ØÜÝÞß" +
       "ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႻႼႽႾႿ" +
       "աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտր" +
       "ሀሁሂሃሄህሆሇለሉሊላሌልሎሏሐሑሒሓሔሕሖሗመሙሚማሜምሞሟ" +
       "ሠሡሢሣሤሥሦሧረሩሪራሬርሮሯሰሱሲሳሴስሶሷሸሹሺሻሼሽሾሿ";
      
   return {
      title: `${String.fromCodePoint(0x1F44D)} Sample`,
      accounts: [
         {
            identity: {
               seed: "Test",
               selection: { characterRepertoire: testCharacterRepertoire, start: 0, length: 8, shift: 0 }
            },
            display: { name: "Test", user: {name: String.empty} }
         },
         {
            identity: {
               seed: "MDB 2020/02/07", 
               selection: { characterRepertoire: ultimateCharacterRepertoire, start: 3, length: 15, shift: 1, inserts: {value: "dF1", position: 3} }
            },
            display: { name: "Most Dependable Bank", group: "$", url: "http://www.MostDependableBank.com", user: {name: "Responsible-bank-user", url: "help.html#account-members" } }
         },
         {
            identity: {
               seed: "WikipediA 2020/02/12 13:16",
               selection: { start: 0, length: 32, shift: 201 }
            },
            display: { name: "WikipediA", group: "Education", url: "https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page", user: {name: "me"} }
         },
         {
            identity: {
               seed: "GitHub 2020/02/12",
               selection: { start: 1, length: 16, shift: 0 }
            },
            display: { name: "GitHub", group: "Software", url: "https://github.com", user: {name: "me"} }
         },
      ], // accounts    
      default: {
         identity: { seed: "ERROR! define seed!",
            selection: { characterRepertoire: strongCharacterRepertoire, start: 0, length: defaultPasswordLength, shift: 0, }
         },
         display: { name: "Incomplete account", url: "https://www.undefined.account", user: { name: "unknown user", url: String.empty } }
      },
   };
   
};