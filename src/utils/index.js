export const delay = (ms) => new Promise((resolve, _) => {
  setTimeout(resolve, ms)
})
