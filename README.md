# SHA-2 Password Generator

*Generator of highly secure passwords based on SHA-2 cryptographic hash and master password, which should be memorized; no password storage is involved*

## Basic Usage

Edit user-data.js for your very own set of accounts. Make sure to fill different `seed` values for each case. If you need to change the password, change the `seed` value. It's a good idea to use date or date/time of password creation in the `seed` string. Strictly speaking, seed values don't have to be kept in secret.

Really secret piece of data is your master password, which should better be memorized and not disclosed to anyone. It can be used for a long time. If you decide to change your master password, you would have to change all the account passwords.

Run the application "index.html", which should better be kept locally on your computer of smartphone. Enter the master password. The account passwords will be generated each time you modify the master passwords string. You can access password using "Copy to clipboard" or "Toggle visibility" buttons.
