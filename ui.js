"use strict";

(function ui() {

    const inputData = prepareData();

    const elements = {        
        populate: function () {
            const downClass = "down";
            const downProperty = Symbol();
            const visionOnCharacter = String.fromCodePoint(0x1F441);
            const visionOffCharacter = String.fromCodePoint(0x1F576);
            this.masterPassword = document.querySelector("header > input");
            this.masterPasswordVisibilityButton = document.querySelector("header > button");
            this.accountSelector = document.querySelector("select");
            this.url = document.querySelector("main > section:nth-of-type(1)");
            this.userName = {};
            this.userName.element = document.querySelector("main > section:nth-of-type(2)");
            this.userName.clipboardButton = document.querySelector("#user-name-clipboard");
            this.userName.visibilityButton = document.querySelector("main > aside:nth-of-type(2) > button:last-child");
            this.seed = document.querySelector("main > section:nth-of-type(3)");
            this.positions = document.querySelector("main > section:nth-of-type(4)");
            this.password = {};
            this.password.element = document.querySelector("main > section:nth-of-type(5)");
            this.password.clipboardButton = document.querySelector("#password-clipboard");
            this.password.visibilityButton = document.querySelector("main > aside:nth-of-type(5) > button:last-child");
            this.selectedPassword = document.querySelector("body > aside");
            this.selectedPasswordHiddenText = this.selectedPassword.textContent;
            this.adjustSizes();
            this.adjustTitles();
            const visibilityButtons = [
                this.masterPasswordVisibilityButton,
                this.userName.visibilityButton,
                this.password.visibilityButton,
            ];
            for (let button of visibilityButtons) {
                button.addEventListener("click", ev => {
                    if (ev.target[downProperty]) {
                        ev.target[downProperty] = false;
                        ev.target.className = "";
                        ev.target.firstChild.textContent = visionOffCharacter;
                    } else {
                        ev.target[downProperty] = true;
                        ev.target.className = downClass;
                        ev.target.firstChild.textContent = visionOnCharacter;
                    } //if
                }); // button.onClick
            } //loop buttons
            this.isButtonDown = button => button[downProperty] == true;
            this.masterPasswordVisibilityButton.addEventListener("click", ev => {
                const inputType = this.isButtonDown(ev.target) ? "text" : "password";
                this.masterPassword.setAttribute("type", inputType);
            });
            this.userName.visibilityButton.addEventListener("click", ev => {
                const accountDisplay = inputData.accounts[elements.accountSelector.selectedIndex].display;
                this.userName.element.textContent = 
                    this.isButtonDown(ev.target) ? accountDisplay.userName : accountDisplay.hiddenUserName;
            });
            this.processMeta();
            this.masterPassword.focus();
        }, //populate
        onload: function() { this.masterPassword.focus(); },
        adjustSizes: function() {
            let maxButtonSize = Math.max(
                this.masterPasswordVisibilityButton.offsetHeight,
                this.masterPasswordVisibilityButton.offsetWidth,
                this.userName.clipboardButton.offsetHeight,
                this.userName.clipboardButton.offsetWidth
            );
            const allButtons = document.querySelectorAll("button");
            for (let button of allButtons) {
                button.style.width = utility.styleSize(maxButtonSize);
                button.style.height = utility.styleSize(maxButtonSize);
            }    
            this.masterPassword.style.height = utility.styleSize(maxButtonSize);
        }, //adjustSizes
        adjustTitles: function() {
            for (let section of document.querySelectorAll("section")) {
                section.previousElementSibling.title = section.title;
                section.nextElementSibling.title = section.title;
            } //loop
        }, //adjustTitles
        processMeta: function() {
            const metaElements = document.getElementsByTagName("meta");
            const mainTitleElement = document.querySelector("h1");
            const copyrightElement = document.querySelector("body > footer b");
            const meta = {};
            for (let element of metaElements)
                meta[element.name] = element.content;
            mainTitleElement.textContent = document.title;
            mainTitleElement.title = meta.description;
            if (inputData.title) document.title += ` ${inputData.title}`;
            copyrightElement.textContent = meta.copyright;
        }, //processMeta
    }; //elements

    const generatedData = [];

    const generatePassword = () => {
        for (let accountIndex in inputData.accounts)
            generatedData[accountIndex] = undefined;
        const index = elements.accountSelector.options[elements.accountSelector.selectedIndex].value;
        passwordGenerator(
            elements.masterPassword.value,
            inputData.accounts[index].identity.seed,
            inputData.accounts[index].identity.start,
            inputData.accounts[index].identity.length,
            inputData.accounts[index].identity.characterRepertoire,
            inputData.accounts[index].identity.shift,
            inputData.accounts[index].identity.inserts)
                .then(autoGeneratedPassword => {
                    generatedData[index] = autoGeneratedPassword;
                    showPassword();
                });
    }; //generatePassword

    const showPassword = (generateNew) => {
        const optionIndex =  elements.accountSelector.selectedIndex;
        if (generateNew || !generatedData[optionIndex])
            return generatePassword();        
        elements.password.element.textContent =
            elements.isButtonDown(elements.password.visibilityButton) ?
                generatedData[optionIndex]
                :
                utility.hiddenString(generatedData[optionIndex].length);
            elements.selectedPassword.textContent = elements.isButtonDown(elements.password.visibilityButton) ?
                utility.humanReadablePassword(generatedData[optionIndex])
                :
                elements.selectedPasswordHiddenText;
        }; //showPassword

    const optimizeWidths = () => {
        const sections = document.querySelectorAll("section");
        let maxWidth = 0;
        for (let index = 0; index < inputData.accounts.length; ++index) {
            elements.accountSelector.selectedIndex = index;
            refresh(index);
            for (let sectionindex = 0; sectionindex < sections.length; ++sectionindex)
                if (sections[sectionindex].offsetWidth > maxWidth)
                    maxWidth = sections[sectionindex].offsetWidth;
        } //loop
        for (let sectionindex = 0; sectionindex < sections.length; ++sectionindex) 
            sections[sectionindex].style.width = utility.styleSize(maxWidth);
    }; //optimizeWidths

    const populate = () => {
        for (let accountIndex in inputData.accounts) {
            generatedData.push(undefined);
            const account = inputData.accounts[accountIndex];
            const option = document.createElement("option");
            if (!account.display)
                throw `no display at index ${accountIndex}`;
            if (!account.display.name)
                throw `no display at index ${accountIndex}`;
            option.textContent = account.display.name;
            option.value = accountIndex;
            option[elements.accountProperty] = account;
            elements.accountSelector.appendChild(option);    
        } //loop
        { // optimize sizes:
            if (elements.accountSelector.size > elements.accountSelector.childElementCount)
                elements.accountSelector.size = elements.accountSelector.childElementCount;
            optimizeWidths();
        }
    }; //populate

    const refresh = optionIndex => {
        showPassword();
        const accountIndex = elements.accountSelector.options[optionIndex].value; 
        const value = inputData.accounts[accountIndex];
        if (value.display.url)
            elements.url.innerHTML = `<a href="${value.display.url}">${value.display.name}</a>`;
        else
            elements.url.innerHTML = `<b>${value.display.name}</b>`;
        elements.userName.element.textContent = elements.isButtonDown(elements.userName.visibilityButton) ?
            value.display.userName : value.display.hiddenUserName;
        elements.seed.textContent = value.identity.seed;
        elements.positions.textContent = `${value.identity.start} ${value.identity.length} ${value.identity.shift}`;
    }; //refresh

    function prepareData() {
        var data = userData();
        for (let account of data.accounts) {
            utility.populateUndefined(account, data.default);
            account.display.hiddenUserName = utility.hiddenString(account.display.userName.length);
        } //loop
        return utility.createReadonly(data);
    } //prepareData
   
    //////// main:

    window.onbeforeunload = () => { }; // stops page caching (so the back button won't reveal passwords)

    window.onload = () => {
        try {
            elements.populate();
            elements.password.clipboardButton.onclick = ev => {
                utility.clipboard.copy(generatedData[elements.accountSelector.selectedIndex]);
            };
            elements.userName.clipboardButton.onclick = ev => {
                utility.clipboard.copy(inputData.accounts[elements.accountSelector.selectedIndex].display.userName);
            };
            elements.password.visibilityButton.addEventListener("click", ev => {
                let test = elements.isButtonDown(ev.target);
                showPassword();
            }); //elements.password.visibilityButton on click        
            populate();
            elements.masterPassword.oninput = () => { showPassword(true /*generate new*/); };
            elements.accountSelector.onchange = ev => { refresh(ev.target.selectedIndex); };
            if (elements.accountSelector.childElementCount > 0) {
                elements.accountSelector.selectedIndex = 0;
                refresh(0);
            } //if
        } catch (ex) {
            alert(ex);
        } //exception
    }; //main

})();
