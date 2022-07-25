"use strict";

(() => {

    const elements = {
        setup: function() {
            this.footer = document.querySelector("main > section > footer");
            this.output = document.querySelector("textarea");
            this.inputFrom = document.querySelector("#input-unicode-subset-start");
            this.inputLength = document.querySelector("#input-unicode-subset-length");
            this.masterPassword = document.querySelector("#input-master-password");
            this.seed = document.querySelector("#input-seed");
            this.characterRepertoire = document.querySelector("#input-character-repertoire");
            this.start = document.querySelector("#select-start");
            this.length = document.querySelector("#select-length");
            this.shift = document.querySelector("#select-shift");
            this.insertValue = document.querySelector("#input-insert-value");
            this.insertPosition = document.querySelector("#input-insert-position");
            this.password = document.querySelector("aside > div > textarea");
            this.normalizationButton = document.querySelector("button");
        }, //setup
        processMeta: function() {
            const thinSpace = String.fromCodePoint(0x2009);
            const metaElements = document.getElementsByTagName("meta");
            const mainTitleElement = document.querySelector("header");
            const copyrightElement = document.querySelector("body > footer > p:last-child b");
            const meta = {};
            for (let element of metaElements)
                meta[element.name] = element.content;
            copyrightElement.textContent = meta.copyright;
            mainTitleElement.innerHTML = `${document.title} <b>v.${thinSpace}${displayProductVersion}</b>`;
            mainTitleElement.title = `${meta.description}\n\nv.${thinSpace}${productVersion}`;
        }, //processMeta
    }; //elements

    const getSelectedText = textArea => textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);

    const analyzeNormalForms = textArea => {
        let result =  "\nNormalized forms:";
        const text = getSelectedText(textArea);
        const savedSelection = [textArea.selectionStart, textArea.selectionEnd];
        const forms = ["NFC",  "NFD", "NFKC", "NFKD"];
        const formDictionary = {};
        let formCount = 0;
        for (let form of forms) {
            const normalForm = text.normalize(form);
            if (normalForm in formDictionary)
                formDictionary[normalForm].push(form);
            else {
                formDictionary[normalForm] = [form];
                ++formCount;
            } //if
        } //loop
        let formIndex = 0;
        if (formCount != 1)
            for (let form in formDictionary)
                result += `\n\tForm #${++formIndex}: ${formDictionary[form].join(", ")}`;
        else
            result += " all forms are identical";
        window.setTimeout(()=>{
            textArea.setSelectionRange(savedSelection[0], savedSelection[1]);
            textArea.focus();
        }, 0);
        return result;
    }; //analyzeNormalForms

    const populateSelect = (select, start, size) => {
        while (select.childElementCount) select.removeChild(select.firstElementChild);
        for (let index = start; index < size; ++index) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${index}`;
            select.appendChild(option);
        } //loop
        select.selectedIndex = 0;
    }; //populateSelect

    const setupSelectionUpdate = (element, updater) => {
        element.onfocus = ev => { updater(); }
        element.onclick = ev => { updater(); }
        element.onkeyup = ev => { updater(); }
        element.input = ev => { updater(); }
        element.onkeydown = ev => { updater(); }
        element.onmousemove = ev => { updater(); }
        element.onpaste = ev => { updater(); }
    }; //setupSelectionUpdate

    const setupDataChange = (elements, updater) => {
        for (let element of elements)
            if (element instanceof HTMLInputElement)
                element.oninput = updater;
            else if (element instanceof HTMLSelectElement)
                element.onchange = updater;  
    }; //setupDataChange

    const populateFirstAccount = () => {
        const accounts = userData();
        if (!accounts) return;
        if (accounts.accounts.length < 1) return;
        elements.seed.value = accounts.accounts[0].identity.seed;
        elements.characterRepertoire.value = accounts.accounts[0].identity.selection.characterRepertoire;
        elements.start.value = accounts.accounts[0].identity.selection.start;
        elements.length.value = accounts.accounts[0].identity.selection.length;
        elements.shift.value = accounts.accounts[0].identity.selection.shift;
    }; //populateFirstAccount

    window.onload = () => {
        elements.setup();
        elements.processMeta();
        populateSelect(elements.start, 0, 64);
        populateSelect(elements.length, 1, 64);
        populateSelect(elements.shift, 0, 256);
        populateSelect(elements.insertPosition, 0, 64);        
        elements.length.selectedIndex = 23; //SA???
        populateFirstAccount();
        const dataElements = [
            elements.masterPassword, elements.seed, elements.start, elements.length,
            elements.characterRepertoire,
            elements.shift, elements.insertValue, elements.insertPosition
        ];
        setupDataChange(dataElements, () => {
            passwordGenerator(
                elements.masterPassword.value,
                elements.seed.value,
                parseInt(elements.start.value),
                parseInt(elements.length.value),
                elements.characterRepertoire.value,
                parseInt(elements.shift.value),
                { value: elements.insertValue.value, position: elements.insertPosition.value})
                    .then(autoGeneratedPassword => {
                        elements.password.textContent = autoGeneratedPassword;
                    });
        });
        const generateCharacterSet = () => {
            const from = parseInt(elements.inputFrom.value);
            const length = parseInt(elements.inputLength.value);
            if (isNaN(from + length)) {
                elements.output.value += `\nInvalid input: "${elements.inputFrom.value}", "${elements.inputLength.value}"`;
                return;
            } //if
            let value = String.empty;
            let count = 0;
            for (let codePoint = from; codePoint < from + length; ++codePoint) {
                const character = String.fromCodePoint(codePoint);
                value += character;
                ++count;
            } //loop
            const normal = (value == value.normalize("NFC") && value == value.normalize("NFD") && value == value.normalize("NFKC") && value == value.normalize("NFKD"));
            elements.output.value += `\nCharacters: ${count}, from: 0x${from.toString(16)}, normal form: ${normal}\n${value}`;
        }; //generateCharacterSet
        const calculateStatus = () => {
            const selected = elements.output.selectionEnd - elements.output.selectionStart;
            const line = elements.output.value.substring(0, elements.output.selectionStart);
            const split = line.split("\n");
            const y = split.length;
            const x = split[split.length - 1].length + 1;
            elements.footer.textContent = `${y} : ${x} | Selected: ${selected}`;
        }; //calculateStatus
        calculateStatus();
        setupSelectionUpdate(elements.output, calculateStatus);
        elements.inputFrom.onkeydown = ev => { if (ev.key == "Enter") generateCharacterSet(); }
        elements.inputLength.onkeydown = ev => { if (ev.key == "Enter") generateCharacterSet(); }
        elements.normalizationButton.onclick = ev => {
            elements.output.value +=  analyzeNormalForms(elements.output);
        }; //elements.normalizationButton
        elements.inputFrom.focus();
    } //window.onload    

})();
