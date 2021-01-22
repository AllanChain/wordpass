import { writable } from 'svelte/store'

const createThemeStore = () => {
  let initialTheme = localStorage.getItem('theme')
  if (initialTheme === null) {
    initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  document.documentElement.classList.add(initialTheme)
  const { subscribe, update } = writable(initialTheme)
  return {
    subscribe,
    toggle() {
      update(theme => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        localStorage.theme = nextTheme
        document.documentElement.classList.replace(theme, nextTheme)
        return nextTheme
      })
    }
  }
}

export const theme = createThemeStore()
