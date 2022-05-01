export function debounce(func, delay = 200) {
  let timer = null
  return function (...args) {
    if (timer) {
      // console.log(timer);
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      // console.log('debounce OK');
      // console.log(args + '  ' + timer);
    }, delay)
  }
}