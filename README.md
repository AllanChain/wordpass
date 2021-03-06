# Wordpass

Wordpass is a English words-based password generator.

- [Why Wordpass?](#why-wordpass)
- [How Secure and How to Secure?](#how-secure-and-how-to-secure)
- [Password Restrictions](#password-restrictions)
- [Config Option Reference](#config-option-reference)
- [Word Lists](#word-lists)
  - [Password Creator Words List](#password-creator-words-list)
  - [Medium of 10k English Words](#medium-of-10k-english-words)
- [License](#license)

## Why Wordpass?

Wordpass is inspired by xkcd [*Password Strength*](https://xkcd.com/936/), project [vault](https://github.com/jcoglan/vault), and many more.

The core concept is to generate word-based password from a master password and service name, so that the password is both unguessable, typeable and rememberable (at least for a short time).

Typeable is important, especially on Android devices. It is **risky to copy password to clipboard**, and even more risky if the you or the system have turned on clipboard keeping. So **keep security in mind when copying password**.

## How Secure and How to Secure?

According to [zxcvbn](https://www.npmjs.com/package/zxcvbn), password `marked anton fibre` takes 10<sup>14.2</sup> guesses to crack, getting score 4 (very unguessable: strong protection from offline slow-hash scenario), while simply `marked anton` takes 10<sup>8.2</sup> guesses to crack, getting score 3 (moderate protection from offline slow-hash scenario). Not to mention you can even make the password longer.

However, it's a slightly different story if the cracker knows the word list. For example, if you are using a word list with 5k words, using 4 words in generated password, then in a simplified model, it takes 5000<sup>4</sup> / 2 guesses to crack, that is 10<sup>14.5</sup>, very unguessable.

Wordpass uses scrypt algorithm in the background. Although scrypt is typically used to store password in hash, it can also be used to generate passwords. The core concept is the salt. In wordpass, `salt = <custom prefix> + <service name> + <a pre-generated, random suffix>`. Salt protects the password from rainbow table attack to some extent.

Imaging a bad guy knows one of your passwords. If you followed a bad practice, using the same password for every service, or having a strong relationship between passwords (e.g. `MyPussw0rd4Google` and `MyPussw0rd4Apple`), then your other accounts are risky. However if the bad guy knows one of your password generated by wordpass, even if he knows that you use wordpass, he cannot guess your another password, thanks for hashing. Alright, even if he generated a rainbow table just for wordpass, he still cannot guess your master password or password generated for other services without knowing your custom salt. Thus **I highly recommend that you should set custom salt prefix**.

However, as MIT license says, wordpass comes **without warranty or liability**. So take your own risk using it!

## Password Restrictions

Some services has stupid restrictions on passwords. wordpass offers a few ways o customize the result.

- `capitalize`
- `separator`
  - a containing digits or punctuation
  - set to `$random$` to use random symbol separator
- `appendSymbol`
- `appendNumber`

Either check  to capitalize each word, or set custom

## Config Option Reference

If you cannot remember all these configurations, set to resonable values and write them down.

```typescript
export interface WordpassGeneratorOptions {
  /** scrypt CPU / memory cost parameter */
  N?: number
  /** scrypt block size parameter */
  r?: number
  /** scrypt parallelization parameter */
  p?: number
  /** password strength, how amny words to generate */
  strength?: number
  /** prefix to scrypt salt */
  saltPrefix?: string
  /** separator to join words. `$random$` to use random symbol separator */
  separator?: string
  /** capitalize each word */
  capitalize?: boolean
  /** append a random symbol to password */
  appendSymbol?: boolean
  /** append a random number to password */
  appendNumber?: boolean
}

export interface WordpassAppOptions extends WordpassGeneratorOptions {
  /** save config when click generate */
  saveConfig?: boolean
  /** word list URL */
  wordList?: string,
  /** check the phrase and options are previously known
   *
   * There are time when the user is not confident with their inputed
   * phrase or options. This option enables the app to store password
   * generated with the phrase and option, setting service to WordPass.
   * If the generated pwassword does not match previously stored one,
   * an alert is triggerd.
   */
  checkTrace?: boolean
}
```

## Word Lists

Wordpass comes with two word lists. And you can also use another word list, even in another language, just by pasting the word list json URL.

### Password Creator Words List

*From https://passwordcreator.org/*

URL: `words/password-creator-9806.json`

Contains 9806 common English words, 3 - 7 characters.

### Medium of 10k English Words

*From https://github.com/first20hours/google-10000-english*

URL: `words/google-10k-medium-5459.json`

Contains 5459 common English words, 5 - 8 characters.


## License

MIT
