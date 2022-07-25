"use strict";

const createContent = () => {

    const elementSet = {};

    (() => { //header
        const header = document.createElement("header");
        const mainHeading = document.createElement("h1");
        elementSet.titlePlaceholder = document.createElement("span");
        const blank = document.createTextNode(" ");
        const versionDenotation = document.createElement("span");
        versionDenotation.innerHTML = "v.&thinsp;";
        elementSet.versionPlaceholder = document.createElement("span");
        const versionPlaceholderParent = document.createElement("small");
        versionPlaceholderParent.appendChild(versionDenotation);
        versionPlaceholderParent.appendChild(elementSet.versionPlaceholder);
        mainHeading.appendChild(elementSet.titlePlaceholder);
        mainHeading.appendChild(blank);
        mainHeading.appendChild(versionPlaceholderParent);
        const section = document.createElement("section");
        const masterPasswordLabel = document.createElement("label");
        masterPasswordLabel.innerHTML = "Master Password:&nbsp;";
        const sectionSpacerBlocks = [document.createElement("div"), document.createElement("div")];
        elementSet.masterPassword = document.createElement("input");
        elementSet.masterPassword.type = "password";
        elementSet.masterPasswordVisibilityButton = document.createElement("button");
        elementSet.masterPasswordVisibilityButton.innerHTML = "&#x1F576;";
        elementSet.masterPasswordVisibilityButton.title = "Toggle visibility";
        section.appendChild(masterPasswordLabel);
        section.appendChild(sectionSpacerBlocks[0]);
        section.appendChild(elementSet.masterPassword);
        section.appendChild(sectionSpacerBlocks[0]);
        section.appendChild(elementSet.masterPasswordVisibilityButton);
        header.appendChild(mainHeading);
        header.appendChild(section);
        document.body.appendChild(header);
    })(); //header

    (() => { //main  
        const main = document.createElement("main");
        elementSet.accountSelector = document.createElement("select");
        elementSet.accountSelector.multiple = true;
        const tableSection = document.createElement("section");
        const tableRowCount = 4;
        const tableColumnCount = 4;
        const tableWidthDeterminateCellIndex = 1;
        elementSet.table = document.createElement("table");
        elementSet.clipboardWarning = document.createElement("aside");
        elementSet.clipboardWarning.innerHTML = "Sensitive data has been added to the system clipboard.<br/>Make sure to wipe it when it is no longer needed.";
        const tableAccountRow = document.createElement("tr");
        tableAccountRow.title = "Optional account URL used for authentication";
        elementSet.tableAccountCell = document.createElement("th");
        elementSet.tableAccountCell.colSpan = 4;
        tableAccountRow.appendChild(elementSet.tableAccountCell);
        elementSet.table.appendChild(tableAccountRow)
        elementSet.allWidthDeterminants = [];
        for (let index = 0; index < tableRowCount; ++index) {
            const row = document.createElement("tr");
            for (let cellIndex = 0; cellIndex < tableColumnCount; ++cellIndex) {
                const cell = document.createElement("td");
                if (cellIndex == tableWidthDeterminateCellIndex)
                    elementSet.allWidthDeterminants.push(cell);
                row.appendChild(cell);
            } //loop
            elementSet.table.appendChild(row);
        } //loop
        elementSet.table.rows[1].title = "Optional account user name";
        elementSet.table.rows[2].title = "Essential data security-critical element: seed for cryptographic hash generation, should always be defined";
        elementSet.table.rows[3].title = "Selection of data used for password generation: start of password in cryptographic hash, password length, character repertoire offset, inserts";
        elementSet.table.rows[4].title = "Account password";
        // row 1:
        elementSet.anchorUser = document.createElement("a");
        elementSet.anchorUser.textContent = "User";
        const anchorUserSpacing = document.createTextNode(" ");
        const userLabel = document.createElement("label");
        userLabel.accessKey = "N";
        userLabel.innerHTML = "<u>N</u>ame:";
        elementSet.table.rows[1].cells[0].appendChild(elementSet.anchorUser);
        elementSet.table.rows[1].cells[0].appendChild(anchorUserSpacing);
        elementSet.table.rows[1].cells[0].appendChild(userLabel);
        elementSet.userNameToClipboardButton = document.createElement("button");
        elementSet.userNameToClipboardButton.title = "Copy to clipboard";
        elementSet.userNameToClipboardButton.innerHTML = "&#x1F4CB;"
        const userNameToClipboardButtonId = performance.now().toString();
        elementSet.userNameToClipboardButton.id = userNameToClipboardButtonId;
        userLabel.htmlFor = userNameToClipboardButtonId;
        elementSet.table.rows[1].cells[2].appendChild(elementSet.userNameToClipboardButton);
        elementSet.userNameToggleVisibilityButton = document.createElement("button");
        elementSet.userNameToggleVisibilityButton.title = "Toggle visibility";
        elementSet.userNameToggleVisibilityButton.innerHTML = "&#x1F576;";
        elementSet.table.rows[1].cells[3].appendChild(elementSet.userNameToggleVisibilityButton);
        // row 2:
        elementSet.table.rows[2].cells[0].textContent = "Seed:";
        // row 3:
        elementSet.table.rows[3].cells[0].textContent = "Selection:";
        // row 4:
        const passwordLabel = document.createElement("label");
        passwordLabel.accessKey = "P";
        passwordLabel.innerHTML = "<u>P</u>assword:";
        elementSet.table.rows[4].cells[0].appendChild(passwordLabel);
        elementSet.passwordToClipboardButton = document.createElement("button");
        elementSet.passwordToClipboardButton.title = "Copy to clipboard";
        elementSet.passwordToClipboardButton.innerHTML = "&#x1F4CB;"
        let passwordToClipboardButtonId = performance.now().toString();
        if (passwordToClipboardButtonId == userNameToClipboardButtonId)
            passwordToClipboardButtonId += "unique";
        elementSet.passwordToClipboardButton.id = passwordToClipboardButtonId;
        passwordLabel.htmlFor = passwordToClipboardButtonId;
        elementSet.table.rows[4].cells[2].appendChild(elementSet.passwordToClipboardButton);
        elementSet.passwordToggleVisibilityButton = document.createElement("button");
        elementSet.passwordToggleVisibilityButton.title = "Toggle visibility";
        elementSet.passwordToggleVisibilityButton.innerHTML = "&#x1F576;";
        elementSet.table.rows[4].cells[3].appendChild(elementSet.passwordToggleVisibilityButton);
        tableSection.appendChild(elementSet.table);
        tableSection.appendChild(elementSet.clipboardWarning);
        main.appendChild(elementSet.accountSelector);
        main.appendChild(tableSection);
        document.body.appendChild(main);
    })(); //main

    (() => { //footer
        const footer = document.createElement("footer");
        const footerContent = document.createElement("small");
        const span = document.createElement("span");
        span.innerHTML = "Copyright &copy; ";
        elementSet.copyrightElement = document.createElement("span");
        elementSet.helpAnchor = document.createElement("a");
        elementSet.helpAnchor.textContent = "Help";
        footerContent.appendChild(span);
        footerContent.appendChild(elementSet.copyrightElement);
        footerContent.appendChild(elementSet.helpAnchor);
        footer.appendChild(footerContent);
        document.body.appendChild(footer);
    })(); //footer

    return elementSet;

};
