"use strict";

(function ui() {

    const inputData = prepareData();

    const elements = {        
        populate: function () {
            const downClass = "down";
            const downProperty = Symbol();
            const visionOnCharacter = String.fromCodePoint(0x1F441);
            const visionOffCharacter = String.fromCodePoint(0x1F576);
            this.clipboardWarningTimeout = 5000;
            //
            this.allSections = document.querySelectorAll("section");
            this.masterPassword = document.querySelector("header > input");
            this.masterPasswordVisibilityButton = document.querySelector("header > button");
            this.accountSelector = document.querySelector("select");
            this.url = document.querySelector("main > section:nth-of-type(1)");
            this.userInfo = {};
            this.userInfo.name = document.querySelector("main > section:nth-of-type(2)");
            this.userInfo.url = document.querySelector("main > label:nth-of-type(2) > a")
            this.userInfo.clipboardButton = document.querySelector("#user-name-clipboard");
            this.userInfo.visibilityButton = document.querySelector("main > aside:nth-of-type(2) > button:last-child");
            this.seed = document.querySelector("main > section:nth-of-type(3)");
            this.positions = document.querySelector("main > section:nth-of-type(4)");
            this.password = {};
            this.password.element = document.querySelector("main > section:nth-of-type(5)");
            this.password.clipboardButton = document.querySelector("#password-clipboard");
            this.password.visibilityButton = document.querySelector("main > aside:nth-of-type(5) > button:last-child");
            this.clipboardWarning = document.querySelector("body > aside");
            this.MaxSectionWidth = 0;
            this.adjustSizes();
            this.adjustTitles();
            const visibilityButtons = [
                this.masterPasswordVisibilityButton,
                this.userInfo.visibilityButton,
                this.password.visibilityButton,
            ];
            for (let button of visibilityButtons) {
                button.addEventListener("click", ev => {
                    if (ev.target[downProperty]) {
                        ev.target[downProperty] = false;
                        ev.target.className = String.empty;
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
            this.userInfo.visibilityButton.addEventListener("click", ev => {
                const accountDisplay = inputData.accounts[accountIndexMap[this.accountSelector.selectedIndex]].display;
                this.userInfo.name.textContent = 
                    this.isButtonDown(ev.target) ? accountDisplay.user.name : accountDisplay.hiddenUserAuthenticationName;
            });
            this.processMeta();
            this.masterPassword.focus();
        }, //populate
        onload: function() { this.masterPassword.focus(); },
        clipboardDataPresent: false,
        setClipboardWarning: function(fromPaste) {
            if (fromPaste) this.clipboardDataPresent = true;
            if (!this.clipboardDataPresent) return;
            this.clipboardWarning.style.visibility = "visible";
            let timeoutId = 0;
            const timeoutAction = () => {
                elements.clipboardWarning.style.visibility = "hidden";
                window.clearTimeout(timeoutId);
            };
            timeoutId = window.setTimeout(timeoutAction, this.clipboardWarningTimeout);
        }, //setClipboardWarning
        optimizeWidths: function(firstTime) {
            for (let index = 0; index < inputData.accounts.length; ++index) {
                if (firstTime) {
                    this.accountSelector.selectedIndex = index;
                    refresh(index);
                } //firstTime
                for (let sectionindex = 0; sectionindex < this.allSections.length; ++sectionindex)
                    if (this.allSections[sectionindex].offsetWidth > this.MaxSectionWidth)
                    this.MaxSectionWidth = this.allSections[sectionindex].offsetWidth;
            } //loop
            for (let sectionindex = 0; sectionindex < this.allSections.length; ++sectionindex)
                this.allSections[sectionindex].style.minWidth = utility.styleSize(this.MaxSectionWidth);
        }, //optimizeWidths
        adjustSizes: function() {
            let maxButtonSize = Math.max(
                this.masterPasswordVisibilityButton.offsetHeight,
                this.masterPasswordVisibilityButton.offsetWidth,
                this.userInfo.clipboardButton.offsetHeight,
                this.userInfo.clipboardButton.offsetWidth
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
    const accountIndexMap = {};

    const generatePassword = () => {
        for (let accountIndex in inputData.accounts)
            generatedData[accountIndex] = undefined;
        const index = accountIndexMap[elements.accountSelector.selectedIndex];
        passwordGenerator(
            elements.masterPassword.value,
            inputData.accounts[index].identity.seed,
            inputData.accounts[index].identity.selection.start,
            inputData.accounts[index].identity.selection.length,
            inputData.accounts[index].identity.selection.characterRepertoire,
            inputData.accounts[index].identity.selection.shift,
            inputData.accounts[index].identity.selection.inserts)
                .then(autoGeneratedPassword => {
                    generatedData[index] = autoGeneratedPassword;
                    showPassword();
                });
    }; //generatePassword

    const showPassword = (generateNew) => {
        const optionIndex =  accountIndexMap[elements.accountSelector.selectedIndex];
        if (generateNew || generatedData[optionIndex] == undefined)
            return generatePassword();        
        elements.password.element.textContent =
            elements.isButtonDown(elements.password.visibilityButton) ?
                generatedData[optionIndex]
                :
                utility.hiddenString(generatedData[optionIndex].length);
        elements.optimizeWidths(false);
    }; //showPassword

    const populate = () => {
        let groupCount = 0;
        const noGroupAccounts = [];
        const groupAccounts = {};
        const addAccountDescriptor = accountIndex => {
            const account = inputData.accounts[accountIndex];
            const descriptor = { index: accountIndex, account: account };
            if (account.display.group) {
                let array = groupAccounts[account.display.group];
                if (!array) {
                    array = groupAccounts[account.display.group] = [];
                    const element = document.createElement("optgroup");
                    element.label = account.display.group;
                    //elements.accountSelector.appendChild(element);
                    descriptor.group = element;
                    ++groupCount;
                } //if
                array.push(descriptor);
            } else
                noGroupAccounts.push(descriptor);
        }; //addAccountDescriptor
        for (let accountIndex in inputData.accounts)
            addAccountDescriptor(accountIndex);
        let currentSelectionIndex = 0;
        for (let account of noGroupAccounts) {
            const option = document.createElement("option");
            option.textContent = account.account.display.name;
            elements.accountSelector.appendChild(option);
            accountIndexMap[currentSelectionIndex++] = account.index; 
        }
        for (let index in groupAccounts) {
            const groupContainer = groupAccounts[index];
            let optionGroupElement;
            if (groupContainer.length > 0) {
                optionGroupElement = groupContainer[0].group;
                elements.accountSelector.appendChild(optionGroupElement);
            } //if
            for (let account of groupContainer) {
                const option = document.createElement("option");
                option.textContent = account.account.display.name;
                optionGroupElement.appendChild(option);
                accountIndexMap[currentSelectionIndex++] = account.index;
            } 
        }
        elements.masterPassword.value = String.empty;
        { // optimize sizes:
            const itemLength = inputData.accounts.length + groupCount; 
            if (elements.accountSelector.size > itemLength)
                elements.accountSelector.size = itemLength;
            elements.optimizeWidths(true);
        }
    }; //populate

    const refresh = accountIndex => {
        showPassword();
        const value = inputData.accounts[accountIndex];
        if (value.display.url)
            elements.url.innerHTML = `<a href="${value.display.url}">${value.display.name}</a>`;
        else
            elements.url.innerHTML = `<b>${value.display.name}</b>`;
        elements.userInfo.name.textContent = elements.isButtonDown(elements.userInfo.visibilityButton) ?
            value.display.user.name : value.display.hiddenUserAuthenticationName;
        elements.seed.textContent = value.identity.seed;
        elements.positions.textContent = `${value.identity.selection.start} ${value.identity.selection.length} ${value.identity.selection.shift}`;
        if (value.display.user.url)
            elements.userInfo.url.setAttribute("href", value.display.user.url);
        else
            elements.userInfo.url.removeAttribute("href");
    }; //refresh

    function prepareData() {
        var data = userData();
        for (let account of data.accounts) {
            utility.populateUndefined(account, data.default);
            account.display.hiddenUserAuthenticationName = utility.hiddenString(account.display.user.name.length);
        } //loop
        return utility.createReadonly(data);
    } //prepareData
   
    //////// main:

    window.onload = () => {
        try {
            elements.populate();
            elements.password.clipboardButton.onclick = ev => {
                elements.setClipboardWarning(true);
                utility.clipboard.copy(generatedData[accountIndexMap[elements.accountSelector.selectedIndex]]);
            };
            elements.userInfo.clipboardButton.onclick = ev => {
                elements.setClipboardWarning(true);
                utility.clipboard.copy(inputData.accounts[accountIndexMap[elements.accountSelector.selectedIndex]].display.user.name);
            };
            elements.password.visibilityButton.addEventListener("click", ev => {
                showPassword();
            }); //elements.password.visibilityButton on click        
            populate();
            elements.masterPassword.oninput = () => { showPassword(true /*generate new*/); };
            elements.accountSelector.onchange = ev => { refresh(accountIndexMap[ev.target.selectedIndex]); };
            if (elements.accountSelector.childElementCount > 0) {
                elements.accountSelector.selectedIndex = 0;
                refresh(0);
            } //if
        } catch (ex) {
            alert(ex);
        } //exception
    }; //main

})();
