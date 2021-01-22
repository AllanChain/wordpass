import {
  WordpassGeneratorOptions,
  DEFAULT_GENERATOR_OPTIONS
} from './generator'

export interface WordpassAppOptions extends WordpassGeneratorOptions {
  /** save config when click generate */
  saveConfig?: boolean
  /** word list URL */
  wordList?: string
}

export const DEFAULT_APP_OPTIONS = {
  ...DEFAULT_GENERATOR_OPTIONS,
  wordList: 'words/password-creator-9806.json',
  saveConfig: true
}
