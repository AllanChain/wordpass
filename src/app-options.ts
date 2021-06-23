import {
  WordpassGeneratorOptions,
  DEFAULT_GENERATOR_OPTIONS
} from './generator'

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

export const DEFAULT_APP_OPTIONS: WordpassAppOptions = {
  ...DEFAULT_GENERATOR_OPTIONS,
  wordList: 'words/password-creator-9806.json',
  saveConfig: true,
  checkTrace: false
}
