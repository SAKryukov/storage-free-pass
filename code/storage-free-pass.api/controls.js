"use strict";

    const createElements = () => {

        const elements = {        

            populate: function (elementSet, inputData, refresh, accountIndexMap) {
                this.accountIndexMap = accountIndexMap;
                this.refresh = refresh;
                this.inputData = inputData;
                const downClass = "down";
                const downProperty = Symbol();
                const visionOnCharacter = String.fromCodePoint(0x1F441);
                const visionOffCharacter = String.fromCodePoint(0x1F576);
                this.clipboardWarningTimeout = definitionSet.clipboardWarningTimeout;
                //
                this.table  = elementSet.table;
                this.allWidthDeterminants = elementSet.allWidthDeterminants;
                this.masterPassword = elementSet.masterPassword;
                this.masterPasswordVisibilityButton = elementSet.masterPasswordVisibilityButton;
                this.accountSelector = elementSet.accountSelector;
                this.url = elementSet.tableAccountCell;
                this.userInfo = {};
                this.userInfo.name = this.table.rows[1].cells[1];
                this.userInfo.url = elementSet.anchorUser;
                this.userInfo.clipboardButton = elementSet.userNameToClipboardButton;
                this.userInfo.visibilityButton = elementSet.userNameToggleVisibilityButton;
                this.seed = this.table.rows[2].cells[1];
                this.positions = this.table.rows[3].cells[1];
                this.password = {};
                this.password.element = this.table.rows[4].cells[1];
                this.password.clipboardButton = elementSet.passwordToClipboardButton;
                this.password.visibilityButton = elementSet.passwordToggleVisibilityButton;
                this.clipboardWarning = elementSet.clipboardWarning;
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
                this.processMeta(elementSet);
            }, //populate
    
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
            
            processMeta: function(elementSet) {
                const mainTitleElement = elementSet.titlePlaceholder;
                const copyrightElement = elementSet.copyrightElement;
                const versionElement = elementSet.versionPlaceholder;
                const userMetadataPlaceholder = elementSet.userMetadataPlaceholder;
                const directory = api.getCurrentDirectory();
                document.title = definitionSet.title;
                elementSet.helpAnchor.href = directory + definitionSet.help;
                mainTitleElement.textContent = definitionSet.title;
                mainTitleElement.title =
                    definitionSet.formats.mainTitleTooltip(definitionSet.description, definitionSet.version, this.inputData.metadata.title, this.inputData.metadata.version);
                copyrightElement.textContent = definitionSet.copyright;
                versionElement.textContent = utility.showPartialVersion(definitionSet.version, 2);
                if (this.inputData.metadata.title) {
                    elementSet.userMetadataSeparatorPlaceholder.style.display = "inline";
                    userMetadataPlaceholder.textContent = this.inputData.metadata.title;
                } //if
                for (let metaElement of definitionSet.meta) {
                    const meta = document.createElement("meta");
                    meta.name = metaElement.name;
                    meta.content = metaElement.content;
                    document.head.appendChild(meta);
                } //loop meta
            }, //processMeta
    
        }; //elements

        return elements;
    
    }; //createElements

