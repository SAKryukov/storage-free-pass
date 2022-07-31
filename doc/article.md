@numbering {
    enable: false
}

{title}No need to Store, Encrypt or Memorize Passwords! (???)

<!--
Original publication:
https://www.codeproject.com/Articles/5297157/Markdown-Calculator
-->

[*Sergey A Kryukov*](https://www.SAKryukov.org){.author}

Generator of highly secure passwords based on cryptographic hash and master password, which should be memorized; no password storage is involved

Storage-Free Pass is the application used to provide passwords for multiple services based on a single master password. Unlike other systems providing the encrypted storage for the passwords, this system does not require password storage at all. Instead, the deterministic passwords are securely generated every time they are needed. It is cryptographically infeasible to restore the passwords without knowing the master password. This is the only thing a user needs to remember. How is it possible? The present article explains that.

<!-- copy to CodeProject from here ------------------------------------------->

<ul class="download"><li><a href="5291705/Working/JavaScript-Playground.zip">Download source code — 271 KB</a></li></ul>

![Sample](main.webp) {id=image-top}

<blockquote id="epigraph" class="FQ"><div class="FQA">Epigraphs:</div>
<p><br/>
A barn owl brought Neville a small package from his grandmother. He opened it excitedly and showed them a glass ball the size of a large marble, which seemed to be full of white smoke.<br/>
“It’s a Remembrall!” he explained. “Gran knows I forget things — this tells you if there’s something you’ve forgotten to do. Look, you hold it tight like this and if it turns red — oh…” His face fell, because the Remembrall had suddenly glowed scarlet, “…you’ve forgotten something….”
<br/>Neville was trying to remember what he’d forgotten when Draco Malfoy, who was passing the Gryffindor table, snatched the Remembrall out of his hand.
</p>
<dd>J. K. Rowling, <i>Harry Potter and the Philosopher's Stone</i></dd>
</blockquote>

<blockquote id="epigraph" class="FQ"><div class="FQA"></div>
<br/><p>Neville Longbottom:<br/>
— The only problem is, I can’t remember what I’ve forgotten.</p>
<dd>Steve Kloves, <i>Harry Potter and the Philosopher's Stone</i>, screenplay version based on the novel after J. K. Rowling</dd>
</blockquote>

## Contents{no-toc}

@toc

## Motivation

Let's give a better Remembrall to Neville Longbottom and all other people using password-protected Web services.

## Insights

Here is the idea: remember the old adventure movies where two characters have to get together and use two different keys at the same time to open a particularly important safe?

Let's do this: combine two strings, a master password and another one, called *seed*. The seed does not have to be secret. Now, look at the data flow diagram below. For now, only the top part is important.

Let's calculate [cryptographic hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) out of the combination master password + seed.

In our case, the hash function returns 256 bits of data, and we can use this data to generate a password based on some *character repertoire*, the set of the characters, allowed for a password. Depending on the password size, the amount of information, contained in the hash value, can be redundant or insufficient relative to the maximum password size, but it is not important. What is important is that we can create maximally strong password for the given limitations imposed on the password by the password-protected service. What is more important, it is cryptographically infeasible to reconstruct a master password, even if one of the service password is stollen. 

![Data flow](data-flow.svg){id=data-flow}

We will discuss further detail in the [Implementation](#heading-implementation) section.

## Usage

### Basic Setup

Basic Usage:

~~~{lang=html}{id=usage-basic}
&lt;head&gt;
  &lt;script&gt; src="../storage-free-pass.api/API.js"&lt;/script&gt;
&lt;/head&gt;
~~~

### Worling with Accounts, User Names, and Passwords

Let's consider the usage in more detail and see how all the related problems are addressed.

### How the Services Break your Safety and How to Work Around

### Test Account: Beware of the One Behind You

### Password Renewal

## Implementation

See [Data flow](#data-flow)

???

### Cryptosystem

[GitHub](https://github.com/SAKryukov/storage-free-pass)

~~~{lang=Javascript}{id=javascript-sample}
const eggs = 3.49, sourCream = 2.49, milk = 4.99
~~~

???

### Error Handling

## Advanced Usage

In fact, the [Live Demo](https://sakryukov.github.io/storage-free-pass/code/user-demo) code samples already shows advanced syntax of the use of the product. Even though it doesn't enable any advanced features, it can be used as a template for the advanced syntax.

### Custom Cryptosystem

~~~
&lt;head&gt;
  &lt;script&gt;script
    data-crypto="../storage-free-pass.api/crypto.js"
    src="../storage-free-pass.api/API.js"&lt;/script&gt;
&lt;/head&gt;
~~~

### Importance of a Revision Control System

I would highly recommend the usage of some Revision Control System for the support of the account data, presumably distributed one, like git, Mercurial, or Bazaar.

It's a big common misconception that such a system is only for software developers.

???

## Live Demo

This is the [Live Demo](https://sakryukov.github.io/storage-free-pass/code/user-demo).

## What's Next?

The creation of the accounts structure is still manual programming. It can be done even without any programming experience, just by the available sample packages with the product.

However, it's not a big problem to create another tool to be used to program accounts graphically and generate the account code. It's not a problem to make this tool based on a Web browser. The user can open 

## Conclusions

The inertia of thinking is a bad thing.
