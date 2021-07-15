export { deBounce };
function deBounce(func, delay = 200) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    let context = this;
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
