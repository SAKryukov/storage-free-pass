# Storage-Free Pass

*Generator of highly secure passwords based on cryptographic hash and master password, which should be memorized; no password storage is involved*

## Background

This password generator is deterministic. It doesn't store any passwords in any form. Instead, passwords are re-generated every time. First, [https://en.wikipedia.org/wiki/SHA-2](SHA-2) cryptographic [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) is generated out of two strings: 1) master password, one for all accounts, memorized by the use and entered each time, and 2) _seed_, created per account, stored in the user's data. Then part of the hash is used for the generation of passwords; it uses the following parameters stored in the user's data, per account: starting position in the hash, length of a password, _character repertoire_, and shift in the character repertoire. It makes password recovery of the account passwords and the master password _infeasible_, even if access to the user-stored data is obtained.

## Basic Usage

Create an HTML file and reference the script “API.js” in the `head` element:

```
<head>
  <script src="../storage-free-pass.api/API.js"></script>
</head>
```

In the `<body>` element, add a single script. It should define the function `const userData = () => {/*...*/};` and return the structure of the user accounts. Make sure to fill in account `name` values and different `seed` values for each case. If you need to change the password, change the `seed` value. It's a good idea to use the date or date/time of password creation in the `seed` string, combined with the account name. Strictly speaking, seed values don't have to be kept secret. See [Live Demo](https://sakryukov.github.io/storage-free-pass/code/user-demo/index.html) and the page source for the complete sample. See also the product [Help](https://sakryukov.github.io/storage-free-pass/code/storage-free-pass.api/help.html).

A really secret piece of data is your master password, which should better be memorized and not disclosed to anyone. It can be used for a long time. If you decide to change your master password, you would have to change all the account passwords.

Run the application “index.html”. Enter the master password. The account passwords will be generated each time you modify the master passwords string. You can access the password using the buttons “Copy to clipboard” or “Toggle visibility”.

## Where is the Code?

For source code, see [code](./code)

[Live Demo](https://sakryukov.github.io/storage-free-pass/code/user-demo/index.html).

![Screenshot](doc/main.webp)

## Credits

Inspired by [this work](https://SS64.com/pass) by Simon Sheppard.
