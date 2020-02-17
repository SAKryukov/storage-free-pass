window.onload = () => {
    "use strict";
    const inputElements = document.querySelectorAll("input");
    const footer = document.querySelector("main > section > footer");
    const output = document.querySelector("textarea");
    const inputFrom = inputElements[0];
    const inputLength = inputElements[1];
    const action = ev => {
        const from = parseInt(inputFrom.value);
        const length = parseInt(inputLength.value);
        if (isNaN(from + length)) {
            output.value += `\nInvalid input: "${inputFrom.value}", "${inputLength.value}"`;
            return;
        } //if
        let value = "";
        let count = 0;
        for (let codePoint = from; codePoint < from + length; ++codePoint) {
            const character = String.fromCodePoint(codePoint);
            value += character;
            ++count;
        }
        const normal = (value == value.normalize("NFC") && value == value.normalize("NFD") && value == value.normalize("NFKC") && value == value.normalize("NFKD"));
        output.value += `\nCharacters: ${count}, from: 0x${from.toString(16)}, normal form: ${normal}\n${value}`;
    }; //action
    const calculateStatus = () => {
        const selected = output.selectionEnd - output.selectionStart;
        const line = output.value.substring(0, output.selectionStart);

        const split = line.split("\n");
        const y = split.length;
        const x = split[split.length - 1].length + 1;
        footer.textContent = `${y} : ${x} | Selected: ${selected}`;
    }; //calculateStatus
    calculateStatus();
    output.onfocus = ev => { calculateStatus(); }
    output.onclick = ev => { calculateStatus(); }
    output.onkeyup = ev => { calculateStatus(); }
    output.input = ev => { calculateStatus(); }
    output.onkeydown = ev => { calculateStatus(); }
    output.onmousemove = ev => { calculateStatus(); }
    output.onpaste = ev => { calculateStatus(); }
    inputFrom.onkeydown = ev => { if (ev.key == "Enter") action(); }
    inputLength.onkeydown = ev => { if (ev.key == "Enter") action(); }
    inputFrom.focus();
} //window.onload
