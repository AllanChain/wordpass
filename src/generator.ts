import scrypt from 'scrypt-async'

export const SYMBOLS = '!"#$%&\'()*+,./:;<=>?@[\\]^{|}~_- '

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

export const DEFAULT_GENERATOR_OPTIONS: WordpassGeneratorOptions = {
  N: 16384,
  r: 8,
  p: 1,
  strength: 5,
  saltPrefix: '',
  separator: ' ',
  capitalize: false,
  appendSymbol: false,
  appendNumber: false
}

export const generate = (
  phrase: string,
  service: string,
  words: string[],
  rawOptions: WordpassGeneratorOptions
): Promise<string> => {
  const options = Object.assign({}, DEFAULT_GENERATOR_OPTIONS, rawOptions)
  return new Promise(resolve => {
    scrypt(
      phrase,
      options.saltPrefix + service + 'eS&S<E5R?mJBw(PO?a0Y',
      {
        N: options.N,
        r: options.r,
        p: options.p,
        dkLen: options.strength * 6,
        encoding: 'binary'
      },
      (key: Uint8Array) => {
        console.log(key)
        let chosenWords: string[] = Array.prototype.slice
          .call(new Uint32Array(key.buffer, 0, options.strength))
          .map((index: number) => words[index % words.length])
        if (options.capitalize) {
          chosenWords = chosenWords.map(
            s => s.charAt(0).toUpperCase() + s.slice(1)
          )
        }
        let password: string
        if (options.separator === '$random$') {
          password = chosenWords.reduce(
            (prev, curr, i) =>
              prev +
              curr +
              (i === chosenWords.length - 1
                ? ''
                : SYMBOLS.charAt(
                  key[4 * options.strength + i + 3] % SYMBOLS.length
                )),
            ''
          )
          console.log(password, chosenWords)
        } else {
          password = chosenWords.join(options.separator)
        }
        if (options.appendSymbol) {
          password += SYMBOLS.charAt(
            key[4 * options.strength + 2] % SYMBOLS.length
          )
        }
        if (options.appendNumber) {
          password += (
            new Uint16Array(key.buffer, 4 * options.strength, 1)[0] % 1000
          ).toString()
        }
        resolve(password)
      }
    )
  })
}
