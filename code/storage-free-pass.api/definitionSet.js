const definitionSet = {
    title: "Storage-Free Pass",
    version: "3.2.0",
    description: "System for entering secure passwords, storage-free",
    copyright: "Sergey A Kryukov, 2020-2022",
    meta: [
        { name:"author", content: "Sergey A Kryukov" },
        { name:"owner", content: "Sergey A Kryukov" },
        { name:"keywords", content: "security, password, passwords, generator, cryptography, cryptographic, hash, SHA-256" },
    ],
    help: "help.html",
    clipboardWarningTimeout: 5000,
    formats: {
        mainTitleTooltip: (description, version, userTitle, userVersion) =>
            `${description}\nv.${String.fromCodePoint(0x2009)}${version}\nUser data: ${userTitle} ${userVersion ? "v." + String.fromCodePoint(0x2009) + userVersion.toString() : ""}`,
    },
};
