"use strict";

    const elements = {        

        populate: function (inputData, refresh, accountIndexMap) {
            this.accountIndexMap = accountIndexMap;
            this.refresh = refresh;
            this.inputData = inputData;
            const downClass = "down";
            const downProperty = Symbol();
            const visionOnCharacter = String.fromCodePoint(0x1F441);
            const visionOffCharacter = String.fromCodePoint(0x1F576);
            this.thinSpace = String.fromCodePoint(0x2009);
            this.clipboardWarningTimeout = 5000;
            //
            this.table  = document.querySelector("table");
            this.allWidthDeterminants = document.querySelectorAll("tr > td:nth-of-type(2)");
            this.masterPassword = document.querySelector("header input");
            this.masterPasswordVisibilityButton = document.querySelector("header button");
            this.accountSelector = document.querySelector("select");
            this.url = document.querySelector("th");
            this.userInfo = {};
            this.userInfo.name = document.querySelector("tr:nth-of-type(2) > td:nth-of-type(2)");
            this.userInfo.url = document.querySelector("tr:nth-of-type(2) > td:first-child > a");
            this.userInfo.clipboardButton = document.querySelector("tr:nth-of-type(2) button:first-of-type");
            this.userInfo.visibilityButton = document.querySelector("tr:nth-of-type(2) td:last-of-type button");
            this.seed = document.querySelector("tr:nth-of-type(3) > td:nth-of-type(2)");
            this.positions = document.querySelector("tr:nth-of-type(4) > td:nth-of-type(2)");
            this.password = {};
            this.password.element = document.querySelector("tr:last-child > td:nth-of-type(2)");
            this.password.clipboardButton = document.querySelector("tr:last-child button:first-of-type");
            this.password.visibilityButton = document.querySelector("tr:last-child td:last-of-type button");
            this.clipboardWarning = document.querySelector("main aside");
            this.MaxSectionWidth = 0;
            this.adjustSizes();
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
                const accountDisplay = this.inputData.accounts[this.accountIndexMap[this.accountSelector.selectedIndex]].display;
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
            for (let index = 0; index < this.inputData.accounts.length; ++index) {
                if (firstTime) {
                    this.accountSelector.selectedIndex = index;
                    this.refresh(index);
                } //firstTime
                for (let elementIndex = 0; elementIndex < this.allWidthDeterminants.length; ++elementIndex)
                    if (this.allWidthDeterminants[elementIndex].offsetWidth > this.MaxSectionWidth)
                    this.MaxSectionWidth = this.allWidthDeterminants[elementIndex].offsetWidth;
            } //loop
            for (let elementIndex = 0; elementIndex < this.allWidthDeterminants.length; ++elementIndex)
                this.allWidthDeterminants[elementIndex].style.minWidth = utility.styleSize(this.MaxSectionWidth);
            document.body.style.minWidth  = utility.styleSize(this.table.offsetLeft + this.table.offsetWidth + 12); //SA???
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
        
        processMeta: function() {
            const metaElements = document.getElementsByTagName("meta");
            const mainTitleElement = document.querySelector("h1 span");
            const copyrightElement = document.querySelector("body > footer b");
            const versionElement = document.querySelector("h1 small span");
            const meta = {};
            for (let element of metaElements)
                meta[element.name] = element.content;
            mainTitleElement.textContent = document.title;
            mainTitleElement.title = `${meta.description}\n\nv.${this.thinSpace}${meta.version}`;
            if (this.inputData.metadata.title) document.title += ` ${this.inputData.metadata.title}`;
            copyrightElement.textContent = meta.copyright;
            versionElement.textContent = utility.showPartialVersion(meta.version, 2);
        }, //processMeta

    }; //elements
