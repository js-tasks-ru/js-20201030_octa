/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const p = path;
  return function (obj) {
    const path = p.split(".");
    while (path.length > 0 && obj !== undefined){
      obj = obj[path.shift()];
    }
    return obj
  }
}
