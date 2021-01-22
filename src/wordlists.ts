export interface WordList {
  name: string
  url: string
}

export const builtinWordLists: WordList[] = [
  {
    name: 'Password Creator',
    url: 'words/password-creator-9806.json'
  },
  {
    name: 'Google 10k Medium',
    url: 'words/google-10k-medium-5459.json'
  }
]
