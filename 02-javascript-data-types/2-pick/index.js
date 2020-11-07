/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newObj = {};
  for (let i = 0; i < Object.entries(obj).length; i++){
    let prop = Object.entries(obj)[i][0];
    if (fields.includes(prop)){
      newObj[prop] = fields[fields.indexOf(prop)]
    }
  }
  return  newObj
};
