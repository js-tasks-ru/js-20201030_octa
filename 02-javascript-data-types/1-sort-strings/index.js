/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  switch (param) {
    case 'asc':
      return compare(arr,1);
    case 'desc':
      return compare(arr,-1);
    default:
      return arr;
  }

  function compare(array,order) {
      return [...array].sort((a, b) => order * a.localeCompare(b, ['ru','en'], {caseFirst:'upper'}))
    }
}
